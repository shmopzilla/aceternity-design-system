"use client";

// ========================================
// ENHANCED RAVEN LANDING PAGE
// ========================================
// This component renders the complete Raven landing page with:
// - Complex hero section with multiple ski photo backgrounds
// - Interactive toggle switch for Adventurers/Instructors
// - Three-step process cards with animations
// - White content sections with alternating layouts
// - All actual design assets from Figma
// ========================================

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import SearchModal, { Location, SportOption, SportDiscipline, ModalStep, ParticipantCounts } from "@/components/ui/search-modal";
import { getLocations, getSportOptions, getSportDisciplines } from "@/lib/supabase/database";
import { fallbackLocations, fallbackSportOptions, fallbackSportDisciplines } from "@/lib/fallback-data";
import { useSearch } from "@/lib/contexts/search-context";

// SportDropdown component for landing page search bar
const SportDropdown = ({
  selectedSport,
  onSportChange,
  isOpen,
  onToggle,
  sportOptions = []
}: {
  selectedSport: SportOption;
  onSportChange: (sport: SportOption) => void;
  isOpen: boolean;
  onToggle: () => void;
  sportOptions?: SportOption[];
}) => {
  return (
    <div className="relative">
      {/* Sport Pill Button */}
      <button
        onClick={onToggle}
        className="flex items-center gap-2 bg-[rgba(255,255,255,0.15)] hover:bg-[rgba(255,255,255,0.2)] transition-colors duration-200 rounded-full px-3 py-1.5 text-sm font-['Archivo'] font-medium text-[#ffffff]"
      >
        <span>{selectedSport.icon}</span>
        <span>{selectedSport.name}</span>
        <motion.svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className="text-[#cbcbd2]"
          animate={{
            rotate: isOpen ? 180 : 0
          }}
          transition={{ duration: 0.2 }}
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </button>

      {/* Dropdown Menu */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          scale: isOpen ? 1 : 0.95,
          y: isOpen ? 0 : -10
        }}
        transition={{ duration: 0.2 }}
        className={`absolute top-full right-0 mt-2 bg-[rgba(255,255,255,0.15)] backdrop-blur-[25px] rounded-lg overflow-hidden shadow-lg border border-[rgba(255,255,255,0.1)] z-50 ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        style={{ minWidth: '150px' }}
      >
        {sportOptions.map((sport) => (
          <button
            key={sport.id}
            onClick={() => {
              onSportChange(sport);
              onToggle();
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 text-left font-['Archivo'] font-medium text-sm transition-colors duration-200 ${
              selectedSport.id === sport.id
                ? 'bg-[rgba(255,255,255,0.2)] text-[#ffffff]'
                : 'text-[#cbcbd2] hover:bg-[rgba(255,255,255,0.1)] hover:text-[#ffffff]'
            }`}
          >
            <span className="text-base">{sport.icon}</span>
            <span>{sport.name}</span>
          </button>
        ))}
      </motion.div>
    </div>
  );
};

// ========================================
// ASSET CONSTANTS
// Images referenced by Figma design (commented out as unused)
// const heroImages = {
//   img1: "/assets/images/ski-bg-1.png",
//   img2: "/assets/images/ski-bg-2.png", 
//   img3: "/assets/images/ski-bg-3.png",
//   img4: "/assets/images/ski-bg-4.png",
//   img5: "/assets/images/ski-bg-5.png",
//   img6: "/assets/images/ski-bg-6.png",
// };

// const sectionImages = {
//   section1: "/assets/images/content-section-1.png",
//   section2: "/assets/images/content-section-2.png",
// };

// const instructorImages = [
//   "/assets/images/instructor-1.png",
//   "/assets/images/instructor-2.png",
//   "/assets/images/instructor-3.png",
// ];

// ========================================
// CUSTOM COMPONENTS
// ========================================

// ========================================
// CUSTOM CHECKBOX COMPONENT
// ========================================
// Used in Step 3 card for activity selection
// Features:
// - Custom Raven-branded styling
// - Animated interactions
// - Actual checkmark icon from Figma
// ========================================

// Unused interface (commented out)
// interface CheckboxProps {
//   checked?: boolean;
//   onChange?: () => void;
//   label: string;
// }

// Custom checkbox component (commented out as unused)
// function CustomCheckbox({ checked = false, onChange, label }: CheckboxProps) {
//   return (
//     <motion.div 
//       className="bg-[#222225] flex items-center gap-3 px-5 py-3 rounded-lg cursor-pointer shadow-[2px_2px_50px_0px_rgba(0,0,0,0.5)]"
//       onClick={onChange}
//       whileHover={{ scale: 1.02 }}
//       whileTap={{ scale: 0.98 }}
//     >
//       <div className={cn(
//         "w-4 h-4 rounded border flex items-center justify-center",
//         checked ? "bg-white" : "bg-[#313135]"
//       )}>
//         {checked && (
//           <img src="/assets/icons/checkmark.svg" alt="Check" className="w-3 h-3" />
//         )}
//       </div>
//       <span className="text-white text-sm font-medium font-archivo tracking-[0.07px]">{label}</span>
//     </motion.div>
//   );
// }

// ========================================
// TOGGLE SWITCH COMPONENT
// ========================================
// Header toggle for "For Adventurers" / "For Instructors"
// Features:
// - Smooth spring animations
// - Glass morphism effect with backdrop blur
// - Interactive state management
// ========================================

interface ToggleSwitchProps {
  isLeft: boolean;
  onToggle: () => void;
  leftLabel: string;
  rightLabel: string;
}

function ToggleSwitch({ isLeft, onToggle, leftLabel, rightLabel }: ToggleSwitchProps) {
  return (
    <motion.div 
      className="relative bg-[rgba(39,39,42,0.6)] backdrop-blur-[15px] rounded-[800px] h-16 w-[363px] p-2"
      whileHover={{ scale: 1.02 }}
    >
      <motion.div
        className="absolute bg-white rounded-[25px] h-12 top-2"
        animate={{
          left: isLeft ? 8 : "50%",
          width: isLeft ? "48%" : "48%"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
      <div className="relative flex h-full">
        <button
          onClick={() => !isLeft && onToggle()}
          className={cn(
            "flex-1 flex items-center justify-center text-base font-semibold font-inter transition-colors",
            isLeft ? "text-black" : "text-white"
          )}
        >
          {leftLabel}
        </button>
        <button
          onClick={() => isLeft && onToggle()}
          className={cn(
            "flex-1 flex items-center justify-center text-base font-semibold font-inter transition-colors",
            !isLeft ? "text-black" : "text-white"
          )}
        >
          {rightLabel}
        </button>
      </div>
    </motion.div>
  );
}


// ========================================
// STEP CARD COMPONENT
// ========================================
// Individual cards for the "How it works" section
// Features:
// - Animated hover effects (lift + scale)
// - Consistent 540px height
// - Custom content area for each step
// ========================================

interface StepCardProps {
  stepNumber: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}

function StepCard({ stepNumber, title, description, children }: StepCardProps) {
  return (
    <motion.div 
      className="bg-[#111112] rounded-2xl px-5 py-[50px] w-[356px] h-[540px] flex flex-col items-center gap-[42px]"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Step Number - Exact Figma styling */}
      <div className="text-white text-[21px] font-bold font-inter leading-[30px] text-center h-[29px] w-full">{stepNumber}</div>
      
      {/* Content Area - Exact Figma layout */}
      <div className="relative grid grid-cols-[max-content] grid-rows-[max-content] place-items-start w-full flex-1">
        {children}
        
        {/* Text Block positioned at bottom */}
        <div className="absolute bottom-0 left-0 flex flex-col gap-[31px] items-start justify-start text-center w-[285px]">
          <h3 className="text-white text-[21px] font-bold font-inter leading-[30px] w-full">{title}</h3>
          <p className="text-[#858585] text-lg font-normal font-inter leading-[28px] w-full">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ========================================
// MAIN LANDING PAGE COMPONENT
// ========================================
// Complete enhanced Raven landing page with all sections
// ========================================

export default function EnhancedRavenLanding() {
  // ========================================
  // HOOKS
  // ========================================
  const router = useRouter();
  const { setSearchCriteria } = useSearch();

  // ========================================
  // COMPONENT STATE
  // ========================================
  const [isForAdventurers, setIsForAdventurers] = useState(true); // Toggle switch state
  const [scrollOpacity, setScrollOpacity] = useState(1); // Background fade opacity
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false); // Search modal state
  const [searchValue, setSearchValue] = useState(""); // Search input value
  const [selectedSport, setSelectedSport] = useState<SportOption>(fallbackSportOptions[3]); // Selected sport for search - default to "All Sports"
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Sport dropdown state
  const [modalStep, setModalStep] = useState<ModalStep>('location'); // Modal step state
  const [selectedLocation, setSelectedLocation] = useState<Location | undefined>(); // Selected location from modal
  const [selectedSports, setSelectedSports] = useState<string[]>([]); // Selected sports from modal
  const [participantCounts, setParticipantCounts] = useState<ParticipantCounts>({ adults: 0, teenagers: 0, children: 0 }); // Participant counts
  
  // Data fetching state
  const [locations, setLocations] = useState<Location[]>([]);
  const [fetchedSportOptions, setFetchedSportOptions] = useState<SportOption[]>([]);
  const [fetchedSportDisciplines, setFetchedSportDisciplines] = useState<SportDiscipline[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [dataError, setDataError] = useState<string | null>(null);
  // Unused state for checkboxes (commented out)
  // const [checkboxStates, setCheckboxStates] = useState({ // Step 3 card checkboxes
  //   telemark: true,
  //   offPiste: false,
  //   skiTouring: true,
  // });

  // const toggleCheckbox = (key: keyof typeof checkboxStates) => {
  //   setCheckboxStates(prev => ({
  //     ...prev,
  //     [key]: !prev[key]
  //   }));
  // };

  // ========================================
  // DATA FETCHING EFFECT
  // ========================================
  useEffect(() => {
    const fetchData = async () => {
      setIsDataLoading(true);
      setDataError(null);
      
      try {
        // Fetch all data in parallel
        const [locationsResult, sportOptionsResult, sportDisciplinesResult] = await Promise.all([
          getLocations(),
          getSportOptions(),
          getSportDisciplines()
        ]);

        // Handle locations
        if (locationsResult.error) {
          console.error('Error fetching locations:', locationsResult.error);
          setLocations(fallbackLocations);
        } else if (locationsResult.data) {
          setLocations(locationsResult.data);
        } else {
          setLocations(fallbackLocations);
        }

        // Handle sport options
        if (sportOptionsResult.error) {
          console.error('Error fetching sport options:', sportOptionsResult.error);
          setFetchedSportOptions(fallbackSportOptions);
          // Set default sport from fallback data
          const allSportsOption = fallbackSportOptions.find(option => 
            option.name.toLowerCase().includes('all') || option.id === 'all-sports'
          );
          if (allSportsOption) {
            setSelectedSport(allSportsOption);
          } else if (fallbackSportOptions.length > 0) {
            setSelectedSport(fallbackSportOptions[0]);
          }
        } else if (sportOptionsResult.data) {
          setFetchedSportOptions(sportOptionsResult.data);
          // Update selected sport to match fetched data if needed
          const allSportsOption = sportOptionsResult.data.find(option => 
            option.name.toLowerCase().includes('all') || option.id === 'all-sports'
          );
          if (allSportsOption) {
            setSelectedSport(allSportsOption);
          } else if (sportOptionsResult.data.length > 0) {
            setSelectedSport(sportOptionsResult.data[0]);
          }
        } else {
          setFetchedSportOptions(fallbackSportOptions);
          setSelectedSport(fallbackSportOptions.find(option => option.id === 'all-sports') || fallbackSportOptions[0]);
        }

        // Handle sport disciplines
        if (sportDisciplinesResult.error) {
          console.error('Error fetching sport disciplines:', sportDisciplinesResult.error);
          setFetchedSportDisciplines(fallbackSportDisciplines);
        } else if (sportDisciplinesResult.data) {
          setFetchedSportDisciplines(sportDisciplinesResult.data);
        } else {
          setFetchedSportDisciplines(fallbackSportDisciplines);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
        // Use fallback data when there's a network or other error
        setLocations(fallbackLocations);
        setFetchedSportOptions(fallbackSportOptions);
        setFetchedSportDisciplines(fallbackSportDisciplines);
        setSelectedSport(fallbackSportOptions.find(option => option.id === 'all-sports') || fallbackSportOptions[0]);
        setDataError('Failed to load data. Using fallback data.');
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchData();
  }, []);

  // ========================================
  // SCROLL EFFECT FOR BACKGROUND FADE
  // ========================================
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // const heroHeight = 1107; // Height of hero section (unused)
      const fadeStart = 200; // Start fading after 200px scroll
      const fadeEnd = 600; // Complete fade by 600px scroll
      
      if (scrollY <= fadeStart) {
        setScrollOpacity(1);
      } else if (scrollY >= fadeEnd) {
        setScrollOpacity(0);
      } else {
        // Linear fade between fadeStart and fadeEnd
        const fadeProgress = (scrollY - fadeStart) / (fadeEnd - fadeStart);
        setScrollOpacity(1 - fadeProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ========================================
  // SEARCH MODAL HANDLERS
  // ========================================
  const handleSearchClick = () => {
    setModalStep('location'); // Reset to location step
    setIsSearchModalOpen(true);
  };

  const handleLocationSelect = (location: Location) => {
    console.log("Selected location:", location);
    setSelectedLocation(location);
    // Advance to the sport selection step
    setModalStep('sport');
  };

  const handleSportSelect = (sportIds: string[]) => {
    console.log("Selected sports:", sportIds);
    setSelectedSports(sportIds);
  };

  const handleStepChange = (step: ModalStep) => {
    console.log("Step changed to:", step);
    setModalStep(step);
  };

  const handleParticipantCountsChange = (counts: ParticipantCounts) => {
    console.log("Participant counts updated:", counts);
    setParticipantCounts(counts);
  };

  const handleSearchComplete = (searchData: {
    location: Location;
    sports: string[];
    participants: ParticipantCounts;
  }) => {
    console.log("Search completed with data:", searchData);
    
    // Set search criteria in context
    setSearchCriteria({
      location: searchData.location.name,
      startDate: "2025-01-19", // Mock dates for now
      endDate: "2025-01-26",
      participants: {
        adults: searchData.participants.adults,
        children: searchData.participants.teenagers + searchData.participants.children,
      },
      sport: searchData.sports.length > 0 ? searchData.sports[0] : undefined,
    });

    // Navigate to search results
    router.push('/raven/search');
  };

  const handleModalClose = () => {
    setIsSearchModalOpen(false);
    // Reset modal state when closing
    setModalStep('location');
    setSelectedLocation(undefined);
    setSelectedSports([]);
    setParticipantCounts({ adults: 0, teenagers: 0, children: 0 });
    setSearchValue(""); // Reset search field
  };

  return (
    <div className="bg-black min-h-screen text-white">
      {/* ======================================== */}
      {/* HERO SECTION */}
      {/* Complex background with multiple ski photos */}
      {/* ======================================== */}
      <div className="relative h-[1107px] overflow-hidden">
        {/* ======================================== */}
        {/* CUSTOM BACKGROUND IMAGE */}
        {/* Single full-screen skiing background image */}
        {/* ======================================== */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-100 ease-out"
          style={{ 
            backgroundImage: "url('/assets/images/landing-hero-bg.png?v=3')",
            opacity: scrollOpacity
          }}
        >
          {/* ======================================== */}
          {/* GRADIENT OVERLAY */}
          {/* Dark gradient for text readability */}
          {/* ======================================== */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0000004d] from-[21.28%] to-[#00000099] to-[98.407%]" />
        </div>

        {/* ======================================== */}
        {/* HEADER SECTION */}
        {/* Logo, Toggle Switch, Sign In Button */}
        {/* ======================================== */}
        <div className="relative z-10 flex items-center justify-between p-12 h-[159px]">
          {/* Raven Logo (actual SVG from Figma) */}
          <img src="/assets/logos/raven-logo.svg" alt="Raven" className="h-[59px] w-[166px]" />
          
          {/* Toggle Switch Component */}
          <ToggleSwitch
            isLeft={isForAdventurers}
            onToggle={() => setIsForAdventurers(!isForAdventurers)}
            leftLabel="For Adventurers"
            rightLabel="For Instructors"
          />
          
          {/* Sign In Button with User Icon */}
          <motion.button 
            className="bg-white text-black px-6 py-3 rounded-2xl font-medium font-archivo flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src="/assets/icons/user.svg" alt="User" className="w-5 h-5" />
            Sign in
          </motion.button>
        </div>

        {/* ======================================== */}
        {/* MAIN HERO CONTENT */}
        {/* Title, Description, Search Bar, Filter Chips - Exact Figma Layout */}
        {/* ======================================== */}
        <div className="absolute left-1/2 top-[261px] transform -translate-x-1/2 flex flex-col gap-6 items-center justify-center w-[696px]">
          {/* ======================================== */}
          {/* HERO TEXT CONTENT */}
          {/* ======================================== */}
          <motion.div 
            className="flex flex-col gap-12 items-center justify-center text-center text-white w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Hero Title - Exact Figma specs */}
            <h1 className="text-[80px] leading-[81px] font-pp-editorial font-normal">
              Find your perfect mountain guide
            </h1>
            {/* Hero Description - Exact Figma specs */}
            <p className="text-[#858585] text-base font-light font-archivo tracking-[0.08px] leading-[22px]">
              Raven connects you with the world&apos;s best ski and snowboard instructors, handpicked for their expertise and local knowledge
            </p>
          </motion.div>

          {/* ======================================== */}
          {/* SEARCH BAR */}
          {/* Exact Figma specifications */}
          {/* ======================================== */}
          <motion.div 
            className="bg-[rgba(255,255,255,0.1)] flex items-center px-6 py-4 rounded-[100px] w-full hover:bg-[rgba(255,255,255,0.15)] transition-colors duration-200 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSearchClick}
          >
            {/* Search Icon */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="w-6 h-6 shrink-0 text-[#9696a5]"
            >
              <path
                d="M21 21L16.5 16.5M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {/* Search Placeholder Text */}
            <div className="flex-1 bg-transparent text-[#9696a5] font-archivo text-base tracking-[0.08px] leading-5 min-w-0 overflow-hidden whitespace-nowrap ml-4">
              Find Instructors
            </div>
            
            {/* Sport Selection Pill */}
            <div className="flex items-center ml-4" onClick={(e) => e.stopPropagation()}>
              <SportDropdown
                selectedSport={selectedSport}
                onSportChange={setSelectedSport}
                isOpen={isDropdownOpen}
                onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
                sportOptions={fetchedSportOptions.length > 0 ? fetchedSportOptions : fallbackSportOptions}
              />
            </div>
          </motion.div>

        </div>
      </div>

      {/* ======================================== */}
      {/* HOW IT WORKS SECTION */}
      {/* Exact Figma layout and spacing */}
      {/* ======================================== */}
      <div className="flex flex-col gap-[400px] items-center justify-start left-1/2 px-0 py-[100px] relative transform -translate-x-1/2 w-[1440px]">
        {/* ======================================== */}
        {/* SECTION HEADER */}
        {/* Exact Figma positioning and spacing */}
        {/* ======================================== */}
        <motion.div 
          className="relative grid grid-cols-[max-content] grid-rows-[max-content] place-items-start"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Section Tag */}
          <div className="bg-[#111112] flex gap-2.5 items-center justify-center px-5 py-2.5 relative rounded-[30px] ml-[484.93px]">
            <span className="text-white font-inter font-normal text-base leading-6 text-center whitespaclace-nowrap">How it works</span>
          </div>
          {/* Section Title - Exact Figma positioning */}
          <div className="absolute left-1/2 top-[181.32px] transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center font-pp-editorial text-[80px] text-white text-center w-[1112.86px] h-[194.641px]">
            <p className="leading-[81px]">
              Reserve<br />with Raven
            </p>
          </div>
          {/* Section Description - Exact Figma positioning */}
          <div className="absolute left-1/2 top-[318.641px] transform -translate-x-1/2 font-inter font-normal text-[#858585] text-lg text-center leading-[28px] w-[678.452px] h-[79.927px]">
            <p className="mb-0">
              For people who live to chase the extraordinary and venture to places others only dream of. 
              You don&apos;t follow the rules, and neither do we. Push boundaries. Break limits. Reserve with Raven.
            </p>
          </div>
        </motion.div>

        {/* ======================================== */}
        {/* THREE STEP CARDS */}
        {/* Exact Figma layout - 356px width, 540px height, 24px gap */}
        {/* ======================================== */}
        <div className="flex gap-6 items-start justify-center relative w-full">
          {/* ======================================== */}
          {/* STEP 1: DOWNLOAD APP */}
          {/* Exact Figma layout and positioning */}
          {/* ======================================== */}
          <StepCard
            stepNumber="01"
            title="Download the Raven App"
            description="Your Key to Reimagining Travel."
          >
            {/* Icon Container - Exact Figma positioning */}
            <div className="absolute left-[82.954px] top-0 grid grid-cols-[max-content] grid-rows-[max-content] place-items-start">
              {/* Icon Background */}
              <div className="bg-[#222225] rounded-2xl w-[119.092px] h-[119.092px]" />
              {/* Raven Emblem - Exact positioning */}
              <motion.div 
                className="absolute left-[35.051px] top-[33.235px] w-[48.992px] h-[52.621px] overflow-hidden"
                whileHover={{ rotate: 5 }}
              >
                <img src="/assets/logos/raven-emblem.svg" alt="Raven Emblem" className="w-full h-full" />
              </motion.div>
            </div>
          </StepCard>

          {/* ======================================== */}
          {/* STEP 2: CHOOSE PREFERENCES */}
          {/* Exact Figma layout and positioning */}
          {/* ======================================== */}
          <StepCard
            stepNumber="02"
            title="Choose your adventure preferences"
            description="Select your dates, choose from a curated selection of instructors and locations to curate your perfect trip."
          >
            {/* Container - Exact Figma positioning */}
            <div className="absolute left-[3px] top-0 grid grid-cols-[max-content] grid-rows-[max-content] place-items-start">
              {/* Image Container */}
              <div className="bg-zinc-800 flex gap-3 h-[117px] items-center justify-start pl-3 pr-5 py-0 rounded-[500px] w-[279px]">
                {/* Image Container with overlapping photos */}
                <div className="flex gap-[5px] h-[83px] items-center justify-start w-60">
                  <div className="flex h-[113px] items-center justify-start pl-0 pr-7 py-0">
                    {/* Overlapping Instructor Photos - Exact spacing */}
                    <div className="relative w-[83.278px] h-[83.278px] mr-[-28px]">
                      <img src="/assets/images/instructor-1.png" alt="Instructor" className="w-full h-full rounded-full object-cover" />
                    </div>
                    <div className="relative w-[83.278px] h-[83.278px] mr-[-28px]">
                      <img src="/assets/images/instructor-2.png" alt="Instructor" className="w-full h-full rounded-full object-cover" />
                    </div>
                    <div className="relative w-[83.278px] h-[83.278px] mr-[-28px]">
                      <img src="/assets/images/instructor-3.png" alt="Instructor" className="w-full h-full rounded-full object-cover" />
                    </div>
                  </div>
                  {/* +2 Text */}
                  <span className="text-white text-[26px] font-medium font-archivo tracking-[0.13px] leading-[1.4]">+2</span>
                </div>
              </div>
              
              {/* Rating - Exact Figma positioning */}
              <motion.div 
                className="absolute left-[84px] top-[91.987px] bg-zinc-800 flex gap-3 h-11 items-center justify-start px-5 py-0 rounded-[500px] shadow-[2px_2px_50px_32px_rgba(0,0,0,0.8)]"
                whileHover={{ scale: 1.05 }}
              >
                {/* Star Icon */}
                <div className="flex gap-[3.2px] items-center justify-start">
                  <img src="/assets/icons/star.svg" alt="Star" className="w-3 h-3" />
                </div>
                {/* Rating Text */}
                <span className="text-[#d5d5d6] text-sm font-light font-archivo leading-[1.4]">4.4 (13)</span>
              </motion.div>
            </div>
          </StepCard>

          {/* ======================================== */}
          {/* STEP 3: RESERVE ADVENTURE */}
          {/* Exact Figma layout and positioning */}
          {/* ======================================== */}
          <StepCard
            stepNumber="03"
            title="Reserve Your Next Adventure"
            description="In just a few taps, your journey begins."
          >
            {/* Button Container - Exact Figma positioning */}
            <div className="absolute left-[34.952px] top-0 grid grid-cols-[max-content] grid-rows-[max-content] place-items-start">
              {/* Telemark Skiing - Checked state */}
              <div className="absolute left-4 top-[80.236px] bg-[#222225] flex gap-3 h-[50px] items-center justify-start overflow-hidden px-5 py-3 rounded-lg w-[198px]">
                <div className="bg-white rounded w-4 h-4 flex items-center justify-center">
                  <img src="/assets/icons/checkmark.svg" alt="Check" className="w-3 h-3" />
                </div>
                <span className="text-white text-sm font-medium font-archivo tracking-[0.07px] leading-[1.4]">Telemark Skiing</span>
              </div>
              
              {/* Off-Piste Skiing - Unchecked state */}
              <div className="absolute left-[16.013px] top-0 flex h-[50.621px] items-center justify-center w-[198.082px]">
                <div className="rotate-[359.87deg]">
                  <div className="bg-[#222225] flex gap-3 h-[50.172px] items-center justify-start overflow-hidden px-5 py-3 rounded-lg shadow-[2px_2px_50px_0px_rgba(0,0,0,0.5)] w-[197.97px]">
                    <div className="bg-[#313135] overflow-hidden rounded w-4 h-4" />
                    <span className="text-white text-sm font-medium font-archivo tracking-[0.07px] leading-[1.4]">Off-Piste Skiing</span>
                  </div>
                </div>
              </div>
              
              {/* Ski Touring - Checked state */}
              <div className="absolute left-0 top-[41.236px] bg-[#222225] flex gap-3 h-[50px] items-center justify-start overflow-hidden px-5 py-3 rounded-lg shadow-[2px_2px_50px_0px_rgba(0,0,0,0.5)] w-[199px]">
                <div className="bg-white rounded w-4 h-4 flex items-center justify-center">
                  <img src="/assets/icons/checkmark.svg" alt="Check" className="w-3 h-3" />
                </div>
                <span className="text-white text-sm font-medium font-archivo tracking-[0.07px] leading-[1.4]">Ski Touring</span>
              </div>
            </div>
          </StepCard>
        </div>
      </div>

      {/* ======================================== */}
      {/* WHITE CONTENT SECTIONS */}
      {/* Exact Figma layout and spacing */}
      {/* ======================================== */}
      <div className="absolute bg-white left-1/2 top-[2623px] transform -translate-x-1/2 flex flex-col gap-[140px] h-[2869px] items-center justify-start overflow-hidden pb-0 pt-[140px] px-0 w-[1440px]">
        {/* Section Header */}
        <motion.div 
          className="flex flex-col gap-2.5 items-center justify-start text-[#17171a] text-center w-[664px]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-base font-light font-archivo tracking-[0.08px] leading-6 w-full">
            <p>Experience more than the slopes</p>
          </div>
          <div className="text-[60px] font-pp-editorial tracking-[-1.2px] leading-normal w-full">
            <p>Personalised Adventures, Local Expertise, and Après-Ski Highlights</p>
          </div>
        </motion.div>

        {/* First Content Block - Exact Figma layout */}
        <div className="flex gap-[140px] items-start justify-center relative w-full">
          {/* Image Section */}
          <motion.div 
            className="flex flex-col gap-2 items-start justify-start w-[589px]"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div 
              className="bg-center bg-cover bg-no-repeat h-[658px] rounded-md w-full"
              style={{ backgroundImage: `url(/assets/images/content-section-1.png)` }}
            />
            <div className="text-[#17171a] text-sm font-medium font-archivo opacity-60 leading-6 h-6 w-full">
              <p>Picture caption</p>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div 
            className="flex flex-col gap-[27px] items-start justify-start w-[405px]"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Text Block */}
            <div className="flex flex-col gap-[26px] items-start justify-start text-black text-left w-full">
              <div className="text-[48px] font-normal font-archivo tracking-[-0.24px] leading-normal min-w-full">
                <p>Morbi in sem quis dui placerat ornare.</p>
              </div>
              <div className="text-base font-light font-archivo tracking-[0.08px] leading-6 w-[388px]">
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. 
                  Nullam malesuada erat ut turpis. Suspendisse urna nibh viverra non semper suscipit posuere a pede.
                </p>
              </div>
            </div>

            {/* Features List */}
            <div className="flex flex-col gap-3 items-start justify-start w-[218px]">
              <div className="flex gap-[7px] items-center justify-start">
                <img src="/assets/icons/checkmark-small.svg" alt="Check" className="w-6 h-6" />
                <span className="text-[#17171a] text-sm font-medium font-archivo tracking-[0.07px] leading-6">All snowsports</span>
              </div>
              <div className="flex gap-[7px] items-center justify-start w-full">
                <img src="/assets/icons/checkmark-small.svg" alt="Check" className="w-6 h-6" />
                <span className="text-[#17171a] text-sm font-medium font-archivo tracking-[0.07px] leading-6">Off-piste, snowpark, freestyle</span>
              </div>
              <div className="flex gap-[7px] items-center justify-start w-full">
                <img src="/assets/icons/checkmark-small.svg" alt="Check" className="w-6 h-6" />
                <span className="text-[#17171a] text-sm font-medium font-archivo tracking-[0.07px] leading-6">Discover new areas</span>
              </div>
            </div>

            {/* Button */}
            <motion.div 
              className="bg-white h-10 mix-blend-difference rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex gap-1 h-10 items-center justify-center overflow-hidden px-5 py-2.5">
                <span className="text-[#0d0d0f] text-sm font-medium font-archivo tracking-[0.07px] leading-[18px]">Start your journey</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Second Section Header */}
        <motion.div 
          className="flex flex-col gap-2.5 items-center justify-start text-[#17171a] text-center w-[664px]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-base font-light font-archivo tracking-[0.08px] leading-6 w-full">
            <p>Experience more than the slopes</p>
          </div>
          <div className="text-[60px] font-pp-editorial tracking-[-1.2px] leading-normal w-full">
            <p>Personalised Adventures, Local Expertise, and Après-Ski Highlights</p>
          </div>
        </motion.div>

        {/* Content Section - Exact Figma positioning */}
        <div className="flex flex-col gap-[70px] items-center justify-start w-full">
          <div className="flex flex-col gap-[70px] items-center justify-start w-[1200px]">
            <div className="relative h-[780px] w-[1200px]">
              {/* Text Section - Left positioned */}
              <motion.div 
                className="absolute flex flex-col gap-[26px] items-start justify-start right-[90.5px] top-1.5 w-[405px]"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="text-black text-[48px] font-normal font-archivo tracking-[-0.24px] leading-normal text-left min-w-full">
                  <p>Experience family adventures</p>
                </div>
                <div className="text-black text-base font-light font-archivo tracking-[0.08px] leading-6 text-left w-[388px]">
                  <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. 
                    Nullam malesuada erat ut turpis. Suspendisse urna nibh viverra non semper suscipit posuere a pede.
                  </p>
                </div>
                
                {/* Features List */}
                <div className="flex flex-col gap-3 items-start justify-start w-[218px]">
                  <div className="flex gap-[7px] items-center justify-start">
                    <img src="/assets/icons/checkmark-small.svg" alt="Check" className="w-6 h-6" />
                    <span className="text-[#17171a] text-sm font-medium font-archivo tracking-[0.07px] leading-6">Full families welcome</span>
                  </div>
                  <div className="flex gap-[7px] items-center justify-start w-full">
                    <img src="/assets/icons/checkmark-small.svg" alt="Check" className="w-6 h-6" />
                    <span className="text-[#17171a] text-sm font-medium font-archivo tracking-[0.07px] leading-6">Nunc dignisim risis id metus</span>
                  </div>
                  <div className="flex gap-[7px] items-center justify-start w-full">
                    <img src="/assets/icons/checkmark-small.svg" alt="Check" className="w-6 h-6" />
                    <span className="text-[#17171a] text-sm font-medium font-archivo tracking-[0.07px] leading-6">Vivamus vestibulum ntulla nec ante.</span>
                  </div>
                </div>
              </motion.div>

              {/* Image Section - Right positioned */}
              <motion.div 
                className="absolute flex flex-col gap-2 items-start justify-start left-[-35.5px] top-0 w-[660px]"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div 
                  className="bg-center bg-cover bg-no-repeat h-[748px] rounded-md w-full"
                  style={{ backgroundImage: `url(/assets/images/content-section-2.png)` }}
                />
                <div className="text-[#17171a] text-sm font-medium font-archivo opacity-60 leading-6 h-6 w-full">
                  <p>Picture caption</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Footer Section - Exact Figma layout */}
          <div className="flex gap-4 items-center justify-center font-pp-editorial opacity-10 px-2 py-6 text-[#0a0c13] text-[92px] text-center tracking-[-1.84px] leading-normal">
            {Array.from({ length: 14 }, (_, i) => (
              <div key={i}>
                <p className="whitespace-nowrap">Reserved.</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ======================================== */}
      {/* SEARCH MODAL */}
      {/* ======================================== */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={handleModalClose}
        locations={locations}
        sportOptions={fetchedSportOptions.length > 0 ? fetchedSportOptions : fallbackSportOptions}
        sportDisciplines={fetchedSportDisciplines.length > 0 ? fetchedSportDisciplines : fallbackSportDisciplines}
        onLocationSelect={handleLocationSelect}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        isLoading={isDataLoading}
        step={modalStep}
        selectedLocation={selectedLocation}
        selectedSports={selectedSports}
        onSportSelect={handleSportSelect}
        onStepChange={handleStepChange}
        participantCounts={participantCounts}
        onParticipantCountsChange={handleParticipantCountsChange}
        onSearch={handleSearchComplete}
      />
    </div>
  );
}