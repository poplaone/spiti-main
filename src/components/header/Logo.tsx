import { Link } from 'react-router-dom';
import LogoText from './LogoText';
import LogoMountain from '../hero/LogoMountain';

interface LogoProps {
  isVisible: boolean;
  isTourPage: boolean;
  isHomePage: boolean;
  isScrolled: boolean;
}

const Logo = ({
  isVisible,
  isTourPage,
  isHomePage,
  isScrolled
}: LogoProps) => {
  // For mobile, we keep the original logo behavior
  const showMobileLogo = isVisible || !isHomePage || isTourPage;
  
  return (
    <Link to="/" className="font-display font-bold text-xl text-white flex items-center relative">
      {/* Mobile logo - original behavior */}
      <div className={`md:hidden transition-all duration-500 ${showMobileLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-75 -translate-y-4'}`}>
        {showMobileLogo && 
          <img 
            src="/lovable-uploads/1baa95d9-8696-4505-ae05-c0b4a0e805ed.png" 
            alt="Spiti Valley Travels Logo" 
            className="h-12 w-auto object-contain mr-2" 
          />
        }
      </div>
      
      {/* Desktop - show text logo when at top, combined logo when scrolled */}
      <div className="hidden md:flex items-center">
        {isScrolled ? (
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/08844cbc-49d4-4c1e-876c-66f7764e727d.png" 
              alt="Spiti Valley Mountains" 
              className="h-10 w-auto object-contain mr-1 animate-fade-in transition-all" 
            />
            <LogoText />
          </div>
        ) : (
          <LogoText />
        )}
      </div>
    </Link>
  );
};

export default Logo;
