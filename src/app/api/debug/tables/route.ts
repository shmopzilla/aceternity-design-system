import { NextResponse } from 'next/server'
import { getTables } from '@/lib/supabase/database'

export async function GET() {
  try {
    const { data: tables, error } = await getTables()

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch tables', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      tables: tables || [],
      count: tables?.length || 0
    })

  } catch (error: any) {
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}