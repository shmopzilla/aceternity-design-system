import { NextResponse } from 'next/server'
import { getTableData, getTableSchema } from '@/lib/supabase/database'

export async function GET() {
  try {
    // Get disciplines table schema and data
    const { data: disciplinesSchema, error: disciplinesSchemaError } = await getTableSchema('disciplines')
    const { data: disciplinesData, error: disciplinesDataError } = await getTableData('disciplines', 20)

    // Get instructor_offer_disciplines schema and data
    const { data: offerDisciplinesSchema, error: offerDisciplinesSchemaError } = await getTableSchema('instructor_offer_disciplines')
    const { data: offerDisciplinesData, error: offerDisciplinesDataError } = await getTableData('instructor_offer_disciplines', 20)

    // Get instructor_offers data for context
    const { data: offersData, error: offersDataError } = await getTableData('instructor_offers', 10)

    return NextResponse.json({
      success: true,
      disciplines: {
        schema: disciplinesSchema || [],
        data: disciplinesData || [],
        error: disciplinesDataError?.message
      },
      instructor_offer_disciplines: {
        schema: offerDisciplinesSchema || [],
        data: offerDisciplinesData || [],
        error: offerDisciplinesDataError?.message
      },
      instructor_offers: {
        data: offersData || [],
        error: offersDataError?.message
      }
    })

  } catch (error: any) {
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}