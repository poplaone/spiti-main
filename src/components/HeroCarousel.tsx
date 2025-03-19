
import { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const images = [
  "/lovable-uploads/2a1dbbda-65cd-414a-8341-495c998b6f0f.png",
  "/lovable-uploads/c36c169a-830e-4218-b5c9-5490ec761ecb.png",
  "/lovable-uploads/407fca67-8dd0-418e-8794-8fdff739b7ee.png"
];

const HeroCarousel = () => {
  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    // Auto-rotate every 2 seconds
    const autoRotateInterval = setInterval(() => {
      if (current === images.length - 1) {
        api.scrollTo(0);
      } else {
        api.scrollTo(current + 1);
      }
    }, 2000);

    return () => {
      clearInterval(autoRotateInterval);
    };
  }, [api, current]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <Carousel setApi={setApi} opts={{ loop: true }} className="h-full">
        <CarouselContent className="h-full">
          {images.map((image, index) => (
            <CarouselItem key={index} className="h-full">
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ 
                  backgroundImage: `url(${image})`,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      
      {/* Overlay to ensure content readability */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              current === index ? 'bg-white w-4' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
