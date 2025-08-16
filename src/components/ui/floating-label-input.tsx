"use client";
import * as React from "react";
import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface FloatingLabelInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  containerClassName?: string;
}

const FloatingLabelInput = React.forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ className, label, type = "text", containerClassName, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(e.target.value !== "");
      props.onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value !== "");
      props.onChange?.(e);
    };

    const isLabelFloating = isFocused || hasValue;

    return (
      <div className={cn("relative", containerClassName)}>
        <input
          type={type}
          className={cn(
            "peer h-10 w-full border-b-2 border-gray-300 bg-transparent px-0 py-0 text-sm text-gray-900 placeholder-transparent focus:border-blue-600 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500",
            className
          )}
          placeholder={label}
          ref={ref}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        />
        <motion.label
          className={cn(
            "absolute left-0 cursor-text text-sm text-gray-500 duration-300 origin-[0] dark:text-gray-400 pointer-events-none"
          )}
          animate={{
            top: isLabelFloating ? "-1.5rem" : "0.25rem",
            fontSize: isLabelFloating ? "0.75rem" : "0.875rem",
            color: isFocused ? "rgb(37 99 235)" : "rgb(107 114 128)",
          }}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
          }}
        >
          {label}
        </motion.label>
      </div>
    );
  }
);

FloatingLabelInput.displayName = "FloatingLabelInput";

export { FloatingLabelInput };