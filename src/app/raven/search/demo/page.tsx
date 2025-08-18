"use client";

import React from "react";
import { InstructorProfileCard } from "@/components/raven/instructor-profile-card";
import { mockInstructors } from "@/lib/mock-data/instructors";

export default function InstructorCardDemoPage() {
  // Use the first 3 instructors for demo
  const demoInstructors = mockInstructors.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0d0d0f] flex items-center justify-center p-8">
      <div className="max-w-7xl w-full">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="font-['PP_Editorial_New'] text-4xl text-white mb-4">
            Instructor Profile Card Demo
          </h1>
          <p className="font-['Archivo'] text-[#d5d5d6] text-lg">
            Preview and test the instructor profile card component
          </p>
        </div>

        {/* Demo Cards - 3 per row */}
        <div className="flex justify-center gap-8 mb-12 flex-wrap">
          {demoInstructors.map((instructor) => (
            <InstructorProfileCard
              key={instructor.id}
              instructor={instructor}
              onClick={() => console.log("Card clicked:", instructor.id)}
            />
          ))}
        </div>

        {/* Features List */}
        <div className="bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] rounded-2xl p-8 max-w-2xl mx-auto">
          <h2 className="font-['Archivo'] font-medium text-xl text-white mb-6">
            Component Features
          </h2>
          <ul className="space-y-3 font-['Archivo'] text-[#d5d5d6] text-sm">
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">✓</span>
              <span>Image carousel with manual navigation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">✓</span>
              <span>Sport badge and price badge (€100/h format)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">✓</span>
              <span>Name with calculated age from date of birth</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">✓</span>
              <span>Nationality flag and country name</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">✓</span>
              <span>Tagline pill with avatar and +1 badge</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">✓</span>
              <span>Availability status with calendar icon</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">✓</span>
              <span>Languages formatted as sentence</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">✓</span>
              <span>Hover effects and animations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">✓</span>
              <span>Responsive and accessible design</span>
            </li>
          </ul>
        </div>

        {/* Instructions */}
        <div className="text-center mt-12">
          <p className="font-['Archivo'] text-[#d5d5d6] text-sm">
            Click the arrow buttons or dots to navigate between images
          </p>
          <p className="font-['Archivo'] text-[#d5d5d6] text-sm mt-2">
            Hover over cards to see the navigation controls
          </p>
        </div>
      </div>
    </div>
  );
}