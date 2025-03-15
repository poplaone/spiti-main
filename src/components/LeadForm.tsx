
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, User, Mail, Phone, Users } from 'lucide-react';

const LeadForm = () => {
  const [date, setDate] = useState<Date>();
  
  return (
    <form className="w-full max-w-md bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-lg border border-white/20">
      <h3 className="text-xl font-semibold text-spiti-dark mb-6">Book Your Tour</h3>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input id="name" className="pl-10" placeholder="Enter your name" />
          </div>
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input id="email" type="email" className="pl-10" placeholder="Enter your email" />
          </div>
        </div>

        <div>
          <Label htmlFor="phone">Phone</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input id="phone" type="tel" className="pl-10" placeholder="Enter your phone number" />
          </div>
        </div>

        <div>
          <Label>Travel Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full pl-10 justify-start text-left font-normal relative">
                <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className="rounded-md pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label htmlFor="guests">Number of Guests</Label>
          <div className="relative">
            <Users className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input id="guests" type="number" min="1" className="pl-10" placeholder="Number of guests" />
          </div>
        </div>

        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" placeholder="Tell us about your travel plans..." />
        </div>

        <Button type="submit" className="w-full bg-spiti-blue hover:bg-spiti-blue/90">
          Submit Request
        </Button>
      </div>
    </form>
  );
};

export default LeadForm;
