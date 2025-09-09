#!/usr/bin/env node
/**
 * Test script for Supabase MCP integration
 * Run with: npx tsx test-supabase-mcp.ts
 */

import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import { getTables, getTableData, getTableSchema, testConnection } from './src/lib/supabase/database'

async function runTests() {
  console.log('🚀 Testing Supabase MCP Integration\n')


  // Test 1: Connection
  console.log('1. Testing connection...')
  const connectionTest = await testConnection()
  if (connectionTest.error) {
    console.error('❌ Connection failed:', connectionTest.error.message)
    return
  }
  console.log('✅ Connection successful!\n')

  // Test 2: List tables
  console.log('2. Fetching tables...')
  const tablesResult = await getTables()
  if (tablesResult.error) {
    console.error('❌ Failed to fetch tables:', tablesResult.error.message)
    return
  }
  
  const tables = tablesResult.data || []
  console.log(`✅ Found ${tables.length} tables:`)
  // Show first 10 tables to avoid too much output
  tables.slice(0, 10).forEach(table => console.log(`   - ${table}`))
  if (tables.length > 10) {
    console.log(`   ... and ${tables.length - 10} more`)
  }
  console.log('')

  // Test 3: Sample data from first few tables
  if (tables.length > 0) {
    const firstTable = tables[0]
    console.log(`3. Fetching sample data from "${firstTable}"...`)
    
    const schemaResult = await getTableSchema(firstTable)
    if (!schemaResult.error && schemaResult.data) {
      console.log(`   Schema for ${firstTable}:`)
      schemaResult.data.forEach(col => {
        console.log(`   - ${col.column_name}: ${col.data_type}`)
      })
    }

    const dataResult = await getTableData(firstTable, 3)
    if (dataResult.error) {
      console.error(`❌ Failed to fetch data from ${firstTable}:`, dataResult.error.message)
    } else {
      const data = dataResult.data || []
      console.log(`✅ Sample data (${data.length} rows):`)
      data.forEach((row, i) => {
        console.log(`   Row ${i + 1}:`, JSON.stringify(row, null, 2))
      })
    }
  }

  console.log('\n🎉 Supabase MCP integration test completed!')
}

// Run tests
runTests().catch(console.error)