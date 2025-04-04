
import React from 'react';

const SpitiCircuitMap: React.FC = () => {
  return (
    <div className="my-6 md:my-8 py-6 md:py-8 bg-white rounded-lg shadow-md">
      <div className="mx-auto px-4 text-center mb-4 md:mb-6">
        <h3 className="text-xl md:text-3xl font-bold text-spiti-dark mb-2">
          Spiti Valley Complete Circuit Tour
        </h3>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Explore the stunning journey through the complete Spiti Valley circuit. This interactive map highlights all the key destinations including Manali, Atal Tunnel, Chandratal, Kaza, Key Monastery, Kibber, Tabo, Nako, Chitkul, Sangla, Shimla and more.
        </p>
      </div>
      
      <div className="p-1 md:p-2 rounded-lg overflow-hidden">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m76!1m12!1m3!1d856678.3097355141!2d77.57086223216785!3d31.79955392019745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m61!3e0!4m5!1s0x39048708163fd03f%3A0x8129a80ebe5076cd!2sManali%2C%20Himachal%20Pradesh!3m2!1d32.2396325!2d77.1887145!4m5!1s0x390487db73d4cd57%3A0x5d37a2fe6ead7260!2sAtal%20Tunnel%2C%20Sissu%2C%20Himachal%20Pradesh!3m2!1d32.4200404!2d77.1451628!4m5!1s0x39048f37fb8daac1%3A0x5df9ab50e78ba4fe!2sChandratal%20Lake%2C%20Himachal%20Pradesh!3m2!1d32.4803339!2d77.618969!4m5!1s0x3904861938cc87b7%3A0xee7cc9108c2419e4!2sKibber%2C%20Himachal%20Pradesh!3m2!1d32.336234499999995!2d78.0114532!4m5!1s0x3904874148ce9d01%3A0x4e0226eef49b4044!2sKey%20Monastery%2C%20Kaza!3m2!1d32.299407599999995!2d78.0068915!4m5!1s0x3904885b2ba02e83%3A0x7a73dcd8844d038!2sKaza%2C%20Himachal%20Pradesh!3m2!1d32.226745599999996!2d78.0717229!4m5!1s0x39048b4adfc2f9d5%3A0xa9a052f93c2c2465!2sTabo%20Monastery%2C%20Spiti%20Valley!3m2!1d32.0957389!2d78.3873598!4m5!1s0x39048ca881df9cd5%3A0x2370429234945db0!2sNako%2C%20Himachal%20Pradesh!3m2!1d31.8814693!2d78.6303557!4m5!1s0x3905e2cce436828f%3A0x625c0c1bb30ea095!2sChitkul%2C%20Himachal%20Pradesh!3m2!1d31.3507395!2d78.4358898!4m5!1s0x3905dcb57a08fd5b%3A0x13ec35525478080d!2sSangla%2C%20Himachal%20Pradesh!3m2!1d31.4281162!2d78.2650376!4m5!1s0x390578e3e35d6e67%3A0x1f7e7ff6ff9f54b7!2sShimla%2C%20Himachal%20Pradesh!3m2!1d31.1048145!2d77.17340329999999!5e0!3m2!1sen!2sin!4v1720179551811!5m2!1sen!2sin" 
          width="100%" 
          height="550" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Spiti Valley Complete Circuit Map"
          className="rounded-lg shadow-inner"
        ></iframe>
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
    </div>
  );
};

export default SpitiCircuitMap;
