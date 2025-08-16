"use client";

import { motion } from "motion/react";
import { FrenchFlag } from "@/components/icons";
import { cn } from "@/lib/utils";

interface DestinationCardProps {
  name: string;
  price: string;
  imageUrl: string;
  className?: string;
}

export function DestinationCard({ name, price, imageUrl, className }: DestinationCardProps) {
  return (
    <motion.div
      className={cn("w-[162px] flex flex-col gap-4", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8 }}
    >
      <motion.div
        className="relative h-[201px] rounded-xl overflow-hidden group cursor-pointer"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="w-full h-full bg-cover bg-center bg-gray-300"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 100%), url('${imageUrl}')`
          }}
        />
        
        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.2 }}
        />
        
        {/* Border frame effect */}
        <div className="absolute inset-4 border-2 border-white/80 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        
        {/* Shimmer effect on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-20"
          initial={false}
          animate={{
            background: [
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)"
            ]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
      
      <motion.div
        className="flex flex-col gap-0.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-2">
          <FrenchFlag className="w-[18px] h-[18px]" />
          <h3 className="text-white font-medium text-base leading-5 tracking-[0.08px]">
            {name}
          </h3>
        </div>
        <p className="text-[#d5d5d6] font-light text-sm leading-[18px] tracking-[0.07px]">
          {price}
        </p>
      </motion.div>
    </motion.div>
  );
}