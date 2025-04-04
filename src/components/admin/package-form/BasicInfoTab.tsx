
import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";

interface BasicInfoTabProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  overview: string;
  setOverview: React.Dispatch<React.SetStateAction<string>>;
  originalPrice: string;
  setOriginalPrice: React.Dispatch<React.SetStateAction<string>>;
  discountedPrice: string;
  setDiscountedPrice: React.Dispatch<React.SetStateAction<string>>;
  durationNights: string;
  setDurationNights: React.Dispatch<React.SetStateAction<string>>;
  durationDays: string;
  setDurationDays: React.Dispatch<React.SetStateAction<string>>;
  transportType: string;
  setTransportType: React.Dispatch<React.SetStateAction<string>>;
  isWomenOnly: boolean;
  setIsWomenOnly: React.Dispatch<React.SetStateAction<boolean>>;
  isFixedDeparture: boolean;
  setIsFixedDeparture: React.Dispatch<React.SetStateAction<boolean>>;
  isCustomizable: boolean;
  setIsCustomizable: React.Dispatch<React.SetStateAction<boolean>>;
  
  // New overview details props
  accommodation?: string;
  setAccommodation?: React.Dispatch<React.SetStateAction<string>>;
  bestTime?: string;
  setBestTime?: React.Dispatch<React.SetStateAction<string>>;
  groupSize?: string;
  setGroupSize?: React.Dispatch<React.SetStateAction<string>>;
  terrain?: string;
  setTerrain?: React.Dispatch<React.SetStateAction<string>>;
  elevation?: string;
  setElevation?: React.Dispatch<React.SetStateAction<string>>;
  availableFrom?: string;
  setAvailableFrom?: React.Dispatch<React.SetStateAction<string>>;
  availableTo?: string;
  setAvailableTo?: React.Dispatch<React.SetStateAction<string>>;
}

const BasicInfoTab: React.FC<BasicInfoTabProps> = ({
  title,
  setTitle,
  overview,
  setOverview,
  originalPrice,
  setOriginalPrice,
  discountedPrice,
  setDiscountedPrice,
  durationNights,
  setDurationNights,
  durationDays,
  setDurationDays,
  transportType,
  setTransportType,
  isWomenOnly,
  setIsWomenOnly,
  isFixedDeparture,
  setIsFixedDeparture,
  isCustomizable,
  setIsCustomizable,
  
  // New overview details props
  accommodation = 'Hotels & Homestays',
  setAccommodation,
  bestTime = 'June to September',
  setBestTime,
  groupSize = '2-10 People',
  setGroupSize,
  terrain = 'Himalayan Mountain Passes',
  setTerrain,
  elevation = '2,000 - 4,550 meters',
  setElevation,
  availableFrom = 'June',
  setAvailableFrom,
  availableTo = 'October',
  setAvailableTo
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Package Title</Label>
          <Input 
            id="title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter package title"
          />
        </div>
        
        <div>
          <Label htmlFor="overview">Overview</Label>
          <Textarea 
            id="overview" 
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            placeholder="Enter package overview"
            rows={4}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="originalPrice">Original Price (₹)</Label>
            <Input 
              id="originalPrice" 
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              type="number"
              placeholder="e.g. 25000"
            />
          </div>
          <div>
            <Label htmlFor="discountedPrice">Discounted Price (₹)</Label>
            <Input 
              id="discountedPrice" 
              value={discountedPrice}
              onChange={(e) => setDiscountedPrice(e.target.value)}
              type="number"
              placeholder="e.g. 20000"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="transportType">Transport Type</Label>
            <Select value={transportType} onValueChange={setTransportType}>
              <SelectTrigger>
                <SelectValue placeholder="Select transport type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="car">Car</SelectItem>
                <SelectItem value="bike">Bike</SelectItem>
                <SelectItem value="own-car">Own Car</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="durationNights">Nights</Label>
            <Input 
              id="durationNights" 
              value={durationNights}
              onChange={(e) => setDurationNights(e.target.value)}
              type="number"
              placeholder="e.g. 5"
            />
          </div>
          <div>
            <Label htmlFor="durationDays">Days</Label>
            <Input 
              id="durationDays" 
              value={durationDays}
              onChange={(e) => setDurationDays(e.target.value)}
              type="number"
              placeholder="e.g. 6"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="isWomenOnly" className="mb-1 block">Women Only Tour</Label>
              <p className="text-sm text-gray-500">Is this package exclusively for women?</p>
            </div>
            <Switch 
              id="isWomenOnly"
              checked={isWomenOnly}
              onCheckedChange={setIsWomenOnly} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="isFixedDeparture" className="mb-1 block">Fixed Departure Tour</Label>
              <p className="text-sm text-gray-500">Does this tour have fixed departure dates?</p>
            </div>
            <Switch 
              id="isFixedDeparture"
              checked={isFixedDeparture}
              onCheckedChange={setIsFixedDeparture} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="isCustomizable" className="mb-1 block">Customizable Tour</Label>
              <p className="text-sm text-gray-500">Can this tour be customized by customers?</p>
            </div>
            <Switch 
              id="isCustomizable"
              checked={isCustomizable}
              onCheckedChange={setIsCustomizable} 
            />
          </div>
        </div>
      </div>
      
      {/* New Overview Details Section */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="overview-details">
          <AccordionTrigger>Tour Overview Details</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="accommodation">Accommodation Type</Label>
                  <Input 
                    id="accommodation" 
                    value={accommodation}
                    onChange={(e) => setAccommodation && setAccommodation(e.target.value)}
                    placeholder="e.g. Hotels & Homestays"
                  />
                </div>
                <div>
                  <Label htmlFor="bestTime">Best Time</Label>
                  <Input 
                    id="bestTime" 
                    value={bestTime}
                    onChange={(e) => setBestTime && setBestTime(e.target.value)}
                    placeholder="e.g. June to September"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="groupSize">Group Size</Label>
                  <Input 
                    id="groupSize" 
                    value={groupSize}
                    onChange={(e) => setGroupSize && setGroupSize(e.target.value)}
                    placeholder="e.g. 2-10 People"
                  />
                </div>
                <div>
                  <Label htmlFor="terrain">Terrain</Label>
                  <Input 
                    id="terrain" 
                    value={terrain}
                    onChange={(e) => setTerrain && setTerrain(e.target.value)}
                    placeholder="e.g. Himalayan Mountain Passes"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="elevation">Elevation</Label>
                  <Input 
                    id="elevation" 
                    value={elevation}
                    onChange={(e) => setElevation && setElevation(e.target.value)}
                    placeholder="e.g. 2,000 - 4,550 meters"
                  />
                </div>
                <div>
                  <Label htmlFor="availableFrom">Available From</Label>
                  <Input 
                    id="availableFrom" 
                    value={availableFrom}
                    onChange={(e) => setAvailableFrom && setAvailableFrom(e.target.value)}
                    placeholder="e.g. June"
                  />
                </div>
                <div>
                  <Label htmlFor="availableTo">Available To</Label>
                  <Input 
                    id="availableTo" 
                    value={availableTo}
                    onChange={(e) => setAvailableTo && setAvailableTo(e.target.value)}
                    placeholder="e.g. October"
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default BasicInfoTab;
