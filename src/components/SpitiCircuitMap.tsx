
import { useEffect, useRef } from 'react';

// Location data for the map
const locations = [
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

// Route marker positions
const markerPositions = [
  0.01, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 
  0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95
];

const SpitiCircuitMap = () => {
  const pathRef = useRef<SVGPathElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pathRef.current || !mapContainerRef.current) return;

    const path = pathRef.current;
    const pathLength = path.getTotalLength();
    const mapContainer = mapContainerRef.current;

    // Create location markers
    locations.forEach(location => {
      // Create location element
      const locationEl = document.createElement('div');
      locationEl.className = 'location';
      locationEl.style.left = `${location.x / 10}%`;
      locationEl.style.top = `${location.y / 10}%`;
      
      // Create location name
      const nameEl = document.createElement('div');
      nameEl.className = 'location-name';
      nameEl.textContent = location.name;
      
      // Create location image
      const imgEl = document.createElement('div');
      imgEl.className = 'location-img';
      imgEl.setAttribute('data-location', location.name);
      
      // Append elements
      locationEl.appendChild(nameEl);
      locationEl.appendChild(imgEl);
      mapContainer.appendChild(locationEl);
    });

    // Create route markers
    markerPositions.forEach(position => {
      const pointOnPath = path.getPointAtLength(position * pathLength);
      
      const marker = document.createElement('div');
      marker.className = 'marker';
      marker.style.left = `${pointOnPath.x / 10}%`;
      marker.style.top = `${pointOnPath.y / 10}%`;
      
      mapContainer.appendChild(marker);
    });

    // Animation for the path
    path.style.strokeDasharray = `${pathLength}`;
    path.style.strokeDashoffset = `${pathLength}`;
    
    setTimeout(() => {
      path.style.transition = 'stroke-dashoffset 3s ease-in-out';
      path.style.strokeDashoffset = '0';
    }, 500);

    // Cleanup on component unmount
    return () => {
      const locationEls = mapContainer.querySelectorAll('.location');
      const markerEls = mapContainer.querySelectorAll('.marker');
      
      locationEls.forEach(el => el.remove());
      markerEls.forEach(el => el.remove());
    };
  }, []);

  return (
    <div className="my-12 py-8 bg-white rounded-lg shadow-md">
      <div className="mx-auto px-4 text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-spiti-dark mb-2">
          Spiti Valley Circuit Tour Map
        </h3>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Explore the stunning journey through Spiti Valley. This map highlights the key destinations and attractions on our circuit tour.
        </p>
      </div>
      
      <div className="hero-container relative w-full h-[500px] md:h-[600px] flex justify-center items-center bg-white overflow-hidden">
        <div 
          ref={mapContainerRef} 
          className="map-container relative w-[90%] h-[90%] max-w-5xl"
        >
          <svg className="route absolute w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <path 
              ref={pathRef}
              id="route-path" 
              d="M100,200 C150,150 200,180 250,200 C300,220 350,250 400,230 C450,210 500,190 550,220 C600,250 650,270 700,250 C750,230 800,210 850,250 C900,290 950,270 980,300 C1010,330 980,380 950,420 C920,460 880,500 850,550 C820,600 800,650 750,680 C700,710 650,730 600,770 C550,810 500,850 450,880 C400,910 350,930 300,900 C250,870 200,830 150,800 C100,770 50,750 80,700 C110,650 150,600 120,550 C90,500 60,450 80,400 C100,350 120,300 100,250 C80,200 80,180 100,200 Z"
              className="fill-none stroke-spiti-brown stroke-[8px] sm:stroke-[12px] rounded-full"
            /> 
          </svg>
          
          <div className="title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 pointer-events-none">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-spiti-dark leading-tight uppercase mb-2 font-['Arial_Black'] tracking-tighter">
              Spiti Valley<br/>Whole Circuit Tour
            </h1>
            <div className="mt-2 sm:mt-4 text-base sm:text-lg md:text-xl font-bold text-spiti-blue">
              JOIN US THIS SEASON
            </div>
            <div className="mt-1 text-base sm:text-lg md:text-xl font-bold text-green-600">
              8353040008
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpitiCircuitMap;
