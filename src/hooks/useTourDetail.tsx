
import { useState, useEffect } from 'react';
import { TourPackageProps } from "@/components/TourPackage";
import { getAllTours, getTourByCustomUrl, getTourByIndex } from "@/services/tourService";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchTourData = async () => {
      if (!id) {
        console.error("No tour ID provided");
        setLoading(false);
        return;
      }
      
      try {
        console.log("Fetching tour data for ID/URL:", id);
        let selectedTour = null;
        
        // First check if it's a numeric ID
        if (!isNaN(parseInt(id))) {
          const numId = parseInt(id, 10);
          console.log("Treating as numeric ID:", numId);
          selectedTour = await getTourByIndex(numId);
          console.log("Numeric ID lookup result:", selectedTour);
        } else {
          // Then check if it's a custom URL
          console.log("Treating as custom URL:", id);
          selectedTour = await getTourByCustomUrl(id);
          console.log("Custom URL lookup result:", selectedTour ? "Found" : "Not found", selectedTour?.title || "");
        }
        
        if (selectedTour) {
          console.log("Tour found:", selectedTour.title);
          setTour(selectedTour);
          
          // Now fetch related tours
          try {
            console.log("Fetching related tours");
            const allTours = await getAllTours();
            console.log("Total tours found:", allTours.length);
            
            const currentIndex = selectedTour.index !== undefined ? selectedTour.index : -1;
            
            // Filter out the current tour and get up to 4 related tours
            const others = allTours
              .filter(tour => tour.index !== currentIndex)
              .slice(0, 4);
              
            console.log("Related tours:", others.length);
            setOtherTours(others);
          } catch (error) {
            console.error("Error fetching related tours:", error);
            toast({
              title: "Error",
              description: "Failed to load related tours. Please refresh the page.",
              variant: "destructive"
            });
          } finally {
            setRelatedToursLoading(false);
          }
        } else {
          console.error("Tour not found for ID/URL:", id);
          setTour(null);
          setOtherTours([]);
          
          // Try to fetch some recommended tours anyway
          try {
            const allTours = await getAllTours();
            setOtherTours(allTours.slice(0, 4));
          } catch (e) {
            console.error("Error fetching recommended tours:", e);
          } finally {
            setRelatedToursLoading(false);
          }
        }
      } catch (error) {
        console.error("Error fetching tour details:", error);
        toast({
          title: "Error",
          description: "Failed to load tour details. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchTourData();
  }, [id, toast]);

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
