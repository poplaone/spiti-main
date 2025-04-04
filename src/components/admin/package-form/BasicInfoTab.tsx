
import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

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
  setIsCustomizable
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Package Information</CardTitle>
        <CardDescription>
          Enter the core details of the tour package
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="title">Package Title</Label>
            <Input
              id="title"
              placeholder="Enter package title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="grid gap-3">
            <Label htmlFor="overview">Package Overview</Label>
            <Textarea
              id="overview"
              placeholder="Write a brief overview of the package"
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              className="min-h-[150px]"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-3">
              <Label htmlFor="originalPrice">Original Price (₹)</Label>
              <Input
                id="originalPrice"
                type="number"
                placeholder="Enter original price"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                required
              />
            </div>
            
            <div className="grid gap-3">
              <Label htmlFor="discountedPrice">Discounted Price (₹)</Label>
              <Input
                id="discountedPrice"
                type="number"
                placeholder="Enter discounted price"
                value={discountedPrice}
                onChange={(e) => setDiscountedPrice(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-3">
              <Label htmlFor="durationNights">Number of Nights</Label>
              <Input
                id="durationNights"
                type="number"
                placeholder="Enter number of nights"
                value={durationNights}
                onChange={(e) => setDurationNights(e.target.value)}
                min="1"
                required
              />
            </div>
            
            <div className="grid gap-3">
              <Label htmlFor="durationDays">Number of Days</Label>
              <Input
                id="durationDays"
                type="number"
                placeholder="Enter number of days"
                value={durationDays}
                onChange={(e) => setDurationDays(e.target.value)}
                min="1"
                required
              />
            </div>
          </div>
          
          <div className="grid gap-3">
            <Label htmlFor="transportType">Transport Type</Label>
            <Select 
              value={transportType} 
              onValueChange={setTransportType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select transport type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="car">Car / Jeep</SelectItem>
                <SelectItem value="bike">Bike / Motorcycle</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="women-only" 
                checked={isWomenOnly} 
                onCheckedChange={setIsWomenOnly} 
              />
              <Label htmlFor="women-only">Women-Only Tour</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="fixed-departure" 
                checked={isFixedDeparture} 
                onCheckedChange={setIsFixedDeparture} 
              />
              <Label htmlFor="fixed-departure">Fixed Departure Tour</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="customizable" 
                checked={isCustomizable} 
                onCheckedChange={setIsCustomizable} 
              />
              <Label htmlFor="customizable">Customizable Tour</Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInfoTab;
