
import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

// Photo data with optimized dimensions for mobile and desktop
const photos = [{
  url: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&q=80",
  mobileUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&q=70",
  alt: "Spiti Valley Landscape",
  width: 600,
  height: 400
}, {
  url: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=600&q=80",
  mobileUrl: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=400&q=70",
  alt: "Mountain River",
  width: 600,
  height: 400
}, {
  url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80",
  mobileUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=70",
  alt: "Mountain Sunrise",
  width: 600,
  height: 400
}, {
  url: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80",
  mobileUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=70",
  alt: "Aerial Mountain View",
  width: 600,
  height: 400
}, {
  url: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=600&q=80",
  mobileUrl: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=400&q=70",
  alt: "Rocky Mountains",
  width: 600,
  height: 400
}];

const PhotoGallery = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 2 });
  const galleryRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  // Setup intersection observer for better lazy loading
  useEffect(() => {
    if (!galleryRef.current) return;
    
    // Create an intersection observer to detect which images are in the viewport
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          
          // Update visible range to include this image and the next two
          setVisibleRange(prev => ({
            start: Math.min(prev.start, Math.max(0, index - 1)),
            end: Math.max(prev.end, Math.min(photos.length - 1, index + 2))
          }));
          
          // Once the image is in view, we can stop observing it
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '100px',
      threshold: 0.1
    });
    
    // Observe all photo containers
    const photoElements = galleryRef.current.querySelectorAll('.photo-container');
    photoElements.forEach(el => {
      observerRef.current?.observe(el);
    });
    
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);
  
  // Mark gallery as loaded after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setImagesLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Memoized scroll function to improve performance
  const scroll = useCallback((direction: 'left' | 'right') => {
    const gallery = galleryRef.current;
    if (gallery) {
      // Adaptive scroll amount based on device
      const scrollAmount = isMobile ? 200 : 300;
      const newPosition = direction === 'left' 
        ? Math.max(0, scrollPosition - scrollAmount)
        : scrollPosition + scrollAmount;
      
      gallery.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      
      setScrollPosition(newPosition);
      
      // Preload images in the direction of scrolling
      if (direction === 'right') {
        const lastVisible = visibleRange.end;
        const newEnd = Math.min(photos.length - 1, lastVisible + 2);
        if (newEnd > lastVisible) {
          setVisibleRange(prev => ({...prev, end: newEnd}));
        }
      } else if (direction === 'left') {
        const firstVisible = visibleRange.start;
        const newStart = Math.max(0, firstVisible - 2);
        if (newStart < firstVisible) {
          setVisibleRange(prev => ({...prev, start: newStart}));
        }
      }
    }
  }, [scrollPosition, isMobile, visibleRange]);
  
  // Check if an image should be rendered based on visible range
  const shouldRenderImage = (index: number) => {
    // Always render the first image or images in the visible range
    return index === 0 || (index >= visibleRange.start && index <= visibleRange.end);
  };
  
  // Format images with proper sizing and loading attributes
  const renderImage = (photo: typeof photos[0], index: number) => {
    if (!shouldRenderImage(index)) {
      return <div className="w-full h-full bg-gray-200 animate-pulse" />;
    }
    
    const imageUrl = isMobile ? photo.mobileUrl : photo.url;
    const priority = index <= 1;
    
    return (
      <img 
        src={imageUrl}
        alt={photo.alt} 
        className="w-full h-full object-cover" 
        loading={priority ? "eager" : "lazy"} 
        width={photo.width} 
        height={photo.height}
        decoding={priority ? "sync" : "async"}
        onLoad={() => {
          if (index === 0) setImagesLoaded(true);
        }}
      />
    );
  };
  
  return (
    <div className="relative py-4 md:py-6">
      <div className="relative overflow-hidden">
        <div 
          id="gallery" 
          ref={galleryRef}
          className={`flex gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory transition-opacity duration-300 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`} 
          style={{ scrollBehavior: 'smooth' }}
        >
          {photos.map((photo, index) => (
            <div 
              key={index}
              data-index={index}
              className="photo-container min-w-[280px] md:min-w-[300px] h-[250px] md:h-[300px] snap-center rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              {renderImage(photo, index)}
            </div>
          ))}
        </div>

        {/* Mobile-optimized button placement and size */}
        <Button 
          variant="outline" 
          size="icon" 
          className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white ${scrollPosition <= 0 ? 'opacity-50' : 'opacity-80'}`} 
          onClick={() => scroll('left')}
          disabled={scrollPosition <= 0}
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button 
          variant="outline" 
          size="icon" 
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white opacity-80" 
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PhotoGallery;
