// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ttyhfrbubjpmzruwwihd.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0eWhmcmJ1YmpwbXpydXd3aWhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3Mzk4MTgsImV4cCI6MjA1OTMxNTgxOH0.tv8W6Hb7f3RdqnYs-LqgxeA3gXUJgIDVnnOtzcdVSno";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);