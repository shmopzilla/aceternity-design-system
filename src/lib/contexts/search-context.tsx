"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface SearchCriteria {
  location: string;
  startDate: string;
  endDate: string;
  participants: {
    adults: number;
    children: number;
  };
  sport?: string;
}

interface SearchContextType {
  searchCriteria: SearchCriteria | null;
  setSearchCriteria: (criteria: SearchCriteria) => void;
  clearSearch: () => void;
  formatSearchSummary: () => string;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

interface SearchProviderProps {
  children: ReactNode;
}

export function SearchProvider({ children }: SearchProviderProps) {
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria | null>(null);

  const clearSearch = () => {
    setSearchCriteria(null);
  };

  const formatSearchSummary = (): string => {
    if (!searchCriteria) return "";

    const { location, startDate, endDate, participants } = searchCriteria;
    
    // Format dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    const startFormatted = start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    const endFormatted = end.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    
    // Format participants
    const totalGuests = participants.adults + participants.children;
    const guestText = totalGuests === 1 ? '1 guest' : `${totalGuests} guests`;
    
    return `${location}, ${startFormatted}-${endFormatted}, ${guestText}`;
  };

  const value: SearchContextType = {
    searchCriteria,
    setSearchCriteria,
    clearSearch,
    formatSearchSummary,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}