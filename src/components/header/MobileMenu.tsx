
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LeadForm from "@/components/LeadForm";
import { TourPackageProps } from "@/components/TourPackage";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Menu, Home, Map, Calendar, Settings, Mail, HelpCircle, FileText, ChevronDown, ChevronRight } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { tourTitleToSlug } from '@/utils/routeUtils';

interface MobileMenuProps {
  roadTripsTours: TourPackageProps[];
  fixedDepartureTours: TourPackageProps[];
  customizableTours?: TourPackageProps[];
}

const MobileMenu = ({ roadTripsTours, fixedDepartureTours, customizableTours = [] }: MobileMenuProps) => {
  const [open, setOpen] = useState(false);
  
  const getTourRoute = (tour: TourPackageProps) => {
    // Use custom URL path if available
    return tourTitleToSlug[tour.title] || `/tour/${tour.id}`;
  };
  
  return (
    <div className="block md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="text-white p-2">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-spiti-forest text-white overflow-y-auto max-h-screen">
          <div className="flex flex-col h-full">
            <div className="flex-1 py-4">
              <h2 className="text-xl font-bold mb-2">Menu</h2>
              <Separator className="mb-4 bg-gray-600" />
              
              <Accordion type="single" collapsible>
                <AccordionItem value="road-trips" className="border-b-gray-700">
                  <AccordionTrigger className="hover:bg-white/10 rounded px-2 font-medium">
                    <div className="flex items-center">
                      <Map className="mr-2 h-5 w-5" />
                      Road Trips
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Link to="/road-trips" className="flex items-center justify-between py-2 hover:bg-white/10 rounded px-2" onClick={() => setOpen(false)}>
                      <span>View All Road Trips</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                    <Separator className="my-2 bg-gray-700" />
                    {roadTripsTours.map((tour) => (
                      <Link 
                        key={tour.id || tour.title}
                        to={getTourRoute(tour)} 
                        className="block py-2 hover:bg-white/10 rounded px-2 text-sm truncate"
                        onClick={() => setOpen(false)}
                      >
                        {tour.title}
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="fixed-departures" className="border-b-gray-700">
                  <AccordionTrigger className="hover:bg-white/10 rounded px-2 font-medium">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-5 w-5" />
                      Fixed Departures
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Link to="/fixed-departures" className="flex items-center justify-between py-2 hover:bg-white/10 rounded px-2" onClick={() => setOpen(false)}>
                      <span>View All Fixed Departures</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                    <Separator className="my-2 bg-gray-700" />
                    {fixedDepartureTours.map((tour) => (
                      <Link 
                        key={tour.id || tour.title}
                        to={getTourRoute(tour)} 
                        className="block py-2 hover:bg-white/10 rounded px-2 text-sm truncate"
                        onClick={() => setOpen(false)}
                      >
                        {tour.title}
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="customizable-tours" className="border-b-gray-700">
                  <AccordionTrigger className="hover:bg-white/10 rounded px-2 font-medium">
                    <div className="flex items-center">
                      <Settings className="mr-2 h-5 w-5" />
                      Customizable Tours
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Link to="/customizable-tours" className="flex items-center justify-between py-2 hover:bg-white/10 rounded px-2" onClick={() => setOpen(false)}>
                      <span>View All Customizable Tours</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                    <Separator className="my-2 bg-gray-700" />
                    {customizableTours.map((tour) => (
                      <Link 
                        key={tour.id || tour.title}
                        to={getTourRoute(tour)} 
                        className="block py-2 hover:bg-white/10 rounded px-2 text-sm truncate"
                        onClick={() => setOpen(false)}
                      >
                        {tour.title}
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <Separator className="my-4 bg-gray-600" />
              
              <div className="flex flex-col space-y-1">
                <Link 
                  to="/" 
                  className="flex items-center py-2 px-2 hover:bg-white/10 rounded font-medium"
                  onClick={() => setOpen(false)}
                >
                  <Home className="mr-2 h-5 w-5" />
                  Home
                </Link>
                <Link 
                  to="/about" 
                  className="flex items-center py-2 px-2 hover:bg-white/10 rounded font-medium"
                  onClick={() => setOpen(false)}
                >
                  <Home className="mr-2 h-5 w-5" />
                  About
                </Link>
                <Link 
                  to="/blog" 
                  className="flex items-center py-2 px-2 hover:bg-white/10 rounded font-medium"
                  onClick={() => setOpen(false)}
                >
                  <FileText className="mr-2 h-5 w-5" />
                  Blog
                </Link>
                <Link 
                  to="/faq" 
                  className="flex items-center py-2 px-2 hover:bg-white/10 rounded font-medium"
                  onClick={() => setOpen(false)}
                >
                  <HelpCircle className="mr-2 h-5 w-5" />
                  FAQ
                </Link>
                <Link 
                  to="/contact" 
                  className="flex items-center py-2 px-2 hover:bg-white/10 rounded font-medium"
                  onClick={() => setOpen(false)}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Contact
                </Link>
              </div>
            </div>
            
            <div className="mt-auto pb-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-spiti-forest">
                    Enquire Now
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <LeadForm />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
