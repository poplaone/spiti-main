
import { useIsMobile } from '@/hooks/use-mobile';
import { useEffect, useState } from 'react';

// Different sets of images for mobile and desktop
const desktopImages = [
  "/lovable-uploads/19314897-9ee9-4163-83f6-c3e10cec290f.png", // Chandrataal Lake with mountains
  "/lovable-uploads/9b3798e9-cc2d-469e-b579-f362903a5f9d.png", // Milky Way night sky over mountains
  "/lovable-uploads/84853251-2ed0-409f-aee1-a9b4e9a7f41e.png", // Suspension bridge in Spiti Valley
  "/lovable-uploads/8edf4fb0-5e63-4e88-8ca8-0d0d40eb7626.png"  // Key Monastery with snow-capped mountains
];

const mobileImages = [
  "/lovable-uploads/fa13766a-c062-495a-bbe3-ba96893628e0.png", // Snowy temple/monastery
  "/lovable-uploads/fe95c61b-1c4d-48be-9e18-1d3b19b7c41e.png", // River valley
  "/lovable-uploads/e1880eea-44e0-430e-8627-101560cff518.png", // Child at doorway
  "/lovable-uploads/adad2c0d-065d-4ed9-a5f6-70262700ac90.png"  // Motorcycles on mountain road
];

interface CarouselImagesProps {
  current: number;
}

const CarouselImages = ({ current }: CarouselImagesProps) => {
  const isMobile = useIsMobile();
  const [imagesToShow, setImagesToShow] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Wait for the isMobile value to be determined before showing any images
  useEffect(() => {
    if (isMobile !== undefined) {
      const appropriateImages = isMobile ? mobileImages : desktopImages;
      setImagesToShow(appropriateImages);
      setIsLoaded(true);
    }
  }, [isMobile]);

  // Don't render anything until we know which device type we're on
  if (!isLoaded) {
    return <div className="absolute inset-0 bg-gray-900"></div>; // Placeholder while loading
  }

  return (
    <>
      {imagesToShow.map((src, index) => (
        <div 
          key={index} 
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <img 
            src={src} 
            alt={getImageAlt(src, index)}
            className="w-full h-full object-cover" 
            loading={index === 0 ? "eager" : "lazy"} 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
        </div>
      ))}
    </>
  );
};

// Helper function to provide appropriate alt text for SEO
function getImageAlt(src: string, index: number): string {
  if (src.includes('19314897')) {
    return "Chandrataal Lake with snow-capped mountains in Spiti Valley, Himachal Pradesh";
  } else if (src.includes('9b3798e9')) {
    return "Stunning Milky Way night sky over Spiti Valley mountains";
  } else if (src.includes('84853251')) {
    return "Suspension bridge in Spiti Valley with mountains in background";
  } else if (src.includes('8edf4fb0')) {
    return "Key Monastery with snow-capped mountains in Spiti Valley";
  } else if (src.includes('fa13766a')) {
    return "Ancient monastery in snowy Spiti Valley";
  } else if (src.includes('fe95c61b')) {
    return "River valley in Spiti region";
  } else if (src.includes('e1880eea')) {
    return "Local child at doorway in Spiti Valley";
  } else if (src.includes('adad2c0d')) {
    return "Motorcycle tour on mountain roads in Spiti";
  }
  
  return `Spiti Valley landscape - slide ${index + 1}`;
}

export { desktopImages, mobileImages };
export default CarouselImages;
