
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LeadForm from "@/components/LeadForm";

const BookingSummaryCard: React.FC = () => {
  return (
    <div className="w-full md:w-[350px] bg-white/90 p-6 rounded-lg shadow-lg order-2 md:order-1">
      <h2 className="text-2xl font-heading font-bold text-center text-spiti-forest mb-4">Book Your Spiti Adventure</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-xl font-bold text-green-600">Starting from ₹18,900/-</p>
          <p className="text-sm text-gray-600">All-inclusive packages with accommodation, meals & transport</p>
        </div>
        <div className="space-y-2">
          <p className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M20 6 9 17l-5-5" /></svg>
            Expert Himalayan Local Guides
          </p>
          <p className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M20 6 9 17l-5-5" /></svg>
            Comfortable Stays at Scenic Locations
          </p>
          <p className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M20 6 9 17l-5-5" /></svg>
            Authentic Cultural Experiences
          </p>
          <p className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M20 6 9 17l-5-5" /></svg>
            Safe Travel in High Altitude Desert
          </p>
        </div>
        <div className="space-y-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full py-2 bg-spiti-forest hover:bg-spiti-forest/90">Book Now</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <LeadForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default BookingSummaryCard;
