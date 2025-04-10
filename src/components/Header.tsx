import { useState, useEffect, useRef, memo } from 'react';
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

// Memoize individual components for better performance
const MemoizedLogo = memo(Logo);
const MemoizedDesktopMenu = memo(DesktopMenu);
const MemoizedMobileMenu = memo(MobileMenu);
const MemoizedWeatherDisplay = memo(WeatherDisplay);

const Header = ({ scrollToPackages }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const scrollListenerRef = useRef<boolean>(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isTourPage = location.pathname.includes('tour-');
  const isMobile = useIsMobile();
  
  // Get tours from context
  const { tours } = useToursContext();
  
  // Using our custom hook to filter tours
  const { roadTripsTours, fixedDepartureTours, customizableTours } = useTourFilters(tours);

  // Use throttled scroll listener for better performance
  useEffect(() => {
    if (scrollListenerRef.current) return;
    scrollListenerRef.current = true;
    
    let scrollTimeout: number | null = null;
    const handleScroll = () => {
      if (scrollTimeout) return;
      
      scrollTimeout = window.setTimeout(() => {
        const scrollPosition = window.scrollY;
        setIsScrolled(scrollPosition > 10);

        // Show logo in header when scrolled down enough (past the hero section) if on homepage
        // For other pages, always show the logo
        if (isHomePage) {
          setLogoVisible(scrollPosition > window.innerHeight * 0.6);
        } else {
          setLogoVisible(true);
        }
        scrollTimeout = null;
      }, 10); // 10ms throttle for smoother performance
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check (especially important for non-homepage)
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [isHomePage]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header ref={headerRef} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-spiti-forest/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16 md:h-20">
          <MemoizedLogo 
            isVisible={logoVisible} 
            isTourPage={isTourPage} 
            isHomePage={isHomePage}
          />

          {/* Weather Display - Centered in the header for all screen sizes */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <MemoizedWeatherDisplay />
          </div>

          {/* Desktop Menu - only render when needed */}
          {!isMobile && (
            <div className={`hidden md:block ${isHomePage && !logoVisible ? 'menu-centered' : 'menu-right'}`}>
              <MemoizedDesktopMenu 
                roadTripsTours={roadTripsTours} 
                fixedDepartureTours={fixedDepartureTours}
                customizableTours={customizableTours}
              />
            </div>
          )}

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Only render MobileMenu when it's open for better performance */}
        {isMobile && isMenuOpen && (
          <MemoizedMobileMenu 
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            roadTripsTours={roadTripsTours}
            fixedDepartureTours={fixedDepartureTours}
            customizableTours={customizableTours}
          />
        )}
      </div>
    </header>
  );
};

export default memo(Header);
