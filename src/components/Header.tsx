
import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import Logo from './header/Logo';
import DesktopMenu from './header/DesktopMenu';
import MobileMenu from './header/MobileMenu';
import WeatherDisplay from './weather/WeatherDisplay';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToursContext } from '@/context/ToursContext';
import { useTourFilters } from '@/hooks/useTourFilters';

interface HeaderProps {
  scrollToPackages?: () => void;
}

const Header = ({ scrollToPackages }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isTourPage = location.pathname.includes('tour-');
  const isMobile = useIsMobile();
  
  // Get tours from context instead of using static data
  const { tours } = useToursContext();
  
  // Using our custom hook to filter tours
  const { roadTripsTours, fixedDepartureTours, customizableTours } = useTourFilters(tours);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);

      // Calculate scroll progress for smooth transitions
      const scrollThreshold = window.innerHeight * 0.6;
      const progress = Math.min(1, scrollPosition / scrollThreshold);
      setScrollProgress(progress);

      // Show logo in header when scrolled down enough (past the hero section) if on homepage
      // For other pages, always show the logo
      if (isHomePage) {
        setLogoVisible(scrollPosition > scrollThreshold * 0.9);
      } else {
        setLogoVisible(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);

    // Initial check (especially important for non-homepage)
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  // Calculate menu positioning style based on scroll progress
  const menuStyle = isHomePage && !logoVisible
    ? { 
        opacity: 1,
        transform: scrollProgress > 0.5 
          ? `translateX(${(scrollProgress - 0.5) * 2 * 50}%)` 
          : 'translateX(0)' 
      }
    : {};

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

          <div 
            className={`hidden md:block ${isHomePage && !logoVisible ? 'menu-centered' : 'menu-right'}`}
            style={menuStyle}
          >
            <DesktopMenu 
              roadTripsTours={roadTripsTours} 
              fixedDepartureTours={fixedDepartureTours}
              customizableTours={customizableTours}
            />
          </div>

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
