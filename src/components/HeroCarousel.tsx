
import { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LeadForm from "@/components/LeadForm";

const images = [
  // Using stunning Spiti Valley related images from Unsplash
  "https://images.unsplash.com/photo-1580289143186-03f54224aad6?w=1200&q=80", // Spiti Valley
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", // Mountain landscape
  "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1200&q=80" // Spiti valley type landscape
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
          <img src={src} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
        </div>)}
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-4 mt-16">
        <img alt="Spiti Logo" className="w-28 h-28 mb-8" style={{
        filter: 'brightness(0) invert(1)'
      }} src="/lovable-uploads/2d33bd3b-463f-448a-ad98-e5722ad15898.png" />
        <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
          Let us show you Spiti Valley & Zanskar
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
          Customizable Road Trips & Treks from ₹14,750
        </p>
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
