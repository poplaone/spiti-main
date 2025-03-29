
import { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LeadForm from "@/components/LeadForm";
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

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<number | null>(null);
  const isMobile = useIsMobile();
  
  // Use the appropriate image set based on device type
  const images = isMobile ? mobileImages : desktopImages;

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = window.setTimeout(() => setCurrent(prevIndex => (prevIndex + 1) % images.length), 5000);
    return () => {
      resetTimeout();
    };
  }, [current, images.length]);

  const goToPrevious = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  const goToNext = () => {
    setCurrent((current + 1) % images.length);
  };

  const scrollToDiscoverSection = () => {
    const discoverSection = document.querySelector('#discover-spiti-valley');
    if (discoverSection) {
      discoverSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return <div className="relative w-full h-screen overflow-hidden">
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
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-4 mt-[-120px] md:mt-0">
        <img 
          alt="Spiti Logo" 
          className="w-40 h-40 mb-2 md:mb-4 mt-[-90px] md:mt-0" 
          src="/lovable-uploads/d1018c3e-5c41-4572-8712-cb63ee049342.png" 
        />
        
        {/* Google Ratings Badge */}
        <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full mb-3 md:mb-5">
          <span className="text-white font-semibold">4.9</span>
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <span className="text-white/90 text-sm">on Google ratings</span>
          <span className="text-white/80 text-sm ml-1">1k+ reviews</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4 md:mb-6">Spiti Valley Travels</h1>
        <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl">Begin your Spiti adventure with us – your local guides to explore more...</p>
        
        <Button 
          variant="outline" 
          className="bg-transparent border border-white text-white hover:bg-white/20 mt-2"
          onClick={scrollToDiscoverSection}
        >
          Explore Tours
        </Button>
      </div>
      
      <Button variant="ghost" className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 hover:text-white z-20" onClick={goToPrevious}>
        <ChevronLeft className="h-8 w-8" />
      </Button>
      
      <Button variant="ghost" className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 hover:text-white z-20" onClick={goToNext}>
        <ChevronRight className="h-8 w-8" />
      </Button>
      
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, index) => (
          <button 
            key={index} 
            className={`w-3 h-3 rounded-full ${index === current ? 'bg-white' : 'bg-white/50'}`} 
            onClick={() => setCurrent(index)} 
          />
        ))}
      </div>
    </div>;
};

export default HeroCarousel;
