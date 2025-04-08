
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useToursContext } from "@/context/ToursContext";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tours } = useToursContext();

  useEffect(() => {
    // Handle redirects for old tour detail URLs
    const path = location.pathname;
    
    // If the path matches any of the old tour detail URLs, redirect to the home page
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
        // Find a matching tour by type for better redirection
        let targetTour = tours[0]; // Default to first tour
        
        if (path === "/tour-bike" && tours.some(t => t.tourType?.includes("Bike"))) {
          targetTour = tours.find(t => t.tourType?.includes("Bike")) || targetTour;
        } else if (path === "/tour-women" && tours.some(t => t.tourType?.includes("Women"))) {
          targetTour = tours.find(t => t.tourType?.includes("Women")) || targetTour;
        } else if (path === "/tour-buddhist" && tours.some(t => t.tourType?.includes("Buddhist"))) {
          targetTour = tours.find(t => t.tourType?.includes("Buddhist")) || targetTour;
        }
        
        // Redirect to the specific tour page
        navigate(`/tour/${targetTour.id}`, { replace: true });
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
  }, [location.pathname, navigate, tours]);

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
