
import { useState, useEffect } from 'react';

interface UseGoogleMapsScriptProps {
  apiKey: string;
  onScriptLoad: () => void;
  onScriptError: () => void;
}

export const useGoogleMapsScript = ({ 
  apiKey, 
  onScriptLoad, 
  onScriptError 
}: UseGoogleMapsScriptProps) => {
  const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!apiKey || scriptLoaded) return;

    // Check if script is already loaded
    if (window.google && window.google.maps) {
      setScriptLoaded(true);
      onScriptLoad();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.async = true;
    script.defer = true;
    
    // Define the callback function globally
    window.initMap = () => {
      setScriptLoaded(true);
      onScriptLoad();
    };
    
    script.onerror = () => {
      onScriptError();
    };
    
    document.head.appendChild(script);
    
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
      delete window.initMap;
    };
  }, [apiKey, scriptLoaded, onScriptLoad, onScriptError]);

  return { scriptLoaded };
};
