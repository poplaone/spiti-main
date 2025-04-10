
import React from 'react';

interface ContactHeroProps {
  title: string;
  description: string;
}

const ContactHero = ({ title, description }: ContactHeroProps) => {
  return (
    <section className="relative pt-20 lg:pt-28">
      <div className="h-[40vh] md:h-[50vh] relative overflow-hidden">
        <img 
          src="/lovable-uploads/ca833426-3806-4da0-b1eb-d94155df1935.png" 
          alt="Spiti Valley in Winter with Prayer Flags" 
          className="absolute inset-0 w-full h-full object-cover" 
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-spiti-forest/80 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">{title}</h1>
          <p className="text-xl text-white/90 max-w-2xl">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
