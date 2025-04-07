
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { corsHeaders, validateRequest, createEmailTemplates } from "./utils.ts";
import { sendAdminEmail, sendCustomerEmail } from "./emailService.ts";
import { LeadFormRequest } from "./types.ts";

// Initialize primary Resend client
const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
// Initialize alternate Resend client as fallback
const resendAlternate = new Resend(Deno.env.get("RESEND_API_KEY_ALTERNATE"));

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse and validate the request
    const formData: LeadFormRequest = await req.json();
    const validationError = validateRequest(formData);
    if (validationError) {
      return validationError;
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
    
    // Create email templates
    const { adminEmailHtml, customerEmailHtml } = createEmailTemplates(formData);
    
    // Send the emails
    const adminEmailResult = await sendAdminEmail(
      formData,
      adminEmailHtml,
      resend,
      resendAlternate,
      primaryKeyAvailable,
      alternateKeyAvailable
    );
    
    const customerEmailResult = await sendCustomerEmail(
      formData,
      customerEmailHtml,
      resend,
      resendAlternate,
      primaryKeyAvailable,
      alternateKeyAvailable
    );

    // Return success response with information about email delivery status
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Lead form submitted successfully",
        adminEmailSent: adminEmailResult.sent,
        customerEmailSent: customerEmailResult.sent,
        adminEmailError: adminEmailResult.error ? adminEmailResult.error : null,
        customerEmailError: customerEmailResult.error ? customerEmailResult.error : null
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
