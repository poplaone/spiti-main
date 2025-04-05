
import { format } from "date-fns";
import { Calendar as CalendarIcon, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerInputProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  className?: string;
  icon?: LucideIcon;
}

const DatePickerInput = ({ date, setDate, className, icon: Icon = CalendarIcon }: DatePickerInputProps) => {
  // Create date object for today
  const today = new Date();
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <Icon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-auto p-0" 
        align="start"
        side="bottom"
        sideOffset={5}
        alignOffset={0}
        avoidCollisions={true}
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={(date) => date < today}
          initialFocus
          className={cn("p-2 pointer-events-auto")}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePickerInput;
