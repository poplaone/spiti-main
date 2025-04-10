
import { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowLeft } from 'lucide-react';

const ThankYou = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData || {};
  
  useEffect(() => {
    // If someone tries to access the thank you page directly without form data
    // redirect them to the homepage after 5 seconds
    if (!location.state?.formData) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 5000);
      
      return () => clearTimeout(timer);
    }

    // Simplified GTM tracking
    if (window.dataLayer) {
      window.dataLayer.push({
        'event': 'formSubmissionComplete',
        'formType': 'tourInquiry'
      });
    }
  }, [navigate, location.state]);

  const goBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-spiti-blue/20 to-spiti-lightblue/30 py-16">
      <div className="container mx-auto px-4">
        <Button 
          variant="ghost" 
          className="mb-6 bg-white/20 hover:bg-white/40 backdrop-blur-md text-spiti-dark"
          onClick={goBack}
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </Button>

        <div className="max-w-4xl mx-auto bg-white/40 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="text-center max-w-2xl mx-auto">
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-green-50/70 p-4 shadow-lg">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-display font-bold text-spiti-dark mb-4">
                Thank You for Your Inquiry!
              </h1>
              
              <Card className="bg-white/60 backdrop-blur-md border-0 shadow-lg mb-8">
                <CardContent className="p-6">
                  <p className="text-lg text-spiti-slate mb-4">
                    We're excited to help you plan your adventure in the beautiful Spiti Valley!
                  </p>
                  
                  <p className="text-spiti-slate mb-4">
                    Our team will contact you shortly to discuss your tour preferences and create a personalized itinerary.
                  </p>
                  
                  {formData.email && (
                    <p className="text-spiti-slate">
                      We've sent a confirmation email to <strong>{formData.email}</strong>.
                    </p>
                  )}
                </CardContent>
              </Card>
              
              <Link to="/">
                <Button className="bg-spiti-blue hover:bg-spiti-blue/80 text-white">
                  Continue Exploring
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
