
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
import Blog from "./pages/Blog";
import ThankYou from "./pages/ThankYou";

// Import individual tour detail pages
import TourDetailBike from "./pages/TourDetailBike";
import TourDetailUnexplored from "./pages/TourDetailUnexplored";
import TourDetailBuddhist from "./pages/TourDetailBuddhist";
import TourDetailWomen from "./pages/TourDetailWomen";
import TourDetailOwnCar from "./pages/TourDetailOwnCar";
import TourDetailHiddenHeaven from "./pages/TourDetailHiddenHeaven";
import TourDetail from "./pages/TourDetail";

// Import new pages for road trips and fixed departures
import RoadTrips from "./pages/RoadTrips";
import FixedDepartures from "./pages/FixedDepartures";

// Import Admin pages
import AdminLogin from "./pages/Admin/Login";
import AdminLayout from "./pages/Admin/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import TourPackages from "./pages/Admin/TourPackages";
import TourPackageForm from "./pages/Admin/TourPackageForm";

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
          <Route path="/blog" element={<Blog />} />
          <Route path="/thank-you" element={<ThankYou />} />
          
          {/* New view all pages */}
          <Route path="/road-trips" element={<RoadTrips />} />
          <Route path="/fixed-departures" element={<FixedDepartures />} />
          
          {/* Tour detail pages with clean routes - all 6 tour types */}
          <Route path="/tour-bike" element={<TourDetailBike />} />
          <Route path="/tour-unexplored" element={<TourDetailUnexplored />} />
          <Route path="/tour-buddhist" element={<TourDetailBuddhist />} />
          <Route path="/tour-women" element={<TourDetailWomen />} />
          <Route path="/tour-owncar" element={<TourDetailOwnCar />} />
          <Route path="/tour-hiddenheaven" element={<TourDetailHiddenHeaven />} />
          
          {/* Dynamic routes for tour details - both numeric IDs and custom URLs */}
          <Route path="/tour/:id" element={<TourDetail />} />
          
          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="tours" element={<TourPackages />} />
            <Route path="tours/new" element={<TourPackageForm />} />
            <Route path="tours/edit/:id" element={<TourPackageForm />} />
          </Route>
          
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
