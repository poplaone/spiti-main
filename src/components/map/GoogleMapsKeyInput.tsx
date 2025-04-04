
import React from 'react';

interface GoogleMapsKeyInputProps {
  googleMapsKey: string;
  setGoogleMapsKey: (key: string) => void;
  initializeMap: () => void;
  mapError: string | null;
}

const GoogleMapsKeyInput: React.FC<GoogleMapsKeyInputProps> = ({
  googleMapsKey,
  setGoogleMapsKey,
  initializeMap,
  mapError
}) => {
  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <h3 className="text-lg font-medium mb-2">Google Maps API Key Required</h3>
      <p className="text-gray-500 mb-4">
        To view the map, please enter your Google Maps API key:
      </p>
      <div className="flex gap-2">
        <input
          type="text"
          value={googleMapsKey}
          onChange={(e) => setGoogleMapsKey(e.target.value)}
          placeholder="Enter your Google Maps API Key"
          className="flex-1 p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={initializeMap}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Load Map
        </button>
      </div>
      {mapError && (
        <p className="text-red-500 mt-2 text-sm">{mapError}</p>
      )}
      <p className="text-xs text-gray-500 mt-4">
        Your API key is not stored on our servers and is only used in your browser session.
      </p>
    </div>
  );
};

export default GoogleMapsKeyInput;
