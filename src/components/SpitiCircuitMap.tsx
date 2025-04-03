import { useRef, useState, useEffect } from 'react';
import { fallbackBackground } from '@/data/mapData';
import GoogleMapsKeyInput from './map/GoogleMapsKeyInput';
import CircuitRouteSvg from './map/CircuitRouteSvg';
import GoogleMapBackground from './map/GoogleMapBackground';
import { useGoogleMapsScript } from '@/hooks/useGoogleMapsScript';

// Define the Google Maps window interface
declare global {
  interface Window {
    initMap: () => void;
    google: typeof google;
  }
}
const SpitiCircuitMap = () => {
  const googleMapRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const [googleMapsKey, setGoogleMapsKey] = useState<string>(localStorage.getItem('google_maps_key') || '');
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);
  const [mapError, setMapError] = useState<string>('');

  // Handle script loading and errors
  const handleScriptLoad = () => {
    if (googleMapRef.current && googleMapsKey) {
      try {
        mapRef.current = new google.maps.Map(googleMapRef.current, {
          center: {
            lat: 32.2432,
            lng: 78.0999
          },
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
    }
  };
  const handleScriptError = () => {
    setMapError('Failed to load Google Maps. Please check your API key.');
    setIsMapLoaded(false);
  };

  // Use our custom hook to load the Google Maps script
  const {
    scriptLoaded
  } = useGoogleMapsScript({
    apiKey: googleMapsKey,
    onScriptLoad: handleScriptLoad,
    onScriptError: handleScriptError
  });

  // Initialize Google Map when token is provided
  const initializeMap = () => {
    if (!googleMapRef.current || !googleMapsKey) return;
    setMapError('');

    // Check if script is already loaded
    if (scriptLoaded && window.google) {
      handleScriptLoad();
    }
    // Otherwise the useGoogleMapsScript hook will handle loading
  };

  // Try to initialize map on first load if token exists
  useEffect(() => {
    if (googleMapsKey) {
      initializeMap();
    }
  }, []);
  return <div className="my-12 py-8 bg-white rounded-lg shadow-md">
      <div className="mx-auto px-4 text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-spiti-dark mb-2">
          Spiti Valley Circuit Tour Map
        </h3>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Explore the stunning journey through Spiti Valley. This map highlights the key destinations and attractions on our circuit tour.
        </p>
      </div>
      
      {/* Google Maps API key input */}
      {!isMapLoaded && <GoogleMapsKeyInput googleMapsKey={googleMapsKey} setGoogleMapsKey={setGoogleMapsKey} initializeMap={initializeMap} mapError={mapError} />}
      
      <div className={`hero-container relative w-full h-[500px] md:h-[600px] flex justify-center items-center overflow-hidden ${!isMapLoaded ? fallbackBackground : ''}`}>
        {/* Base Google Map Layer */}
        {googleMapsKey && <GoogleMapBackground googleMapRef={googleMapRef} isMapLoaded={isMapLoaded} setMapError={setMapError} setIsMapLoaded={setIsMapLoaded} mapRef={mapRef} googleMapsKey={googleMapsKey} />}
        
        {/* Semi-transparent overlay */}
        
        
        {/* Circuit Map Overlay */}
        <CircuitRouteSvg />
      </div>
      
      <div className="mt-4 text-center text-sm text-gray-500">
        
      </div>
    </div>;
};
export default SpitiCircuitMap;