import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LeadForm from "@/components/LeadForm";
import { Card } from "@/components/ui/card";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { TourPackageProps } from "@/components/TourPackage";
import { 
  ChevronRight, 
  Home, 
  Map, 
  Calendar, 
  Settings, 
  Mail, 
  HelpCircle, 
  FileText,
  MessageSquare 
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface DesktopMenuProps {
  roadTripsTours: TourPackageProps[];
  fixedDepartureTours: TourPackageProps[];
  customizableTours?: TourPackageProps[];
}

const DesktopMenu = ({ roadTripsTours, fixedDepartureTours, customizableTours = [] }: DesktopMenuProps) => {
  const getTourRoute = (tour: TourPackageProps) => {
    // Map tour types to route names
    if (tour.transportType === 'bike') return '/tour-bike';
    if (tour.title === 'HIDDEN HEAVEN - SPITI VALLEY') return '/tour-hiddenheaven';
    if (tour.title.includes('BUDDHIST')) return '/tour-buddhist';
    if (tour.title.includes('WOMEN')) return '/tour-women';
    if (tour.title.includes('OWN CAR')) return '/tour-owncar';
    return '/tour-unexplored';
  };

  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

  return (
    <div className="hidden md:block">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-white hover:text-spiti-green font-medium bg-transparent hover:bg-transparent focus:bg-transparent">
              {isTablet ? <Map size={20} /> : "Road Trips"}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-spiti-forest/95 backdrop-blur-lg border-spiti-green">
              <div className="w-[90vw] max-w-screen-lg">
                <div className="p-4 border-b border-gray-700">
                  <Link 
                    to="/road-trips" 
                    className="flex items-center justify-between text-white hover:text-spiti-green font-medium transition-colors"
                  >
                    View All Road Trips
                    <ChevronRight size={16} />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 max-h-[70vh] overflow-y-auto">
                  {roadTripsTours.map((tour) => (
                    <Link 
                      key={tour.id || tour.title} 
                      to={getTourRoute(tour)} 
                      className="block p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <Card className="border-0 overflow-hidden bg-transparent cursor-pointer">
                        <div className="relative h-40 overflow-hidden rounded-t-lg">
                          <img 
                            src={tour.image} 
                            alt={tour.title} 
                            className="w-full h-full object-cover" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                          <h3 className="absolute bottom-2 left-2 text-white font-bold">{tour.title}</h3>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-white hover:text-spiti-green font-medium bg-transparent hover:bg-transparent focus:bg-transparent">
              {isTablet ? <Calendar size={20} /> : "Fixed Departures"}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-spiti-forest/95 backdrop-blur-lg border-spiti-green">
              <div className="w-[90vw] max-w-screen-lg">
                <div className="p-4 border-b border-gray-700">
                  <Link 
                    to="/fixed-departures" 
                    className="flex items-center justify-between text-white hover:text-spiti-green font-medium transition-colors"
                  >
                    View All Fixed Departures
                    <ChevronRight size={16} />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 max-h-[70vh] overflow-y-auto">
                  {fixedDepartureTours.map((tour) => (
                    <Link 
                      key={tour.id || tour.title} 
                      to={getTourRoute(tour)} 
                      className="block p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <Card className="border-0 overflow-hidden bg-transparent cursor-pointer">
                        <div className="relative h-40 overflow-hidden rounded-t-lg">
                          <img 
                            src={tour.image} 
                            alt={tour.title} 
                            className="w-full h-full object-cover" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                          <h3 className="absolute bottom-2 left-2 text-white font-bold">{tour.title}</h3>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-white hover:text-spiti-green font-medium bg-transparent hover:bg-transparent focus:bg-transparent">
              {isTablet ? <Settings size={20} /> : "Customizable Tours"}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-spiti-forest/95 backdrop-blur-lg border-spiti-green">
              <div className="w-[90vw] max-w-screen-lg">
                <div className="p-4 border-b border-gray-700">
                  <Link 
                    to="/customizable-tours" 
                    className="flex items-center justify-between text-white hover:text-spiti-green font-medium transition-colors"
                  >
                    View All Customizable Tours
                    <ChevronRight size={16} />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 max-h-[70vh] overflow-y-auto">
                  {customizableTours.map((tour) => (
                    <Link 
                      key={tour.id || tour.title} 
                      to={getTourRoute(tour)} 
                      className="block p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <Card className="border-0 overflow-hidden bg-transparent cursor-pointer">
                        <div className="relative h-40 overflow-hidden rounded-t-lg">
                          <img 
                            src={tour.image} 
                            alt={tour.title} 
                            className="w-full h-full object-cover" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                          <h3 className="absolute bottom-2 left-2 text-white font-bold">{tour.title}</h3>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <Link to="/about" className="font-medium transition-colors text-white hover:text-spiti-green flex items-center justify-center h-10 px-4 py-2">
              {isTablet ? <Home size={20} /> : "About"}
            </Link>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <Link to="/blog" className="font-medium transition-colors text-white hover:text-spiti-green flex items-center justify-center h-10 px-4 py-2">
              {isTablet ? <FileText size={20} /> : "Blog"}
            </Link>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <Link to="/faq" className="font-medium transition-colors text-white hover:text-spiti-green flex items-center justify-center h-10 px-4 py-2">
              {isTablet ? <HelpCircle size={20} /> : "FAQ"}
            </Link>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <Link to="/contact" className="font-medium transition-colors text-white hover:text-spiti-green flex items-center justify-center h-10 px-4 py-2">
              {isTablet ? <Mail size={20} /> : "Contact"}
            </Link>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-spiti-forest">
                  {isTablet ? <MessageSquare size={20} /> : "Enquire"}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <LeadForm />
              </DialogContent>
            </Dialog>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default DesktopMenu;
