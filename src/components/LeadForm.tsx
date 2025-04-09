
import { Card, CardContent } from "@/components/ui/card";

import ContactForm from './form/ContactForm';
import TourPreferences from './form/TourPreferences';
import FormActions from './form/FormActions';
import { useLeadForm } from '@/hooks/lead-form';

interface LeadFormProps {
  tourId?: string;
  tourName?: string;
}

const LeadForm: React.FC<LeadFormProps> = ({ tourId, tourName }) => {
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
  } = useLeadForm();

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
              onSubmit={handleSubmit}
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
