#!/usr/bin/env node
/**
 * Quick test to check instructors table
 */

import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import { getInstructors, getTableData } from './src/lib/supabase/database'

async function testInstructors() {
  console.log('🧪 Testing Instructors Table\n')

  // Test 1: Using the getInstructors function
  console.log('1. Testing getInstructors() function:')
  const instructorsResult = await getInstructors()
  console.log('Result:', instructorsResult)
  console.log('')

  // Test 2: Direct table query
  console.log('2. Direct query to instructors table:')
  const directResult = await getTableData('instructors', 5)
  console.log('Result:', directResult)
  console.log('')

  // Test 3: Check table count
  console.log('3. Checking instructor count from dashboard:')
  try {
    const response = await fetch('http://localhost:3000/api/supabase/stats')
    const stats = await response.json()
    const instructorTable = stats.tables?.find((t: any) => t.name === 'instructors')
    console.log('Instructors table stats:', instructorTable)
  } catch (error) {
    console.error('Failed to fetch stats:', error)
  }
}

testInstructors().catch(console.error)