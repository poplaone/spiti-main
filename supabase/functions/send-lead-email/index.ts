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
  // Handle CORS preflight requests with minimal response
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Check if any API keys are available - minimize error message size
    if (!resend && !resendAlternate) {
      console.error("No Resend API keys configured");
      return new Response(
        JSON.stringify({ error: "Service unavailable" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse request with minimal processing
    const formData: LeadFormRequest = await req.json();
    const validationError = validateRequest(formData);
    if (validationError) {
      return validationError;
    }

    // Create email templates efficiently
    const { adminEmailHtml, customerEmailHtml } = createEmailTemplates(formData);
    
    // Send the emails using background tasks to allow quick response
    // This allows the function to return immediately while emails are sent
    const adminEmailPromise = sendAdminEmail(
      formData,
      adminEmailHtml,
      resend,
      resendAlternate,
      !!resendApiKey,
      !!resendApiKeyAlternate
    );
    
    const customerEmailPromise = sendCustomerEmail(
      formData,
      customerEmailHtml,
      resend,
      resendAlternate,
      !!resendApiKey,
      !!resendApiKeyAlternate
    );
    
    // Process emails in the background and return response immediately
    // This prevents keeping the connection open and consuming egress
    if (typeof EdgeRuntime !== 'undefined') {
      EdgeRuntime.waitUntil(Promise.all([adminEmailPromise, customerEmailPromise]));
      
      // Return minimal success response
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } else {
      // For environments without EdgeRuntime, wait for the emails
      const [adminEmailResult, customerEmailResult] = await Promise.all([
        adminEmailPromise,
        customerEmailPromise
      ]);
      
      // Return minimal success response
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Error in send-lead-email function:", error);
    
    // Return a minimal error response
    return new Response(
      JSON.stringify({ error: "Failed to process" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);
