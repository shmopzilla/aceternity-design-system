"use client"

import { useState, useMemo, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CalendarDay } from './CalendarDay'
import { cn } from "@/lib/utils"
import type { CalendarProps, CalendarDayData } from "@/lib/calendar/types"

export function Calendar({
  bookingItems = [],
  onDayClick,
  onRangeSelect,
  selectionMode = 'single',
  className,
  initialMonth = new Date().getMonth(),
  initialYear = new Date().getFullYear()
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(initialMonth)
  const [currentYear, setCurrentYear] = useState(initialYear)
  const [selectedRange, setSelectedRange] = useState<{ startDate: string | null; endDate: string | null }>({
    startDate: null,
    endDate: null
  })

  // Clear selections when selection mode changes
  useEffect(() => {
    setSelectedRange({ startDate: null, endDate: null })
  }, [selectionMode])

  // Generate calendar days for the current month view
  const calendarDays = useMemo(() => {
    const days: CalendarDayData[] = []
    const today = new Date()
    const todayStr = today.toISOString().split('T')[0] // More reliable format

    // First day of current month
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
    const startDayOfWeek = firstDayOfMonth.getDay() // 0 = Sunday

    // Last day of current month
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
    const daysInMonth = lastDayOfMonth.getDate()

    // Previous month info
    const lastDayOfPrevMonth = new Date(currentYear, currentMonth, 0)
    const daysInPrevMonth = lastDayOfPrevMonth.getDate()
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear

    // Next month info
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear

    // Add days from previous month
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const dayNumber = daysInPrevMonth - i
      const date = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`
      days.push({
        date,
        dayNumber,
        isCurrentMonth: false,
        isToday: date === todayStr
      })
    }

    // Add days from current month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      days.push({
        date,
        dayNumber: day,
        isCurrentMonth: true,
        isToday: date === todayStr
      })
    }

    // Add days from next month to fill the grid
    const remainingDays = 42 - days.length
    for (let day = 1; day <= remainingDays; day++) {
      const date = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      days.push({
        date,
        dayNumber: day,
        isCurrentMonth: false,
        isToday: date === todayStr
      })
    }

    return days
  }, [currentMonth, currentYear])

  // Month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  // Navigation handlers with animation state
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [direction, setDirection] = useState<'left' | 'right'>('right')

  // Quick navigation functions - memoized for performance
  const goToToday = useCallback(() => {
    if (isTransitioning) return
    const today = new Date()
    const todayMonth = today.getMonth()
    const todayYear = today.getFullYear()

    if (currentMonth === todayMonth && currentYear === todayYear) return

    setCurrentMonth(todayMonth)
    setCurrentYear(todayYear)
  }, [isTransitioning, currentMonth, currentYear])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target !== document.body) return // Only handle when not focused on inputs

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault()
          goToPreviousMonth()
          break
        case 'ArrowRight':
          event.preventDefault()
          goToNextMonth()
          break
        case 'Home':
          event.preventDefault()
          goToToday()
          break
        case 'Escape':
          event.preventDefault()
          // Clear selection
          setSelectedRange({ startDate: null, endDate: null })
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentMonth, currentYear, isTransitioning])

  const goToPreviousMonth = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setDirection('left')

    setTimeout(() => {
      if (currentMonth === 0) {
        setCurrentMonth(11)
        setCurrentYear(currentYear - 1)
      } else {
        setCurrentMonth(currentMonth - 1)
      }
      setTimeout(() => setIsTransitioning(false), 50)
    }, 150)
  }, [isTransitioning, currentMonth, currentYear])

  const goToNextMonth = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setDirection('right')

    setTimeout(() => {
      if (currentMonth === 11) {
        setCurrentMonth(0)
        setCurrentYear(currentYear + 1)
      } else {
        setCurrentMonth(currentMonth + 1)
      }
      setTimeout(() => setIsTransitioning(false), 50)
    }, 150)
  }, [isTransitioning, currentMonth, currentYear])

  // Helper functions for range selection - memoized for performance
  const isDateInRange = useCallback((date: string): boolean => {
    if (!selectedRange.startDate || !selectedRange.endDate) return false
    const currentDate = new Date(date)
    const startDate = new Date(selectedRange.startDate)
    const endDate = new Date(selectedRange.endDate)
    return currentDate >= startDate && currentDate <= endDate
  }, [selectedRange.startDate, selectedRange.endDate])

  const isStartDate = useCallback((date: string): boolean => {
    return selectedRange.startDate === date
  }, [selectedRange.startDate])

  const isEndDate = useCallback((date: string): boolean => {
    return selectedRange.endDate === date
  }, [selectedRange.endDate])

  // Handle day click for both single and range selection - memoized
  const handleDayClick = useCallback((date: string, dayNumber: number) => {
    if (selectionMode === 'single') {
      onDayClick?.(date, dayNumber)
      return
    }

    // Range selection logic
    if (!selectedRange.startDate) {
      // First click - set start date
      setSelectedRange({ startDate: date, endDate: null })
      onRangeSelect?.(date, null) // Notify parent that selection started
    } else if (!selectedRange.endDate) {
      // Second click - set end date
      const startDate = new Date(selectedRange.startDate)
      const endDate = new Date(date)

      if (endDate < startDate) {
        // If end date is before start date, swap them
        setSelectedRange({ startDate: date, endDate: selectedRange.startDate })
        onRangeSelect?.(date, selectedRange.startDate)
      } else if (endDate.getTime() === startDate.getTime()) {
        // Same date clicked - single day selection
        setSelectedRange({ startDate: date, endDate: date })
        onRangeSelect?.(date, date)
      } else {
        // Valid range
        setSelectedRange({ ...selectedRange, endDate: date })
        onRangeSelect?.(selectedRange.startDate, date)
      }
    } else {
      // Third click - reset and start new selection
      setSelectedRange({ startDate: date, endDate: null })
      onRangeSelect?.(date, null) // Notify parent that new selection started
    }
  }, [selectionMode, selectedRange, onDayClick, onRangeSelect])

  // Split days into rows of 7
  const calendarRows = useMemo(() => {
    const rows: CalendarDayData[][] = []
    for (let i = 0; i < calendarDays.length; i += 7) {
      rows.push(calendarDays.slice(i, i + 7))
    }
    return rows
  }, [calendarDays])

  return (
    <div
      className={cn(
        "flex flex-col gap-6 w-full",
        className
      )}
      data-name="calendar-component"
    >
        {/* Month Header */}
        <div className="flex items-center justify-between w-full">
          <motion.button
            onClick={goToPreviousMonth}
            disabled={isTransitioning}
            className="text-white hover:text-blue-400 transition-all duration-200 p-3 rounded-lg hover:bg-white hover:bg-opacity-10 disabled:opacity-50"
            aria-label="Previous month"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            ←
          </motion.button>

          <div className="flex items-center gap-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentMonth}-${currentYear}`}
                initial={{ opacity: 0, x: direction === 'right' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction === 'right' ? -20 : 20 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="text-white text-lg font-medium"
              >
                {monthNames[currentMonth]} {currentYear}
              </motion.div>
            </AnimatePresence>

            {/* Today button - only show if not current month */}
            {(new Date().getMonth() !== currentMonth || new Date().getFullYear() !== currentYear) && (
              <motion.button
                onClick={goToToday}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="ml-2 px-2 py-1 text-xs bg-blue-400 bg-opacity-20 text-blue-400 rounded-md hover:bg-opacity-30 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Today
              </motion.button>
            )}
          </div>

          <motion.button
            onClick={goToNextMonth}
            disabled={isTransitioning}
            className="text-white hover:text-blue-400 transition-all duration-200 p-3 rounded-lg hover:bg-white hover:bg-opacity-10 disabled:opacity-50"
            aria-label="Next month"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            →
          </motion.button>
        </div>

        {/* Weekday Headers */}
        <div className="flex gap-1 w-full">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
            <div
              key={day}
              className="flex-1 text-center text-xs font-medium text-white text-opacity-60 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentMonth}-${currentYear}-grid`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col w-full"
          >
            {calendarRows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex gap-1 w-full"
              >
                {row.map((dayData, dayIndex) => (
                  <motion.div
                    key={dayData.date}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.2,
                      delay: (rowIndex * 7 + dayIndex) * 0.01,
                      ease: "easeOut"
                    }}
                    className="flex-1 h-16 flex items-center justify-center"
                  >
                    <CalendarDay
                      date={dayData.date}
                      dayNumber={dayData.dayNumber}
                      bookingItems={bookingItems}
                      isCurrentMonth={dayData.isCurrentMonth}
                      isToday={dayData.isToday}
                      isStartDate={isStartDate(dayData.date)}
                      isEndDate={isEndDate(dayData.date)}
                      isInRange={isDateInRange(dayData.date)}
                      isSelectable={true}
                      onClick={() => handleDayClick(dayData.date, dayData.dayNumber)}
                      className="h-12 w-full"
                    />
                  </motion.div>
                ))}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
    </div>
  )
}