
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LeadForm from "@/components/LeadForm";
import { useLocation } from 'react-router-dom';

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

  return (
    <header ref={headerRef} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-spiti-forest/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16 md:h-20">
          <a href="/" className="font-display font-bold text-xl text-white flex items-center">
            {/* Logo that appears on scroll on mobile, or always on non-homepage */}
            <div className={`transition-all duration-500 ${logoVisible || isTourPage ? 'opacity-100 scale-100' : 'opacity-0 scale-75 -translate-y-4'} md:opacity-100 md:scale-100 md:translate-y-0`}>
              {(logoVisible || !isHomePage || isTourPage) && <img src="/lovable-uploads/2d33bd3b-463f-448a-ad98-e5722ad15898.png" alt="Spiti Logo" className="h-8 w-auto mr-2 filter brightness-0 invert" />}
            </div>
            <span className="hidden md:inline">Spiti Main</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="font-medium transition-colors text-white hover:text-spiti-green" onClick={e => handleNavClick(e, 'top')}>
              Road Trips
            </a>
            
            <a href="#destinations" className="font-medium transition-colors text-white hover:text-spiti-green" onClick={e => handleNavClick(e, 'destinations')}>
              Fixed Departures
            </a>
            <a href="#about" className="font-medium transition-colors text-white hover:text-spiti-green" onClick={e => handleNavClick(e, 'about')}>
              About
            </a>
            
            <a href="#contact" className="font-medium transition-colors text-white hover:text-spiti-green" onClick={e => handleNavClick(e, 'contact')}>
              Contact
            </a>
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
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-spiti-forest/95 backdrop-blur-lg shadow-lg p-4 space-y-4 animate-slide-in">
            <a href="#" className="block text-white hover:text-spiti-green transition-colors" onClick={e => handleNavClick(e, 'top')}>
              Road Trips
            </a>
            
            <a href="#destinations" className="block text-white hover:text-spiti-green transition-colors" onClick={e => handleNavClick(e, 'destinations')}>
              Fixed Departures
            </a>
            <a href="#about" className="block text-white hover:text-spiti-green transition-colors" onClick={e => handleNavClick(e, 'about')}>
              About
            </a>
            
            <a href="#contact" className="block text-white hover:text-spiti-green transition-colors" onClick={e => handleNavClick(e, 'contact')}>
              Contact
            </a>
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
