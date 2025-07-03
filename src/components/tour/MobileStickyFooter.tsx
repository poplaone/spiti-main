
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LeadForm from "@/components/LeadForm";
import { trackButtonClick, trackPhoneCall } from '@/utils/analyticsUtils';

interface MobileStickyFooterProps {
  discountedPrice: number;
  originalPrice: number;
  formatPrice: (price: number) => string;
  tourId?: string;
  tourName?: string;
}

const MobileStickyFooter: React.FC<MobileStickyFooterProps> = ({ 
  discountedPrice, 
  originalPrice,
  formatPrice,
  tourId,
  tourName
}) => {
  const handleBookClick = () => {
    trackButtonClick('Enquire/Customize', 'MobileStickyFooter');
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-slate-800 to-spiti-forest shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-40">
      <div className="flex items-center">
        {/* Price Section */}
        <div className="flex-1 px-3 py-2 text-white">
          <div className="flex flex-col">
            <span className="text-xs font-medium">Starting from</span>
            <div className="flex items-baseline">
              <span className="text-xl font-bold text-green-400">₹{formatPrice(discountedPrice)}/-</span>
              <span className="text-xs line-through opacity-75 ml-1">₹{formatPrice(originalPrice)}</span>
            </div>
            <span className="text-xs">per person</span>
          </div>
        </div>
        
        {/* Enquire/Customize Button */}
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              className="flex-1 rounded-none rounded-l-full h-14 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold"
              onClick={handleBookClick}
            >
              Enquire/Customize
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <LeadForm tourId={tourId} tourName={tourName} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default MobileStickyFooter;
