
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mountain, Bike, Car, Users, CloudSnow, X } from 'lucide-react';

interface ThankYouPageProps {
  onClose: () => void;
}

const ThankYouPage = ({ onClose }: ThankYouPageProps) => {
  const [showElements, setShowElements] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowElements(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full min-h-[500px] relative overflow-hidden rounded-2xl">
      {/* Background with blur effect */}
      <div 
        className="absolute inset-0 z-0 bg-gradient-to-br from-spiti-blue/20 to-spiti-lightblue/30 backdrop-blur-lg"
      ></div>

      {/* Close button */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute top-4 right-4 z-50 bg-white/20 hover:bg-white/40 backdrop-blur-md text-spiti-dark"
        onClick={onClose}
      >
        <X className="h-5 w-5" />
      </Button>
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center p-8 h-full">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-spiti-dark mb-4 animate-fade-in-up">
            Thank You for Your Inquiry!
          </h2>
          
          <Card className="bg-white/40 backdrop-blur-md border-0 shadow-lg mb-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <CardContent className="p-6">
              <p className="text-lg text-spiti-slate mb-4">
                We're excited to help you plan your adventure in the beautiful Spiti Valley!
              </p>
              <p className="text-spiti-slate">
                Our team will contact you shortly to discuss your tour preferences and create a personalized itinerary.
              </p>
            </CardContent>
          </Card>
          
          <Button 
            className="bg-spiti-blue hover:bg-spiti-blue/80 text-white animate-fade-in-up"
            onClick={onClose}
            style={{animationDelay: '0.4s'}}
          >
            Continue Exploring
          </Button>
        </div>
      </div>
      
      {/* Floating elements - appear with animation */}
      {showElements && (
        <>
          {/* Mountains */}
          <div className="absolute left-[10%] top-[15%] transform -translate-y-1/2 z-20 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <div className="bg-white/30 backdrop-blur-sm p-4 rounded-full shadow-lg">
              <Mountain className="h-10 w-10 text-spiti-blue" />
            </div>
          </div>
          
          {/* Snow */}
          <div className="absolute right-[15%] top-[25%] transform -translate-y-1/2 z-20 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <div className="bg-white/30 backdrop-blur-sm p-4 rounded-full shadow-lg">
              <CloudSnow className="h-8 w-8 text-spiti-lightblue" />
            </div>
          </div>
          
          {/* Bike */}
          <div className="absolute left-[18%] bottom-[20%] transform -translate-y-1/2 z-20 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
            <div className="bg-white/30 backdrop-blur-sm p-4 rounded-full shadow-lg">
              <Bike className="h-9 w-9 text-spiti-accent" />
            </div>
          </div>
          
          {/* Car */}
          <div className="absolute right-[20%] bottom-[28%] transform -translate-y-1/2 z-20 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <div className="bg-white/30 backdrop-blur-sm p-4 rounded-full shadow-lg">
              <Car className="h-9 w-9 text-spiti-forest" />
            </div>
          </div>
          
          {/* People */}
          <div className="absolute right-[30%] top-[65%] transform -translate-y-1/2 z-20 animate-fade-in-up" style={{animationDelay: '0.9s'}}>
            <div className="bg-white/30 backdrop-blur-sm p-4 rounded-full shadow-lg">
              <Users className="h-8 w-8 text-spiti-mountain" />
            </div>
          </div>
        </>
      )}
      
      {/* Decorative circles */}
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-spiti-lightblue/20 rounded-full blur-3xl"></div>
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-spiti-green/20 rounded-full blur-3xl"></div>
    </div>
  );
};

export default ThankYouPage;
