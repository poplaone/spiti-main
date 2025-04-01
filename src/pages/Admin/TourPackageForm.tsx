
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { TourPackageProps } from "@/components/TourPackage";
import { tourPackagesData } from '@/data/tourPackagesData';

const TourPackageForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = id !== undefined;
  
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
    overview: "",
    itinerary: []
  });

  useEffect(() => {
    if (isEditing && id) {
      const tourIndex = parseInt(id);
      if (tourPackagesData[tourIndex]) {
        // Deep clone to avoid modifying original data
        setFormData(JSON.parse(JSON.stringify(tourPackagesData[tourIndex])));
      }
    }
  }, [id, isEditing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof TourPackageProps],
          [child]: value
        }
      });
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
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof TourPackageProps],
          [child]: parseInt(value) || 0
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: parseInt(value) || 0
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate discount percentage
    if (formData.originalPrice > 0 && formData.discountedPrice > 0) {
      const discount = Math.round(((formData.originalPrice - formData.discountedPrice) / formData.originalPrice) * 100);
      formData.discount = discount;
    }
    
    // In a real app, you would save to database
    toast({
      description: isEditing ? "Tour package updated successfully" : "Tour package added successfully",
    });
    
    navigate("/admin/tours");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        {isEditing ? "Edit Tour Package" : "Add New Tour Package"}
      </h1>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
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
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="Enter image URL"
                    required
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
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="overview">Overview</Label>
                  <Textarea
                    id="overview"
                    name="overview"
                    value={formData.overview || ""}
                    onChange={handleInputChange}
                    placeholder="Enter package overview"
                    className="min-h-32"
                  />
                </div>
                
                {/* This is a simplified version. In a real app, you would have more complex forms 
                    for managing inclusions, night stays, and itinerary */}
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
                </div>
              </div>
            </CardContent>
          </Card>
          
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
