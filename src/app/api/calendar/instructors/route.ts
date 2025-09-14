import { NextResponse } from 'next/server'
import { getInstructorsServer } from '@/lib/supabase/server-database'

export async function GET() {
  try {
    console.log('API: Fetching instructors with service role...')
    
    const { data, error } = await getInstructorsServer()
    
    if (error) {
      console.error('API: Failed to fetch instructors:', error)
      return NextResponse.json(
        { error: 'Failed to fetch instructors', details: error.message },
        { status: 500 }
      )
    }

    console.log(`API: Found ${data?.length || 0} instructors`)
    
    return NextResponse.json({
      success: true,
      data: data || [],
      count: data?.length || 0
    })
    
  } catch (error: any) {
    console.error('API: Error in instructors endpoint:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}