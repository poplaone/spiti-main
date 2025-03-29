
import React, { useRef, useEffect } from 'react';
import { SPITI_CENTER } from '@/data/mapData';

interface GoogleMapBackgroundProps {
  googleMapRef: React.RefObject<HTMLDivElement>;
  isMapLoaded: boolean;
  setMapError: (error: string) => void;
  setIsMapLoaded: (loaded: boolean) => void;
  mapRef: React.MutableRefObject<google.maps.Map | null>;
  googleMapsKey: string;
}

const GoogleMapBackground = ({ 
  googleMapRef,
  isMapLoaded,
  setMapError,
  setIsMapLoaded,
  mapRef,
  googleMapsKey
}: GoogleMapBackgroundProps) => {
  // Initialize Google Map when script is loaded
  useEffect(() => {
    if (!window.google || !googleMapRef.current) return;
    
    try {
      mapRef.current = new google.maps.Map(googleMapRef.current, {
        center: SPITI_CENTER,
        zoom: 9,
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        disableDefaultUI: true,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false
      });
      
      setIsMapLoaded(true);
      setMapError('');
      
      // Save token to localStorage for future visits
      localStorage.setItem('google_maps_key', googleMapsKey);
    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError('Error initializing map. Please try again.');
      setIsMapLoaded(false);
    }
  }, [window.google, googleMapsKey]);

  return (
    <div 
      ref={googleMapRef} 
      className="absolute inset-0 w-full h-full opacity-70"
    ></div>
  );
};

export default GoogleMapBackground;
