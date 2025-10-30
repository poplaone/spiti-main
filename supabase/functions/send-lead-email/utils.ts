
import { LeadFormRequest } from "./types.ts";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// HTML escape function to prevent XSS
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

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

  // Validate field lengths
  if (formData.name.length > 100) {
    return new Response(
      JSON.stringify({ error: "Name must be less than 100 characters" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  if (formData.email.length > 255) {
    return new Response(
      JSON.stringify({ error: "Email must be less than 255 characters" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  if (formData.phone.length > 20) {
    return new Response(
      JSON.stringify({ error: "Phone must be less than 20 characters" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    return new Response(
      JSON.stringify({ error: "Invalid email format" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // Validate phone format (allow digits, spaces, parentheses, plus, and hyphens)
  const phoneRegex = /^[+()0-9\s-]+$/;
  if (!phoneRegex.test(formData.phone)) {
    return new Response(
      JSON.stringify({ error: "Invalid phone format" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  return null;
}

export function createEmailTemplates(formData: LeadFormRequest) {
  // Escape all user inputs to prevent XSS
  const safeName = escapeHtml(formData.name);
  const safeEmail = escapeHtml(formData.email);
  const safePhone = escapeHtml(formData.phone);
  const safeTravelDate = escapeHtml(formData.travelDate || "Not specified");
  const safeDuration = escapeHtml(formData.duration || "Not specified");
  const safeGuests = escapeHtml(String(formData.guests));
  const tourType = [
    formData.isCustomized ? 'Customized' : '',
    formData.isFixedDeparture ? 'Fixed Departure' : ''
  ].filter(Boolean).join(' ') || 'Standard';
  const safeTourType = escapeHtml(tourType);

  // 1. Create admin notification email template
  const adminEmailHtml = `
    <h2>New Tour Inquiry from Website</h2>
    <p><strong>Name:</strong> ${safeName}</p>
    <p><strong>Email:</strong> ${safeEmail}</p>
    <p><strong>Phone:</strong> ${safePhone}</p>
    <p><strong>Travel Date:</strong> ${safeTravelDate}</p>
    <p><strong>Duration:</strong> ${safeDuration}</p>
    <p><strong>Number of Guests:</strong> ${safeGuests}</p>
    <p><strong>Tour Type:</strong> ${safeTourType}</p>
  `;
  
  // 2. Create customer thank you email template
  const customerEmailHtml = `
    <h2>Thank You for Your Interest in Spiti Valley Tours!</h2>
    <p>Dear ${safeName},</p>
    <p>Thank you for reaching out to us about your upcoming trip to Spiti Valley. We've received your inquiry and are excited to help you plan your adventure.</p>
    <p><strong>Your Request Details:</strong></p>
    <ul>
      <li><strong>Travel Date:</strong> ${safeTravelDate}</li>
      <li><strong>Duration:</strong> ${safeDuration}</li>
      <li><strong>Number of Guests:</strong> ${safeGuests}</li>
      <li><strong>Tour Type:</strong> ${safeTourType}</li>
    </ul>
    <p>One of our travel experts will contact you shortly to discuss your tour preferences and create a personalized itinerary for you.</p>
    <p>If you have any immediate questions, feel free to reply to this email or contact us directly at spitivalleytravels@gmail.com.</p>
    <p>Best regards,<br/>The Spiti Valley Travels Team</p>
  `;

  return { adminEmailHtml, customerEmailHtml };
}
