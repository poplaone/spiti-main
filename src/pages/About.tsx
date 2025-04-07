
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutHero from '@/components/about/AboutHero';
import AboutStory from '@/components/about/AboutStory';
import AboutMission from '@/components/about/AboutMission';
import TeamSection from '@/components/about/TeamSection';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-spiti-forest to-spiti-blue/30">
      <Header />
      <AboutHero />
      <AboutStory />
      <AboutMission />
      <TeamSection />
      <Footer />
    </div>
  );
};

export default About;
