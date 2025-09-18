"use client"

import { cn } from "@/lib/utils"

interface ActionButtonProps {
  selectedDays: number
  className?: string
  onClick?: () => void
}

export function ActionButton({ selectedDays, className, onClick }: ActionButtonProps) {
  return (
    <div className={cn("content-stretch flex flex-col gap-4 items-start justify-start relative w-full", className)}>
      {/* Main Button */}
      <button
        className="bg-white h-[52px] relative rounded-[16px] shrink-0 w-full hover:bg-gray-50 transition-colors"
        onClick={onClick}
      >
        <div className="box-border content-stretch flex gap-2 h-[52px] items-center justify-center overflow-clip px-4 py-2.5 relative w-full">
          <div className="content-stretch flex gap-[9px] items-center justify-start relative shrink-0">
            <div className="font-['Archivo'] font-medium leading-[0] not-italic relative shrink-0 text-[#0d0d0f] text-[16px] text-nowrap tracking-[0.08px]">
              <p className="leading-[20px] whitespace-pre">
                Select sessions for {selectedDays} {selectedDays === 1 ? 'day' : 'days'}
              </p>
            </div>
          </div>
          <div className="relative shrink-0 w-[12.5px] h-[12.5px]">
            <div className="absolute inset-[18.75%_12.5%]">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 1L6 4L2 7" stroke="#0d0d0f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[16px]" />
      </button>

      {/* Cancellation Policy */}
      <div className="content-stretch flex gap-3 items-center justify-center relative shrink-0 w-full">
        <div className="relative shrink-0 w-6 h-6 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
            <path d="M12 6v6l4 2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="font-['Archivo'] font-light leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap text-white tracking-[0.08px]">
          <p className="leading-[1.4] whitespace-pre">You cancel up to 24 hours before the first session</p>
        </div>
      </div>
    </div>
  )
}