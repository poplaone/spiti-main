
export interface LeadFormRequest {
  name: string;
  email: string;
  phone: string;
  travelDate?: string;
  duration: string;
  guests: string;
  isCustomized: boolean;
  isFixedDeparture: boolean;
}

export interface EmailResult {
  sent: boolean;
  error: string | null;
}
