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
        {/* SVG Border around profile */}
        <svg xmlns="http://www.w3.org/2000/svg" width="111" height="111" viewBox="0 0 111 111" fill="none" className="absolute inset-0">
          <path opacity="0.2" d="M111 55.5C111 86.1518 86.1518 111 55.5 111C24.8482 111 0 86.1518 0 55.5C0 24.8482 24.8482 0 55.5 0C86.1518 0 111 24.8482 111 55.5ZM5.55 55.5C5.55 83.0866 27.9134 105.45 55.5 105.45C83.0866 105.45 105.45 83.0866 105.45 55.5C105.45 27.9134 83.0866 5.55 55.5 5.55C27.9134 5.55 5.55 27.9134 5.55 55.5Z" fill="white"/>
        </svg>

        {/* Profile Image with 4px gap */}
        <div
          className="absolute inset-1 w-[103px] h-[103px] rounded-full bg-cover bg-center bg-gray-600"
          style={{
            backgroundImage: `url(${avatarUrl})`,
            top: '4px',
            left: '4px'
          }}
        />

        {/* Verification Badge */}
        <div className="absolute top-1 right-1 w-[30px] h-[30px] flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
            <circle cx="15" cy="15" r="9" fill="#060606"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M12.9677 0.962693C14.0185 -0.320896 15.9815 -0.3209 17.0324 0.962693L18.335 2.55371L20.2586 1.82715C21.8106 1.24099 23.5104 2.22244 23.7787 3.85952L24.1114 5.88869L26.1406 6.22126C27.7776 6.48957 28.7591 8.18952 28.1729 9.74143L27.4463 11.665L29.0374 12.9676C30.3209 14.0185 30.3209 15.9814 29.0374 17.0324L27.4463 18.335L28.1729 20.2585C28.7591 21.8105 27.7776 23.5104 26.1406 23.7787L24.1114 24.1113L23.7788 26.1405C23.5104 27.7775 21.8106 28.759 20.2586 28.1728L18.335 27.4463L17.0324 29.0373C15.9815 30.3209 14.0185 30.3209 12.9677 29.0373L11.665 27.4463L9.74144 28.1728C8.18952 28.759 6.48959 27.7775 6.22127 26.1405L5.88869 24.1113L3.85952 23.7787C2.22243 23.5104 1.24099 21.8105 1.82715 20.2585L2.55372 18.335L0.962697 17.0324C-0.320896 15.9814 -0.320902 14.0185 0.962697 12.9676L2.55372 11.665L1.82715 9.74143C1.24098 8.18952 2.22245 6.48957 3.85953 6.22126L5.88869 5.88869L6.22127 3.85952C6.48959 2.22244 8.18954 1.24099 9.74144 1.82715L11.665 2.55371L12.9677 0.962693ZM13.9593 20.5253L23.1525 11.332L21.2952 9.47474L13.0306 17.7393L8.70599 13.4147L6.84866 15.272L12.1019 20.5253C12.3482 20.7716 12.6823 20.9099 13.0306 20.9099C13.3789 20.9099 13.713 20.7716 13.9593 20.5253Z" fill="#8EBBFB"/>
          </svg>
        </div>
      </div>
    </div>
  );
}