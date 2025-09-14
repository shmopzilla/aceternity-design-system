import { supabaseServer } from './server-client'
import type { SupabaseResponse } from './types'

/**
 * Server-side database functions using service role key
 * These functions bypass RLS and have full database access
 * ⚠️ Only use in API routes and server components - never expose to client
 */

export async function getInstructorsServer(): Promise<SupabaseResponse<any[]>> {
  try {
    const { data, error } = await supabaseServer
      .from('instructors')
      .select('*')
      .order('first_name')

    if (error) {
      console.error('Server: Failed to fetch instructors:', error)
      return { data: null, error }
    }

    return { data: data || [], error: null }
  } catch (error) {
    console.error('Server: Error fetching instructors:', error)
    return { data: null, error: error as Error }
  }
}

export async function getBookingItemsServer(
  instructorId?: string, 
  startDate?: string, 
  endDate?: string
): Promise<SupabaseResponse<any[]>> {
  try {
    let query = supabaseServer
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

    const { data, error } = await query.order('date', { ascending: true })

    if (error) {
      console.error('Server: Failed to fetch booking items:', error)
      return { data: null, error }
    }

    return { data: data || [], error: null }
  } catch (error) {
    console.error('Server: Error fetching booking items:', error)
    return { data: null, error: error as Error }
  }
}

export async function getInstructorBookingStats(instructorId: string): Promise<SupabaseResponse<any>> {
  try {
    // Get booking count for instructor
    const { count: bookingCount, error: bookingError } = await supabaseServer
      .from('booking_items')
      .select('*', { count: 'exact', head: true })
      .eq('bookings.instructor_id', instructorId)

    if (bookingError) {
      return { data: null, error: bookingError }
    }

    // Get date range of bookings
    const { data: dateRange, error: dateError } = await supabaseServer
      .from('booking_items')
      .select('date')
      .eq('bookings.instructor_id', instructorId)
      .order('date', { ascending: true })
      .limit(1)

    const { data: dateRangeEnd, error: dateEndError } = await supabaseServer
      .from('booking_items')
      .select('date')
      .eq('bookings.instructor_id', instructorId)
      .order('date', { ascending: false })
      .limit(1)

    return { 
      data: {
        bookingCount: bookingCount || 0,
        earliestBooking: dateRange?.[0]?.date || null,
        latestBooking: dateRangeEnd?.[0]?.date || null
      }, 
      error: null 
    }
  } catch (error) {
    console.error('Server: Error fetching instructor stats:', error)
    return { data: null, error: error as Error }
  }
}