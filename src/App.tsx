
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TourDetail from "./pages/TourDetail";
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
          <Route path="/" element={<Index />} />
          <Route path="/tour/:id" element={<TourDetail />} />
          
          {/* Individual tour detail pages */}
          <Route path="/tour-bike" element={<TourDetailBike />} />
          <Route path="/tour-unexplored" element={<TourDetailUnexplored />} />
          <Route path="/tour-buddhist" element={<TourDetailBuddhist />} />
          <Route path="/tour-women" element={<TourDetailWomen />} />
          <Route path="/tour-owncar" element={<TourDetailOwnCar />} />
          <Route path="/tour-hiddenheaven" element={<TourDetailHiddenHeaven />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
