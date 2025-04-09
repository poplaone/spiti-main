
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
  // Creating a simple dots indicator that's performant
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
      {images.map((_, index) => (
        <button 
          key={index} 
          className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
            index === current ? 'bg-white' : 'bg-white/40'
          }`} 
          onClick={() => setCurrent(index)} 
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default CarouselIndicators;
