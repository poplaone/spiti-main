
import React, { useEffect, useState } from 'react';

interface LogoMountainProps {
  isScrolled: boolean;
}

const LogoMountain = ({ isScrolled }: LogoMountainProps) => {
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (isScrolled) {
      setAnimationClass('translate-y-[-100vh] opacity-0');
    } else {
      setAnimationClass('translate-y-0 opacity-100');
    }
  }, [isScrolled]);

  return (
    <div className={`hidden md:block absolute transition-all duration-700 ${animationClass}`}>
      <img 
        src="/lovable-uploads/08844cbc-49d4-4c1e-876c-66f7764e727d.png" 
        alt="Spiti Valley Mountains" 
        className="w-32 h-auto"
      />
    </div>
  );
};

export default LogoMountain;
