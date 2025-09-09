"use client"

import { motion } from "motion/react"

interface SupabaseTableCardProps {
  name: string
  count: number
  isLoading?: boolean
}

export function SupabaseTableCard({ name, count, isLoading = false }: SupabaseTableCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="relative group/card"
    >
      <div className="relative h-full w-full rounded-xl border border-white/[0.2] bg-black p-6 hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
        {/* Gradient overlay */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/[0.05] via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
        
        {/* Content */}
        <div className="relative z-10 space-y-4">
          {/* Table name */}
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white/90 font-['Inter'] truncate">
              {name}
            </h3>
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
          </div>
          
          {/* Row count */}
          <div className="space-y-2">
            <p className="text-sm text-white/60 font-['Inter']">Row count</p>
            {isLoading ? (
              <div className="h-8 w-20 bg-white/[0.1] rounded-md animate-pulse" />
            ) : (
              <p className="text-2xl font-bold text-white font-mono">
                {count.toLocaleString()}
              </p>
            )}
          </div>
          
          {/* Visual indicator */}
          <div className="flex items-center space-x-2">
            <div className="flex-1 h-2 bg-white/[0.1] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: count > 0 ? "100%" : "0%" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              />
            </div>
            <span className="text-xs text-white/40 font-mono">
              {count > 0 ? 'Active' : 'Empty'}
            </span>
          </div>
        </div>
        
        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 blur-xl" />
      </div>
    </motion.div>
  )
}