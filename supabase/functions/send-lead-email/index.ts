
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

// Initialize primary Resend client
const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
// Initialize alternate Resend client as fallback
const resendAlternate = new Resend(Deno.env.get("RESEND_API_KEY_ALTERNATE"));

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
      console.error("Missing required fields in form data:", formData);
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    console.log("Processing lead form submission for:", formData.name);
    console.log("Form data received:", JSON.stringify(formData));
    
    // Verify that API keys are available
    const primaryKeyAvailable = !!Deno.env.get("RESEND_API_KEY");
    const alternateKeyAvailable = !!Deno.env.get("RESEND_API_KEY_ALTERNATE");
    
    console.log("API Key Status - Primary:", primaryKeyAvailable ? "Available" : "Missing");
    console.log("API Key Status - Alternate:", alternateKeyAvailable ? "Available" : "Missing");
    
    if (!primaryKeyAvailable && !alternateKeyAvailable) {
      console.error("No Resend API keys are available!");
      return new Response(
        JSON.stringify({ error: "Email service configuration error" }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
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
    
    let adminEmailSent = false;
    let adminEmailError = null;
    
    // Try primary API key first
    if (primaryKeyAvailable) {
      try {
        const adminEmailResponse = await resend.emails.send({
          from: "Spiti Valley Travels <onboarding@resend.dev>",
          to: "spitivalleytravels@gmail.com",
          subject: `New Tour Inquiry - ${formData.name}`,
          html: adminEmailHtml,
          reply_to: formData.email
        });
        
        console.log("Admin email response (primary):", JSON.stringify(adminEmailResponse));
        
        if (adminEmailResponse.error) {
          console.error("Resend API returned an error:", adminEmailResponse.error);
          adminEmailError = adminEmailResponse.error;
        } else {
          adminEmailSent = true;
        }
      } catch (primaryEmailError) {
        console.error("Error sending admin email with primary key:", primaryEmailError);
        adminEmailError = primaryEmailError;
      }
    }
    
    // Try with alternate API key if primary failed
    if (!adminEmailSent && alternateKeyAvailable) {
      try {
        console.log("Attempting to send admin email with alternate API key");
        const alternateAdminEmailResponse = await resendAlternate.emails.send({
          from: "Spiti Valley Travels <onboarding@resend.dev>",
          to: "spitivalleytravels@gmail.com",
          subject: `New Tour Inquiry - ${formData.name}`,
          html: adminEmailHtml,
          reply_to: formData.email
        });
        
        console.log("Admin email response (alternate):", JSON.stringify(alternateAdminEmailResponse));
        
        if (alternateAdminEmailResponse.error) {
          console.error("Alternate Resend API returned an error:", alternateAdminEmailResponse.error);
          adminEmailError = alternateAdminEmailResponse.error;
        } else {
          adminEmailSent = true;
        }
      } catch (alternateEmailError) {
        console.error("Error sending admin email with alternate key:", alternateEmailError);
        adminEmailError = adminEmailError || alternateEmailError;
      }
    }
    
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
    
    let customerEmailSent = false;
    let customerEmailError = null;
    
    // Try primary API key first
    if (primaryKeyAvailable) {
      try {
        const customerEmailResponse = await resend.emails.send({
          from: "Spiti Valley Travels <onboarding@resend.dev>",
          to: formData.email,
          subject: "Thank You for Your Spiti Valley Tour Inquiry",
          html: customerEmailHtml,
          reply_to: "spitivalleytravels@gmail.com"
        });
        
        console.log("Customer email response (primary):", JSON.stringify(customerEmailResponse));
        
        if (customerEmailResponse.error) {
          console.error("Resend API returned an error:", customerEmailResponse.error);
          customerEmailError = customerEmailResponse.error;
        } else {
          customerEmailSent = true;
        }
      } catch (primaryEmailError) {
        console.error("Error sending customer email with primary key:", primaryEmailError);
        customerEmailError = primaryEmailError;
      }
    }
    
    // Try with alternate API key if primary failed
    if (!customerEmailSent && alternateKeyAvailable) {
      try {
        console.log("Attempting to send customer email with alternate API key");
        const alternateCustomerEmailResponse = await resendAlternate.emails.send({
          from: "Spiti Valley Travels <onboarding@resend.dev>",
          to: formData.email,
          subject: "Thank You for Your Spiti Valley Tour Inquiry",
          html: customerEmailHtml,
          reply_to: "spitivalleytravels@gmail.com"
        });
        
        console.log("Customer email response (alternate):", JSON.stringify(alternateCustomerEmailResponse));
        
        if (alternateCustomerEmailResponse.error) {
          console.error("Alternate Resend API returned an error:", alternateCustomerEmailResponse.error);
          customerEmailError = alternateCustomerEmailResponse.error;
        } else {
          customerEmailSent = true;
        }
      } catch (alternateEmailError) {
        console.error("Error sending customer email with alternate key:", alternateEmailError);
        customerEmailError = customerEmailError || alternateEmailError;
      }
    }

    // Return success response with information about email delivery status
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Lead form submitted successfully",
        adminEmailSent,
        customerEmailSent,
        adminEmailError: adminEmailError ? adminEmailError.message || String(adminEmailError) : null,
        customerEmailError: customerEmailError ? customerEmailError.message || String(customerEmailError) : null
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
