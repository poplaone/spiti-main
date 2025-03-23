
import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { tourPackagesData } from '@/data/tourPackagesData';
import Logo from './header/Logo';
import DesktopMenu from './header/DesktopMenu';
import MobileMenu from './header/MobileMenu';

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

  // Filter road trip tours - check if the tour has any of the relevant tags
  const roadTripsTours = tourPackagesData.filter(tour => 
    tour.transportType === 'bike' || tour.transportType === 'car'
  );

  // Filter fixed departure tours - we'll use the common fixed departure tours
  const fixedDepartureTours = tourPackagesData.filter(tour => 
    tour.isWomenOnly === true || tour.title.includes('FIXED')
  );

  return (
    <header ref={headerRef} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-spiti-forest/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16 md:h-20">
          <Logo 
            isVisible={logoVisible} 
            isTourPage={isTourPage} 
            isHomePage={isHomePage}
          />

          <DesktopMenu 
            roadTripsTours={roadTripsTours} 
            fixedDepartureTours={fixedDepartureTours} 
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
        />
      </div>
    </header>
  );
};

export default Header;
