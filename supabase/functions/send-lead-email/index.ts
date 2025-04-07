
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

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

    // Format email content
    const emailSubject = `New Tour Inquiry from Website - ${formData.name}`;
    const emailContent = `
      <h2>New Tour Inquiry</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone:</strong> ${formData.phone}</p>
      <p><strong>Travel Date:</strong> ${formData.travelDate || "Not specified"}</p>
      <p><strong>Duration:</strong> ${formData.duration || "Not specified"}</p>
      <p><strong>Number of Guests:</strong> ${formData.guests}</p>
      <p><strong>Tour Type:</strong> ${formData.isCustomized ? 'Customized' : ''} ${formData.isFixedDeparture ? 'Fixed Departure' : ''}</p>
    `;

    // Send email using a service like EmailJS or Resend
    // This is a simplified example - in a real implementation, you would
    // use an email service API like Resend, SendGrid, or EmailJS
    
    // For now, we'll use the Email API from emailjs.com as a basic example
    const emailJsEndpoint = "https://api.emailjs.com/api/v1.0/email/send";
    const emailJsData = {
      service_id: Deno.env.get("EMAILJS_SERVICE_ID"),
      template_id: Deno.env.get("EMAILJS_TEMPLATE_ID"),
      user_id: Deno.env.get("EMAILJS_USER_ID"),
      template_params: {
        to_email: "spitivalleytravels@gmail.com,himalayanfootslog@gmail.com",
        subject: emailSubject,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        travel_date: formData.travelDate || "Not specified",
        duration: formData.duration || "Not specified",
        guests: formData.guests,
        tour_type: `${formData.isCustomized ? 'Customized' : ''} ${formData.isFixedDeparture ? 'Fixed Departure' : ''}`,
        message_html: emailContent
      }
    };
    
    const emailResponse = await fetch(emailJsEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(emailJsData)
    });
    
    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      console.error("Email service error:", errorData);
      throw new Error(`Email service responded with ${emailResponse.status}: ${errorData}`);
    }

    console.log("Email sent successfully");

    // Return success response
    return new Response(
      JSON.stringify({ success: true, message: "Lead form submitted successfully" }),
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
