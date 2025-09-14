"use client"

import { useState, useEffect } from 'react'
import { Calendar } from "@/components/calendar/Calendar"
import { AvailabilitySummary } from "@/components/calendar/AvailabilitySummary"
import { exportCalendarData } from "@/lib/calendar/export"
import type { BookingItem } from "@/lib/calendar/types"

// Mock data for testing (same as the day component test)
const mockBookingItems: BookingItem[] = [
  // Day 8 - Morning and Afternoon booked
  {
    id: 1,
    booking_id: 100,
    booking_slot_id: 1001,
    day_slot_id: 2, // Morning
    date: "2025-09-08",
    start_time: "09:00",
    end_time: "12:00",
    total_minutes: 180,
    hourly_rate: 50,
    offer_id: 1,
    created_at: "2025-09-01T00:00:00Z"
  },
  {
    id: 2,
    booking_id: 101,
    booking_slot_id: 1002,
    day_slot_id: 4, // Afternoon
    date: "2025-09-08",
    start_time: "14:00",
    end_time: "17:00",
    total_minutes: 180,
    hourly_rate: 50,
    offer_id: 1,
    created_at: "2025-09-01T00:00:00Z"
  },
  // Day 15 - Full day booked
  {
    id: 3,
    booking_id: 102,
    booking_slot_id: 1003,
    day_slot_id: 1, // Full day
    date: "2025-09-15",
    start_time: "09:00",
    end_time: "17:00",
    total_minutes: 480,
    hourly_rate: 40,
    offer_id: 1,
    created_at: "2025-09-01T00:00:00Z"
  },
  // Day 22 - Lunch slot only
  {
    id: 4,
    booking_id: 103,
    booking_slot_id: 1004,
    day_slot_id: 3, // Lunch
    date: "2025-09-22",
    start_time: "12:00",
    end_time: "13:30",
    total_minutes: 90,
    hourly_rate: 45,
    offer_id: 1,
    created_at: "2025-09-01T00:00:00Z"
  }
]

export default function FullCalendarTestPage() {
  const [realBookingItems, setRealBookingItems] = useState<any[]>([])
  const [instructors, setInstructors] = useState<any[]>([])
  const [selectedInstructor, setSelectedInstructor] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usingMockData, setUsingMockData] = useState(false)
  const [selectionMode, setSelectionMode] = useState<'single' | 'range'>('single')
  const [selectedRange, setSelectedRange] = useState<{ startDate: string | null; endDate: string | null }>({
    startDate: null,
    endDate: null
  })

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

  // Handle day click (single mode)
  const handleDayClick = (date: string, dayNumber: number) => {
    const dayBookings = bookingItemsToUse.filter(item => item.date === date)
    console.log(`Clicked day ${dayNumber} (${date}):`, dayBookings)
    
    if (dayBookings.length > 0) {
      alert(`Day ${dayNumber} has ${dayBookings.length} booking(s)`)
    } else {
      alert(`Day ${dayNumber} is available`)
    }
  }

  // Handle range selection
  const handleRangeSelect = (startDate: string, endDate: string) => {
    setSelectedRange({ startDate, endDate })
    console.log(`Range selected: ${startDate} to ${endDate}`)
  }

  // Clear selection
  const clearSelection = () => {
    setSelectedRange({ startDate: null, endDate: null })
  }

  // Export handlers
  const handleExport = (format: 'csv' | 'json' | 'ics') => {
    const instructorName = selectedInstructor && instructors.length > 0
      ? instructors.find(i => i.id === selectedInstructor)?.first_name + ' ' + instructors.find(i => i.id === selectedInstructor)?.last_name
      : 'Instructor'

    exportCalendarData(
      bookingItemsToUse,
      format,
      selectedRange.startDate || undefined,
      selectedRange.endDate || undefined,
      instructorName
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Full Calendar Component</h1>
          <p className="text-gray-400">
            Testing the full Calendar component with {usingMockData ? 'mock' : 'real Supabase'} data
            {usingMockData && ' (no instructors found in database)'}
          </p>
          
          {/* Controls */}
          <div className="mt-6 space-y-4">
            {/* Instructor Selector */}
            {instructors.length > 0 && (
              <div className="flex items-center justify-center gap-4">
                <label className="text-sm font-medium">Select Instructor:</label>
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

            {/* Selection Mode Toggle */}
            <div className="flex items-center justify-center gap-4">
              <label className="text-sm font-medium">Selection Mode:</label>
              <div className="flex bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => {
                    setSelectionMode('single')
                    clearSelection()
                  }}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    selectionMode === 'single' 
                      ? 'bg-[#8CDBFB] text-black' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Single Day
                </button>
                <button
                  onClick={() => {
                    setSelectionMode('range')
                    clearSelection()
                  }}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    selectionMode === 'range' 
                      ? 'bg-[#8CDBFB] text-black' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Date Range
                </button>
              </div>
              
              {/* Clear Selection Button */}
              {(selectedRange.startDate || selectedRange.endDate) && (
                <button
                  onClick={clearSelection}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
          
          {/* Status Display */}
          <div className="mt-4 flex items-center justify-center gap-4 text-sm">
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
        <div className="mb-8 p-6 bg-white/5 rounded-lg max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold mb-4 text-center">Legend:</h3>
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
          <div className="mt-3 text-xs text-gray-400 text-center">
            Slots: Morning | Lunch | Afternoon | Evening • Click any day to see bookings
          </div>
        </div>

        {/* Calendar and Availability Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-start">
          {/* Full Calendar Component */}
          <div className="flex justify-center">
            <Calendar
              bookingItems={bookingItemsToUse}
              onDayClick={selectionMode === 'single' ? handleDayClick : undefined}
              onRangeSelect={selectionMode === 'range' ? handleRangeSelect : undefined}
              selectionMode={selectionMode}
              className="w-full max-w-[600px] sm:h-[600px] h-[500px]"
            />
          </div>

          {/* Availability Summary */}
          <div className="space-y-6">
            {selectionMode === 'range' && selectedRange.startDate && selectedRange.endDate && (
              <AvailabilitySummary
                startDate={selectedRange.startDate}
                endDate={selectedRange.endDate}
                bookingItems={bookingItemsToUse}
              />
            )}
            
            {/* Selection Instructions */}
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="text-white font-medium mb-2">How to use:</h4>
              <div className="text-gray-400 text-sm space-y-1">
                {selectionMode === 'single' ? (
                  <p>Click any day to see its booking details.</p>
                ) : (
                  <div>
                    <p>• Click a date to set the start of your range</p>
                    <p>• Click another date to complete the range</p>
                    <p>• Click a third time to start a new selection</p>
                    <p>• View availability summary on the right</p>
                  </div>
                )}
              </div>
            </div>

            {/* Range Status */}
            {selectionMode === 'range' && (
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="text-white font-medium mb-2">Selection Status:</h4>
                <div className="text-gray-400 text-sm">
                  {!selectedRange.startDate && "No dates selected"}
                  {selectedRange.startDate && !selectedRange.endDate && (
                    <>Start: <span className="text-[#8CDBFB]">{new Date(selectedRange.startDate).toLocaleDateString()}</span><br/>Click another date to complete range</>
                  )}
                  {selectedRange.startDate && selectedRange.endDate && (
                    <>
                      <span className="text-[#8CDBFB]">{new Date(selectedRange.startDate).toLocaleDateString()}</span>
                      {" → "}
                      <span className="text-[#8CDBFB]">{new Date(selectedRange.endDate).toLocaleDateString()}</span>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Export Calendar Data */}
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="text-white font-medium mb-3">Export Calendar Data:</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  onClick={() => handleExport('csv')}
                  className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
                  disabled={bookingItemsToUse.length === 0}
                >
                  📊 CSV
                </button>
                <button
                  onClick={() => handleExport('json')}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                  disabled={bookingItemsToUse.length === 0}
                >
                  📄 JSON
                </button>
                <button
                  onClick={() => handleExport('ics')}
                  className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors"
                  disabled={bookingItemsToUse.length === 0}
                >
                  📅 iCal
                </button>
              </div>
              {bookingItemsToUse.length === 0 && (
                <p className="text-gray-400 text-xs mt-2">No data to export</p>
              )}
            </div>
          </div>
        </div>

        {/* Data Display */}
        <div className="mt-12 max-w-4xl mx-auto">
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