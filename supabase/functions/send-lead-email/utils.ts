
import { LeadFormRequest } from "./types.ts";
import { validateLeadFormData, escapeHtml } from "./validation.ts";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

export function validateRequest(formData: LeadFormRequest) {
  const validation = validateLeadFormData(formData);
  
  if (!validation.isValid) {
    console.error("Validation failed:", validation.errors);
    return new Response(
      JSON.stringify({ 
        error: "Validation failed", 
        details: validation.errors 
      }),
      { 
        status: 400, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
  return null;
}

export function createEmailTemplates(formData: LeadFormRequest) {
  // Sanitize all user inputs to prevent XSS
  const safeName = escapeHtml(formData.name);
  const safeEmail = escapeHtml(formData.email);
  const safePhone = escapeHtml(formData.phone);
  const safeTravelDate = formData.travelDate ? escapeHtml(formData.travelDate) : "Not specified";
  const safeDuration = formData.duration ? escapeHtml(formData.duration) : "Not specified";
  const safeGuests = formData.guests ? escapeHtml(String(formData.guests)) : "Not specified";
  const tourType = [
    formData.isCustomized ? 'Customized' : '',
    formData.isFixedDeparture ? 'Fixed Departure' : ''
  ].filter(Boolean).join(', ') || 'Standard';
  
  // 1. Create admin notification email template with sanitized data
  const adminEmailHtml = `
    <h2>New Tour Inquiry from Website</h2>
    <p><strong>Name:</strong> ${safeName}</p>
    <p><strong>Email:</strong> ${safeEmail}</p>
    <p><strong>Phone:</strong> ${safePhone}</p>
    <p><strong>Travel Date:</strong> ${safeTravelDate}</p>
    <p><strong>Duration:</strong> ${safeDuration}</p>
    <p><strong>Number of Guests:</strong> ${safeGuests}</p>
    <p><strong>Tour Type:</strong> ${tourType}</p>
  `;
  
  // 2. Create customer thank you email template with sanitized data
  const customerEmailHtml = `
    <h2>Thank You for Your Interest in Spiti Valley Tours!</h2>
    <p>Dear ${safeName},</p>
    <p>Thank you for reaching out to us about your upcoming trip to Spiti Valley. We've received your inquiry and are excited to help you plan your adventure.</p>
    <p><strong>Your Request Details:</strong></p>
    <ul>
      <li><strong>Travel Date:</strong> ${safeTravelDate}</li>
      <li><strong>Duration:</strong> ${safeDuration}</li>
      <li><strong>Number of Guests:</strong> ${safeGuests}</li>
      <li><strong>Tour Type:</strong> ${tourType}</li>
    </ul>
    <p>One of our travel experts will contact you shortly to discuss your tour preferences and create a personalized itinerary for you.</p>
    <p>If you have any immediate questions, feel free to reply to this email or contact us directly at spitivalleytravels@gmail.com.</p>
    <p>Best regards,<br/>The Spiti Valley Travels Team</p>
  `;

  return { adminEmailHtml, customerEmailHtml };
}
