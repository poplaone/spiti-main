
import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import ImageUploader from "../ImageUploader";

interface ImageTabProps {
  imagePreview: string;
  onImageChange: (file: File | null) => void;
}

const ImageTab: React.FC<ImageTabProps> = ({
  imagePreview,
  onImageChange
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Package Images</CardTitle>
        <CardDescription>
          Upload the main image for this tour package
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ImageUploader
          imagePreview={imagePreview}
          onImageChange={onImageChange}
        />
      </CardContent>
    </Card>
  );
};

export default ImageTab;
