
import { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LeadForm from "@/components/LeadForm";

const images = [
  // Using properly formatted image URLs that should work on deployment
  "https://images.unsplash.com/photo-1580289143186-03f54224aad6?auto=format&fit=crop&w=1200&q=80", // First slide - Spiti Valley
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80", // Mountain landscape
  "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80", // Spiti valley type landscape
  "/lovable-uploads/d1018c3e-5c41-4572-8712-cb63ee049342.png" // Added your logo as the fourth slide
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<number | null>(null);

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
  }, [current]);

  const goToPrevious = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  const goToNext = () => {
    setCurrent((current + 1) % images.length);
  };

  return <div className="relative w-full h-screen overflow-hidden">
      {images.map((src, index) => <div key={index} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100' : 'opacity-0'}`}>
          <img src={src} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
        </div>)}
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-4 mt-0 md:mt-16">
        <img 
          alt="Spiti Logo" 
          className="w-40 h-40 mb-4 md:mb-8 mt-[-90px] md:mt-0" 
          src="/lovable-uploads/d1018c3e-5c41-4572-8712-cb63ee049342.png" 
        />
        <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4 md:mb-6">Spiti Valley Travels</h1>
        <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl">Begin your Spiti adventure with us – your local guides to explore more...</p>
      </div>
      
      <Button variant="ghost" className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 hover:text-white z-20" onClick={goToPrevious}>
        <ChevronLeft className="h-8 w-8" />
      </Button>
      
      <Button variant="ghost" className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 hover:text-white z-20" onClick={goToNext}>
        <ChevronRight className="h-8 w-8" />
      </Button>
      
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, index) => <button key={index} className={`w-3 h-3 rounded-full ${index === current ? 'bg-white' : 'bg-white/50'}`} onClick={() => setCurrent(index)} />)}
      </div>
    </div>;
};

export default HeroCarousel;
