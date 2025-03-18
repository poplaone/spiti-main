
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const photos = [
  {
    url: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&q=80",
    alt: "Spiti Valley Landscape"
  },
  {
    url: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=600&q=80",
    alt: "Mountain River"
  },
  {
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80",
    alt: "Mountain Sunrise"
  },
  {
    url: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80",
    alt: "Aerial Mountain View"
  },
  {
    url: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=600&q=80",
    alt: "Rocky Mountains"
  }
];

const PhotoGallery = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    const gallery = document.getElementById('gallery');
    if (gallery) {
      const scrollAmount = 300;
      const newPosition = direction === 'left' 
        ? scrollPosition - scrollAmount 
        : scrollPosition + scrollAmount;
      
      gallery.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      setScrollPosition(newPosition);
    }
  };

  return (
    <div className="relative py-12 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1500&q=80')" }}>
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          Discover Spiti Valley
        </h2>
        
        <div className="relative overflow-hidden">
          <div 
            id="gallery"
            className="flex gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-4"
            style={{ scrollBehavior: 'smooth' }}
          >
            {photos.map((photo, index) => (
              <div
                key={index}
                className="min-w-[300px] h-[300px] snap-center rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 bg-white/20 backdrop-blur-md border border-white/20 shadow-lg"
              >
                <img
                  src={photo.url}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 border border-white/30"
            onClick={() => scroll('left')}
          >
            <ChevronLeft className="h-4 w-4 text-white" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 border border-white/30"
            onClick={() => scroll('right')}
          >
            <ChevronRight className="h-4 w-4 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;
