
import { Button } from "@/components/ui/button";
import { Send, MessageSquare } from "lucide-react";

interface FormActionsProps {
  onSubmit: () => void;
  onWhatsApp: () => void;
}

const FormActions = ({ onSubmit, onWhatsApp }: FormActionsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 pt-4">
      <Button 
        type="submit" 
        className="h-12 bg-blue-700 hover:bg-blue-800 flex items-center justify-center gap-2"
        onClick={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <Send className="h-4 w-4" />
        Submit Request
      </Button>
      
      <Button 
        type="button" 
        onClick={onWhatsApp} 
        className="h-12 bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2"
      >
        <MessageSquare className="h-4 w-4" />
        WhatsApp
      </Button>
    </div>
  );
};

export default FormActions;
