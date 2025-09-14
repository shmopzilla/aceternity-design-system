"use client"

import { useState, useEffect } from 'react'
import { CalendarDay } from "@/components/calendar/CalendarDay"
import { getBookingItems, getInstructors } from "@/lib/supabase/database"
import type { BookingItem } from "@/lib/calendar/types"

// Mock data for testing the CalendarDay component (fallback)
const mockBookingItems: BookingItem[] = [
  // Day 8 - Morning and Afternoon booked
  {
    id: 1,
    booking_id: 100,
    booking_slot_id: 1001,
    day_slot_id: 2, // Morning
    date: "2024-12-08",
    start_time: "09:00",
    end_time: "12:00",
    total_minutes: 180,
    hourly_rate: 50,
    offer_id: 1,
    created_at: "2024-12-01T00:00:00Z"
  },
  {
    id: 2,
    booking_id: 101,
    booking_slot_id: 1002,
    day_slot_id: 4, // Afternoon
    date: "2024-12-08",
    start_time: "14:00",
    end_time: "17:00",
    total_minutes: 180,
    hourly_rate: 50,
    offer_id: 1,
    created_at: "2024-12-01T00:00:00Z"
  },
  // Day 15 - Full day booked
  {
    id: 3,
    booking_id: 102,
    booking_slot_id: 1003,
    day_slot_id: 1, // Full day
    date: "2024-12-15",
    start_time: "09:00",
    end_time: "17:00",
    total_minutes: 480,
    hourly_rate: 40,
    offer_id: 1,
    created_at: "2024-12-01T00:00:00Z"
  },
  // Day 22 - Lunch slot only
  {
    id: 4,
    booking_id: 103,
    booking_slot_id: 1004,
    day_slot_id: 3, // Lunch
    date: "2024-12-22",
    start_time: "12:00",
    end_time: "13:30",
    total_minutes: 90,
    hourly_rate: 45,
    offer_id: 1,
    created_at: "2024-12-01T00:00:00Z"
  }
]

export default function CalendarTestPage() {
  const [realBookingItems, setRealBookingItems] = useState<any[]>([])
  const [instructors, setInstructors] = useState<any[]>([])
  const [selectedInstructor, setSelectedInstructor] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usingMockData, setUsingMockData] = useState(false)

  // Add timeout to prevent infinite loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading) {
        console.log('Loading timeout - falling back to mock data')
        setError('Loading timeout - using mock data')
        setUsingMockData(true)
        setLoading(false)
      }
    }, 10000) // 10 second timeout

    return () => clearTimeout(timeout)
  }, [loading])

  // Fetch instructors via API (server-side with service role)
  useEffect(() => {
    async function fetchInstructors() {
      console.log('Fetching instructors via API...')
      try {
        const response = await fetch('/api/calendar/instructors')
        const result = await response.json()
        console.log('API Instructors result:', result)
        
        if (!response.ok) {
          console.error('API Failed to fetch instructors:', result.error)
          setError('Failed to fetch instructors: ' + (result.details || result.error))
          setUsingMockData(true)
          setLoading(false)
        } else if (result.data && result.data.length > 0) {
          console.log('Found instructors via API:', result.data)
          setInstructors(result.data)
          setSelectedInstructor(result.data[0].id) // Select first instructor
        } else {
          console.log('No instructors found via API, using mock data')
          setError('No instructors found - using mock data')
          setUsingMockData(true)
          setLoading(false)
        }
      } catch (err: any) {
        console.error('Error fetching instructors via API:', err)
        setError('Error fetching instructors - using mock data')
        setUsingMockData(true)
        setLoading(false)
      }
    }
    fetchInstructors()
  }, [])

  // Fetch booking items via API when instructor changes
  useEffect(() => {
    async function fetchBookingItems() {
      if (!selectedInstructor) {
        console.log('No instructor selected, skipping booking fetch')
        return
      }
      
      console.log('Fetching booking items via API for instructor:', selectedInstructor)
      setLoading(true)
      setError(null)
      
      try {
        // Get current month date range
        const now = new Date()
        const startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]
        const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0]
        
        console.log('Date range:', { startDate, endDate })
        
        const url = `/api/calendar/bookings?instructorId=${selectedInstructor}&startDate=${startDate}&endDate=${endDate}`
        const response = await fetch(url)
        const result = await response.json()
        console.log('API Booking items result:', result)
        
        if (!response.ok) {
          console.error('API Failed to fetch booking items:', result.error)
          setError('Failed to fetch booking items: ' + (result.details || result.error))
          setRealBookingItems([])
          setUsingMockData(true)
        } else {
          console.log('Found booking items via API:', result.count)
          setRealBookingItems(result.data || [])
          setUsingMockData((result.data?.length || 0) === 0)
        }
      } catch (err: any) {
        console.error('Error fetching booking items via API:', err)
        setError('Error fetching booking items - using mock data')
        setRealBookingItems([])
        setUsingMockData(true)
      }
      setLoading(false)
    }
    
    fetchBookingItems()
  }, [selectedInstructor])

  // Use real data if available, otherwise fall back to mock data
  const bookingItemsToUse = usingMockData ? mockBookingItems : realBookingItems

  return (
    <div className="min-h-screen bg-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Calendar Day Component Test</h1>
          <p className="text-gray-400">
            Testing the CalendarDay component with {usingMockData ? 'mock' : 'real Supabase'} data
            {usingMockData && ' (no instructors found in database)'}
          </p>
          
          {/* Instructor Selector */}
          {instructors.length > 0 && (
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Select Instructor:</label>
              <select 
                value={selectedInstructor} 
                onChange={(e) => setSelectedInstructor(e.target.value)}
                className="bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600"
              >
                {instructors.map((instructor) => (
                  <option key={instructor.id} value={instructor.id}>
                    {instructor.first_name} {instructor.last_name} ({instructor.id.substring(0, 8)})
                  </option>
                ))}
              </select>
            </div>
          )}
          
          {/* Status Display */}
          <div className="mt-4 flex items-center gap-4 text-sm">
            <div className={`px-3 py-1 rounded-full ${loading ? 'bg-yellow-500/20 text-yellow-300' : 'bg-green-500/20 text-green-300'}`}>
              {loading ? 'Loading...' : 'Ready'}
            </div>
            <div className="text-gray-400">
              Found {bookingItemsToUse.length} booking items
            </div>
            {error && <div className="text-red-400">{error}</div>}
          </div>
        </div>

        {/* Legend */}
        <div className="mb-8 p-4 bg-white/5 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Legend:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-2 bg-[#050506] rounded"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-2 bg-[#8CDBFB] rounded"></div>
              <span>Booked</span>
            </div>
            <div className="text-[#8CDBFB]">● Today</div>
            <div className="opacity-50">○ Other Month</div>
          </div>
          <div className="mt-3 text-xs text-gray-400">
            Slots: Morning | Lunch | Afternoon | Evening
          </div>
        </div>

        {/* Test Cases Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          
          {/* Test Case 1: No bookings */}
          <div className="text-center">
            <div className="w-16 h-20 mx-auto mb-2">
              <CalendarDay
                date="2024-12-01"
                dayNumber={1}
                bookingItems={mockBookingItems}
                isCurrentMonth={true}
                isToday={false}
                onClick={() => console.log('Clicked day 1')}
              />
            </div>
            <p className="text-xs text-gray-400">No bookings</p>
          </div>

          {/* Real Data Test Cases - Generate calendar days for current month */}
          {!loading && bookingItemsToUse.length > 0 && (
            <>
              {/* Show days with actual bookings */}
              {Array.from(new Set(bookingItemsToUse.map(item => item.date))).slice(0, 6).map((date, index) => {
                const dayNumber = parseInt(date.split('-')[2], 10)
                const isToday = new Date().toISOString().split('T')[0] === date
                return (
                  <div key={date} className="text-center">
                    <div className="w-16 h-20 mx-auto mb-2">
                      <CalendarDay
                        date={date}
                        dayNumber={dayNumber}
                        bookingItems={bookingItemsToUse}
                        isCurrentMonth={true}
                        isToday={isToday}
                        onClick={() => console.log('Clicked day', dayNumber, 'bookings:', bookingItemsToUse.filter(item => item.date === date))}
                      />
                    </div>
                    <p className="text-xs text-gray-400">Day {dayNumber} - Real Data</p>
                  </div>
                )
              })}
            </>
          )}

          {/* Fallback to mock data examples if no real data */}
          {(loading || bookingItemsToUse.length === 0) && (
            <>
              {/* Test Case 2: Morning + Afternoon booked */}
              <div className="text-center">
                <div className="w-16 h-20 mx-auto mb-2">
                  <CalendarDay
                    date="2024-12-08"
                    dayNumber={8}
                    bookingItems={mockBookingItems}
                    isCurrentMonth={true}
                    isToday={true}
                    onClick={() => console.log('Clicked day 8')}
                  />
                </div>
                <p className="text-xs text-gray-400">Morning + Afternoon</p>
              </div>

              {/* Test Case 3: Full day booked */}
              <div className="text-center">
                <div className="w-16 h-20 mx-auto mb-2">
                  <CalendarDay
                    date="2024-12-15"
                    dayNumber={15}
                    bookingItems={mockBookingItems}
                    isCurrentMonth={true}
                    isToday={false}
                    onClick={() => console.log('Clicked day 15')}
                  />
                </div>
                <p className="text-xs text-gray-400">Full day</p>
              </div>

              {/* Test Case 4: Lunch only */}
              <div className="text-center">
                <div className="w-16 h-20 mx-auto mb-2">
                  <CalendarDay
                    date="2024-12-22"
                    dayNumber={22}
                    bookingItems={mockBookingItems}
                    isCurrentMonth={true}
                    isToday={false}
                    onClick={() => console.log('Clicked day 22')}
                  />
                </div>
                <p className="text-xs text-gray-400">Lunch only</p>
              </div>
            </>
          )}

          {/* Test Case 5: Previous month */}
          <div className="text-center">
            <div className="w-16 h-20 mx-auto mb-2">
              <CalendarDay
                date="2024-11-30"
                dayNumber={30}
                bookingItems={mockBookingItems}
                isCurrentMonth={false}
                isToday={false}
                onClick={() => console.log('Clicked day 30')}
              />
            </div>
            <p className="text-xs text-gray-400">Previous month</p>
          </div>

          {/* Test Case 6: Next month */}
          <div className="text-center">
            <div className="w-16 h-20 mx-auto mb-2">
              <CalendarDay
                date="2025-01-01"
                dayNumber={1}
                bookingItems={mockBookingItems}
                isCurrentMonth={false}
                isToday={false}
                onClick={() => console.log('Clicked day 1')}
              />
            </div>
            <p className="text-xs text-gray-400">Next month</p>
          </div>
        </div>

        {/* Data Display */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold mb-4">
            {usingMockData ? 'Mock' : 'Real'} Booking Data {!usingMockData && selectedInstructor && `for ${instructors.find(i => i.id === selectedInstructor)?.first_name}`}:
          </h3>
          <div className="bg-white/5 rounded-lg p-4 overflow-x-auto">
            <pre className="text-xs text-gray-300">
              {JSON.stringify(bookingItemsToUse.slice(0, 5), null, 2)}
              {bookingItemsToUse.length > 5 && `\n... and ${bookingItemsToUse.length - 5} more items`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}