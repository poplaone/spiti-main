
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LeadFormRequest {
  name: string;
  email: string;
  phone: string;
  travelDate?: string;
  duration: string;
  guests: string;
  isCustomized: boolean;
  isFixedDeparture: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: LeadFormRequest = await req.json();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    console.log("Processing lead form submission for:", formData.name);
    
    // 1. Send notification email to business owner
    const adminEmailHtml = `
      <h2>New Tour Inquiry from Website</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone:</strong> ${formData.phone}</p>
      <p><strong>Travel Date:</strong> ${formData.travelDate || "Not specified"}</p>
      <p><strong>Duration:</strong> ${formData.duration || "Not specified"}</p>
      <p><strong>Number of Guests:</strong> ${formData.guests}</p>
      <p><strong>Tour Type:</strong> ${formData.isCustomized ? 'Customized' : ''} ${formData.isFixedDeparture ? 'Fixed Departure' : ''}</p>
    `;
    
    console.log("Sending admin notification email to: spitivalleytravels@gmail.com");
    
    const adminEmailResponse = await resend.emails.send({
      from: "Spiti Valley Travels <onboarding@resend.dev>",
      to: "spitivalleytravels@gmail.com",
      subject: `New Tour Inquiry - ${formData.name}`,
      html: adminEmailHtml,
      reply_to: formData.email
    });
    
    console.log("Admin email response:", adminEmailResponse);
    
    // 2. Send thank you email to the customer
    const customerEmailHtml = `
      <h2>Thank You for Your Interest in Spiti Valley Tours!</h2>
      <p>Dear ${formData.name},</p>
      <p>Thank you for reaching out to us about your upcoming trip to Spiti Valley. We've received your inquiry and are excited to help you plan your adventure.</p>
      <p><strong>Your Request Details:</strong></p>
      <ul>
        <li><strong>Travel Date:</strong> ${formData.travelDate || "Not specified"}</li>
        <li><strong>Duration:</strong> ${formData.duration || "Not specified"}</li>
        <li><strong>Number of Guests:</strong> ${formData.guests}</li>
        <li><strong>Tour Type:</strong> ${formData.isCustomized ? 'Customized' : ''} ${formData.isFixedDeparture ? 'Fixed Departure' : ''}</li>
      </ul>
      <p>One of our travel experts will contact you shortly to discuss your tour preferences and create a personalized itinerary for you.</p>
      <p>If you have any immediate questions, feel free to reply to this email or contact us directly at spitivalleytravels@gmail.com.</p>
      <p>Best regards,<br/>The Spiti Valley Travels Team</p>
    `;
    
    console.log("Sending thank you email to customer:", formData.email);
    
    const customerEmailResponse = await resend.emails.send({
      from: "Spiti Valley Travels <onboarding@resend.dev>",
      to: formData.email,
      subject: "Thank You for Your Spiti Valley Tour Inquiry",
      html: customerEmailHtml,
      reply_to: "spitivalleytravels@gmail.com"
    });
    
    console.log("Customer email response:", customerEmailResponse);

    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Lead form submitted successfully",
        adminEmail: adminEmailResponse,
        customerEmail: customerEmailResponse
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Error in send-lead-email function:", error);
    
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send email" }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
};

serve(handler);
