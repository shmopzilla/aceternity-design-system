import { NextResponse } from 'next/server'
import { getAllTableStats, testConnection } from '@/lib/supabase/database'

export async function GET() {
  try {
    // Test connection first
    const connectionResult = await testConnection()
    if (connectionResult.error) {
      return NextResponse.json(
        { error: 'Database connection failed', details: connectionResult.error.message },
        { status: 500 }
      )
    }

    // Get all table statistics
    const statsResult = await getAllTableStats()
    if (statsResult.error) {
      return NextResponse.json(
        { error: 'Failed to fetch table statistics', details: statsResult.error.message },
        { status: 500 }
      )
    }

    const stats = statsResult.data || []
    const totalTables = stats.length
    const totalRows = stats.reduce((sum, table) => sum + table.count, 0)

    return NextResponse.json({
      success: true,
      connection: true,
      totalTables,
      totalRows,
      tables: stats
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}