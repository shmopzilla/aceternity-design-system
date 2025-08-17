import { supabase } from './client';

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      locations: {
        Row: {
          id: string;
          name: string;
          country: string;
          country_code: string;
          average_price: number;
          image_url: string;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          country: string;
          country_code: string;
          average_price: number;
          image_url: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          country?: string;
          country_code?: string;
          average_price?: number;
          image_url?: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      sport_options: {
        Row: {
          id: string;
          name: string;
          icon: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          icon: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          icon?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      sport_disciplines: {
        Row: {
          id: string;
          name: string;
          image_url: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          image_url: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          image_url?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

export async function getUsers() {
  if (!supabase) {
    return { data: null, error: new Error('Supabase not configured') };
  }
  
  const { data, error } = await supabase
    .from('users')
    .select('*');
  
  return { data, error };
}

export async function getUserById(id: string) {
  if (!supabase) {
    return { data: null, error: new Error('Supabase not configured') };
  }
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();
  
  return { data, error };
}

export async function createUser(user: Database['public']['Tables']['users']['Insert']) {
  if (!supabase) {
    return { data: null, error: new Error('Supabase not configured') };
  }
  
  const { data, error } = await supabase
    .from('users')
    .insert(user)
    .select()
    .single();
  
  return { data, error };
}

export async function updateUser(id: string, updates: Database['public']['Tables']['users']['Update']) {
  if (!supabase) {
    return { data: null, error: new Error('Supabase not configured') };
  }
  
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  return { data, error };
}

export async function deleteUser(id: string) {
  if (!supabase) {
    return { data: null, error: new Error('Supabase not configured') };
  }
  
  const { data, error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);
  
  return { data, error };
}

// Location functions
export async function getLocations() {
  if (!supabase) {
    return { data: null, error: new Error('Supabase not configured') };
  }
  
  const { data, error } = await supabase
    .from('locations')
    .select('*')
    .order('name');
  
  return { data, error };
}

export async function getLocationById(id: string) {
  if (!supabase) {
    return { data: null, error: new Error('Supabase not configured') };
  }
  
  const { data, error } = await supabase
    .from('locations')
    .select('*')
    .eq('id', id)
    .single();
  
  return { data, error };
}

export async function searchLocations(query: string) {
  if (!supabase) {
    return { data: null, error: new Error('Supabase not configured') };
  }
  
  const { data, error } = await supabase
    .from('locations')
    .select('*')
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .order('name')
    .limit(6);
  
  return { data, error };
}

// Sport Options functions
export async function getSportOptions() {
  if (!supabase) {
    return { data: null, error: new Error('Supabase not configured') };
  }
  
  const { data, error } = await supabase
    .from('sport_options')
    .select('*')
    .order('name');
  
  return { data, error };
}

// Sport Disciplines functions
export async function getSportDisciplines() {
  if (!supabase) {
    return { data: null, error: new Error('Supabase not configured') };
  }
  
  const { data, error } = await supabase
    .from('sport_disciplines')
    .select('*')
    .order('name');
  
  return { data, error };
}