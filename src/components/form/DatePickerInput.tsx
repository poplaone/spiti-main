
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
import { ScrollArea } from "@/components/ui/scroll-area";

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
        <div className="sticky top-0 bg-popover z-10 px-3 py-2 border-b flex items-center justify-between">
          <button 
            className="p-1 rounded-sm hover:bg-accent hover:text-accent-foreground"
            onClick={() => document.querySelector('.rdp-nav_button_previous')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <span className="text-sm font-medium">
            {date ? format(date, "MMMM yyyy") : format(today, "MMMM yyyy")}
          </span>
          <button 
            className="p-1 rounded-sm hover:bg-accent hover:text-accent-foreground"
            onClick={() => document.querySelector('.rdp-nav_button_next')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
        <ScrollArea className="max-h-[250px]">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={(date) => date < today}
            initialFocus
            className={cn("p-3 pointer-events-auto")}
            showOutsideDays={true}
            captionLayout="buttons"
            classNames={{
              caption: "hidden", // Hide the default caption completely
            }}
          />
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default DatePickerInput;
