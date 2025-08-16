"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface FilterChipProps {
  label: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export function FilterChip({ label, icon, isActive, onClick, className }: FilterChipProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-3 py-1 rounded-full text-sm font-light transition-all duration-200",
        "hover:scale-105 hover:shadow-lg",
        isActive
          ? "bg-white text-black shadow-md"
          : "bg-[#25252b] text-white border border-white/10 hover:border-white/20 hover:bg-[#2a2a30]",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {icon && (
        <span className="flex-shrink-0">
          {icon}
        </span>
      )}
      <span className="whitespace-nowrap">{label}</span>
    </motion.button>
  );
}