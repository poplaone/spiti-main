import { LeadFormRequest } from "./types.ts";

// HTML escape function to prevent XSS
export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Validation schema
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+()0-9\s-]+$/;

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateLeadFormData(formData: LeadFormRequest): ValidationResult {
  const errors: string[] = [];

  // Validate required fields exist
  if (!formData.name || !formData.email || !formData.phone) {
    errors.push("Missing required fields: name, email, or phone");
    return { isValid: false, errors };
  }

  // Validate name
  const name = formData.name.trim();
  if (name.length === 0) {
    errors.push("Name cannot be empty");
  } else if (name.length > 100) {
    errors.push("Name must be less than 100 characters");
  }

  // Validate email
  const email = formData.email.trim();
  if (!EMAIL_REGEX.test(email)) {
    errors.push("Invalid email format");
  } else if (email.length > 255) {
    errors.push("Email must be less than 255 characters");
  }

  // Validate phone
  const phone = formData.phone.trim();
  if (!PHONE_REGEX.test(phone)) {
    errors.push("Invalid phone format - only numbers, spaces, +, -, and () allowed");
  } else if (phone.length > 20) {
    errors.push("Phone number must be less than 20 characters");
  }

  // Validate optional fields if present
  if (formData.travelDate && formData.travelDate.length > 50) {
    errors.push("Travel date must be less than 50 characters");
  }

  if (formData.duration && formData.duration.length > 50) {
    errors.push("Duration must be less than 50 characters");
  }

  if (formData.guests && (typeof formData.guests !== 'number' || formData.guests < 1 || formData.guests > 100)) {
    errors.push("Number of guests must be between 1 and 100");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
