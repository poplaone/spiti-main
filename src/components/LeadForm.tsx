import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon, User, Mail, Phone, Users } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
const PackagesForm = ({
  date,
  setDate
}: {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}) => <div className="space-y-2">
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

    <div>
      <Label htmlFor="duration" className="text-sm text-white">Duration</Label>
      <Select>
        <SelectTrigger className="h-8">
          <SelectValue placeholder="Select duration" />
        </SelectTrigger>
        <SelectContent>
          {[...Array(15)].map((_, i) => <SelectItem key={i + 1} value={`${i + 1}`}>
              {i + 1} {i + 1 === 1 ? 'Night' : 'Nights'} / {i + 2} {i + 2 === 1 ? 'Day' : 'Days'}
            </SelectItem>)}
          <SelectItem value="custom">Custom Duration</SelectItem>
        </SelectContent>
      </Select>
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
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus className="pointer-events-auto" />
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <Label htmlFor="guests" className="text-sm text-white">No. of Guests</Label>
        <div className="relative">
          <Users className="absolute left-2.5 top-2 h-4 w-4 text-gray-500" />
          <Input id="guests" type="number" min="1" className="pl-9 h-8" placeholder="Guests" />
        </div>
      </div>
    </div>

    <Button type="submit" className="w-full h-8 bg-spiti-blue hover:bg-spiti-blue/90 text-sm text-white">
      Submit Request
    </Button>
  </div>;
const HotelsForm = ({
  date,
  setDate
}: {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}) => <div className="space-y-2">
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
        <Label className="text-sm text-white">Check In</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full pl-9 h-8 justify-start text-left font-normal relative">
              <CalendarIcon className="absolute left-2.5 top-1.5 h-4 w-4 text-gray-500" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus className="pointer-events-auto" />
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <Label className="text-sm text-white">No. of Nights</Label>
        <Select>
          <SelectTrigger className="h-8">
            <SelectValue placeholder="Select nights" />
          </SelectTrigger>
          <SelectContent>
            {[...Array(15)].map((_, i) => <SelectItem key={i + 1} value={`${i + 1}`}>{i + 1} {i + 1 === 1 ? 'Night' : 'Nights'}</SelectItem>)}
            <SelectItem value="custom">Custom Duration</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="guests" className="text-sm text-white">No. of Guests</Label>
        <div className="relative">
          <Users className="absolute left-2.5 top-2 h-4 w-4 text-gray-500" />
          <Input id="guests" type="number" min="1" className="pl-9 h-8" placeholder="Guests" />
        </div>
      </div>
    </div>

    <Button type="submit" className="w-full h-8 bg-spiti-blue hover:bg-spiti-blue/90 text-sm text-white">
      Submit Request
    </Button>
  </div>;
const LeadForm = () => {
  const [date, setDate] = useState<Date>();
  const [bookingType, setBookingType] = useState("packages");
  const [isFlipping, setIsFlipping] = useState(false);
  const handleBookingTypeChange = (value: string) => {
    if (value) {
      setIsFlipping(true);
      setTimeout(() => {
        setBookingType(value);
        setIsFlipping(false);
      }, 300);
    }
  };
  return <form className="w-full max-w-md bg-white/20 backdrop-blur-md p-3 md:p-4 shadow-lg border border-white/20 rounded-sm">
      <div className="mb-4">
        <ToggleGroup type="single" value={bookingType} onValueChange={handleBookingTypeChange} className="w-full border border-white/20 rounded-sm bg-white/10">
          <ToggleGroupItem value="hotels" aria-label="Hotels" className="flex-1 data-[state=on]:bg-spiti-blue data-[state=on]:text-white">
            Hotels
          </ToggleGroupItem>
          <ToggleGroupItem value="packages" aria-label="Packages" className="flex-1 data-[state=on]:bg-spiti-blue data-[state=on]:text-white">
            Packages
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <h3 className="text-base md:text-lg mb-3 text-slate-950 font-semibold text-center">Get Free Tour Plan</h3>
      
      <div className={`transition-transform duration-300 ${isFlipping ? 'animate-[flip-out_0.3s_ease-in-out]' : 'animate-[flip-in_0.3s_ease-in-out]'}`}>
        {bookingType === 'packages' ? <PackagesForm date={date} setDate={setDate} /> : <HotelsForm date={date} setDate={setDate} />}
      </div>
    </form>;
};
export default LeadForm;