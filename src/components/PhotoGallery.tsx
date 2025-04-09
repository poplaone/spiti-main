
import { useState, useEffect, useRef, useCallback } from 'react';
import { useIsMobile } from "@/hooks/use-mobile";
import { galleryPhotos } from './gallery/photoData';
import GalleryImage from './gallery/GalleryImage';
import GalleryControls from './gallery/GalleryControls';
import { useGalleryNavigation } from '@/hooks/useGalleryNavigation';
import { useVisibleRange } from '@/hooks/useVisibleRange';

const PhotoGallery = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  // Use custom hooks for visibility tracking and navigation
  const { 
    visibleRange, 
    updateVisibleRange, 
    isItemVisible, 
    setVisibleRange 
  } = useVisibleRange({ 
    totalItems: galleryPhotos.length, 
    initialVisible: { start: 0, end: 2 } 
  });
  
  const { scrollPosition, scroll, canScrollLeft } = useGalleryNavigation({
    galleryRef,
    updateVisibleRange
  });
  
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
            end: Math.max(prev.end, Math.min(galleryPhotos.length - 1, index + 2))
          }));
          
          // Once the image is in view, we can stop observing it
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '200px', // Increased for earlier preloading
      threshold: 0.1
    });
    
    // Observe all photo containers
    const photoElements = galleryRef.current.querySelectorAll('.photo-container');
    photoElements.forEach(el => {
      observerRef.current?.observe(el);
    });
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [setVisibleRange]);
  
  // Mark gallery as loaded after images are visible
  useEffect(() => {
    if (!imagesLoaded) {
      const timer = setTimeout(() => {
        setImagesLoaded(true);
      }, 200);
      
      return () => clearTimeout(timer);
    }
  }, [imagesLoaded]);
  
  // Handle image load events
  const handleImageLoad = useCallback((index: number) => {
    if (index === 0) setImagesLoaded(true);
  }, []);
  
  return (
    <div className="relative py-4 md:py-6">
      <div className="relative overflow-hidden">
        <div 
          id="gallery" 
          ref={galleryRef}
          className="flex gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory transition-opacity duration-300" 
          style={{ 
            scrollBehavior: 'smooth',
            opacity: 1 // Always visible to avoid flash of invisible content
          }}
        >
          {galleryPhotos.map((photo, index) => (
            <div 
              key={index}
              data-index={index}
              className="photo-container min-w-[280px] md:min-w-[300px] h-[250px] md:h-[300px] snap-center rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <GalleryImage 
                photo={photo}
                index={index}
                isVisible={isItemVisible(index)}
                isMobile={!!isMobile}
                onLoad={handleImageLoad}
              />
            </div>
          ))}
        </div>

        <GalleryControls 
          onPrevious={() => scroll('left')}
          onNext={() => scroll('right')}
          canScrollLeft={canScrollLeft}
        />
      </div>
    </div>
  );
};

export default PhotoGallery;
