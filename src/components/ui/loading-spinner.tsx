"use client";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  color?: string;
}

export const LoadingSpinner = ({ 
  size = "md", 
  className,
  color = "#ffffff"
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8"
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <motion.div
        className={cn("border-2 border-transparent rounded-full", sizeClasses[size])}
        style={{
          borderTopColor: color,
          borderRightColor: `${color}40`, // 25% opacity
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1,
          ease: "linear",
          repeat: Infinity,
        }}
      />
    </div>
  );
};

export const SearchLoadingSpinner = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center justify-center py-8", className)}>
      <div className="flex flex-col items-center gap-3">
        <motion.div
          className="w-8 h-8 border-2 border-transparent rounded-full"
          style={{
            borderTopColor: "#cbcbd2",
            borderRightColor: "#cbcbd240",
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1.2,
            ease: "linear",
            repeat: Infinity,
          }}
        />
        <motion.p
          className="text-[#cbcbd2] text-sm font-['Archivo'] font-light"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          Searching destinations...
        </motion.p>
      </div>
    </div>
  );
};

export default LoadingSpinner;