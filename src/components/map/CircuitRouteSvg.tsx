import React, { useEffect, useRef } from 'react';
import { locations, markerPositions, CIRCUIT_PATH } from '@/data/mapData';
const CircuitRouteSvg = () => {
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
  return;
};
export default CircuitRouteSvg;