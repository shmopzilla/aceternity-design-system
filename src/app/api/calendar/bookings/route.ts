import { NextResponse } from 'next/server'
import { getBookingItemsServer } from '@/lib/supabase/server-database'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const instructorId = searchParams.get('instructorId')
    const startDate = searchParams.get('startDate') 
    const endDate = searchParams.get('endDate')
    
    console.log('API: Fetching booking items with params:', { 
      instructorId, 
      startDate, 
      endDate 
    })
    
    const { data, error } = await getBookingItemsServer(
      instructorId || undefined,
      startDate || undefined, 
      endDate || undefined
    )
    
    if (error) {
      console.error('API: Failed to fetch booking items:', error)
      return NextResponse.json(
        { error: 'Failed to fetch booking items', details: error.message },
        { status: 500 }
      )
    }

    console.log(`API: Found ${data?.length || 0} booking items`)
    
    return NextResponse.json({
      success: true,
      data: data || [],
      count: data?.length || 0,
      params: { instructorId, startDate, endDate }
    })
    
  } catch (error: any) {
    console.error('API: Error in bookings endpoint:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}