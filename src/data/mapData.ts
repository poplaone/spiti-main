
// Location data for the Spiti Circuit map
export const locations = [
  { name: "Manali", x: 50, y: 480 },
  { name: "Atal Tunnel", x: 80, y: 170 },
  { name: "Solang Valley", x: 150, y: 300 },
  { name: "Kullu", x: 110, y: 600 },
  { name: "Narkanda", x: 350, y: 760 },
  { name: "Shimla", x: 200, y: 800 },
  { name: "Kufri", x: 260, y: 780 },
  { name: "Rampur", x: 450, y: 730 },
  { name: "Sangla", x: 530, y: 850 },
  { name: "Chitkul", x: 630, y: 870 },
  { name: "Rakcham", x: 600, y: 810 },
  { name: "Pooh Village", x: 680, y: 700 },
  { name: "Nako", x: 840, y: 480 },
  { name: "Tabo", x: 750, y: 450 },
  { name: "Dhankar", x: 720, y: 200 },
  { name: "Hikkim", x: 670, y: 150 },
  { name: "Komic", x: 720, y: 90 },
  { name: "Langza", x: 650, y: 60 },
  { name: "Kaza", x: 600, y: 250 },
  { name: "Key Monastery", x: 500, y: 200 },
  { name: "Kibber", x: 450, y: 180 },
  { name: "Kunzum La", x: 350, y: 150 },
  { name: "Chandra Taal", x: 200, y: 80 },
  { name: "Chicham Bridge", x: 300, y: 50 },
  { name: "Khab Sangam", x: 730, y: 580 },
  { name: "Gue Village", x: 800, y: 280 }
];

// Route marker positions as percentages along the path
export const markerPositions = [
  0.01, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 
  0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95
];

// Spiti Valley center coordinates
export const SPITI_CENTER = { lat: 32.2432, lng: 78.0999 };

// SVG path for the Spiti circuit route
export const CIRCUIT_PATH = `M50,480 L80,170 C90,150 100,160 150,300 C160,350 110,550 110,600 
C110,650 180,700 220,750 C240,780 260,800 350,760 C400,740 450,730 
500,770 C520,820 530,850 600,810 C610,830 630,870 600,810 
C580,780 650,730 680,700 C700,650 750,550 840,480 
C810,460 780,450 720,350 C700,250 720,200 670,150 
C690,120 720,90 650,60 C620,100 600,180 600,250 
C580,230 520,210 500,200 C470,190 450,180 400,180 
C370,160 350,150 280,100 C240,90 200,80 250,120 
C300,150 200,180 80,170 Z`;

// Default fallback background color
export const fallbackBackground = "bg-gradient-to-r from-blue-100 to-cyan-100";
