
import React from 'react';

const SpitiCircuitMap: React.FC = () => {
  return (
    <div className="my-6 md:my-8 py-6 md:py-8 bg-white rounded-lg shadow-md">
      <div className="mx-auto px-4 text-center mb-4 md:mb-6">
        <h3 className="text-xl md:text-3xl font-bold text-spiti-dark mb-2">
          Spiti Valley Circuit Tour Map
        </h3>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Explore the stunning journey through Spiti Valley. This interactive map highlights the full circuit tour route.
        </p>
      </div>
      
      <div className="p-1 md:p-2 rounded-lg overflow-hidden">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m76!1m12!1m3!1d440902.7325443247!2d77.79861397637162!3d31.969753356860074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m61!3e0!4m5!1s0x39048708163fd03f%3A0x8129a80ebe5076cd!2sManali%2C%20Himachal%20Pradesh!3m2!1d32.2396325!2d77.1887145!4m5!1s0x3904874148ce9d01%3A0x4e0226eef49b4044!2sKey%20Monastery%2C%20Kaza!3m2!1d32.299407599999995!2d78.0068915!4m5!1s0x3904861938cc87b7%3A0xee7cc9108c2419e4!2sKibber%2C%20Himachal%20Pradesh!3m2!1d32.336234499999995!2d78.0114532!4m5!1s0x3904885b2ba02e83%3A0x7a73dcd8844d038!2sKaza%2C%20Himachal%20Pradesh!3m2!1d32.226745599999996!2d78.0717229!4m5!1s0x39048b4adfc2f9d5%3A0xa9a052f93c2c2465!2sTabo%20Monastery%2C%20Spiti%20Valley!3m2!1d32.0957389!2d78.3873598!4m5!1s0x39048ca881df9cd5%3A0x2370429234945db0!2sNako%2C%20Himachal%20Pradesh!3m2!1d31.8814693!2d78.6303557!4m5!1s0x3906a95e65a3ab43%3A0xf6a21b1be8c95cf6!2sKalpa%2C%20Himachal%20Pradesh!3m2!1d31.535656399999998!2d78.25857629999999!4m5!1s0x39062eeaa9913ca9%3A0xbeb1a227c36a0cf!2sRampur%2C%20Himachal%20Pradesh!3m2!1d31.4583079!2d77.6309406!4m5!1s0x390460bb7801ebff%3A0xc52608d3cfafa20!2sShimla%2C%20Himachal%20Pradesh!3m2!1d31.1048294!2d77.17102419999999!4m5!1s0x39048708163fd03f%3A0x8129a80ebe5076cd!2sManali%2C%20Himachal%20Pradesh!3m2!1d32.2396325!2d77.1887145!5e0!3m2!1sen!2sin!4v1720102599834!5m2!1sen!2sin" 
          width="100%" 
          height="500" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Spiti Valley Circuit Map"
        ></iframe>
      </div>
      
      <div className="mt-4 text-center text-sm text-gray-500">
        <p>Map shows the complete Spiti Valley circuit route from Manali through Key Monastery, Kibber, Kaza, Tabo, Nako, Kalpa, Rampur, and Shimla.</p>
      </div>
    </div>
  );
};

export default SpitiCircuitMap;
