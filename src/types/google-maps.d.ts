
// Google Maps type definitions
declare global {
  interface Window {
    initMap: () => void;
    google: typeof google;
  }
}

export {};
