
import { format } from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef, useState } from "react";

interface DatePickerInputProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  className?: string;
  icon?: LucideIcon;
}

const DatePickerInput = ({ date, setDate, className, icon: Icon = CalendarIcon }: DatePickerInputProps) => {
  // Create date object for today
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState<Date>(date || today);
  const calendarRef = useRef<HTMLDivElement>(null);
  
  // Update currentMonth when date changes from parent
  useEffect(() => {
    if (date) {
      setCurrentMonth(date);
    }
  }, [date]);
  
  const handlePreviousMonth = () => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };
  
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
        <div className="sticky top-0 bg-popover z-10 px-3 py-1 border-b flex items-center justify-between">
          <button 
            className="p-1 rounded-sm hover:bg-accent hover:text-accent-foreground"
            onClick={handlePreviousMonth}
            type="button"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm font-medium">
            {format(currentMonth, "MMMM yyyy")}
          </span>
          <button 
            className="p-1 rounded-sm hover:bg-accent hover:text-accent-foreground"
            onClick={handleNextMonth}
            type="button"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <ScrollArea className="max-h-[200px]">
          <div ref={calendarRef}>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) => date < today}
              initialFocus
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              className={cn("p-1 pointer-events-auto")}
              showOutsideDays={true}
              captionLayout="buttons"
              classNames={{
                caption: "hidden",
                head_row: "flex mb-1",
                head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
                row: "flex w-full mt-1",
                cell: "h-7 w-7 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: cn(
                  "h-7 w-7 p-0 font-normal aria-selected:opacity-100"
                ),
              }}
            />
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default DatePickerInput;
