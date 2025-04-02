
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTours } from "@/services/tourService";

const TourDetailBike = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const loadTour = async () => {
      try {
        const allTours = await getAllTours();
        // Find the bike tour (index 0)
        const isValidTour = allTours.length > 0 && allTours[0];
        if (!isValidTour) {
          navigate('/');
          return;
        }
        
        // Navigate to the dynamic route with the right tour ID
        // Use the new URL format
        navigate(`/tour-${allTours[0].index}`);
      } catch (error) {
        console.error("Failed to load bike tour:", error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    
    loadTour();
  }, [navigate]);
  
  return <div>{loading && <p>Loading...</p>}</div>;
};

export default TourDetailBike;
