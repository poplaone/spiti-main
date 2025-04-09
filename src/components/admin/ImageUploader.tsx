
import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, X } from "lucide-react";

interface ImageUploaderProps {
  imagePreview: string;
  onImageChange: (file: File | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  imagePreview,
  onImageChange
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onImageChange(file);
  };

  const handleClearImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onImageChange(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-spiti-forest transition-colors">
        {imagePreview ? (
          <div className="relative w-full max-w-lg">
            <img 
              src={imagePreview} 
              alt="Tour preview"
              className="rounded-md max-h-64 mx-auto object-contain"
              loading="eager"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={handleClearImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <Upload className="h-12 w-12 mx-auto text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500">
              SVG, PNG, JPG or GIF (Max 2MB)
            </p>
          </div>
        )}
        
        <Input 
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        
        <Button
          type="button"
          variant="outline"
          className="mt-4"
          onClick={handleButtonClick}
        >
          {imagePreview ? 'Change Image' : 'Select Image'}
        </Button>
      </div>
      
      <div className="text-sm text-gray-500">
        <p>* Please upload a high-quality image that best represents the tour</p>
        <p>* Recommended dimensions: 1200x800 pixels</p>
      </div>
    </div>
  );
};

export default ImageUploader;
