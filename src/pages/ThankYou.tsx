
import { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Mountain, 
  Bike, 
  Car, 
  Users, 
  CloudSnow, 
  CheckCircle,
  ArrowLeft
} from 'lucide-react';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

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

    // Google Tag Manager event trigger for conversion tracking
    if (window.dataLayer) {
      window.dataLayer.push({
        'event': 'formSubmission',
        'formType': 'tourInquiry',
        'formData': {
          'name': formData.name || 'Not provided',
          'email': formData.email || 'Not provided',
          'phone': formData.phone || 'Not provided',
          'duration': formData.duration || 'Not specified',
          'travelDate': formData.date || 'Not specified',
          'guests': formData.guests || '1',
          'isCustomized': formData.isCustomized || false,
          'isFixedDeparture': formData.isFixedDeparture || false
        }
      });
      
      console.log("Thank you page conversion event tracked");
    }
    
    console.log("Thank you page viewed with form data:", formData);
  }, [navigate, location.state, formData]);

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
              
              <h1 className="text-3xl md:text-4xl font-display font-bold text-spiti-dark mb-4 animate-fade-in-up">
                Thank You for Your Inquiry!
              </h1>
              
              <Card className="bg-white/60 backdrop-blur-md border-0 shadow-lg mb-8 animate-fade-in-up">
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
              
              <div className="bg-white/60 backdrop-blur-md rounded-xl shadow-lg p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4 text-spiti-dark">Spiti Valley Adventures</h3>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="flex items-center justify-center p-4">
                        <div className="bg-white/80 p-4 rounded-full shadow-md">
                          <Mountain className="h-8 w-8 text-spiti-blue" />
                        </div>
                      </TableCell>
                      <TableCell className="flex items-center justify-center p-4">
                        <div className="bg-white/80 p-4 rounded-full shadow-md">
                          <CloudSnow className="h-8 w-8 text-spiti-lightblue" />
                        </div>
                      </TableCell>
                      <TableCell className="flex items-center justify-center p-4">
                        <div className="bg-white/80 p-4 rounded-full shadow-md">
                          <Bike className="h-8 w-8 text-spiti-accent" />
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex items-center justify-center p-4">
                        <div className="bg-white/80 p-4 rounded-full shadow-md">
                          <Car className="h-8 w-8 text-spiti-forest" />
                        </div>
                      </TableCell>
                      <TableCell className="flex items-center justify-center p-4">
                        <div className="bg-white/80 p-4 rounded-full shadow-md">
                          <Users className="h-8 w-8 text-spiti-mountain" />
                        </div>
                      </TableCell>
                      <TableCell className="flex items-center justify-center p-4">
                        <div className="bg-white/80 p-4 rounded-full shadow-md">
                          <Mountain className="h-8 w-8 text-spiti-slate" />
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
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

