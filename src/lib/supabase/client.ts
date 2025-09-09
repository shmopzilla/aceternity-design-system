import { createClient } from '@supabase/supabase-js'

let _supabase: any = null
let _initialized = false

export function getSupabaseClient() {
  if (_initialized) return _supabase
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  
  _supabase = supabaseUrl && supabaseAnonKey 
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null
    
  _initialized = true
  return _supabase
}

// Don't initialize immediately - wait for environment to be loaded
export const supabase = null

export default supabase