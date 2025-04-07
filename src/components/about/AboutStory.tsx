
import React from 'react';

const AboutStory = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">About Our Company</h2>
            <p className="text-white/90 mb-4">
              Established in 2016, Spiti Valley Travels is a trusted travel agency dedicated to providing unforgettable journeys through the mesmerizing landscapes of Spiti Valley and the Himalayas. With years of experience and a passion for exploration, we specialize in crafting personalized itineraries that offer a perfect blend of adventure, culture, and comfort.
            </p>
            <p className="text-white/90 mb-4">
              Our mission is to ensure every traveler experiences the untouched beauty of Spiti while enjoying a seamless and well-organized trip. From thrilling bike expeditions and cultural Buddhist circuits to women-only tours and self-drive adventures, we cater to every kind of explorer.
            </p>
            <p className="text-white/90">
              At Spiti Valley Travels, our priority is to guide travelers and make their trips smooth and memorable. With expert local knowledge, handpicked accommodations, and 24/7 customer support, we ensure a journey filled with breathtaking sights and enriching experiences.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img alt="Spiti Valley Landscape" className="w-full h-full object-cover" src="/lovable-uploads/819d630c-bd6f-4e85-a643-082e67338f02.jpg" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
