
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { corsHeaders, validateRequest, createEmailTemplates } from "./utils.ts";
import { sendAdminEmail, sendCustomerEmail } from "./emailService.ts";
import { LeadFormRequest } from "./types.ts";

// Initialize API keys from environment variables
const resendApiKey = Deno.env.get("RESEND_API_KEY");
const resendApiKeyAlternate = Deno.env.get("RESEND_API_KEY_ALTERNATE");

// Initialize Resend clients if API keys are available
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const resendAlternate = resendApiKeyAlternate ? new Resend(resendApiKeyAlternate) : null;

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Check if any API keys are available
    if (!resend && !resendAlternate) {
      console.error("No Resend API keys are configured!");
      return new Response(
        JSON.stringify({ 
          error: "Email service is not configured. Please set RESEND_API_KEY or RESEND_API_KEY_ALTERNATE in your environment." 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Parse and validate the request
    const formData: LeadFormRequest = await req.json();
    const validationError = validateRequest(formData);
    if (validationError) {
      return validationError;
    }

    console.log("Processing lead form submission for:", formData.name);
    console.log("Form data received:", JSON.stringify(formData));
    
    // Verify that API keys are available
    const primaryKeyAvailable = !!resendApiKey;
    const alternateKeyAvailable = !!resendApiKeyAlternate;
    
    console.log("API Key Status - Primary:", primaryKeyAvailable ? "Available" : "Missing");
    console.log("API Key Status - Alternate:", alternateKeyAvailable ? "Available" : "Missing");
    
    // Create email templates
    const { adminEmailHtml, customerEmailHtml } = createEmailTemplates(formData);
    
    // Send the emails using the available Resend clients
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
