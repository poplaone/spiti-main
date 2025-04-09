
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
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
      {images.map((_, index) => (
        <button 
          key={index} 
          className={`w-3 h-3 rounded-full ${index === current ? 'bg-white' : 'bg-white/50'}`} 
          onClick={() => setCurrent(index)} 
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default CarouselIndicators;
