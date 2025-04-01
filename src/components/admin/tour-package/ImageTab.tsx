
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ImageTabProps {
  imageMethod: 'url' | 'upload';
  setImageMethod: (method: 'url' | 'upload') => void;
  formData: any;
  imagePreview: string;
  handleImageUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageTab = ({
  imageMethod,
  setImageMethod,
  formData,
  imagePreview,
  handleImageUrlChange,
  handleImageChange
}: ImageTabProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Image Source</Label>
        <RadioGroup 
          defaultValue="url" 
          value={imageMethod}
          onValueChange={(value) => setImageMethod(value as 'url' | 'upload')}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="url" id="url" />
            <Label htmlFor="url">Image URL</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="upload" id="upload" />
            <Label htmlFor="upload">Upload Image</Label>
          </div>
        </RadioGroup>
      </div>

      {imageMethod === 'url' ? (
        <div className="space-y-2">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            name="image"
            value={formData.image || ''}
            onChange={handleImageUrlChange}
            placeholder="Enter image URL"
          />
        </div>
      ) : (
        <div className="space-y-2">
          <Label htmlFor="imageUpload">Upload Image</Label>
          <Input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="cursor-pointer"
          />
          <p className="text-sm text-gray-500">
            Max file size: 5MB. Supported formats: JPG, PNG, WEBP.
          </p>
        </div>
      )}

      {imagePreview && (
        <div className="mt-6">
          <Label>Image Preview</Label>
          <div className="mt-2 border rounded-md overflow-hidden">
            <img 
              src={imagePreview} 
              alt="Tour preview" 
              className="w-full h-60 object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageTab;
