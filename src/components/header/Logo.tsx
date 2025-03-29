
import { Link } from 'react-router-dom';

interface LogoProps {
  isVisible: boolean;
  isTourPage: boolean;
  isHomePage: boolean;
}

const Logo = ({ isVisible, isTourPage, isHomePage }: LogoProps) => {
  return (
    <Link to="/" className="font-display font-bold text-xl text-white flex items-center">
      <div className={`transition-all duration-500 ${isVisible || isTourPage ? 'opacity-100 scale-100' : 'opacity-0 scale-75 -translate-y-4'} md:opacity-100 md:scale-100 md:translate-y-0`}>
        {(isVisible || !isHomePage || isTourPage) && (
          <img 
            src="/lovable-uploads/d1018c3e-5c41-4572-8712-cb63ee049342.png" 
            alt="Spiti Logo" 
            className="h-12 w-auto mr-2" 
          />
        )}
      </div>
      <span className="hidden md:inline">Spiti Valley Travels . com</span>
    </Link>
  );
};

export default Logo;
