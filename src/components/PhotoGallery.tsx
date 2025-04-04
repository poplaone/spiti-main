
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const photos = [{
  url: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&q=80",
  alt: "Spiti Valley Landscape"
}, {
  url: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=600&q=80",
  alt: "Mountain River"
}, {
  url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80",
  alt: "Mountain Sunrise"
}, {
  url: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80",
  alt: "Aerial Mountain View"
}, {
  url: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=600&q=80",
  alt: "Rocky Mountains"
}];

const PhotoGallery = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  
  // Implement progressive loading
  useEffect(() => {
    // Mark gallery as loaded after a short delay
    const timer = setTimeout(() => {
      setImagesLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  const scroll = (direction: 'left' | 'right') => {
    const gallery = galleryRef.current;
    if (gallery) {
      const scrollAmount = 300;
      const newPosition = direction === 'left' ? scrollPosition - scrollAmount : scrollPosition + scrollAmount;
      gallery.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      setScrollPosition(newPosition);
    }
  };
  
  return (
    <div className="relative py-4 md:py-6">
      <div className="relative overflow-hidden">
        <div 
          id="gallery" 
          ref={galleryRef}
          className={`flex gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory transition-opacity duration-300 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`} 
          style={{
            scrollBehavior: 'smooth'
          }}
        >
          {photos.map((photo, index) => (
            <div 
              key={index} 
              className="min-w-[300px] h-[280px] md:h-[300px] snap-center rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <img 
                src={photo.url} 
                alt={photo.alt} 
                className="w-full h-full object-cover" 
                loading={index <= 1 ? "eager" : "lazy"} 
                width="600" 
                height="400"
                decoding="async"
                onLoad={() => {
                  if (index === 0) setImagesLoaded(true);
                }}
              />
            </div>
          ))}
        </div>

        <Button variant="outline" size="icon" className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white" onClick={() => scroll('left')}>
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button variant="outline" size="icon" className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white" onClick={() => scroll('right')}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PhotoGallery;
