"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { SearchIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export function SearchBar({ 
  placeholder = "Search for instructors...", 
  onSearch, 
  className 
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={cn(
        "relative w-full max-w-[696px]",
        className
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <motion.div
        className={cn(
          "flex items-center gap-4 px-6 py-4 rounded-full transition-all duration-200",
          "bg-white/10 backdrop-blur-sm border border-white/10",
          isFocused && "bg-white/15 border-white/20 shadow-lg"
        )}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <SearchIcon className="w-6 h-6 text-white/70 flex-shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={cn(
            "flex-1 bg-transparent border-none outline-none text-white placeholder-[#9696a5]",
            "text-base font-normal leading-5 tracking-[0.08px]"
          )}
        />
        {query && (
          <motion.button
            type="button"
            onClick={() => setQuery("")}
            className="text-white/50 hover:text-white/80 transition-colors p-1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        )}
      </motion.div>
    </motion.form>
  );
}