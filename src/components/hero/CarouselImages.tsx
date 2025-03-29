
import { useIsMobile } from '@/hooks/use-mobile';

// Different sets of images for mobile and desktop
const desktopImages = [
  "https://images.unsplash.com/photo-1580289143186-03f54224aad6?auto=format&fit=crop&w=1200&q=80", // First slide - Spiti Valley
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80", // Mountain landscape
  "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80", // Spiti valley type landscape
  "/lovable-uploads/d1018c3e-5c41-4572-8712-cb63ee049342.png" // Logo as the fourth slide
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
  
  // Use the appropriate image set based on device type
  const images = isMobile ? mobileImages : desktopImages;

  return (
    <>
      {images.map((src, index) => (
        <div 
          key={index} 
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <img 
            src={src} 
            alt={`Slide ${index + 1}`} 
            className="w-full h-full object-cover" 
            loading={index === 0 ? "eager" : "lazy"} 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
        </div>
      ))}
    </>
  );
};

export { desktopImages, mobileImages };
export default CarouselImages;
