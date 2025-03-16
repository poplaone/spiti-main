
import { useEffect, useRef } from 'react';

const photos = [
  {
    url: "https://images.unsplash.com/photo-1508144322886-717c284ab392",
    caption: "Key Monastery, Spiti"
  },
  {
    url: "https://images.unsplash.com/photo-1591804566555-6a56d555d70a",
    caption: "Trekking in Spiti"
  },
  {
    url: "https://images.unsplash.com/photo-1580289143186-03f54224aad6",
    caption: "Valley Panorama"
  },
  {
    url: "https://images.unsplash.com/photo-1599486760419-031e88eaecfa",
    caption: "River Crossing"
  },
  {
    url: "https://images.unsplash.com/photo-1517736996407-36527ba4fc8b",
    caption: "Summit Team"
  },
  {
    url: "https://images.unsplash.com/photo-1553521176-23c315c99335",
    caption: "Stargazing Camp"
  }
];

const MomentGallery = () => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    // Clone photos for infinite scroll
    const items = gallery.innerHTML;
    gallery.innerHTML = items + items + items;

    // Set random rotations
    const photos = gallery.querySelectorAll('.photo');
    const captions = gallery.querySelectorAll('.caption');
    
    photos.forEach((photo, index) => {
      const rotation = Math.floor(Math.random() * 10) - 5;
      (photo as HTMLElement).style.setProperty('--rotation', `${rotation}deg`);
      if (captions[index]) {
        (captions[index] as HTMLElement).style.setProperty('--rotation', `${rotation}deg`);
      }
    });

    // Auto-scroll setup
    let scrollPosition = 0;
    const autoScrollSpeed = 0.5;
    let autoScrollInterval: number;

    const startAutoScroll = () => {
      if (autoScrollInterval) return;
      
      autoScrollInterval = window.setInterval(() => {
        if (gallery && containerRef.current?.getBoundingClientRect().top! <= window.innerHeight) {
          scrollPosition -= autoScrollSpeed;
          const galleryWidth = gallery.scrollWidth / 3;
          if (scrollPosition <= -galleryWidth) {
            scrollPosition += galleryWidth;
          }
          gallery.style.transform = `translateX(${scrollPosition}px)`;
        }
      }, 16);
    };

    startAutoScroll();

    return () => {
      if (autoScrollInterval) clearInterval(autoScrollInterval);
    };
  }, []);

  return (
    <div ref={containerRef} className="gallery-container">
      <div className="rope-container">
        <div className="rope"></div>
      </div>
      <div ref={galleryRef} className="gallery">
        {photos.map((photo, index) => (
          <div key={index} className="photo-container">
            <div className="clip">
              <div className="clip-connector"></div>
            </div>
            <div className="photo">
              <img 
                src={`${photo.url}?w=600&q=80`} 
                alt={photo.caption}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="caption">{photo.caption}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MomentGallery;
