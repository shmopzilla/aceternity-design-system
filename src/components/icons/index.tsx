import React from "react";

export const SearchIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

export const UserIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

export const SkiIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M3 21l8-8 8 8H3zm9-13.5L8.5 4 10 2.5 12 4.5 14 2.5 15.5 4 12 7.5z"/>
  </svg>
);

export const SnowboardIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M14 2l2 2-2 6 2 2-2 6 2 2-2 4H10l2-4-2-2 2-6-2-2 2-6-2-2h4z"/>
  </svg>
);

export const TouringIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2L4 6v6c0 5.55 3.84 9.74 9 9.95-1.38-2.32-2.17-5.07-2.17-8.02 0-8.56 6.47-15.62 14.31-16.86L12 2z"/>
  </svg>
);

export const FrenchFlag = ({ className = "w-5 h-5" }: { className?: string }) => (
  <div className={`${className} rounded-sm overflow-hidden border border-gray-300`}>
    <div className="flex h-full">
      <div className="w-1/3 bg-blue-600"></div>
      <div className="w-1/3 bg-white"></div>
      <div className="w-1/3 bg-red-600"></div>
    </div>
  </div>
);