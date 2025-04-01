
import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarCheck, Settings2 } from "lucide-react";
import ImageUploader from '@/components/admin/ImageUploader';
import { TourPackageProps } from "@/components/TourPackage";

interface BasicInfoTabProps {
  formData: TourPackageProps;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxChange: (checked: boolean, name: string) => void;
  handleTransportTypeChange: (type: 'bike' | 'car' | 'innova') => void;
  handleImageChange: (imageUrl: string) => void;
}

const BasicInfoTab = ({
  formData,
  handleInputChange,
  handleNumberChange,
  handleCheckboxChange,
  handleTransportTypeChange,
  handleImageChange
}: BasicInfoTabProps) => {
  return (
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
  );
};

export default BasicInfoTab;
