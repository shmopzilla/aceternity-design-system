"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { InstructorProfileCard } from "@/components/raven/instructor-profile-card";
import { StickySearchHeader } from "@/components/raven/sticky-search-header";
import { mockInstructors } from "@/lib/mock-data/instructors";
import { useSearch } from "@/lib/contexts/search-context";

const INITIAL_LOAD_COUNT = 6;
const LOAD_MORE_COUNT = 6;

export default function SearchResultsPage() {
  const [displayedCount, setDisplayedCount] = useState(INITIAL_LOAD_COUNT);
  const [isLoading, setIsLoading] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);
  const { searchCriteria } = useSearch();
  
  const displayedInstructors = mockInstructors.slice(0, displayedCount);
  const hasMore = displayedCount < mockInstructors.length;

  const handleCardClick = (instructorId: string) => {
    console.log("Navigate to instructor profile:", instructorId);
    // Future: Navigate to instructor detail page
  };

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setDisplayedCount(prev => Math.min(prev + LOAD_MORE_COUNT, mockInstructors.length));
    setIsLoading(false);
  }, [isLoading, hasMore]);

  useEffect(() => {
    setHasInitialized(true);
  }, []);

  useEffect(() => {
    if (!hasInitialized) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      {
        root: null,
        rootMargin: '100px', // Trigger 100px before the element comes into view
        threshold: 0.1,
      }
    );

    const currentObserverRef = observerRef.current;
    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    };
  }, [hasInitialized, hasMore, isLoading, loadMore]);

  return (
    <div className="min-h-screen bg-[#0d0d0f]">
      {/* Sticky Search Header */}
      <StickySearchHeader />
      
      {/* Search Results Grid */}
      <div className="container mx-auto px-6 pt-32 pb-12">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {displayedInstructors.map((instructor, index) => (
            <motion.div
              key={instructor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.4,
                delay: index * 0.05,
                ease: "easeOut"
              }}
            >
              <InstructorProfileCard
                instructor={instructor}
                onClick={() => handleCardClick(instructor.id)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Intersection Observer Target */}
        {hasMore && (
          <div
            ref={observerRef}
            className="flex justify-center mt-12 h-20 items-center"
          >
            {isLoading && (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span className="font-['Archivo'] text-sm text-[#d5d5d6]">
                  Loading more instructors...
                </span>
              </div>
            )}
          </div>
        )}

        {/* End of results message */}
        {!hasMore && (
          <div className="flex justify-center mt-12">
            <p className="font-['Archivo'] text-sm text-[#d5d5d6]">
              You've seen all {mockInstructors.length} available instructors
            </p>
          </div>
        )}
      </div>
    </div>
  );
}