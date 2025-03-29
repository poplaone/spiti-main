
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

import ContactForm from './form/ContactForm';
import TourPreferences from './form/TourPreferences';
import FormActions from './form/FormActions';
import ThankYouPage from './ThankYouPage';
import { useLeadForm } from '@/hooks/useLeadForm';

const LeadForm = () => {
  const {
    date,
    setDate,
    formData,
    showThankYou,
    setShowThankYou,
    handleInputChange,
    handleSelectChange,
    handleCheckboxChange,
    handleSubmit,
    sendWhatsApp
  } = useLeadForm();

  return (
    <>
      <Card className="w-full max-w-md bg-white/40 backdrop-blur-md p-2 shadow-lg rounded-lg border-0">
        <CardContent className="p-4">
          <h3 className="text-lg md:text-xl mb-6 font-semibold text-center">Get Free Tour Plan</h3>
          
          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            <div className="space-y-4">
              <ContactForm
                name={formData.name}
                email={formData.email}
                phone={formData.phone}
                guests={formData.guests}
                onChange={handleInputChange}
              />

              <TourPreferences
                date={date}
                setDate={setDate}
                duration={formData.duration}
                guests={formData.guests}
                isCustomized={formData.isCustomized}
                isFixedDeparture={formData.isFixedDeparture}
                onInputChange={handleInputChange}
                onSelectChange={handleSelectChange}
                onCheckboxChange={handleCheckboxChange}
              />

              <FormActions 
                onSubmit={handleSubmit}
                onWhatsApp={sendWhatsApp}
              />
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Dialog for Thank You Page with fullscreen mobile view */}
      <Dialog 
        open={showThankYou} 
        onOpenChange={setShowThankYou}
      >
        <DialogContent className="p-0 border-0 overflow-hidden max-w-4xl bg-transparent sm:rounded-lg">
          <DialogTitle className="sr-only">Thank You for Your Inquiry</DialogTitle>
          <ThankYouPage onClose={() => setShowThankYou(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LeadForm;
