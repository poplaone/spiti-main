
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";

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
          
          {/* New pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          
          {/* Tour detail pages with clean routes - all 6 tour types */}
          <Route path="/tour-bike" element={<TourDetailBike />} />
          <Route path="/tour-unexplored" element={<TourDetailUnexplored />} />
          <Route path="/tour-buddhist" element={<TourDetailBuddhist />} />
          <Route path="/tour-women" element={<TourDetailWomen />} />
          <Route path="/tour-owncar" element={<TourDetailOwnCar />} />
          <Route path="/tour-hiddenheaven" element={<TourDetailHiddenHeaven />} />
          
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
