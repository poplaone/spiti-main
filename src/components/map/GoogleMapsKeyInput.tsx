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
  return;
};
export default GoogleMapsKeyInput;