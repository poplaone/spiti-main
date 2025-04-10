import { Link } from 'react-router-dom';
interface LogoProps {
  isVisible: boolean;
  isTourPage: boolean;
  isHomePage: boolean;
}
const Logo = ({
  isVisible,
  isTourPage,
  isHomePage
}: LogoProps) => {
  return <Link to="/" className="font-display font-bold text-xl text-white flex items-center">
      <div className={`transition-all duration-500 ${isVisible || isTourPage ? 'opacity-100 scale-100' : 'opacity-0 scale-75 -translate-y-4'} md:opacity-100 md:scale-100 md:translate-y-0`}>
        {(isVisible || !isHomePage || isTourPage) && <img src="/lovable-uploads/1baa95d9-8696-4505-ae05-c0b4a0e805ed.png" alt="Spiti Valley Travels Logo" className="h-12 w-auto object-contain mr-2" />}
      </div>
      
    </Link>;
};
export default Logo;