import { getSupabaseClient } from './client'
import type { SupabaseResponse } from './types'

export async function getTables(): Promise<SupabaseResponse<string[]>> {
  const supabase = getSupabaseClient()
  if (!supabase) {
    return { data: null, error: new Error('Supabase not configured') }
  }

  try {
    // Get table list from REST API schema
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseKey) {
      return { data: null, error: new Error('Missing Supabase credentials') }
    }
    
    const schemaUrl = `${supabaseUrl}/rest/v1/?apikey=${supabaseKey}`
    const response = await fetch(schemaUrl, {
      headers: {
        'Accept': 'application/json',
        'apikey': supabaseKey
      }
    })
    
    if (!response.ok) {
      return { data: null, error: new Error(`REST API request failed: ${response.status}`) }
    }
    
    const schema = await response.json()
    const tableNames = schema.definitions ? Object.keys(schema.definitions) : []
    
    return { data: tableNames, error: null }
  } catch (error) {
    return { data: null, error: error as Error }
  }
}

export async function getTableData<T = any>(tableName: string, limit = 10): Promise<SupabaseResponse<T[]>> {
  const supabase = getSupabaseClient()
  if (!supabase) {
    return { data: null, error: new Error('Supabase not configured') }
  }

  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .limit(limit)

    if (error) {
      return { data: null, error }
    }

    return { data: data as T[], error: null }
  } catch (error) {
    return { data: null, error: error as Error }
  }
}

export async function getTableSchema(tableName: string): Promise<SupabaseResponse<any[]>> {
  const supabase = getSupabaseClient()
  if (!supabase) {
    return { data: null, error: new Error('Supabase not configured') }
  }

  try {
    // Get schema info from REST API
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseKey) {
      return { data: null, error: new Error('Missing Supabase credentials') }
    }
    
    const schemaUrl = `${supabaseUrl}/rest/v1/?apikey=${supabaseKey}`
    const response = await fetch(schemaUrl, {
      headers: {
        'Accept': 'application/json',
        'apikey': supabaseKey
      }
    })
    
    if (!response.ok) {
      return { data: null, error: new Error(`REST API request failed: ${response.status}`) }
    }
    
    const schema = await response.json()
    const tableSchema = schema.definitions?.[tableName]
    
    if (!tableSchema || !tableSchema.properties) {
      return { data: [], error: null }
    }
    
    const columns = Object.entries(tableSchema.properties).map(([name, def]: [string, any]) => ({
      column_name: name,
      data_type: def.type || 'unknown',
      is_nullable: !tableSchema.required?.includes(name)
    }))
    
    return { data: columns, error: null }
  } catch (error) {
    return { data: null, error: error as Error }
  }
}

export async function getTableCount(tableName: string): Promise<SupabaseResponse<number>> {
  const supabase = getSupabaseClient()
  if (!supabase) {
    return { data: 0, error: new Error('Supabase not configured') }
  }

  try {
    const { count, error } = await supabase
      .from(tableName)
      .select('*', { count: 'exact', head: true })

    if (error) {
      return { data: 0, error }
    }

    return { data: count || 0, error: null }
  } catch (error) {
    return { data: 0, error: error as Error }
  }
}

export async function getAllTableStats(): Promise<SupabaseResponse<{ name: string; count: number }[]>> {
  const tablesResult = await getTables()
  if (tablesResult.error || !tablesResult.data) {
    return { data: null, error: tablesResult.error }
  }

  const tables = tablesResult.data
  const stats: { name: string; count: number }[] = []

  for (const table of tables) {
    const countResult = await getTableCount(table)
    stats.push({
      name: table,
      count: countResult.data || 0
    })
  }

  return { data: stats, error: null }
}

export async function getBookingItems(instructorId?: string, startDate?: string, endDate?: string): Promise<SupabaseResponse<any[]>> {
  const supabase = getSupabaseClient()
  if (!supabase) {
    return { data: null, error: new Error('Supabase not configured') }
  }

  try {
    let query = supabase
      .from('booking_items')
      .select(`
        id,
        booking_id,
        booking_slot_id,
        day_slot_id,
        date,
        start_time,
        end_time,
        total_minutes,
        hourly_rate,
        offer_id,
        created_at,
        bookings!inner(instructor_id, customer_id, start_date, end_date)
      `)

    // Filter by instructor if provided
    if (instructorId) {
      query = query.eq('bookings.instructor_id', instructorId)
    }

    // Filter by date range if provided
    if (startDate) {
      query = query.gte('date', startDate)
    }
    if (endDate) {
      query = query.lte('date', endDate)
    }

    const { data, error } = await query

    if (error) {
      return { data: null, error }
    }

    return { data: data || [], error: null }
  } catch (error) {
    return { data: null, error: error as Error }
  }
}

export async function getInstructors(): Promise<SupabaseResponse<any[]>> {
  const supabase = getSupabaseClient()
  if (!supabase) {
    return { data: null, error: new Error('Supabase not configured') }
  }

  try {
    const { data, error } = await supabase
      .from('instructors')
      .select('id, first_name, last_name')
      .limit(10)

    if (error) {
      return { data: null, error }
    }

    return { data: data || [], error: null }
  } catch (error) {
    return { data: null, error: error as Error }
  }
}

export async function testConnection(): Promise<SupabaseResponse<boolean>> {
  const supabase = getSupabaseClient()
  if (!supabase) {
    return { data: false, error: new Error('Supabase not configured') }
  }

  try {
    const tablesResult = await getTables()
    return { data: !tablesResult.error, error: tablesResult.error }
  } catch (error) {
    return { data: false, error: error as Error }
  }
}