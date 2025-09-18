"use client";

import React from "react";

interface InstructorAvatarProps {
  instructor?: {
    id: string;
    first_name: string;
    last_name: string;
    avatar_url?: string;
  };
  className?: string;
}

export function InstructorAvatar({ instructor, className }: InstructorAvatarProps) {
  // Fallback image if no avatar_url
  const fallbackImage = "/assets/images/instructor-1.png";
  const avatarUrl = instructor?.avatar_url || fallbackImage;

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Profile Picture Container */}
      <div className="relative w-[111px] h-[111px]">
        {/* Profile Image with border */}
        <div
          className="absolute inset-3 w-[87px] h-[87px] rounded-full bg-cover bg-center bg-gray-600 border-2 border-white/20"
          style={{ backgroundImage: `url(${avatarUrl})` }}
        />

        {/* Verification Badge */}
        <div className="absolute top-0 right-0 w-[30px] h-[30px] bg-blue-500 rounded-full flex items-center justify-center border-2 border-gray-900">
          {/* Checkmark Icon */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white">
            <path
              d="M13.5 4.5L6 12L2.5 8.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}