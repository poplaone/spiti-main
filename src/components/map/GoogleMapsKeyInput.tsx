
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

const GoogleMapsKeyInput = ({ 
  googleMapsKey, 
  setGoogleMapsKey, 
  initializeMap, 
  mapError 
}: GoogleMapsKeyInputProps) => {
  return (
    <div className="max-w-xl mx-auto px-4 mb-8">
      <Alert className="mb-4 bg-amber-50 border-amber-200">
        <InfoIcon className="h-5 w-5 text-amber-500" />
        <AlertDescription className="ml-2 text-sm">
          To see the interactive map background, please enter your Google Maps API key. You can get a free API key by visiting the <a href="https://developers.google.com/maps/documentation/javascript/get-api-key" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">Google Maps Platform</a>.
        </AlertDescription>
      </Alert>
      
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter your Google Maps API key"
          value={googleMapsKey}
          onChange={(e) => setGoogleMapsKey(e.target.value)}
          className="flex-1"
        />
        <Button onClick={initializeMap} variant="default">
          Load Map
        </Button>
      </div>
      
      {mapError && (
        <p className="mt-2 text-sm text-red-500">{mapError}</p>
      )}
    </div>
  );
};

export default GoogleMapsKeyInput;
