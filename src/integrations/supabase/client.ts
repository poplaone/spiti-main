
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://mptyirhfsbpyxdpboksg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wdHlpcmhmc2JweXhkcGJva3NnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2MjU4NDAsImV4cCI6MjA1OTIwMTg0MH0.X5Nb8j1cFbvnch3RGL2pMFH6PHaLEuosgEGg29pZOc8";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'spiti-admin-auth',
    storage: typeof window !== 'undefined' ? localStorage : undefined
  }
});
