import { NextRequest, NextResponse } from 'next/server'
import { getInstructorOffersServer } from '@/lib/supabase/server-database'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const instructorId = searchParams.get('instructorId')

    if (!instructorId) {
      return NextResponse.json(
        { error: 'instructorId parameter is required' },
        { status: 400 }
      )
    }

    console.log('API: Fetching offers for instructor:', instructorId)

    const { data, error } = await getInstructorOffersServer(instructorId)

    if (error) {
      console.error('API: Failed to fetch instructor offers:', JSON.stringify(error))
      return NextResponse.json(
        {
          error: 'Failed to fetch instructor offers',
          details: error.message
        },
        { status: 500 }
      )
    }

    console.log('API: Instructor offers result:', data)

    return NextResponse.json({
      data,
      success: true
    })

  } catch (error) {
    console.error('API: Error in offers endpoint:', JSON.stringify(error))
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}