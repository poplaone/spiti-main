
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AddDayButtonProps {
  onAddDay: () => void;
  nextDayNumber: number;
}

const AddDayButton: React.FC<AddDayButtonProps> = ({ onAddDay, nextDayNumber }) => {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onAddDay}
      className="w-full"
    >
      <Plus className="h-4 w-4 mr-2" />
      Add Day {nextDayNumber}
    </Button>
  );
};

export default AddDayButton;
