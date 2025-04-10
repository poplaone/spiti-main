import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LeadForm from "@/components/LeadForm";
import { Button } from "@/components/ui/button";
import { HelpCircle } from 'lucide-react';

const FAQ = () => {
  const faqCategories = [{
    title: "General Information",
    faqs: [{
      question: "Where is Spiti Valley?",
      answer: "Spiti is a cold desert region in Himachal Pradesh, the northern state of India. Spiti is famous for its high altitude villages, 1000 years old monasteries and its beautiful landscapes. The name \"SPITI\" means \"the middle land\" i.e. the land between India and Tibet."
    }, {
      question: "What is Spiti Valley famous for?",
      answer: "Spiti Valley, the \"Middle Land\" between India and Tibet, is famous for its landscapes, monasteries, and road journeys. Every day, you'll spend around 6-7 hours on the road, driving through mountains, deep valleys, and breathtaking scenery while stopping for sightseeing. It's perfect for adventure lovers, offering trekking, biking, and off-roading. Chandratal Lake, monasteries like Key and Tabo, and villages like Hikkim, Komic, and Langza add to its charm and make this journey even more memorable with warm local culture, delicious food, and rare wildlife, Spiti valley roadtrip is an unforgettable experience."
    }, {
      question: "Must visit places in Spiti Valley?",
      answer: "Spiti as a region has lots of beautiful places to visit, we suggest minimum 08 days itinerary to cover major places: Kaza (headquarter of Spiti), Key Monastery (oldest and biggest monastery), Langza (Fossil Village with large Buddha statue), Hikkim (world's highest post office at 14,400 ft), Komic (one of the highest motorable villages at 15,500 ft), Dhankar Monastery & Dhankar Lake, Pin Valley National Park, Chandratal Lake (\"Moon Lake\"), Gue Village (famous for 500-year-old naturally mummified monk), Chicham Bridge (Asia's highest altitude suspension bridge), and Tabo Monastery (1,000 years old, known as the \"Ajanta of the Himalayas\")."
    }, {
      question: "Is Spiti worth visiting?",
      answer: "Spiti Valley is a hidden gem for nature lovers, adventure seekers, and culture enthusiasts. It's perfect for those who love exploring new cultures and experiencing offbeat destinations. Spiti Valley has stunning landscapes with barren mountains, deep gorges, and beautiful lakes like Chandratal and Dhankar. The journey is an adventure with scenic road trips, trekking, camping, and biking. Rich in Tibetan culture, it's home to ancient monasteries like Key, Tabo, and Dhankar. Villages like Hikkim, Komic, and Langza make it even more special. With rare wildlife and untouched beauty, Spiti is a peaceful, offbeat getaway."
    }]
  }, {
    title: "Travel & Accessibility",
    faqs: [{
      question: "Do travelers need a permit to visit Spiti Valley?",
      answer: "No permit is required for Indian citizens to visit Spiti Valley. For foreign nationals, a permit is mandatory to visit regions near the border."
    }, {
      question: "How long does it take to reach Kaza from major starting points?",
      answer: "You can reach Spiti via two routes: Through Manali route via Kunzum Pass (9-10 Hours, 200 Kms) – Opens only in summer as Kunzum Pass remains closed for 6 months due to heavy snow in winter. Through Shimla Route via Kinnaur (15-16 Hours, 420 Kms) – Open throughout the year but winter snowfall may cause temporary closures."
    }, {
      question: "What are the road conditions in Spiti Valley?",
      answer: "The roads in Spiti valley differ depending on the season, weather and places. There are two main routes: The Manali to Kaza route is rough, with unpaved roads, water crossings, and landslide-prone sections. It is best traveled between June and October, as it remains closed in winter due to heavy snowfall at Kunzum Pass. This route is challenging, with river crossings and steep inclines, making it ideal for SUVs and bikes with good ground clearance. The Shimla to Kaza route is in better condition, with a mix of paved and broken roads. It remains open throughout the year, though snowfall in winter can cause temporary closures. Monsoon landslides and icy roads in winter can make certain sections tricky, especially from Nako to Kaza."
    }, {
      question: "What is the best route to reach Spiti Valley?",
      answer: "Starting your trip through Shimla helps your body adjust to the high altitude, making it a safer and more comfortable journey. Returning through Gramphu-Batal road, Atal tunnel and Manali lets you enjoy the adventure and stunning landscapes without worrying too much about altitude problems."
    }, {
      question: "Are there direct flights to Spiti Valley?",
      answer: "There are no direct flights to Spiti Valley. It can only be reached by road via the two main routes from Manali and Shimla."
    }]
  }, {
    title: "Health & Safety",
    faqs: [{
      question: "How does high altitude affect travelers in Spiti Valley, and what medical facilities are available?",
      answer: "Spiti valley is at an altitude of 3,000 to 4,500 meters which can cause Acute Mountain Sickness (Altitude Sickness) if you ascend too quickly. Common symptoms include headache, nausea, dizziness, breathlessness, and fatigue. To prevent AMS, it's important to acclimatize by staying a night at a lower altitude and stay hydrated, avoid alcohol, and carry Diamox (only after consulting a doctor). If symptoms get worse, descending immediately is the best option. Medical facilities in Spiti are limited. Kaza Hospital provides basic treatment, while better medical care is available at hospitals in Reckong Peo and Manali. Some homestays also keep oxygen cylinders for emergencies. Since Spiti is a remote region, carrying personal medicines and traveling prepared is always a good idea."
    }, {
      question: "What essential items should you carry for a trip to Spiti Valley?",
      answer: "Packing smart is the key for Spiti's remote terrain and extreme weather. Carry important documents like ID proof, vehicle papers, and permits (foreign nationals need an Inner Line Permit). Layered clothing is a must, including thermals, warm jackets, gloves, and sturdy trekking shoes. Bring basic medicines for altitude sickness, headaches, nausea, and first-aid essentials. Sunscreen, sunglasses, and moisturizers help with the harsh weather. Pack power banks and a flashlight since electricity and network can be unreliable. Carry snacks, a reusable water bottle, and ORS for hydration. If driving, bring a spare tire, fuel, and a puncture kit as petrol pumps are scarce. ATMs are limited, so keep enough cash. With the right preparation, your Spiti adventure will be smooth and enjoyable."
    }, {
      question: "Can we drink alcohol in Spiti Valley?",
      answer: "While alcohol is legally permitted in Spiti valley but not widely available, there are limited options in places like Kaza. You can drink alcohol in Spiti Valley, but due to the high altitude, alcohol can dehydrate you quickly which can cause altitude sickness, so drink in moderation. Also, Spiti has a strong Buddhist influence, so it's best to avoid drinking in public or near monasteries. Plus, the cold weather can make alcohol consumption riskier as it lowers body temperature. Stay hydrated and drink responsibly."
    }]
  }, {
    title: "Facilities & Connectivity",
    faqs: [{
      question: "Are ATMs available in Spiti Valley?",
      answer: "Yes, ATMs are available in Spiti valley, mainly in Kaza where you'll find SBI and UCO Bank ATMs. Some ATMs are also in Tabo but options outside Kaza are limited. While these ATMs usually work, they may sometimes run out of cash due to high tourist demand and occasional network or power issues. It's a good idea to withdraw enough cash before reaching Spiti valley, from Manali, Shimla, or Reckong Peo, just to be on the safe side. Carrying smaller amounts of cash is helpful, as cash is still widely used. Although, UPI payments are available in almost every hotel, cafés, and shops in Kaza, making transactions easier."
    }, {
      question: "Is mobile network and internet available in Spiti Valley?",
      answer: "Jio has improved its coverage in Spiti Valley, especially along the main roads and in Kaza. While BSNL was traditionally the only reliable option, Jio's network in Spiti operates through network relays (microwave transmission) rather than physical towers in most areas. This means Jio's connectivity is better along the main roads but can still be unreliable in remote villages. Airtel also works in Kaza but is weaker in remote areas, while Vi (Vodafone-Idea) has almost no coverage."
    }]
  }, {
    title: "Tour Details",
    faqs: [{
      question: "What type of accommodation can I expect?",
      answer: "We offer a range of accommodations depending on the tour and your preferences: Homestays with local families for an authentic experience, comfortable guesthouses and hotels in towns, and camping in remote areas with full camping equipment provided. All accommodations are clean, comfortable, and carefully selected for quality and authentic experiences."
    }, {
      question: "What's included in the tour price?",
      answer: "Our tour prices typically include: Accommodation, meals as specified in the itinerary, transportation within Spiti, professional English-speaking guides, all activities and entrance fees mentioned in the itinerary, and necessary permits. Excluded items usually are: Flights/transportation to the starting point, personal expenses, travel insurance, and activities marked as optional."
    }, {
      question: "Can you accommodate dietary restrictions?",
      answer: "Yes, we can accommodate most dietary requirements including vegetarian, vegan, gluten-free, etc. Please inform us of any dietary restrictions when booking so we can make appropriate arrangements. Traditional Spitian cuisine is largely vegetarian anyway, with plenty of fresh, local ingredients."
    }, {
      question: "Can I customize the itinerary?",
      answer: "Absolutely! We specialize in customized tours tailored to your interests, time constraints, and preferences. While we offer set itineraries, we're happy to adjust them or create a completely custom experience. Just let us know what you're looking for, and we'll design the perfect Spiti journey for you."
    }]
  }, {
    title: "Booking & Payment",
    faqs: [{
      question: "How far in advance should I book?",
      answer: "We recommend booking at least 2-3 months in advance, especially if you're traveling during the peak season (June-September). For customized tours or larger groups, earlier booking is better. However, we do accommodate last-minute bookings when possible, depending on availability."
    }, {
      question: "What is the cancellation policy?",
      answer: "Our standard cancellation policy is: Full refund if cancelled 30+ days before the tour, 50% refund if cancelled 15-29 days before, and no refund if cancelled less than 15 days before. We recommend travel insurance to cover unexpected cancellations. Special terms may apply for certain tours or peak season bookings."
    }, {
      question: "Do you offer group discounts?",
      answer: "Yes, we offer discounts for groups of 4 or more people. The exact discount depends on the tour, group size, and season. Contact us with your group details, and we'll provide a customized quote. We also occasionally offer early bird discounts and special promotions."
    }]
  }];
  
  return <div className="min-h-screen bg-gradient-to-b from-spiti-forest to-spiti-blue/30">
      <Header />
      
      {/* Simple Header Section */}
      <section className="relative pt-20 lg:pt-28 pb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-center">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto text-center">
            Find answers to the most common questions about Spiti Valley and our tours.
          </p>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-6 md:p-8">
            {faqCategories.map((category, index) => <div key={index} className="mb-10 last:mb-0">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <HelpCircle className="mr-2 text-spiti-green" />
                  {category.title}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.faqs.map((faq, faqIndex) => <AccordionItem key={faqIndex} value={`${category.title}-${faqIndex}`} className="border-white/20">
                      <AccordionTrigger className="text-white text-left hover:no-underline hover:text-spiti-green">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-white/80">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>)}
                </Accordion>
              </div>)}
            
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
                  
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>;
};

export default FAQ;
