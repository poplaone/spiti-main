
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { TourPackageProps } from "@/components/TourPackage";
import { addTour, getTourByIndex, updateTour } from '@/services/tourService';
import ImageUploader from '@/components/admin/ImageUploader';
import { CalendarCheck, Settings2 } from "lucide-react";

// Define type for an itinerary day
interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

// Define type for a night stay
interface NightStay {
  location: string;
  nights: number;
}

const TourPackageForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = id !== undefined;
  
  const [activeTab, setActiveTab] = useState("basic");
  
  const [formData, setFormData] = useState<TourPackageProps>({
    title: "",
    image: "",
    originalPrice: 0,
    discountedPrice: 0,
    discount: 0,
    duration: {
      nights: 0,
      days: 0
    },
    nightStays: [],
    inclusions: [],
    exclusions: [],
    overview: "",
    itinerary: [],
    hasFixedDepartures: true,
    isCustomizable: true,
    transportType: 'car',
    isWomenOnly: false,
    availableDates: "June to October"
  });

  // States for itinerary and night stays management
  const [newItineraryDay, setNewItineraryDay] = useState<ItineraryDay>({
    day: 1,
    title: "",
    description: ""
  });
  
  const [newNightStay, setNewNightStay] = useState<NightStay>({
    location: "",
    nights: 1
  });

  useEffect(() => {
    if (isEditing && id) {
      const tourIndex = parseInt(id);
      const tour = getTourByIndex(tourIndex);
      if (tour) {
        // Deep clone to avoid modifying original data
        setFormData({
          ...JSON.parse(JSON.stringify(tour)),
          hasFixedDepartures: tour.hasFixedDepartures !== false,
          isCustomizable: tour.isCustomizable !== false,
          availableDates: tour.availableDates || "June to October",
          exclusions: tour.exclusions || [],
          itinerary: tour.itinerary || []
        });
      }
    }
  }, [id, isEditing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      const parentKey = parent as keyof TourPackageProps;
      
      // Type guard to ensure we're only spreading objects
      if (parentKey === 'duration' && typeof formData.duration === 'object') {
        setFormData({
          ...formData,
          duration: {
            ...formData.duration,
            [child]: value
          }
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      const parentKey = parent as keyof TourPackageProps;
      
      // Type guard to ensure we're only spreading objects
      if (parentKey === 'duration' && typeof formData.duration === 'object') {
        setFormData({
          ...formData,
          duration: {
            ...formData.duration,
            [child]: parseInt(value) || 0
          }
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: parseInt(value) || 0
      });
    }
  };
  
  const handleCheckboxChange = (checked: boolean, name: string) => {
    setFormData({
      ...formData,
      [name]: checked
    });
  };
  
  const handleTransportTypeChange = (type: 'bike' | 'car' | 'innova') => {
    setFormData({
      ...formData,
      transportType: type
    });
  };

  // Handle image change
  const handleImageChange = (imageUrl: string) => {
    setFormData({
      ...formData,
      image: imageUrl
    });
  };
  
  // Add itinerary day
  const addItineraryDay = () => {
    if (!newItineraryDay.title || !newItineraryDay.description) {
      toast({
        description: "Please fill in all itinerary day fields",
        variant: "destructive"
      });
      return;
    }
    
    const updatedItinerary = [
      ...(formData.itinerary || []),
      { ...newItineraryDay }
    ].sort((a, b) => a.day - b.day);
    
    setFormData({
      ...formData,
      itinerary: updatedItinerary
    });
    
    setNewItineraryDay({
      day: Math.max(...updatedItinerary.map(d => d.day), 0) + 1,
      title: "",
      description: ""
    });
  };
  
  // Remove itinerary day
  const removeItineraryDay = (day: number) => {
    const updatedItinerary = (formData.itinerary || [])
      .filter(item => item.day !== day)
      .map((item, idx) => ({ ...item, day: idx + 1 }));
    
    setFormData({
      ...formData,
      itinerary: updatedItinerary
    });
    
    // Reset new day count
    if (updatedItinerary.length > 0) {
      setNewItineraryDay({
        ...newItineraryDay,
        day: Math.max(...updatedItinerary.map(d => d.day)) + 1
      });
    } else {
      setNewItineraryDay({
        ...newItineraryDay,
        day: 1
      });
    }
  };
  
  // Add night stay
  const addNightStay = () => {
    if (!newNightStay.location) {
      toast({
        description: "Please enter a location",
        variant: "destructive"
      });
      return;
    }
    
    setFormData({
      ...formData,
      nightStays: [...formData.nightStays, { ...newNightStay }]
    });
    
    setNewNightStay({
      location: "",
      nights: 1
    });
  };
  
  // Remove night stay
  const removeNightStay = (index: number) => {
    const updatedNightStays = [...formData.nightStays];
    updatedNightStays.splice(index, 1);
    
    setFormData({
      ...formData,
      nightStays: updatedNightStays
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title) {
      toast({
        description: "Title is required",
        variant: "destructive"
      });
      setActiveTab("basic");
      return;
    }
    
    if (!formData.image) {
      toast({
        description: "Tour image is required",
        variant: "destructive"
      });
      setActiveTab("basic");
      return;
    }
    
    // Calculate discount percentage
    if (formData.originalPrice > 0 && formData.discountedPrice > 0) {
      const discount = Math.round(((formData.originalPrice - formData.discountedPrice) / formData.originalPrice) * 100);
      formData.discount = discount;
    }
    
    if (isEditing && id) {
      updateTour(parseInt(id), formData);
      toast({
        description: "Tour package updated successfully",
      });
    } else {
      addTour(formData);
      toast({
        description: "Tour package added successfully",
      });
    }
    
    navigate("/admin/tours");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        {isEditing ? "Edit Tour Package" : "Add New Tour Package"}
      </h1>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="accommodations">Accommodations</TabsTrigger>
              <TabsTrigger value="inclusions">Inclusions & Exclusions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tour Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter package title"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label>Tour Image</Label>
                    <ImageUploader 
                      currentImage={formData.image}
                      onImageChange={handleImageChange}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="originalPrice">Original Price</Label>
                      <Input
                        id="originalPrice"
                        name="originalPrice"
                        type="number"
                        value={formData.originalPrice}
                        onChange={handleNumberChange}
                        placeholder="Enter original price"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="discountedPrice">Discounted Price</Label>
                      <Input
                        id="discountedPrice"
                        name="discountedPrice"
                        type="number"
                        value={formData.discountedPrice}
                        onChange={handleNumberChange}
                        placeholder="Enter discounted price"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="duration.nights">Nights</Label>
                      <Input
                        id="duration.nights"
                        name="duration.nights"
                        type="number"
                        value={formData.duration.nights}
                        onChange={handleNumberChange}
                        placeholder="Enter number of nights"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="duration.days">Days</Label>
                      <Input
                        id="duration.days"
                        name="duration.days"
                        type="number"
                        value={formData.duration.days}
                        onChange={handleNumberChange}
                        placeholder="Enter number of days"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="availableDates">Available Dates</Label>
                    <Input
                      id="availableDates"
                      name="availableDates"
                      value={formData.availableDates || "June to October"}
                      onChange={handleInputChange}
                      placeholder="e.g., June to October"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <Label>Tour Options</Label>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="hasFixedDepartures" 
                          checked={formData.hasFixedDepartures !== false}
                          onCheckedChange={(checked) => 
                            handleCheckboxChange(checked as boolean, 'hasFixedDepartures')
                          } 
                        />
                        <Label 
                          htmlFor="hasFixedDepartures"
                          className="flex items-center cursor-pointer"
                        >
                          <CalendarCheck className="w-4 h-4 mr-1 text-rose-500" />
                          <span>Fixed Departures</span>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="isCustomizable" 
                          checked={formData.isCustomizable !== false}
                          onCheckedChange={(checked) => 
                            handleCheckboxChange(checked as boolean, 'isCustomizable')
                          } 
                        />
                        <Label 
                          htmlFor="isCustomizable"
                          className="flex items-center cursor-pointer"
                        >
                          <Settings2 className="w-4 h-4 mr-1 text-rose-500" />
                          <span>Customizable</span>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="isWomenOnly" 
                          checked={formData.isWomenOnly === true}
                          onCheckedChange={(checked) => 
                            handleCheckboxChange(checked as boolean, 'isWomenOnly')
                          } 
                        />
                        <Label htmlFor="isWomenOnly" className="cursor-pointer">
                          Women Only Tour
                        </Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Transport Type</Label>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        type="button"
                        variant={formData.transportType === 'bike' ? 'default' : 'outline'}
                        className={formData.transportType === 'bike' ? 'bg-spiti-forest' : ''}
                        onClick={() => handleTransportTypeChange('bike')}
                      >
                        Bike
                      </Button>
                      <Button
                        type="button"
                        variant={formData.transportType === 'car' ? 'default' : 'outline'}
                        className={formData.transportType === 'car' ? 'bg-spiti-forest' : ''}
                        onClick={() => handleTransportTypeChange('car')}
                      >
                        Car
                      </Button>
                      <Button
                        type="button"
                        variant={formData.transportType === 'innova' ? 'default' : 'outline'}
                        className={formData.transportType === 'innova' ? 'bg-spiti-forest' : ''}
                        onClick={() => handleTransportTypeChange('innova')}
                      >
                        Innova
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tour Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label htmlFor="overview">Overview</Label>
                    <Textarea
                      id="overview"
                      name="overview"
                      value={formData.overview || ""}
                      onChange={handleInputChange}
                      placeholder="Enter detailed package overview"
                      className="min-h-32"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Provide a comprehensive description of the tour experience
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="itinerary" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tour Itinerary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Current Itinerary Days</h3>
                    {formData.itinerary && formData.itinerary.length > 0 ? (
                      <div className="space-y-4">
                        {formData.itinerary.map((day, index) => (
                          <div key={index} className="border p-4 rounded-md relative">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => removeItineraryDay(day.day)}
                            >
                              Remove
                            </Button>
                            <div className="font-medium">Day {day.day}: {day.title}</div>
                            <div className="text-sm text-gray-700 mt-2">{day.description}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">No itinerary days added yet</p>
                    )}
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="font-medium mb-4">Add New Day</h3>
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                      <div className="md:col-span-1">
                        <Label htmlFor="newDay">Day</Label>
                        <Input
                          id="newDay"
                          type="number"
                          min="1"
                          value={newItineraryDay.day}
                          onChange={(e) => setNewItineraryDay({
                            ...newItineraryDay,
                            day: parseInt(e.target.value) || 1
                          })}
                        />
                      </div>
                      <div className="md:col-span-5">
                        <Label htmlFor="newDayTitle">Title</Label>
                        <Input
                          id="newDayTitle"
                          value={newItineraryDay.title}
                          onChange={(e) => setNewItineraryDay({
                            ...newItineraryDay,
                            title: e.target.value
                          })}
                          placeholder="e.g., Arrival in Spiti Valley"
                        />
                      </div>
                      <div className="md:col-span-6">
                        <Label htmlFor="newDayDescription">Description</Label>
                        <Textarea
                          id="newDayDescription"
                          value={newItineraryDay.description}
                          onChange={(e) => setNewItineraryDay({
                            ...newItineraryDay,
                            description: e.target.value
                          })}
                          placeholder="Describe the day's activities and experiences"
                          className="min-h-24"
                        />
                      </div>
                      <div className="md:col-span-6">
                        <Button
                          type="button"
                          onClick={addItineraryDay}
                          className="bg-spiti-forest hover:bg-spiti-forest/90"
                        >
                          Add Itinerary Day
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="accommodations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Accommodations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Night Stays</h3>
                    {formData.nightStays.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {formData.nightStays.map((stay, index) => (
                          <div key={index} className="border p-4 rounded-md relative">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => removeNightStay(index)}
                            >
                              Remove
                            </Button>
                            <div className="font-medium">{stay.location}</div>
                            <div className="text-sm text-gray-700">
                              {stay.nights} {stay.nights === 1 ? 'night' : 'nights'} stay
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">No accommodations added yet</p>
                    )}
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="font-medium mb-4">Add Accommodation</h3>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      <div className="md:col-span-3">
                        <Label htmlFor="newStayLocation">Location</Label>
                        <Input
                          id="newStayLocation"
                          value={newNightStay.location}
                          onChange={(e) => setNewNightStay({
                            ...newNightStay,
                            location: e.target.value
                          })}
                          placeholder="e.g., Kaza Homestay"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="newStayNights">Number of Nights</Label>
                        <Input
                          id="newStayNights"
                          type="number"
                          min="1"
                          value={newNightStay.nights}
                          onChange={(e) => setNewNightStay({
                            ...newNightStay,
                            nights: parseInt(e.target.value) || 1
                          })}
                        />
                      </div>
                      <div className="md:col-span-5">
                        <Button
                          type="button"
                          onClick={addNightStay}
                          className="bg-spiti-forest hover:bg-spiti-forest/90"
                        >
                          Add Accommodation
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="inclusions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Inclusions & Exclusions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="inclusions">Inclusions (one per line)</Label>
                    <Textarea
                      id="inclusions"
                      value={formData.inclusions.join("\n")}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          inclusions: e.target.value.split("\n").filter(item => item.trim() !== "")
                        });
                      }}
                      placeholder="Enter inclusions (one per line)"
                      className="min-h-32"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      List all items included in the package price
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="exclusions">Exclusions (one per line)</Label>
                    <Textarea
                      id="exclusions"
                      value={(formData.exclusions || []).join("\n")}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          exclusions: e.target.value.split("\n").filter(item => item.trim() !== "")
                        });
                      }}
                      placeholder="Enter exclusions (one per line)"
                      className="min-h-32"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      List all items not included in the package price
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/tours")}
            >
              Cancel
            </Button>
            
            <Button type="submit" className="bg-spiti-forest hover:bg-spiti-forest/90">
              {isEditing ? "Update Package" : "Add Package"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TourPackageForm;
