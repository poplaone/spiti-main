
import { memo } from 'react';

interface GalleryImageProps {
  photo: {
    url: string;
    mobileUrl: string;
    alt: string;
    width: number;
    height: number;
    location?: string;
  };
  index: number;
  isVisible: boolean;
  isMobile: boolean;
  onLoad: (index: number) => void;
}

// Memoized component to prevent unnecessary re-renders
const GalleryImage = memo(({ 
  photo, 
  index, 
  isVisible, 
  isMobile,
  onLoad 
}: GalleryImageProps) => {
  
  if (!isVisible) {
    return <div className="w-full h-full bg-gray-200 animate-pulse" />;
  }
  
  const imageUrl = isMobile ? photo.mobileUrl : photo.url;
  const priority = index <= 1;
  
  return (
    <div className="relative w-full h-full">
      <img 
        src={imageUrl}
        alt={photo.alt} 
        className="w-full h-full object-cover" 
        loading={priority ? "eager" : "lazy"} 
        width={photo.width} 
        height={photo.height}
        decoding={priority ? "sync" : "async"}
        onLoad={() => onLoad(index)}
      />
      {photo.location && (
        <div className="absolute bottom-3 left-3 bg-red-600 text-white px-2 py-1 rounded-md flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1">
            <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
          {photo.location}
        </div>
      )}
    </div>
  );
});

GalleryImage.displayName = 'GalleryImage';

export default GalleryImage;
