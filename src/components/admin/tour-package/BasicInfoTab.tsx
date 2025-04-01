
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BasicInfoTabProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDurationChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleSwitchChange: (name: string, checked: boolean) => void;
}

const BasicInfoTab = ({
  formData,
  handleInputChange,
  handleNumberChange,
  handleDurationChange,
  handleSelectChange,
  handleSwitchChange
}: BasicInfoTabProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Package Title</Label>
        <Input 
          id="title" 
          name="title" 
          value={formData.title} 
          onChange={handleInputChange}
          placeholder="Enter tour package title"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="originalPrice">Original Price (₹)</Label>
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

        <div className="space-y-2">
          <Label htmlFor="discountedPrice">Discounted Price (₹)</Label>
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

        <div className="space-y-2">
          <Label htmlFor="discount">Discount (%)</Label>
          <Input 
            id="discount" 
            name="discount" 
            type="number" 
            value={formData.discount} 
            onChange={handleNumberChange}
            placeholder="Enter discount percentage"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="space-y-2">
          <Label htmlFor="nights">Number of Nights</Label>
          <Input 
            id="nights" 
            name="nights" 
            type="number" 
            value={formData.duration?.nights} 
            onChange={handleDurationChange}
            placeholder="Enter number of nights"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="days">Number of Days</Label>
          <Input 
            id="days" 
            name="days" 
            type="number" 
            value={formData.duration?.days} 
            onChange={handleDurationChange}
            placeholder="Enter number of days"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="transportType">Transport Type</Label>
          <Select 
            value={formData.transportType || 'car'} 
            onValueChange={(value) => handleSelectChange('transportType', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="car">Car Tour</SelectItem>
                <SelectItem value="bike">Bike Tour</SelectItem>
                <SelectItem value="innova">Innova/Premium</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center space-x-2">
          <Switch
            id="isWomenOnly"
            checked={formData.isWomenOnly || false}
            onCheckedChange={(checked) => handleSwitchChange('isWomenOnly', checked)}
          />
          <Label htmlFor="isWomenOnly">Women Only Tour</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="isFixedDeparture"
            checked={formData.isFixedDeparture || false}
            onCheckedChange={(checked) => handleSwitchChange('isFixedDeparture', checked)}
          />
          <Label htmlFor="isFixedDeparture">Fixed Departure Tour</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="isCustomizable"
            checked={formData.isCustomizable !== false}
            onCheckedChange={(checked) => handleSwitchChange('isCustomizable', checked)}
          />
          <Label htmlFor="isCustomizable">Customizable Tour</Label>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoTab;
