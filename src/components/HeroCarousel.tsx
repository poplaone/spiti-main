
import { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  "/lovable-uploads/c8d818d4-0cbc-4134-a656-4c78ea481271.png", // Using the uploaded image as first slide
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", // Mountain landscape
  "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1200&q=80", // Spiti valley type landscape
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
    timeoutRef.current = window.setTimeout(
      () => setCurrent((prevIndex) => (prevIndex + 1) % images.length),
      5000
    );

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

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {images.map((src, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={src}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      ))}
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-4">
        <img 
          src="/lovable-uploads/c8d818d4-0cbc-4134-a656-4c78ea481271.png" 
          alt="Spiti Logo" 
          className="w-24 h-24 mb-6"
          style={{ filter: 'brightness(0) invert(1)' }}
        />
        <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
          Let us show you Spiti Valley & Zanskar
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl">
          Customizable Road Trips & Treks from ₹14,750
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button className="bg-white text-spiti-dark hover:bg-white/90 font-medium px-6 py-6">
            Plan My Trip
          </Button>
        </div>
      </div>
      
      <Button 
        variant="ghost" 
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 hover:text-white z-20"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      
      <Button 
        variant="ghost" 
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 hover:text-white z-20"
        onClick={goToNext}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>
      
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === current ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
