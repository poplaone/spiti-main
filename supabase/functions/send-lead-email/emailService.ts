
import { Resend } from "npm:resend@2.0.0";
import { LeadFormRequest, EmailResult } from "./types.ts";

export async function sendAdminEmail(
  formData: LeadFormRequest,
  adminEmailHtml: string,
  resend: Resend,
  resendAlternate: Resend,
  primaryKeyAvailable: boolean,
  alternateKeyAvailable: boolean
): Promise<EmailResult> {
  console.log("Sending admin notification email to: spitivalleytravels@gmail.com");
  
  let adminEmailSent = false;
  let adminEmailError = null;
  
  // Try primary API key first
  if (primaryKeyAvailable) {
    try {
      const adminEmailResponse = await resend.emails.send({
        from: "Spiti Valley Travels <admin@spitivalleytravels.com>",
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
        from: "Spiti Valley Travels <admin@spitivalleytravels.com>",
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

  return {
    sent: adminEmailSent,
    error: adminEmailError ? adminEmailError.message || String(adminEmailError) : null
  };
}

export async function sendCustomerEmail(
  formData: LeadFormRequest,
  customerEmailHtml: string,
  resend: Resend,
  resendAlternate: Resend,
  primaryKeyAvailable: boolean,
  alternateKeyAvailable: boolean
): Promise<EmailResult> {
  console.log("Sending thank you email to customer:", formData.email);
  
  let customerEmailSent = false;
  let customerEmailError = null;
  
  // Try primary API key first
  if (primaryKeyAvailable) {
    try {
      const customerEmailResponse = await resend.emails.send({
        from: "Spiti Valley Travels <admin@spitivalleytravels.com>",
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
        from: "Spiti Valley Travels <admin@spitivalleytravels.com>",
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

  return {
    sent: customerEmailSent,
    error: customerEmailError ? customerEmailError.message || String(customerEmailError) : null
  };
}
