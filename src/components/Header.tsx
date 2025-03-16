
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const atTop = window.scrollY === 0;
      setIsAtTop(atTop);
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isAtTop 
          ? 'bg-transparent'
          : 'bg-white/20 backdrop-blur-md shadow-lg'
      } border-b border-white/10`}
    >
      <div className="container mx-auto px-4">
        <nav className={`flex items-center justify-between h-16 md:h-20 ${
          isAtTop ? 'md:justify-center' : ''
        }`}>
          <a href="/" className={`text-2xl font-bold text-white ${
            isAtTop ? 'md:mx-auto' : ''
          }`}>
            Spiti Valley
          </a>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center space-x-8 ${
            isAtTop ? 'absolute right-4' : ''
          }`}>
            <a href="#" className="text-white hover:text-spiti-blue transition-colors">Home</a>
            <a href="#packages" className="text-white hover:text-spiti-blue transition-colors">Tour Packages</a>
            <a href="#destinations" className="text-white hover:text-spiti-blue transition-colors">Destinations</a>
            <a href="#about" className="text-white hover:text-spiti-blue transition-colors">About Us</a>
            <Button variant="default" className="bg-spiti-blue hover:bg-spiti-blue/90 text-white">
              Book Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white absolute right-4"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-lg shadow-lg p-4 space-y-4 animate-slide-in">
            <a href="#" className="block text-spiti-dark hover:text-spiti-blue transition-colors">Home</a>
            <a href="#packages" className="block text-spiti-dark hover:text-spiti-blue transition-colors">Tour Packages</a>
            <a href="#destinations" className="block text-spiti-dark hover:text-spiti-blue transition-colors">Destinations</a>
            <a href="#about" className="block text-spiti-dark hover:text-spiti-blue transition-colors">About Us</a>
            <Button variant="default" className="w-full bg-spiti-blue hover:bg-spiti-blue/90 text-white">
              Book Now
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
