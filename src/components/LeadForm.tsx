
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon, User, Mail, Phone, Users, Check, Send, MessageSquare } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const LeadForm = () => {
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    duration: '',
    guests: '1',
    isCustomized: false,
    isFixedDeparture: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, duration: value }));
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [id]: checked }));
  };

  const sendWhatsApp = () => {
    if (!validateForm()) return;

    const message = `
*New Tour Inquiry*
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Duration: ${formData.duration}
Travel Date: ${date ? format(date, "PPP") : "Not specified"}
Guests: ${formData.guests}
Type: ${formData.isCustomized ? 'Customized' : ''} ${formData.isFixedDeparture ? 'Fixed Departure' : ''}
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/918353040008?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return false;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!formData.phone.trim()) {
      toast.error("Please enter your phone number");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // In a real application, you would send this data to a server
    // Here we'll simulate that with a console log and toast notification
    console.log("Form submission:", {
      ...formData,
      date: date ? format(date, "PPP") : undefined
    });

    // Email submission details (would be handled by a backend)
    const emailDetails = {
      to: ["Spitivalleytravels@gmail.com", "Himalayanfootslog@gmail.com"],
      subject: "New Tour Inquiry from Website",
      body: `
        Name: ${formData.name}
        Email: ${formData.email}
        Phone: ${formData.phone}
        Duration: ${formData.duration}
        Travel Date: ${date ? format(date, "PPP") : "Not specified"}
        Guests: ${formData.guests}
        Type: ${formData.isCustomized ? 'Customized' : ''} ${formData.isFixedDeparture ? 'Fixed Departure' : ''}
      `
    };
    
    console.log("Email would be sent to:", emailDetails);
    
    toast.success("Thank you for your inquiry! We'll contact you soon.");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 md:p-6 shadow-lg rounded-lg">
      <h3 className="text-lg md:text-xl mb-6 font-semibold text-center">Get Free Tour Plan</h3>
      
      <div className="space-y-4">
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input 
            id="name" 
            className="pl-10 h-12" 
            placeholder="Name" 
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input 
            id="email" 
            type="email" 
            className="pl-10 h-12" 
            placeholder="Email" 
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input 
            id="phone" 
            type="tel" 
            className="pl-10 h-12" 
            placeholder="Phone Number" 
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(15)].map((_, i) => (
                  <SelectItem key={i + 1} value={`${i + 1}`}>
                    {i + 1} {i + 1 === 1 ? 'Night' : 'Nights'} / {i + 2} {i + 2 === 1 ? 'Day' : 'Days'}
                  </SelectItem>
                ))}
                <SelectItem value="custom">Custom Duration</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input 
              id="phone" 
              type="tel" 
              className="pl-10 h-12" 
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full pl-10 h-12 justify-start text-left font-normal relative">
                  <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  {date ? format(date, "MMM dd, yyyy") : <span className="text-muted-foreground">Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar 
                  mode="single" 
                  selected={date} 
                  onSelect={setDate} 
                  initialFocus 
                  className="pointer-events-auto" 
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input 
              id="guests" 
              type="number" 
              min="1" 
              className="pl-10 h-12" 
              placeholder="Guests" 
              value={formData.guests}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="isCustomized" 
              checked={formData.isCustomized}
              onCheckedChange={(checked) => handleCheckboxChange('isCustomized', checked as boolean)}
            />
            <label htmlFor="isCustomized" className="text-sm font-medium">Customized</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="isFixedDeparture" 
              checked={formData.isFixedDeparture}
              onCheckedChange={(checked) => handleCheckboxChange('isFixedDeparture', checked as boolean)}
            />
            <label htmlFor="isFixedDeparture" className="text-sm font-medium">Fixed Departure</label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4">
          <Button 
            type="submit" 
            className="h-12 bg-blue-700 hover:bg-blue-800 flex items-center justify-center gap-2"
          >
            <Send className="h-4 w-4" />
            Submit Request
          </Button>
          
          <Button 
            type="button" 
            onClick={sendWhatsApp} 
            className="h-12 bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            WhatsApp
          </Button>
        </div>
      </div>
    </form>
  );
};

export default LeadForm;
