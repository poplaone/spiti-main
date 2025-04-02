
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
      if (id) {
        try {
          // First check if it's a numeric ID
          if (!isNaN(parseInt(id))) {
            const numId = parseInt(id, 10);
            const selectedTour = await getTourByIndex(numId);
            if (selectedTour) {
              console.log("Fetched tour by index:", selectedTour);
              setTour(selectedTour);
              
              // Now fetch related tours
              try {
                const allTours = await getAllTours();
                const others = allTours.filter(tour => tour.index !== numId).slice(0, 4);
                setOtherTours(others);
              } catch (error) {
                console.error("Error fetching related tours:", error);
              } finally {
                setRelatedToursLoading(false);
              }
            }
          } 
          // Then check if it's a custom URL
          else {
            const selectedTour = await getTourByCustomUrl(id);
            if (selectedTour) {
              console.log("Fetched tour by custom URL:", selectedTour);
              setTour(selectedTour);
              
              // Now fetch related tours
              try {
                const allTours = await getAllTours();
                const currentIndex = selectedTour.index;
                const others = allTours.filter(tour => tour.index !== currentIndex).slice(0, 4);
                setOtherTours(others);
              } catch (error) {
                console.error("Error fetching related tours:", error);
              } finally {
                setRelatedToursLoading(false);
              }
            }
          }
        } catch (error) {
          console.error("Error fetching tour details:", error);
        } finally {
          setLoading(false);
        }
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
