import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Operator {
  id: string;
  code: string;
  name: string;
  active: boolean;
  created_at: string;
}

export interface WarrantyTerm {
  id: string;
  invoice_number: string;
  operator_code: string;
  operator_name: string;
  customer_name: string;
  issue_date: string;
  entry_condition: string;
  services_performed: string;
  created_at: string;
}

export interface WarrantyProduct {
  id: string;
  warranty_term_id: string;
  brand: string;
  description: string;
  barcode: string;
  imei_serial: string;
  created_at: string;
}
