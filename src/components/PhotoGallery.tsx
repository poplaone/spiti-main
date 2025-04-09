
import { useState, useEffect, useRef, useCallback } from 'react';
import { useIsMobile } from "@/hooks/use-mobile";
import { galleryPhotos } from './gallery/photoData';
import GalleryImage from './gallery/GalleryImage';
import GalleryControls from './gallery/GalleryControls';
import { useGalleryNavigation } from '@/hooks/useGalleryNavigation';
import { useVisibleRange } from '@/hooks/useVisibleRange';

const PhotoGallery = () => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
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
  
  // Handle image load events - simplified
  const handleImageLoad = useCallback((index: number) => {
    // Nothing to do here - we're optimizing for immediate display
  }, []);
  
  return (
    <div className="relative py-4 md:py-6">
      <div className="relative overflow-hidden">
        <div 
          id="gallery" 
          ref={galleryRef}
          className="flex gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory" 
          style={{ scrollBehavior: 'smooth' }}
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
