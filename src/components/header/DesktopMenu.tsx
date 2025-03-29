
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

interface DesktopMenuProps {
  roadTripsTours: TourPackageProps[];
  fixedDepartureTours: TourPackageProps[];
}

const DesktopMenu = ({ roadTripsTours, fixedDepartureTours }: DesktopMenuProps) => {
  const getTourRoute = (tour: TourPackageProps) => {
    // Map tour types to route names
    if (tour.transportType === 'bike') return '/tour-bike';
    if (tour.title === 'HIDDEN HEAVEN - SPITI VALLEY') return '/tour-hiddenheaven';
    if (tour.title.includes('BUDDHIST')) return '/tour-buddhist';
    if (tour.title.includes('WOMEN')) return '/tour-women';
    if (tour.title.includes('OWN CAR')) return '/tour-owncar';
    return '/tour-unexplored';
  };

  return (
    <div className="hidden md:block">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-white hover:text-spiti-green font-medium bg-transparent hover:bg-transparent focus:bg-transparent">
              Road Trips
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-spiti-forest/95 backdrop-blur-lg border-spiti-green">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 w-[90vw] max-w-screen-lg max-h-[80vh] overflow-y-auto">
                {roadTripsTours.map((tour) => (
                  <Link 
                    key={tour.title} 
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
            </NavigationMenuContent>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-white hover:text-spiti-green font-medium bg-transparent hover:bg-transparent focus:bg-transparent">
              Fixed Departures
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-spiti-forest/95 backdrop-blur-lg border-spiti-green">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 w-[90vw] max-w-screen-lg max-h-[80vh] overflow-y-auto">
                {fixedDepartureTours.map((tour) => (
                  <Link 
                    key={tour.title} 
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
            </NavigationMenuContent>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <Link to="/about" className="font-medium transition-colors text-white hover:text-spiti-green flex items-center justify-center h-10 px-4 py-2">
              About
            </Link>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <Link to="/blog" className="font-medium transition-colors text-white hover:text-spiti-green flex items-center justify-center h-10 px-4 py-2">
              Blog
            </Link>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <Link to="/faq" className="font-medium transition-colors text-white hover:text-spiti-green flex items-center justify-center h-10 px-4 py-2">
              FAQ
            </Link>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <Link to="/contact" className="font-medium transition-colors text-white hover:text-spiti-green flex items-center justify-center h-10 px-4 py-2">
              Contact
            </Link>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-spiti-forest">
                  Enquire
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
