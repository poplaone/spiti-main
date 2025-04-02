
import { useState, useEffect } from 'react';
import { TourPackageProps } from "@/components/TourPackage";
import { getAllTours, getTourByCustomUrl, getTourByIndex } from "@/services/tourService";

interface UseTourDetailReturn {
  tour: TourPackageProps | null;
  otherTours: TourPackageProps[];
  selectedMonth: string;
  setSelectedMonth: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  relatedToursLoading: boolean;
  formatPrice: (price: number) => string;
}

export const useTourDetail = (id: string | undefined): UseTourDetailReturn => {
  const [tour, setTour] = useState<TourPackageProps | null>(null);
  const [otherTours, setOtherTours] = useState<TourPackageProps[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("June");
  const [loading, setLoading] = useState<boolean>(true);
  const [relatedToursLoading, setRelatedToursLoading] = useState<boolean>(true);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchTourData = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      
      try {
        console.log("Fetching tour data for ID:", id);
        let selectedTour = null;
        
        // First check if it's a numeric ID
        if (!isNaN(parseInt(id))) {
          const numId = parseInt(id, 10);
          selectedTour = await getTourByIndex(numId);
          console.log("Numeric ID lookup result:", selectedTour);
        } else {
          // Then check if it's a custom URL
          selectedTour = await getTourByCustomUrl(id);
          console.log("Custom URL lookup result:", selectedTour);
        }
        
        if (selectedTour) {
          setTour(selectedTour);
          
          // Now fetch related tours
          try {
            const allTours = await getAllTours();
            const currentIndex = selectedTour.index;
            // Filter out the current tour and get up to 4 related tours
            const others = allTours
              .filter(tour => tour.index !== currentIndex)
              .slice(0, 4);
            setOtherTours(others);
          } catch (error) {
            console.error("Error fetching related tours:", error);
          } finally {
            setRelatedToursLoading(false);
          }
        } else {
          console.error("Tour not found for ID:", id);
        }
      } catch (error) {
        console.error("Error fetching tour details:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTourData();
  }, [id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  return {
    tour,
    otherTours,
    selectedMonth,
    setSelectedMonth,
    loading,
    relatedToursLoading,
    formatPrice
  };
};
