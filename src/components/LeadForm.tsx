
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from './form/ContactForm';
import TourPreferences from './form/TourPreferences';
import FormActions from './form/FormActions';
import { useLeadForm } from '@/hooks/lead-form';
import { useEffect } from 'react';
import { trackFormAttempt } from '@/utils/analyticsUtils';

export interface LeadFormProps {
  tourId?: string;
  tourName?: string;
}

const LeadForm = ({ tourId, tourName }: LeadFormProps) => {
  const {
    date,
    setDate,
    formData,
    isSubmitting,
    handleInputChange,
    handleSelectChange,
    handleCheckboxChange,
    handleSubmit,
    sendWhatsApp
  } = useLeadForm(tourId, tourName);

  // Track form view on component mount
  useEffect(() => {
    console.log("LeadForm component mounted - Tracking form view");
    if (window.dataLayer) {
      window.dataLayer.push({
        'event': 'formView',
        'formType': 'tourInquiry',
        'formContext': tourName ? `Tour: ${tourName}` : 'General Inquiry'
      });
    }
  }, [tourName]);

  return (
    <Card className="w-full max-w-md bg-blue-100/60 backdrop-blur-md p-2 shadow-lg rounded-lg border-0">
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
              hideTourTypeHeading={true}
            />

            <FormActions 
              onSubmit={() => {
                trackFormAttempt();
                handleSubmit();
              }}
              onWhatsApp={sendWhatsApp}
              isSubmitting={isSubmitting}
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LeadForm;
