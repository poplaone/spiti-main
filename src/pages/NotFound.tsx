
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useToursContext } from "@/context/ToursContext";
import { createSlug } from "@/utils/slugUtils";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tours, loading } = useToursContext();

  useEffect(() => {
    // Wait for tours to load
    if (loading) return;
    
    // Handle redirects for old tour detail URLs
    const path = location.pathname;
    
    // Check if this is an old-style direct ID URL
    if (path.startsWith('/tour/') && path.split('/').length === 3) {
      const id = path.replace('/tour/', '');
      
      // Find the tour with this ID
      const tour = tours.find(t => t.id === id);
      
      if (tour) {
        // Get custom slug from meta if available
        let customSlug = '';
        try {
          if (tour.meta) {
            if (typeof tour.meta === 'object') {
              customSlug = tour.meta.custom_slug || '';
            } else if (typeof tour.meta === 'string' && tour.meta) {
              const metaObj = JSON.parse(tour.meta);
              customSlug = metaObj.custom_slug || '';
            }
          }
        } catch (e) {
          console.error("Error parsing meta field:", e);
        }
        
        // Redirect to the new slug format
        const slug = customSlug || createSlug(tour.title);
        navigate(`/tour/${slug}/${id}`, { replace: true });
        return;
      }
    }
    
    // Handle redirects for old tour type URLs
    if (
      path === "/tour-bike" || 
      path === "/tour-women" || 
      path === "/tour-owncar" || 
      path === "/tour-buddhist" || 
      path === "/tour-unexplored" || 
      path === "/tour-hiddenheaven"
    ) {
      // Get the first tour from the admin-created tours if available
      if (tours.length > 0) {
        // Find a matching tour by characteristics for better redirection
        let targetTour = tours[0]; // Default to first tour
        
        if (path === "/tour-bike" && tours.some(t => t.transportType.toLowerCase() === "bike")) {
          targetTour = tours.find(t => t.transportType.toLowerCase() === "bike") || targetTour;
        } else if (path === "/tour-women" && tours.some(t => t.isWomenOnly)) {
          targetTour = tours.find(t => t.isWomenOnly) || targetTour;
        } else if (path === "/tour-buddhist" && tours.some(t => t.title.toLowerCase().includes("buddhist"))) {
          targetTour = tours.find(t => t.title.toLowerCase().includes("buddhist")) || targetTour;
        } else if (path === "/tour-owncar" && tours.some(t => t.title.toLowerCase().includes("own car") || t.title.toLowerCase().includes("self drive"))) {
          targetTour = tours.find(t => t.title.toLowerCase().includes("own car") || t.title.toLowerCase().includes("self drive")) || targetTour;
        } else if (path === "/tour-hiddenheaven" && tours.some(t => t.title.toLowerCase().includes("hidden"))) {
          targetTour = tours.find(t => t.title.toLowerCase().includes("hidden")) || targetTour;
        }
        
        // Get custom slug from meta if available
        let customSlug = '';
        try {
          if (targetTour.meta) {
            if (typeof targetTour.meta === 'object') {
              customSlug = targetTour.meta.custom_slug || '';
            } else if (typeof targetTour.meta === 'string' && targetTour.meta) {
              const metaObj = JSON.parse(targetTour.meta);
              customSlug = metaObj.custom_slug || '';
            }
          }
        } catch (e) {
          console.error("Error parsing meta field:", e);
        }
        
        // Generate slug from title and redirect to the new URL format
        const slug = customSlug || createSlug(targetTour.title);
        navigate(`/tour/${slug}/${targetTour.id}`, { replace: true });
      } else {
        // If no tours are available yet, redirect to home
        navigate("/", { replace: true });
      }
      return;
    }
    
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname, navigate, tours, loading]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
