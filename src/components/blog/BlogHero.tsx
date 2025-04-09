
import React from 'react';

const BlogHero = () => {
  return (
    <section className="relative pt-20 md:pt-24 pb-16 bg-spiti-forest text-white overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/84853251-2ed0-409f-aee1-a9b4e9a7f41e.png" 
          alt="Suspension bridge in Spiti Valley" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-spiti-forest/90 to-spiti-forest/70"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">Spiti Valley Travel Blog</h1>
          <p className="text-lg text-white/90">Discover tips, stories, and insights from our adventures in the beautiful Spiti Valley</p>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;
