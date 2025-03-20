
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, MessageSquare } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LeadForm from "@/components/LeadForm";

interface HeaderProps {
  scrollToPackages?: () => void;
}

const Header = ({ scrollToPackages }: HeaderProps) => {
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
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16 md:h-20">
          <a href="/" className="font-display font-bold text-xl text-white">
            <img 
              src="/lovable-uploads/c8d818d4-0cbc-4134-a656-4c78ea481271.png" 
              alt="Spiti Valley" 
              className="h-12 w-auto"
              style={{ filter: isScrolled ? 'none' : 'brightness(0) invert(1)' }}
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#" 
              className={`font-medium transition-colors ${
                isScrolled ? 'text-spiti-dark hover:text-spiti-blue' : 'text-white hover:text-white/80'
              }`} 
              onClick={e => handleNavClick(e, 'top')}
            >
              Home
            </a>
            <a 
              href="#packages" 
              className={`font-medium transition-colors ${
                isScrolled ? 'text-spiti-dark hover:text-spiti-blue' : 'text-white hover:text-white/80'
              }`}
              onClick={e => handleNavClick(e, 'packages')}
            >
              Tour Packages
            </a>
            <a 
              href="#destinations" 
              className={`font-medium transition-colors ${
                isScrolled ? 'text-spiti-dark hover:text-spiti-blue' : 'text-white hover:text-white/80'
              }`} 
              onClick={e => handleNavClick(e, 'destinations')}
            >
              Destinations
            </a>
            <a 
              href="#about" 
              className={`font-medium transition-colors ${
                isScrolled ? 'text-spiti-dark hover:text-spiti-blue' : 'text-white hover:text-white/80'
              }`} 
              onClick={e => handleNavClick(e, 'about')}
            >
              About Us
            </a>
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="default" 
                  className={isScrolled ? "bg-spiti-blue hover:bg-spiti-blue/90 text-white" : "bg-white text-spiti-dark hover:bg-white/90"}
                >
                  Book Now
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <LeadForm />
              </DialogContent>
            </Dialog>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden ${isScrolled ? 'text-spiti-dark' : 'text-white'}`} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-lg shadow-lg p-4 space-y-4 animate-slide-in">
            <a 
              href="#" 
              className="block text-spiti-dark hover:text-spiti-blue transition-colors" 
              onClick={e => handleNavClick(e, 'top')}
            >
              Home
            </a>
            <a 
              href="#packages" 
              className="block text-spiti-dark hover:text-spiti-blue transition-colors" 
              onClick={e => handleNavClick(e, 'packages')}
            >
              Tour Packages
            </a>
            <a 
              href="#destinations" 
              className="block text-spiti-dark hover:text-spiti-blue transition-colors" 
              onClick={e => handleNavClick(e, 'destinations')}
            >
              Destinations
            </a>
            <a 
              href="#about" 
              className="block text-spiti-dark hover:text-spiti-blue transition-colors" 
              onClick={e => handleNavClick(e, 'about')}
            >
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
