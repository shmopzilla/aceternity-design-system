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
    
    // Add days from next month to fill the grid (42 days total = 6 rows x 7 days)
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
        "relative",
        className
      )}
      data-name="calendar-component"
    >
      <div
        className="absolute content-stretch flex flex-col gap-[26px] sm:h-[436px] h-auto items-start justify-start left-1/2 -translate-x-1/2 -translate-y-1/2 sm:w-[380px] w-[95vw] max-w-[380px]"
        style={{ top: "calc(50% + 0.5px)" }}
      >
        {/* Month Header */}
        <div className="flex items-center justify-between w-full">
          <motion.button
            onClick={goToPreviousMonth}
            disabled={isTransitioning}
            className="text-white hover:text-[#8CDBFB] transition-all duration-200 p-3 rounded-lg hover:bg-white/10 disabled:opacity-50"
            aria-label="Previous month"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>

          <div className="flex items-center gap-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentMonth}-${currentYear}`}
                initial={{ opacity: 0, x: direction === 'right' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction === 'right' ? -20 : 20 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="font-['Archivo'] font-medium leading-[0] not-italic text-[16px] text-white tracking-[0.08px]"
              >
                <p className="leading-[20px]">
                  {monthNames[currentMonth]} {currentYear}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Today button - only show if not current month */}
            {(new Date().getMonth() !== currentMonth || new Date().getFullYear() !== currentYear) && (
              <motion.button
                onClick={goToToday}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="ml-2 px-2 py-1 text-xs bg-[#8CDBFB] bg-opacity-20 text-[#8CDBFB] rounded-md hover:bg-opacity-30 transition-colors"
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
            className="text-white hover:text-[#8CDBFB] transition-all duration-200 p-3 rounded-lg hover:bg-white/10 disabled:opacity-50"
            aria-label="Next month"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        </div>

        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-1 w-full mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
            <div
              key={day}
              className="text-center text-xs sm:text-sm font-medium text-white text-opacity-60 py-1 px-1"
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
            className="content-stretch flex flex-col items-start justify-start relative w-full"
          >
            {calendarRows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="box-border content-stretch flex gap-1 items-center justify-start p-[4px] relative w-full"
              >
                {/* Row border */}
                <div
                  aria-hidden="true"
                  className="absolute border-[0px_0px_1px] border-[rgba(255,255,255,0.08)] border-solid inset-0 pointer-events-none"
                />

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
                    className="basis-0 content-stretch flex flex-col gap-2 grow sm:h-[70px] h-[60px] items-center justify-center min-h-px sm:min-w-[50px] min-w-[40px] overflow-clip relative rounded-[8px]"
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
                      className="sm:h-[53px] h-[45px] w-full"
                    />
                  </motion.div>
                ))}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
        </div>
      </div>
    </div>
  )
}