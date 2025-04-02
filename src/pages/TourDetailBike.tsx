
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTours } from "@/services/tourService";
import TourDetailSkeleton from "@/components/tour/TourDetailSkeleton";

const TourDetailBike = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const loadTour = async () => {
      try {
        const allTours = await getAllTours();
        // Find the bike tour (index 0)
        const bikeTour = allTours.length > 0 && allTours[0];
        if (!bikeTour) {
          console.error("Bike tour not found");
          navigate('/');
          return;
        }
        
        // Prefer customUrl if available, otherwise use index
        const routePath = bikeTour.customUrl 
          ? `/tour/${bikeTour.customUrl}`
          : `/tour/${bikeTour.index}`;
          
        console.log("Navigating to bike tour:", routePath);
        navigate(routePath);
      } catch (error) {
        console.error("Failed to load bike tour:", error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    
    loadTour();
  }, [navigate]);
  
  return loading ? <TourDetailSkeleton /> : null;
};

export default TourDetailBike;
