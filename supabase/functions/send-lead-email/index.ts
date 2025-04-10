
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
        JSON.stringify({ error: "Email service is not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse and validate the request with minimal data processing
    const formData: LeadFormRequest = await req.json();
    const validationError = validateRequest(formData);
    if (validationError) {
      return validationError;
    }

    // Create email templates - simplified to reduce processing
    const { adminEmailHtml, customerEmailHtml } = createEmailTemplates(formData);
    
    // Send the emails using the available Resend clients
    const [adminEmailResult, customerEmailResult] = await Promise.all([
      sendAdminEmail(
        formData,
        adminEmailHtml,
        resend,
        resendAlternate,
        !!resendApiKey,
        !!resendApiKeyAlternate
      ),
      sendCustomerEmail(
        formData,
        customerEmailHtml,
        resend,
        resendAlternate,
        !!resendApiKey,
        !!resendApiKeyAlternate
      )
    ]);

    // Return minimal success response to reduce data transfer
    return new Response(
      JSON.stringify({ 
        success: true,
        adminEmailSent: adminEmailResult.sent,
        customerEmailSent: customerEmailResult.sent
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in send-lead-email function:", error);
    
    // Return minimal error response
    return new Response(
      JSON.stringify({ error: "Failed to send email" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);
