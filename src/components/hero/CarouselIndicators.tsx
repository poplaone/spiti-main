
interface CarouselImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface CarouselIndicatorsProps {
  images: CarouselImage[];
  current: number;
  setCurrent: (index: number) => void;
}

const CarouselIndicators = ({ images, current, setCurrent }: CarouselIndicatorsProps) => {
  // Performance optimized indicator - simpler DOM structure
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
      {images.map((_, index) => (
        <button 
          key={index} 
          className={`w-2 h-2 rounded-full transition-colors ${
            index === current ? 'bg-white' : 'bg-white/30'
          }`} 
          onClick={() => setCurrent(index)} 
          aria-label={`Go to slide ${index + 1}`}
          aria-current={index === current ? 'true' : 'false'}
        />
      ))}
    </div>
  );
};

export default CarouselIndicators;
