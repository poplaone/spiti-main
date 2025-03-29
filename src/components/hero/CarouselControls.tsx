
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselControlsProps {
  goToPrevious: () => void;
  goToNext: () => void;
}

const CarouselControls = ({ goToPrevious, goToNext }: CarouselControlsProps) => {
  return (
    <>
      <Button 
        variant="ghost" 
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 hover:text-white z-20" 
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      
      <Button 
        variant="ghost" 
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 hover:text-white z-20" 
        onClick={goToNext}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>
    </>
  );
};

export default CarouselControls;
