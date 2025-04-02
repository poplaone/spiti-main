
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
        console.log("Fetching tour detail for id:", id);
        let foundTour: TourPackageProps | null = null;
        
        // Try multiple approaches to find the tour
        
        // First check if it's a numeric ID
        if (!isNaN(parseInt(id))) {
          const numId = parseInt(id, 10);
          foundTour = await getTourByIndex(numId);
          if (foundTour) {
            console.log("Found tour by numeric index:", foundTour);
          }
        }
        
        // If not found by numeric ID, try custom URL
        if (!foundTour) {
          console.log("Trying to find by custom URL:", id);
          foundTour = await getTourByCustomUrl(id);
          if (foundTour) {
            console.log("Found tour by custom URL:", foundTour);
          }
        }
        
        // If still not found, get all tours and search manually
        if (!foundTour) {
          console.log("Previous lookups failed. Searching all tours for:", id);
          const allTours = await getAllTours();
          
          // Try different matching strategies
          foundTour = allTours.find(t => 
            (t.customUrl && t.customUrl === id) || 
            String(t.index) === id ||
            (t.customUrl && t.customUrl.toLowerCase() === id.toLowerCase()) ||
            (t.title && t.title.toLowerCase().replace(/\s+/g, '-').includes(id.toLowerCase()))
          ) || null;
          
          if (foundTour) {
            console.log("Found tour through manual search:", foundTour);
          }
        }
        
        // Set the tour if found
        if (foundTour) {
          setTour(foundTour);
          
          // Load related tours
          try {
            const allTours = await getAllTours();
            const tourIndex = foundTour.index !== undefined ? foundTour.index : -1;
            const others = allTours.filter(t => t.index !== tourIndex).slice(0, 4);
            setOtherTours(others);
          } catch (error) {
            console.error("Error fetching related tours:", error);
          } finally {
            setRelatedToursLoading(false);
          }
        } else {
          console.error("Tour not found with identifier:", id);
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
