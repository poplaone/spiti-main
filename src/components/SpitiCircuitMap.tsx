import React from 'react';
const SpitiCircuitMap: React.FC = () => {
  return <div className="my-6 md:my-8 py-6 md:py-8 bg-white rounded-lg shadow-md">
      <div className="mx-auto px-4 text-center mb-4 md:mb-6">
        <h3 className="md:text-3xl font-bold text-spiti-dark mb-2 text-lg">
          Spiti Valley Complete Circuit Tour
        </h3>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Explore the stunning journey through the complete Spiti Valley circuit. This interactive map highlights all the key destinations including Manali, Atal Tunnel, Chandratal, Kaza, Key Monastery, Kibber, Tabo, Nako, Chitkul, Sangla, Shimla and more.
        </p>
      </div>
      
      <div className="p-1 md:p-2 rounded-lg overflow-hidden">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d433868.3888932906!2d77.35233541892902!3d32.251321072639685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39045fdf49fb89c3%3A0xec7fc71b837aac48!2sSpiti%20Valley%2C%20Himachal%20Pradesh!5e0!3m2!1sen!2sin!4v1712258693158!5m2!1sen!2sin" width="100%" height="550" style={{
        border: 0
      }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Spiti Valley Complete Circuit Map" className="rounded-lg shadow-inner"></iframe>
      </div>
      
      <div className="mt-4 px-4 text-center">
        <h4 className="font-semibold text-spiti-forest mb-2">Key Destinations on the Spiti Circuit:</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 text-sm text-gray-700">
          <div>Manali</div>
          <div>Atal Tunnel</div>
          <div>Chandratal</div>
          <div>Kunzum La</div>
          <div>Kaza</div>
          <div>Key Monastery</div>
          <div>Kibber</div>
          <div>Langza</div>
          <div>Hikkim</div>
          <div>Komic</div>
          <div>Dhankar</div>
          <div>Tabo</div>
          <div>Nako</div>
          <div>Khab</div>
          <div>Sangla</div>
          <div>Chitkul</div>
          <div>Rampur</div>
          <div>Shimla</div>
        </div>
        <p className="mt-3 text-sm text-gray-500">
          The Spiti Valley circuit is a complete loop through the Himalayan high-altitude desert, connecting the lush green valleys of Kullu-Manali with the historic town of Shimla, passing through some of the most remote and stunning landscapes in India.
        </p>
      </div>
    </div>;
};
export default SpitiCircuitMap;