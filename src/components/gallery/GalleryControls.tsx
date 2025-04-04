
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  canScrollLeft: boolean;
}

const GalleryControls = ({ onPrevious, onNext, canScrollLeft }: GalleryControlsProps) => {
  return (
    <>
      <Button 
        variant="outline" 
        size="icon" 
        className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white ${canScrollLeft ? 'opacity-80' : 'opacity-50'}`} 
        onClick={onPrevious}
        disabled={!canScrollLeft}
        aria-label="Scroll left"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button 
        variant="outline" 
        size="icon" 
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white opacity-80" 
        onClick={onNext}
        aria-label="Scroll right"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </>
  );
};

export default GalleryControls;
