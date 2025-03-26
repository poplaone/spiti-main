
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronDown } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LeadForm from "@/components/LeadForm";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TourPackageProps } from "@/components/TourPackage";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  roadTripsTours: TourPackageProps[];
  fixedDepartureTours: TourPackageProps[];
}

const MobileMenu = ({ 
  isOpen, 
  onClose,
  roadTripsTours,
  fixedDepartureTours 
}: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden absolute top-16 left-0 right-0 bg-spiti-forest/95 backdrop-blur-lg shadow-lg p-4 space-y-4 animate-slide-in">
      <Popover>
        <PopoverTrigger asChild>
          <button className="w-full flex justify-between items-center text-white hover:text-spiti-green transition-colors">
            Road Trips <ChevronDown size={18} />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-screen max-h-[70vh] overflow-y-auto bg-spiti-forest/95 backdrop-blur-lg border-0 text-white p-4">
          <div className="grid grid-cols-1 gap-4">
            {roadTripsTours.map((tour) => (
              <Link 
                key={tour.title} 
                to={`/tour-${tour.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="block p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                onClick={onClose}
              >
                <div className="flex items-center space-x-3">
                  <div className="h-14 w-14 rounded overflow-hidden flex-shrink-0">
                    <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-medium">{tour.title}</h3>
                    <p className="text-xs text-gray-300">
                      {tour.duration.nights} Nights / {tour.duration.days} Days
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      
      <Popover>
        <PopoverTrigger asChild>
          <button className="w-full flex justify-between items-center text-white hover:text-spiti-green transition-colors">
            Fixed Departures <ChevronDown size={18} />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-screen max-h-[70vh] overflow-y-auto bg-spiti-forest/95 backdrop-blur-lg border-0 text-white p-4">
          <div className="grid grid-cols-1 gap-4">
            {fixedDepartureTours.map((tour) => (
              <Link 
                key={tour.title} 
                to={`/tour-${tour.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="block p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                onClick={onClose}
              >
                <div className="flex items-center space-x-3">
                  <div className="h-14 w-14 rounded overflow-hidden flex-shrink-0">
                    <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-medium">{tour.title}</h3>
                    <p className="text-xs text-gray-300">
                      {tour.duration.nights} Nights / {tour.duration.days} Days
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      
      <Link to="/about" className="block text-white hover:text-spiti-green transition-colors" onClick={onClose}>
        About
      </Link>

      <Link to="/blog" className="block text-white hover:text-spiti-green transition-colors" onClick={onClose}>
        Blog
      </Link>
      
      <Link to="/faq" className="block text-white hover:text-spiti-green transition-colors" onClick={onClose}>
        FAQ
      </Link>
      
      <Link to="/contact" className="block text-white hover:text-spiti-green transition-colors" onClick={onClose}>
        Contact
      </Link>
      
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" className="w-full bg-spiti-blue hover:bg-spiti-blue/90 text-white">
            Enquire Now
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <LeadForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MobileMenu;
