
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LeadForm from "@/components/LeadForm";
import { Button } from "@/components/ui/button";
import { HelpCircle } from 'lucide-react';

const FAQ = () => {
  const faqCategories = [
    {
      title: "Trip Planning",
      faqs: [
        {
          question: "What is the best time to visit Spiti Valley?",
          answer: "The best time to visit Spiti Valley is from June to September when the weather is pleasant and all mountain passes are open. During winter (October to May), Spiti experiences heavy snowfall, making many areas inaccessible. However, if you enjoy snow and want to experience a winter wonderland, December to February can be magical, though challenging."
        },
        {
          question: "How do I reach Spiti Valley?",
          answer: "There are two main routes to reach Spiti Valley: 1) Via Manali: This route goes through Rohtang Pass and Kunzum Pass. It's more scenic but open only from June to October. 2) Via Shimla: This route is longer but stays open throughout the year (except during heavy snowfall). Most of our tours offer pickup from either Shimla or Manali, and we handle all transportation from there."
        },
        {
          question: "Do I need permits to visit Spiti Valley?",
          answer: "Indian nationals don't need any special permits for Spiti Valley. Foreign nationals need an Inner Line Permit (ILP) for certain areas near the Tibet border. If you're booking with us, we handle all permit arrangements for you, so there's no need to worry about the paperwork."
        },
        {
          question: "What should I pack for the trip?",
          answer: "Pack layers as temperatures can vary widely between day and night. Essential items include: warm clothing (even in summer), sunscreen, sunglasses, lip balm, comfortable hiking shoes, personal medications, a good quality camera, and a small backpack for day trips. We provide a detailed packing list after booking."
        }
      ]
    },
    {
      title: "Health & Safety",
      faqs: [
        {
          question: "How do I prevent altitude sickness?",
          answer: "Spiti Valley is at a high altitude (12,500 feet or 3,800 meters). To prevent altitude sickness: Stay hydrated, avoid alcohol and smoking, acclimatize properly by spending 1-2 days at intermediate altitudes, take it slow during the first few days, and consider consulting your doctor about altitude sickness medication before the trip. Our itineraries are designed with proper acclimatization in mind."
        },
        {
          question: "Is Spiti Valley safe for solo female travelers?",
          answer: "Yes, Spiti Valley is generally very safe for solo female travelers. The local Buddhist culture is respectful and friendly. However, as with any destination, it's good to take standard precautions. We also offer women-only group tours if you prefer traveling with other female companions."
        },
        {
          question: "Are there medical facilities in Spiti Valley?",
          answer: "Medical facilities in Spiti are basic. There are small government hospitals in Kaza and a few primary health centers in larger villages. For serious medical issues, evacuation to larger cities like Manali or Shimla would be necessary. We recommend bringing basic medications and purchasing travel insurance. All our guides are trained in first aid for high altitude issues."
        }
      ]
    },
    {
      title: "Tour Details",
      faqs: [
        {
          question: "What type of accommodation can I expect?",
          answer: "We offer a range of accommodations depending on the tour and your preferences: Homestays with local families for an authentic experience, comfortable guesthouses and hotels in towns, and camping in remote areas with full camping equipment provided. All accommodations are clean, comfortable, and carefully selected for quality and authentic experiences."
        },
        {
          question: "What's included in the tour price?",
          answer: "Our tour prices typically include: Accommodation, meals as specified in the itinerary, transportation within Spiti, professional English-speaking guides, all activities and entrance fees mentioned in the itinerary, and necessary permits. Excluded items usually are: Flights/transportation to the starting point, personal expenses, travel insurance, and activities marked as optional."
        },
        {
          question: "Can you accommodate dietary restrictions?",
          answer: "Yes, we can accommodate most dietary requirements including vegetarian, vegan, gluten-free, etc. Please inform us of any dietary restrictions when booking so we can make appropriate arrangements. Traditional Spitian cuisine is largely vegetarian anyway, with plenty of fresh, local ingredients."
        },
        {
          question: "Can I customize the itinerary?",
          answer: "Absolutely! We specialize in customized tours tailored to your interests, time constraints, and preferences. While we offer set itineraries, we're happy to adjust them or create a completely custom experience. Just let us know what you're looking for, and we'll design the perfect Spiti journey for you."
        }
      ]
    },
    {
      title: "Booking & Payment",
      faqs: [
        {
          question: "How far in advance should I book?",
          answer: "We recommend booking at least 2-3 months in advance, especially if you're traveling during the peak season (June-September). For customized tours or larger groups, earlier booking is better. However, we do accommodate last-minute bookings when possible, depending on availability."
        },
        {
          question: "What is the cancellation policy?",
          answer: "Our standard cancellation policy is: Full refund if cancelled 30+ days before the tour, 50% refund if cancelled 15-29 days before, and no refund if cancelled less than 15 days before. We recommend travel insurance to cover unexpected cancellations. Special terms may apply for certain tours or peak season bookings."
        },
        {
          question: "Do you offer group discounts?",
          answer: "Yes, we offer discounts for groups of 4 or more people. The exact discount depends on the tour, group size, and season. Contact us with your group details, and we'll provide a customized quote. We also occasionally offer early bird discounts and special promotions."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-spiti-forest to-spiti-blue/30">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 lg:pt-28">
        <div className="h-[40vh] md:h-[50vh] relative overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1531971085967-902433ecf68e?w=1600&q=80" 
            alt="Spiti Valley Mountains" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-spiti-forest/80 to-transparent"></div>
          <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Find answers to the most common questions about Spiti Valley and our tours.
            </p>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-6 md:p-8">
            {faqCategories.map((category, index) => (
              <div key={index} className="mb-10 last:mb-0">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <HelpCircle className="mr-2 text-spiti-green" />
                  {category.title}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.faqs.map((faq, faqIndex) => (
                    <AccordionItem key={faqIndex} value={`${category.title}-${faqIndex}`} className="border-white/20">
                      <AccordionTrigger className="text-white text-left hover:no-underline hover:text-spiti-green">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-white/80">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
            
            <div className="mt-12 text-center">
              <h3 className="text-xl font-semibold text-white mb-4">Still have questions?</h3>
              <p className="text-white/80 mb-6">
                Don't hesitate to reach out to us directly. We're here to help you plan your perfect Spiti Valley adventure.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-spiti-green to-spiti-blue hover:opacity-90">
                      Send an Inquiry
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <LeadForm />
                  </DialogContent>
                </Dialog>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-spiti-forest" asChild>
                  <a href="/contact">Contact Us</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default FAQ;
