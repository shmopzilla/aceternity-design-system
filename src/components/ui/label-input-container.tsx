"use client";
import React from "react";
import { cn } from "@/lib/utils";

const LabelInputContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col space-y-2 w-full", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

LabelInputContainer.displayName = "LabelInputContainer";

export { LabelInputContainer };