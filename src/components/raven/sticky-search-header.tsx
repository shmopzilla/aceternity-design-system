"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useSearch } from '@/lib/contexts/search-context';
import { UserIcon } from '@/components/icons';

export function StickySearchHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { searchCriteria, formatSearchSummary } = useSearch();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const searchSummary = formatSearchSummary();

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-md' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between px-12 py-6">
        {/* Raven Logo */}
        <div className="flex items-center">
          <h1 className="font-['PP_Editorial_New'] text-3xl text-white font-normal">
            Raven
          </h1>
        </div>

        {/* Search Bar */}
        <motion.div
          className={`bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] rounded-[100px] px-6 py-4 transition-all duration-300 ${
            isScrolled ? 'w-[500px]' : 'w-[696px]'
          }`}
          whileHover={{ bg: 'rgba(255,255,255,0.15)' }}
        >
          <p className="font-['Archivo'] text-white text-[16px] text-center leading-[20px] tracking-[0.08px]">
            {searchSummary || "Search for instructors..."}
          </p>
        </motion.div>

        {/* Sign In Button */}
        <motion.button
          className="bg-white rounded-2xl px-4 py-2.5 flex items-center gap-2 h-[52px]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <UserIcon className="w-5 h-5 text-[#0d0d0f]" />
          <span className="font-['Archivo'] font-medium text-[16px] text-[#0d0d0f] leading-[20px] tracking-[0.08px]">
            Sign in
          </span>
        </motion.button>
      </div>

      {/* Subtle bottom border when scrolled */}
      {isScrolled && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.header>
  );
}