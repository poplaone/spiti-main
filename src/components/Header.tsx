
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LeadForm from "@/components/LeadForm";
import { useLocation, Link } from 'react-router-dom';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import TourPackageGrid from "@/components/tour/TourPackageGrid";
import { Card } from "@/components/ui/card";
import tourPackagesData from '@/data/tourPackagesData';

interface HeaderProps {
  scrollToPackages?: () => void;
}

const Header = ({
  scrollToPackages
}: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isTourPage = location.pathname.includes('tour-');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);

      // Show logo in header when scrolled down enough (past the hero section) if on homepage
      // For other pages, always show the logo
      if (isHomePage) {
        setLogoVisible(scrollPosition > window.innerHeight * 0.6);
      } else {
        setLogoVisible(true);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Initial check (especially important for non-homepage)
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (id === 'packages' && scrollToPackages) {
      scrollToPackages();
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const roadTripsTours = tourPackagesData.filter(tour => 
    tour.tags.includes('road-trip') || tour.tags.includes('bike-tour') || tour.tags.includes('car-tour')
  );

  const fixedDepartureTours = tourPackagesData.filter(tour => 
    tour.tags.includes('fixed-departure')
  );

  return (
    <header ref={headerRef} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-spiti-forest/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="font-display font-bold text-xl text-white flex items-center">
            {/* Logo that appears on scroll on mobile, or always on non-homepage */}
            <div className={`transition-all duration-500 ${logoVisible || isTourPage ? 'opacity-100 scale-100' : 'opacity-0 scale-75 -translate-y-4'} md:opacity-100 md:scale-100 md:translate-y-0`}>
              {(logoVisible || !isHomePage || isTourPage) && <img src="/lovable-uploads/2d33bd3b-463f-448a-ad98-e5722ad15898.png" alt="Spiti Logo" className="h-8 w-auto mr-2 filter brightness-0 invert" />}
            </div>
            <span className="hidden md:inline">Spiti Valley Travels . com</span>
          </Link>

          {/* Desktop Navigation with Dropdowns */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-white hover:text-spiti-green font-medium bg-transparent hover:bg-transparent focus:bg-transparent">
                    Road Trips
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-spiti-forest/95 backdrop-blur-lg border-spiti-green">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 w-[90vw] max-w-screen-lg">
                      {roadTripsTours.map((tour) => (
                        <Link 
                          key={tour.id} 
                          to={tour.route} 
                          className="block p-2 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <Card className="border-0 overflow-hidden bg-transparent">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 w-[90vw] max-w-screen-lg">
                      {fixedDepartureTours.map((tour) => (
                        <Link 
                          key={tour.id} 
                          to={tour.route} 
                          className="block p-2 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <Card className="border-0 overflow-hidden bg-transparent">
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

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
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
                      key={tour.id} 
                      to={tour.route} 
                      className="block p-2 rounded-lg hover:bg-white/10 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="h-14 w-14 rounded overflow-hidden flex-shrink-0">
                          <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h3 className="font-medium">{tour.title}</h3>
                          <p className="text-xs text-gray-300">{tour.duration}</p>
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
                      key={tour.id} 
                      to={tour.route} 
                      className="block p-2 rounded-lg hover:bg-white/10 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="h-14 w-14 rounded overflow-hidden flex-shrink-0">
                          <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h3 className="font-medium">{tour.title}</h3>
                          <p className="text-xs text-gray-300">{tour.duration}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            
            <Link to="/about" className="block text-white hover:text-spiti-green transition-colors" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            
            <Link to="/faq" className="block text-white hover:text-spiti-green transition-colors" onClick={() => setIsMenuOpen(false)}>
              FAQ
            </Link>
            
            <Link to="/contact" className="block text-white hover:text-spiti-green transition-colors" onClick={() => setIsMenuOpen(false)}>
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
        )}
      </div>
    </header>
  );
};

export default Header;
