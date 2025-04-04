
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from 'lucide-react';

interface GoogleMapsKeyInputProps {
  googleMapsKey: string;
  setGoogleMapsKey: (key: string) => void;
  initializeMap: () => void;
  mapError: string;
}

const GoogleMapsKeyInput: React.FC<GoogleMapsKeyInputProps> = ({
  googleMapsKey,
  setGoogleMapsKey,
  initializeMap,
  mapError
}: GoogleMapsKeyInputProps) => {
  return (
    <div className="max-w-xl mx-auto mb-6 px-4">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h4 className="text-lg font-medium mb-2">Google Maps API Key Required</h4>
        <p className="text-sm text-gray-600 mb-4">
          To view the interactive map, please enter your Google Maps API key. Your key is stored locally and never sent to our servers.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="text"
            placeholder="Enter your Google Maps API key"
            value={googleMapsKey}
            onChange={(e) => setGoogleMapsKey(e.target.value)}
            className="flex-grow"
          />
          <Button 
            onClick={initializeMap}
            className="bg-spiti-forest hover:bg-spiti-forest/90"
            disabled={!googleMapsKey}
          >
            Load Map
          </Button>
        </div>
        
        {mapError && (
          <Alert variant="destructive" className="mt-4">
            <InfoIcon className="h-4 w-4" />
            <AlertDescription>{mapError}</AlertDescription>
          </Alert>
        )}
        
        <p className="text-xs text-gray-500 mt-4">
          <a 
            href="https://developers.google.com/maps/documentation/javascript/get-api-key" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Learn how to get a Google Maps API key
          </a>
        </p>
      </div>
    </div>
  );
};

export default GoogleMapsKeyInput;
