
import React, { useState, ChangeEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ImageUploaderProps {
  currentImage: string;
  onImageChange: (imageUrl: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ currentImage, onImageChange }) => {
  const [previewUrl, setPreviewUrl] = useState<string>(currentImage);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "Image size must be less than 5MB",
        variant: "destructive"
      });
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Error",
        description: "Only image files are allowed",
        variant: "destructive"
      });
      return;
    }

    // Simulate upload
    setIsUploading(true);

    // Create object URL for preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    // In a real app, you'd upload to a server here
    // For now, we'll simulate an upload delay and use the object URL
    setTimeout(() => {
      onImageChange(objectUrl);
      setIsUploading(false);
      toast({
        description: "Image uploaded successfully!"
      });
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center">
        {previewUrl ? (
          <div className="relative">
            <img 
              src={previewUrl} 
              alt="Tour preview" 
              className="mx-auto h-48 object-cover rounded-md"
            />
            <Button
              variant="outline"
              size="sm"
              className="absolute top-2 right-2 bg-white"
              onClick={() => {
                setPreviewUrl('');
                onImageChange('');
              }}
            >
              Change
            </Button>
          </div>
        ) : (
          <div className="py-8">
            <div className="flex flex-col items-center">
              <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-4">
                Upload a cover image for your tour package
              </p>
              <Button
                variant="outline"
                disabled={isUploading}
                className="relative"
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                <span>{isUploading ? 'Uploading...' : 'Upload Image'}</span>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                />
              </Button>
            </div>
          </div>
        )}
      </div>

      {previewUrl && (
        <p className="text-xs text-gray-500 text-center">
          This is how your image will appear in the tour listing
        </p>
      )}
    </div>
  );
};

export default ImageUploader;
