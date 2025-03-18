
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LeadForm from "@/components/LeadForm";

interface HeaderProps {
  scrollToPackages?: () => void;
}

const Header = ({
  scrollToPackages
}: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/40 backdrop-blur-md shadow-lg' : 'bg-black/20 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16 md:h-20">
          <a href="/" className="text-2xl font-bold text-white">
            Spiti Valley
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-white hover:text-spiti-blue transition-colors" onClick={e => handleNavClick(e, 'top')}>
              Home
            </a>
            <a href="#packages" className="text-white hover:text-spiti-blue transition-colors" onClick={e => handleNavClick(e, 'packages')}>
              Tour Packages
            </a>
            <a href="#destinations" className="text-white hover:text-spiti-blue transition-colors" onClick={e => handleNavClick(e, 'destinations')}>
              Destinations
            </a>
            <a href="#about" className="text-white hover:text-spiti-blue transition-colors" onClick={e => handleNavClick(e, 'about')}>
              About Us
            </a>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default" className="text-white bg-fuchsia-600 hover:bg-fuchsia-500">
                  Book Now
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
          <div className="md:hidden absolute top-16 left-0 right-0 bg-black/80 backdrop-blur-lg shadow-lg p-4 space-y-4 animate-slide-in">
            <a href="#" className="block text-white hover:text-spiti-blue transition-colors" onClick={e => handleNavClick(e, 'top')}>
              Home
            </a>
            <a href="#packages" className="block text-white hover:text-spiti-blue transition-colors" onClick={e => handleNavClick(e, 'packages')}>
              Tour Packages
            </a>
            <a href="#destinations" className="block text-white hover:text-spiti-blue transition-colors" onClick={e => handleNavClick(e, 'destinations')}>
              Destinations
            </a>
            <a href="#about" className="block text-white hover:text-spiti-blue transition-colors" onClick={e => handleNavClick(e, 'about')}>
              About Us
            </a>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default" className="w-full bg-spiti-blue hover:bg-spiti-blue/90 text-white">
                  Book Now
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
