#!/usr/bin/env node
/**
 * Test script to investigate calendar-related tables
 * Run with: npx tsx test-calendar-tables.ts
 */

import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import { getTableSchema, getTableData, getSupabaseClient } from './src/lib/supabase/database'

async function investigateTables() {
  console.log('🔍 Investigating Calendar Tables Structure\n')

  // 1. Check bookings table
  console.log('1. BOOKINGS TABLE SCHEMA:')
  console.log('=' .repeat(50))
  
  const bookingsSchema = await getTableSchema('bookings')
  if (bookingsSchema.data) {
    bookingsSchema.data.forEach(col => {
      console.log(`  ${col.column_name}: ${col.data_type}`)
    })
  }

  console.log('\nSample bookings data:')
  const bookingsData = await getTableData('bookings', 3)
  if (bookingsData.data) {
    bookingsData.data.forEach((row: any, i: number) => {
      console.log(`\nRow ${i + 1}:`)
      console.log('  ID:', row.id)
      console.log('  Start Date:', row.start_date)
      console.log('  End Date:', row.end_date)
      console.log('  Instructor ID:', row.instructor_id)
      console.log('  Customer ID:', row.customer_id)
    })
  }

  // 2. Check booking_items table  
  console.log('\n\n2. BOOKING_ITEMS TABLE SCHEMA:')
  console.log('=' .repeat(50))
  
  const bookingItemsSchema = await getTableSchema('booking_items')
  if (bookingItemsSchema.data) {
    bookingItemsSchema.data.forEach(col => {
      console.log(`  ${col.column_name}: ${col.data_type}`)
    })
  }

  console.log('\nSample booking_items data:')
  const bookingItemsData = await getTableData('booking_items', 3)
  if (bookingItemsData.data) {
    bookingItemsData.data.forEach((row: any, i: number) => {
      console.log(`\nRow ${i + 1}:`)
      console.log('  ID:', row.id)
      console.log('  Booking ID:', row.booking_id)
      console.log('  Booking Slot ID:', row.booking_slot_id)
      console.log('  Start Time:', row.start_time)
      console.log('  End Time:', row.end_time)
      console.log('  Date:', row.date)
    })
  }

  // 3. Check booking_slots table
  console.log('\n\n3. BOOKING_SLOTS TABLE SCHEMA:')
  console.log('=' .repeat(50))
  
  const bookingSlotsSchema = await getTableSchema('booking_slots')
  if (bookingSlotsSchema.data) {
    bookingSlotsSchema.data.forEach(col => {
      console.log(`  ${col.column_name}: ${col.data_type}`)
    })
  }

  console.log('\nSample booking_slots data:')
  const bookingSlotsData = await getTableData('booking_slots', 3)
  if (bookingSlotsData.data) {
    bookingSlotsData.data.forEach((row: any, i: number) => {
      console.log(`\nRow ${i + 1}:`)
      console.log('  ID:', row.id)
      console.log('  Instructor ID:', row.instructor_id)
      console.log('  Start Time:', row.start_time)
      console.log('  End Time:', row.end_time)
      if (row.day_slot_id) console.log('  Day Slot ID:', row.day_slot_id)
    })
  }

  // 4. Check instructors table
  console.log('\n\n4. INSTRUCTORS TABLE SCHEMA:')
  console.log('=' .repeat(50))
  
  const instructorsSchema = await getTableSchema('instructors')
  if (instructorsSchema.data) {
    const relevantCols = instructorsSchema.data.filter(col => 
      ['id', 'first_name', 'last_name', 'email'].includes(col.column_name)
    )
    relevantCols.forEach(col => {
      console.log(`  ${col.column_name}: ${col.data_type}`)
    })
  }

  console.log('\nSample instructors data:')
  const instructorsData = await getTableData('instructors', 3)
  if (instructorsData.data) {
    instructorsData.data.forEach((row: any, i: number) => {
      console.log(`\nInstructor ${i + 1}:`)
      console.log('  ID:', row.id)
      console.log('  Name:', `${row.first_name} ${row.last_name}`)
    })
  }

  // 5. Check day_slots table (referenced by booking_slots)
  console.log('\n\n5. DAY_SLOTS TABLE SCHEMA:')
  console.log('=' .repeat(50))
  
  const daySlotsSchema = await getTableSchema('day_slots')
  if (daySlotsSchema.data) {
    daySlotsSchema.data.forEach(col => {
      console.log(`  ${col.column_name}: ${col.data_type}`)
    })
  }

  console.log('\nSample day_slots data:')
  const daySlotsData = await getTableData('day_slots', 5)
  if (daySlotsData.data && daySlotsData.data.length > 0) {
    daySlotsData.data.forEach((row: any, i: number) => {
      console.log(`\nSlot ${i + 1}:`)
      console.log('  ID:', row.id)
      console.log('  Start Time:', row.start_time)
      console.log('  End Time:', row.end_time)
      console.log('  Name:', row.name)
    })
  } else {
    console.log('  No data found or empty table')
  }

  console.log('\n✅ Investigation complete!')
}

// Run investigation
investigateTables().catch(console.error)