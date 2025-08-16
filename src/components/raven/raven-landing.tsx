"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { FilterChip } from "./filter-chip";
import { DestinationCard } from "./destination-card";
import { SearchBar } from "./search-bar";
import { UserIcon, SkiIcon, SnowboardIcon, TouringIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

// Filter types
type FilterType = "all" | "skiing" | "snowboarding" | "ski-touring";

interface FilterOption {
  id: FilterType;
  label: string;
  icon?: React.ReactNode;
}

// Sample destination data
const destinations = [
  {
    id: 1,
    name: "Courchevel 1850",
    price: "Average price €350/ph",
    imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=500&fit=crop&crop=center",
    sports: ["skiing", "snowboarding", "ski-touring"] as FilterType[]
  },
  {
    id: 2,
    name: "Meribel",
    price: "Average price €200/ph", 
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop&crop=center",
    sports: ["skiing", "snowboarding"] as FilterType[]
  },
  {
    id: 3,
    name: "Tignes",
    price: "Average price €250/ph",
    imageUrl: "https://images.unsplash.com/photo-1551524164-6cf2ac5a2003?w=400&h=500&fit=crop&crop=center",
    sports: ["skiing", "snowboarding", "ski-touring"] as FilterType[]
  },
  {
    id: 4,
    name: "Avoriaz",
    price: "Average price €180/ph",
    imageUrl: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=400&h=500&fit=crop&crop=center",
    sports: ["skiing", "snowboarding"] as FilterType[]
  }
];

const filterOptions: FilterOption[] = [
  { id: "all", label: "All sports" },
  { id: "skiing", label: "Skiing", icon: <SkiIcon className="w-6 h-6" /> },
  { id: "snowboarding", label: "Snowboarding", icon: <SnowboardIcon className="w-6 h-6" /> },
  { id: "ski-touring", label: "Ski-Touring", icon: <TouringIcon className="w-6 h-6" /> }
];

export function RavenLanding() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [, setSearchQuery] = useState("");

  // Filter destinations based on active filter
  const filteredDestinations = destinations.filter(destination => {
    if (activeFilter === "all") return true;
    return destination.sports.includes(activeFilter);
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log("Searching for:", query);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden font-archivo">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-blue-900/10 to-black/80" />
        
        {/* Animated background blobs */}
        <motion.div
          className="absolute top-0 left-0 w-full h-[600px] opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2 }}
        >
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute top-20 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
        </motion.div>
      </div>

      {/* Header */}
      <motion.header
        className="relative z-10 flex items-center justify-between px-10 py-5 w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <motion.div
          className="text-white text-3xl font-light tracking-wide"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          Raven
        </motion.div>

        {/* Sign In Button */}
        <motion.button
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 bg-white text-black rounded-2xl",
            "font-medium text-base hover:bg-gray-100 transition-colors duration-200",
            "hover:shadow-lg"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <UserIcon className="w-5 h-5" />
          <span>Sign in</span>
        </motion.button>
      </motion.header>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 pt-20 pb-16">
        <motion.div
          className="max-w-[696px] w-full flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Heading */}
          <div className="text-center">
            <motion.h1
              className="text-white text-5xl font-light leading-[56px] tracking-[0.24px] mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Find your perfect mountain guide
            </motion.h1>
            <motion.p
              className="text-white text-base leading-[22px] tracking-[0.08px] max-w-lg mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Raven connects you with the world&apos;s best ski and snowboard instructors, 
              handpicked for their expertise and local knowledge
            </motion.p>
          </div>

          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} />

          {/* Filter Chips */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {filterOptions.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
              >
                <FilterChip
                  label={option.label}
                  icon={option.icon}
                  isActive={activeFilter === option.id}
                  onClick={() => setActiveFilter(option.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Destinations Section */}
      <div className="relative z-10 px-4 pb-20">
        <motion.div
          className="max-w-[744px] mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          {/* Section Title */}
          <motion.div
            className="text-center mb-11"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <h2 className="text-white text-2xl font-light leading-7 tracking-[0.12px]">
              Browse by destination
            </h2>
          </motion.div>

          {/* Destination Cards */}
          <motion.div
            className="flex gap-4 overflow-x-auto pb-4 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1 }}
          >
            {filteredDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}
                className="flex-shrink-0"
              >
                <DestinationCard
                  name={destination.name}
                  price={destination.price}
                  imageUrl={destination.imageUrl}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Show message if no destinations match filter */}
          {filteredDestinations.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-white/60 text-lg">
                No destinations found for {filterOptions.find(f => f.id === activeFilter)?.label}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Background decoration at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}