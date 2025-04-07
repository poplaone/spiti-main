
import React from 'react';

const AboutHero = () => {
  return (
    <section className="relative pt-20 lg:pt-28">
      <div className="h-[50vh] md:h-[60vh] relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80" alt="Spiti Valley Mountains" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-spiti-forest/80 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">About Us</h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Passionate explorers dedicated to sharing the magic of Spiti Valley with adventurous souls worldwide.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
