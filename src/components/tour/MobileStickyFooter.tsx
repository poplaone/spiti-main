
import React from 'react';
import { MessageSquare, PhoneCall } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import LeadForm from "@/components/LeadForm";
import { trackButtonClick, trackPhoneCall } from '@/utils/analyticsUtils';

interface MobileStickyFooterProps {
  phone?: string;
  tourId?: string;
  tourName?: string;
  discountedPrice?: number;
  originalPrice?: number;
  formatPrice?: (price: number) => string;
}

const MobileStickyFooter: React.FC<MobileStickyFooterProps> = ({ 
  phone = "+918353040008",
  tourId,
  tourName,
  discountedPrice,
  originalPrice,
  formatPrice = (price) => price.toString()
}) => {

  const handleCallClick = () => {
    // Track the phone call
    trackPhoneCall(phone, `tour_page_${tourId || 'unknown'}`);
    // We don't need to do anything else as the tel: link will handle the call
  };

  const handleEnquiryClick = () => {
    trackButtonClick('send_enquiry', `tour_page_${tourId || 'unknown'}`);
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-40">
      <div className="flex items-center">
        <Dialog>
          <DialogTrigger asChild>
            <button 
              className="flex-1 flex items-center justify-center h-14 bg-spiti-slate hover:bg-spiti-slate/90 text-white"
              onClick={handleEnquiryClick}
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Send Enquiry
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <LeadForm tourId={tourId} tourName={tourName} />
          </DialogContent>
        </Dialog>
        
        <a 
          href={`tel:${phone}`} 
          className="flex-1 flex items-center justify-center h-14 bg-green-600 hover:bg-green-700 text-white"
          onClick={handleCallClick}
        >
          <PhoneCall className="mr-2 h-5 w-5" />
          Call Now
        </a>
      </div>
    </div>
  );
};

export default MobileStickyFooter;
