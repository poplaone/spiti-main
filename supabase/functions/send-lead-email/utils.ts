
import { LeadFormRequest } from "./types.ts";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

export function validateRequest(formData: LeadFormRequest) {
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
  return null;
}

export function createEmailTemplates(formData: LeadFormRequest) {
  // 1. Create admin notification email template
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
  
  // 2. Create customer thank you email template
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

  return { adminEmailHtml, customerEmailHtml };
}
