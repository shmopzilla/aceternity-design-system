"use client"

import { useState, useEffect } from 'react'
import { Calendar } from '@/components/calendar/Calendar'
import { InstructorSwitcher } from '@/components/calendar/InstructorSwitcher'
import { DataInfoTooltip } from '@/components/calendar/DataInfoTooltip'
import { DisciplinesList } from '@/components/calendar/DisciplinesList'
import { ActionButton } from '@/components/calendar/ActionButton'
import { InstructorAvatar } from '@/components/calendar/InstructorAvatar'

interface Instructor {
  id: string
  first_name: string
  last_name: string
  avatar_url?: string
}

export default function InstructorCalendarPage() {
  const [instructors, setInstructors] = useState<Instructor[]>([])
  const [selectedInstructorId, setSelectedInstructorId] = useState<string>('')
  const [bookingItems, setBookingItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingBookings, setLoadingBookings] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [instructorPricing, setInstructorPricing] = useState<{ minHourlyRate: number | null, offerCount: number } | null>(null)
  const [loadingPricing, setLoadingPricing] = useState(false)
  const [selectedStartDate, setSelectedStartDate] = useState<string | null>(null)
  const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null)
  const [selectedDaysCount, setSelectedDaysCount] = useState(0)

  // Fetch all instructors via API on page load
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
        } else if (result.data && result.data.length > 0) {
          console.log('Found instructors via API:', result.data)
          setInstructors(result.data)
          // Select first instructor by default
          setSelectedInstructorId(result.data[0].id)
        } else {
          console.log('No instructors found via API')
          setError('No instructors found')
        }
      } catch (err: any) {
        console.error('Error fetching instructors via API:', err)
        setError('Error fetching instructors: ' + err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchInstructors()
  }, [])

  // Fetch booking items via API when instructor changes
  useEffect(() => {
    async function fetchBookingData() {
      if (!selectedInstructorId) {
        console.log('No instructor selected, skipping booking fetch')
        return
      }

      console.log('Fetching booking items via API for instructor:', selectedInstructorId)
      setLoadingBookings(true)
      setError(null)

      try {
        // Get current month date range
        const now = new Date()
        const startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]
        const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0]

        console.log('Date range:', { startDate, endDate })

        const url = `/api/calendar/bookings?instructorId=${selectedInstructorId}&startDate=${startDate}&endDate=${endDate}`
        const response = await fetch(url)
        const result = await response.json()
        console.log('API Booking items result:', result)

        if (!response.ok) {
          console.error('API Failed to fetch booking items:', result.error)
          setError('Failed to fetch booking items: ' + (result.details || result.error))
          setBookingItems([])
        } else {
          console.log('Found booking items via API:', result.count)
          setBookingItems(result.data || [])
        }
      } catch (err: any) {
        console.error('Error fetching booking items via API:', err)
        setError('Error fetching booking items: ' + err.message)
        setBookingItems([])
      } finally {
        setLoadingBookings(false)
      }
    }

    fetchBookingData()
  }, [selectedInstructorId])

  // Fetch instructor pricing via API when instructor changes
  useEffect(() => {
    async function fetchInstructorPricing() {
      if (!selectedInstructorId) {
        console.log('No instructor selected, skipping pricing fetch')
        return
      }

      console.log('Fetching instructor pricing via API for instructor:', selectedInstructorId)
      setLoadingPricing(true)

      try {
        const url = `/api/calendar/offers?instructorId=${selectedInstructorId}`
        const response = await fetch(url)
        const result = await response.json()
        console.log('API Instructor pricing result:', result)

        if (!response.ok) {
          console.error('API Failed to fetch instructor pricing:', JSON.stringify(result))
          setInstructorPricing(null)
        } else {
          console.log('Found instructor pricing via API:', result.data)
          setInstructorPricing(result.data)
        }
      } catch (err: any) {
        console.error('Error fetching instructor pricing via API:', err)
        setInstructorPricing(null)
      } finally {
        setLoadingPricing(false)
      }
    }

    fetchInstructorPricing()
  }, [selectedInstructorId])

  const handleInstructorChange = (instructorId: string) => {
    setSelectedInstructorId(instructorId)
  }

  // Calculate number of days between two dates
  const calculateDays = (start: string, end: string) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
    return diffDays
  }

  const handleDayClick = (date: string) => {
    console.log('Day clicked:', date)
    // In range mode, this won't be called, but keeping for compatibility
    setSelectedStartDate(date)
    setSelectedEndDate(date)
    setSelectedDaysCount(1)
  }

  const handleRangeSelect = (startDate: string, endDate: string) => {
    console.log('Range selected:', startDate, 'to', endDate)
    setSelectedStartDate(startDate)
    setSelectedEndDate(endDate)

    // Check if it's a single day selection (same start and end date)
    if (startDate === endDate) {
      setSelectedDaysCount(1)
    } else {
      const days = calculateDays(startDate, endDate)
      setSelectedDaysCount(days)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-lg">Loading instructors...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Sticky Header Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800/50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left side - Title */}
            <h1 className="text-white text-xl font-bold">Instructor Calendar</h1>

            {/* Right side - Controls */}
            <div className="flex items-center gap-4">
              <InstructorSwitcher
                instructors={instructors}
                selectedInstructorId={selectedInstructorId}
                onInstructorChange={handleInstructorChange}
                loading={loadingBookings}
                compact={true}
              />

              <DataInfoTooltip
                instructors={instructors}
                selectedInstructorId={selectedInstructorId}
                bookingItemsCount={bookingItems.length}
                error={error}
                loading={loadingBookings}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - with top padding to account for fixed header */}
      <div className="pt-20 min-h-screen flex items-center justify-center">
        {/* Main Content Container */}
        <div className="flex items-start gap-8">
          {/* Instructor Avatar */}
          <div className="flex-shrink-0">
            <InstructorAvatar
              instructor={instructors.find(i => i.id === selectedInstructorId)}
            />
          </div>

          {/* Calendar Container - Fixed width 485px */}
          <div className="w-[485px]">
          <div
            style={{
              display: 'flex',
              width: '485px',
              padding: '32px',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '40px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.10)',
              background: 'rgba(255, 255, 255, 0.05)',
              boxShadow: '0 4px 34px 0 #000',
              backdropFilter: 'blur(32px)'
            }}
          >
            {/* Pricing Title */}
            <div
              style={{
                color: '#FFF',
                fontFamily: 'var(--type-font-family-headers, Archivo)',
                fontSize: '24px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'var(--line-height-display-h5, 24px)',
                letterSpacing: '0.12px'
              }}
            >
              {loadingPricing ? (
                'Loading pricing...'
              ) : instructorPricing?.minHourlyRate ? (
                <>
                  Starting from €{instructorPricing.minHourlyRate}
                  <span
                    style={{
                      color: '#7B7B7B',
                      fontFamily: 'var(--type-font-family-headers, Archivo)',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: 'var(--line-height-display-h5, 24px)',
                      letterSpacing: '0.08px'
                    }}
                  >
                    /hour
                  </span>
                </>
              ) : (
                'Error'
              )}
            </div>

            {/* Disciplines List */}
            <div style={{ width: '100%' }}>
              <DisciplinesList instructorId={selectedInstructorId || ''} />
            </div>

            {loadingBookings ? (
              <div className="flex items-center justify-center h-96">
                <div className="text-white">Loading calendar data...</div>
              </div>
            ) : (
              <Calendar
                bookingItems={bookingItems}
                onDayClick={handleDayClick}
                onRangeSelect={handleRangeSelect}
                selectionMode="range"
                className="w-full"
              />
            )}

            {/* Action Button - Only show when days are selected */}
            {selectedDaysCount > 0 && (
              <div style={{ width: '100%' }}>
                <ActionButton
                  selectedDays={selectedDaysCount}
                  onClick={() => console.log(`Select sessions for ${selectedDaysCount} day(s) clicked`)}
                />
              </div>
            )}
          </div>
          {/* Error Display (only shown if error) */}
          {error && (
            <div className="mt-4">
              <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                {error}
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  )
}