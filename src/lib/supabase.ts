import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface Registration {
  id: string;
  email: string;
  name: string;
  country: string;
  language: string;
  skin_type?: string;
  quiz_result?: any;
  created_at: string;
}
