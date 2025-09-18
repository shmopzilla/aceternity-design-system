import { NextResponse } from 'next/server'
import { getInstructorDisciplinesServer } from '@/lib/supabase/server-database'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const instructorId = searchParams.get('instructorId')

    if (!instructorId) {
      return NextResponse.json(
        { error: 'instructorId parameter is required' },
        { status: 400 }
      )
    }

    console.log('API: Fetching disciplines for instructor:', instructorId)

    const { data, error } = await getInstructorDisciplinesServer(instructorId)

    if (error) {
      console.error('API: Failed to fetch instructor disciplines:', error)
      return NextResponse.json(
        { error: 'Failed to fetch instructor disciplines', details: error.message },
        { status: 500 }
      )
    }

    console.log(`API: Found ${data?.length || 0} disciplines for instructor`)

    return NextResponse.json({
      success: true,
      data: data || [],
      count: data?.length || 0,
      instructorId
    })

  } catch (error: any) {
    console.error('API: Error in disciplines endpoint:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}