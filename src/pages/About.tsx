
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutStory from '@/components/about/AboutStory';
import AboutMission from '@/components/about/AboutMission';
import TeamSection from '@/components/about/TeamSection';

const About = () => {
  return (
    <div className="min-h-screen bg-transparent">
      <Header />
      <AboutStory />
      <AboutMission />
      <TeamSection />
      <Footer />
    </div>
  );
};

export default About;
