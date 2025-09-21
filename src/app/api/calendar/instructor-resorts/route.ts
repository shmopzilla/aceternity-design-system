import { NextRequest, NextResponse } from 'next/server'
import { getInstructorResorts } from '@/lib/supabase/server-database'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const instructorId = searchParams.get('instructorId')

    if (!instructorId) {
      return NextResponse.json(
        { error: 'Missing instructorId parameter' },
        { status: 400 }
      )
    }

    console.log('API: Fetching resorts for instructor:', instructorId)

    const result = await getInstructorResorts(instructorId)

    if (result.error) {
      console.error('API: Database error:', result.error)
      return NextResponse.json(
        {
          error: 'Failed to fetch instructor resorts',
          details: result.error
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      data: result.data,
      count: result.data?.length || 0
    })

  } catch (error: any) {
    console.error('API: Unexpected error in instructor-resorts:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error.message
      },
      { status: 500 }
    )
  }
}