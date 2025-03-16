
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, User, Mail, Phone, Users } from 'lucide-react';

const LeadForm = () => {
  const [date, setDate] = useState<Date>();
  
  return (
    <form className="w-full max-w-md bg-spiti-brown/30 backdrop-blur-md p-3 md:p-4 shadow-lg border border-white/20 rounded-sm">
      <h3 className="text-base md:text-lg font-semibold text-white mb-3">Book Your Tour</h3>
      
      <div className="space-y-2">
        <div>
          <Label htmlFor="name" className="text-sm text-white">Full Name</Label>
          <div className="relative">
            <User className="absolute left-2.5 top-2 h-4 w-4 text-gray-500" />
            <Input id="name" className="pl-9 h-8" placeholder="Enter your name" />
          </div>
        </div>

        <div>
          <Label htmlFor="email" className="text-sm text-white">Email</Label>
          <div className="relative">
            <Mail className="absolute left-2.5 top-2 h-4 w-4 text-gray-500" />
            <Input id="email" type="email" className="pl-9 h-8" placeholder="Enter your email" />
          </div>
        </div>

        <div>
          <Label htmlFor="phone" className="text-sm text-white">Phone</Label>
          <div className="relative">
            <Phone className="absolute left-2.5 top-2 h-4 w-4 text-gray-500" />
            <Input id="phone" type="tel" className="pl-9 h-8" placeholder="Enter your phone number" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-sm text-white">Travel Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full pl-9 h-8 justify-start text-left font-normal relative">
                  <CalendarIcon className="absolute left-2.5 top-1.5 h-4 w-4 text-gray-500" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="guests" className="text-sm text-white">Guests</Label>
            <div className="relative">
              <Users className="absolute left-2.5 top-2 h-4 w-4 text-gray-500" />
              <Input id="guests" type="number" min="1" className="pl-9 h-8" placeholder="Guests" />
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full h-8 bg-gradient-to-r from-spiti-brown/80 to-spiti-sand/80 backdrop-blur-sm hover:opacity-90 text-sm text-white">
          Submit Request
        </Button>
      </div>
    </form>
  );
};

export default LeadForm;
