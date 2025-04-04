
import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { tourPackagesData } from '@/data/tourPackagesData';
import { useTourFilters } from '@/hooks/useTourFilters';
import Logo from './header/Logo';
import DesktopMenu from './header/DesktopMenu';
import MobileMenu from './header/MobileMenu';
import WeatherDisplay from './weather/WeatherDisplay';
import { useIsMobile } from '@/hooks/use-mobile';

interface HeaderProps {
  scrollToPackages?: () => void;
}

const Header = ({ scrollToPackages }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isTourPage = location.pathname.includes('tour-');
  const isMobile = useIsMobile();
  
  // Using our custom hook to filter tours
  const { roadTripsTours, fixedDepartureTours, customizableTours } = useTourFilters(tourPackagesData);

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

  return (
    <header ref={headerRef} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-spiti-forest/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16 md:h-20">
          <Logo 
            isVisible={logoVisible} 
            isTourPage={isTourPage} 
            isHomePage={isHomePage}
          />

          {/* Weather Display for Mobile */}
          {isMobile && <WeatherDisplay className="absolute left-1/2 transform -translate-x-1/2" />}

          <DesktopMenu 
            roadTripsTours={roadTripsTours} 
            fixedDepartureTours={fixedDepartureTours}
            customizableTours={customizableTours}
          />

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        <MobileMenu 
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          roadTripsTours={roadTripsTours}
          fixedDepartureTours={fixedDepartureTours}
          customizableTours={customizableTours}
        />
      </div>
    </header>
  );
};

export default Header;
