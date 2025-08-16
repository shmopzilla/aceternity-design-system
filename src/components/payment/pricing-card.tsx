"use client";

import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { cn } from "@/lib/utils";

interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
  buttonText?: string;
}

interface PricingCardProps {
  plan: PricingPlan;
  onSelectPlan?: () => void;
  className?: string;
}

export function PricingCard({ plan, onSelectPlan, className }: PricingCardProps) {
  return (
    <CardContainer className="inter-var">
      <CardBody 
        className={cn(
          "bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[25rem] h-auto rounded-xl p-6 border",
          plan.recommended && "border-blue-500 dark:border-blue-400 ring-2 ring-blue-500/20",
          className
        )}
      >
        {plan.recommended && (
          <CardItem
            translateZ="20"
            className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium"
          >
            Recommended
          </CardItem>
        )}
        
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {plan.name}
        </CardItem>
        
        <CardItem
          translateZ="60"
          className="text-4xl font-bold text-neutral-900 dark:text-white mt-4"
        >
          {plan.price}
          <span className="text-lg font-normal text-neutral-500 dark:text-neutral-400">
            /month
          </span>
        </CardItem>
        
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {plan.description}
        </CardItem>
        
        <CardItem translateZ="80" className="w-full mt-6">
          <ul className="space-y-3">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm">
                <svg
                  className="w-4 h-4 text-green-500 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-neutral-600 dark:text-neutral-300">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </CardItem>
        
        <CardItem translateZ="100" className="w-full mt-8">
          <button
            onClick={onSelectPlan}
            className={cn(
              "w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 hover:scale-105",
              plan.recommended
                ? "bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl"
                : "bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-black"
            )}
          >
            {plan.buttonText || "Get Started"}
          </button>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}