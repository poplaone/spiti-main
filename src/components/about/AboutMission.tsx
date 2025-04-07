
import React from 'react';

const AboutMission = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-spiti-blue/20 to-spiti-green/20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-8">Our Mission</h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-xl text-white/90 mb-6">
            To provide unforgettable experiences that connect travelers with the natural beauty and cultural heritage of Spiti Valley, while preserving its delicate ecosystem and supporting local communities.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <div className="bg-spiti-green/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-spiti-green"><path d="m7 11 2-2-2-2"></path><path d="M11 13h4"></path><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Sustainable Tourism</h3>
              <p className="text-white/80">
                We are committed to minimizing our environmental footprint and promoting sustainable tourism practices.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <div className="bg-spiti-blue/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-spiti-blue"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Cultural Respect</h3>
              <p className="text-white/80">
                We honor local traditions and ensure our tours provide authentic cultural insights with utmost respect.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <div className="bg-cyan-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-500"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path><path d="m15 5 4 4"></path></svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Local Impact</h3>
              <p className="text-white/80">
                We create employment opportunities for local communities and support regional development initiatives.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMission;
