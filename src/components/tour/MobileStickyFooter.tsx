
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LeadForm from "@/components/LeadForm";

const MobileStickyFooter: React.FC = () => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-spiti-forest shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-40">
      <div className="flex items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex-1 rounded-none h-14 bg-green-600 hover:bg-green-700 text-white">
              Book Now
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <LeadForm />
          </DialogContent>
        </Dialog>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex-1 rounded-none h-14 bg-spiti-slate hover:bg-spiti-forest text-white">
              Customize
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <LeadForm />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default MobileStickyFooter;
