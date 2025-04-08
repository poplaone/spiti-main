
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form
} from "@/components/ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  // Overview details
  accommodation?: string;
  setAccommodation: React.Dispatch<React.SetStateAction<string>>;
  bestTime?: string;
  setBestTime: React.Dispatch<React.SetStateAction<string>>;
  groupSize?: string;
  setGroupSize: React.Dispatch<React.SetStateAction<string>>;
  terrain?: string;
  setTerrain: React.Dispatch<React.SetStateAction<string>>;
  elevation?: string;
  setElevation: React.Dispatch<React.SetStateAction<string>>;
  availableFrom?: string;
  setAvailableFrom: React.Dispatch<React.SetStateAction<string>>;
  availableTo?: string;
  setAvailableTo: React.Dispatch<React.SetStateAction<string>>;
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
  accommodation = '',
  setAccommodation,
  bestTime = '',
  setBestTime,
  groupSize = '',
  setGroupSize,
  terrain = '',
  setTerrain,
  elevation = '',
  setElevation,
  availableFrom = '',
  setAvailableFrom,
  availableTo = '',
  setAvailableTo
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="title">Tour Title</Label>
          <Input 
            id="title" 
            type="text" 
            placeholder="Enter tour title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="originalPrice">Original Price (₹)</Label>
            <Input 
              id="originalPrice" 
              type="number" 
              placeholder="Original price" 
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="discountedPrice">Discounted Price (₹)</Label>
            <Input 
              id="discountedPrice" 
              type="number" 
              placeholder="Discounted price" 
              value={discountedPrice}
              onChange={(e) => setDiscountedPrice(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Label htmlFor="durationNights">Duration (Nights)</Label>
          <Input 
            id="durationNights" 
            type="number" 
            placeholder="Number of nights" 
            value={durationNights}
            onChange={(e) => setDurationNights(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="durationDays">Duration (Days)</Label>
          <Input 
            id="durationDays" 
            type="number" 
            placeholder="Number of days" 
            value={durationDays}
            onChange={(e) => setDurationDays(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="transportType">Transport Type</Label>
          <select 
            id="transportType" 
            value={transportType}
            onChange={(e) => setTransportType(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 p-2"
          >
            <option value="">Select transport type</option>
            <option value="car">Car</option>
            <option value="suv">SUV</option>
            <option value="bike">Bike</option>
          </select>
        </div>
      </div>

      {/* Tour Type Options Section - Made more prominent */}
      <div className="border rounded-lg p-4 bg-gray-50">
        <h3 className="text-lg font-medium mb-4">Tour Type Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-2">
            <Switch 
              id="isWomenOnly" 
              checked={isWomenOnly}
              onCheckedChange={setIsWomenOnly}
            />
            <Label htmlFor="isWomenOnly">Women-Only Tour</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="isFixedDeparture" 
              checked={isFixedDeparture}
              onCheckedChange={setIsFixedDeparture}
            />
            <Label htmlFor="isFixedDeparture" className="font-medium text-blue-700">Fixed Departure Tour</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="isCustomizable" 
              checked={isCustomizable}
              onCheckedChange={setIsCustomizable}
            />
            <Label htmlFor="isCustomizable" className="font-medium text-green-700">Customizable Tour</Label>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-gray-600">
          <p>
            <span className="font-semibold">Note:</span> Fixed departure tours will be displayed on the Fixed Departures page. 
            Customizable tours will appear on the Customizable Tours page. All car and bike tours automatically appear on Road Trips.
          </p>
        </div>
      </div>

      <div>
        <Label htmlFor="overview">Tour Overview</Label>
        <Textarea 
          id="overview" 
          placeholder="Write a brief overview of the tour" 
          value={overview}
          onChange={(e) => setOverview(e.target.value)}
          className="mt-1 h-32"
        />
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium mb-4">Tour Overview Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="accommodation">Accommodation Type</Label>
            <Input 
              id="accommodation" 
              type="text" 
              placeholder="e.g., Hotels, Homestays" 
              value={accommodation}
              onChange={(e) => setAccommodation(e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="bestTime">Best Time to Visit</Label>
            <Input 
              id="bestTime" 
              type="text" 
              placeholder="e.g., June to September" 
              value={bestTime}
              onChange={(e) => setBestTime(e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="groupSize">Group Size</Label>
            <Input 
              id="groupSize" 
              type="text" 
              placeholder="e.g., 2-10 people" 
              value={groupSize}
              onChange={(e) => setGroupSize(e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="terrain">Terrain</Label>
            <Input 
              id="terrain" 
              type="text" 
              placeholder="e.g., Mountainous, Desert" 
              value={terrain}
              onChange={(e) => setTerrain(e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="elevation">Elevation</Label>
            <Input 
              id="elevation" 
              type="text" 
              placeholder="e.g., 3,500-4,500m" 
              value={elevation}
              onChange={(e) => setElevation(e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="availableFrom">Available From</Label>
              <Input 
                id="availableFrom" 
                type="text" 
                placeholder="e.g., June" 
                value={availableFrom}
                onChange={(e) => setAvailableFrom(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="availableTo">Available To</Label>
              <Input 
                id="availableTo" 
                type="text" 
                placeholder="e.g., September" 
                value={availableTo}
                onChange={(e) => setAvailableTo(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoTab;
