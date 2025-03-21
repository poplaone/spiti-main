
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Import individual tour detail pages
import TourDetailBike from "./pages/TourDetailBike";
import TourDetailUnexplored from "./pages/TourDetailUnexplored";
import TourDetailBuddhist from "./pages/TourDetailBuddhist";
import TourDetailWomen from "./pages/TourDetailWomen";
import TourDetailOwnCar from "./pages/TourDetailOwnCar";
import TourDetailHiddenHeaven from "./pages/TourDetailHiddenHeaven";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Home page route */}
          <Route path="/" element={<Index />} />
          
          {/* Tour detail pages */}
          <Route path="/tours/bike" element={<TourDetailBike />} />
          <Route path="/tours/unexplored" element={<TourDetailUnexplored />} />
          <Route path="/tours/buddhist" element={<TourDetailBuddhist />} />
          <Route path="/tours/women" element={<TourDetailWomen />} />
          <Route path="/tours/owncar" element={<TourDetailOwnCar />} />
          <Route path="/tours/hiddenheaven" element={<TourDetailHiddenHeaven />} />
          
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
