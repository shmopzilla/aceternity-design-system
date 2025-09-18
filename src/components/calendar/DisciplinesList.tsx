"use client"

import { useState, useEffect } from 'react'
import { DisciplineInfo } from './DisciplineInfo'
import { cn } from "@/lib/utils"

interface Discipline {
  id: number
  name: string
  color_id: number
  minPrice: number
}

interface DisciplinesListProps {
  instructorId: string
  className?: string
}

export function DisciplinesList({ instructorId, className }: DisciplinesListProps) {
  const [disciplines, setDisciplines] = useState<Discipline[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchDisciplines() {
      if (!instructorId) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`/api/calendar/disciplines?instructorId=${instructorId}`)
        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.error || 'Failed to fetch disciplines')
        }

        console.log('Frontend: Fetched disciplines:', result.data)
        setDisciplines(result.data || [])

      } catch (err: any) {
        console.error('Frontend: Error fetching disciplines:', err)
        setError(err.message || 'Failed to fetch disciplines')
      } finally {
        setLoading(false)
      }
    }

    fetchDisciplines()
  }, [instructorId])

  if (loading) {
    return (
      <div className={cn("animate-pulse", className)}>
        <div className="h-6 bg-white/10 rounded"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={cn("text-red-400 text-sm", className)}>
        Error loading disciplines: {error}
      </div>
    )
  }

  if (disciplines.length === 0) {
    return (
      <div className={cn("text-white/60 text-sm", className)}>
        No disciplines found for this instructor
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col gap-3 w-full", className)}>
      {disciplines.map((discipline) => (
        <DisciplineInfo
          key={discipline.id}
          id={discipline.id}
          name={discipline.name}
          minPrice={discipline.minPrice}
          color_id={discipline.color_id}
        />
      ))}
    </div>
  )
}