"use client";

import { PricingCard } from "@/components/payment/pricing-card";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { useState } from "react";
import { CheckoutForm } from "@/components/payment/checkout-form";

const pricingPlans = [
  {
    name: "Starter",
    price: "$9",
    description: "Perfect for individuals getting started",
    features: [
      "Access to basic components",
      "Community support",
      "Basic documentation",
      "1 project",
      "Email support"
    ],
    buttonText: "Start Free Trial"
  },
  {
    name: "Pro",
    price: "$29",
    description: "Best for growing teams and businesses",
    features: [
      "All Aceternity UI components",
      "Priority support",
      "Advanced documentation",
      "Unlimited projects",
      "Team collaboration",
      "Custom themes",
      "Figma integration"
    ],
    recommended: true,
    buttonText: "Get Pro"
  },
  {
    name: "Enterprise",
    price: "$99",
    description: "For large organizations with advanced needs",
    features: [
      "Everything in Pro",
      "Custom component development",
      "Dedicated support manager",
      "SLA guarantee",
      "Advanced analytics",
      "White-label options",
      "Training sessions"
    ],
    buttonText: "Contact Sales"
  }
];

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<typeof pricingPlans[0] | null>(null);

  const handleSelectPlan = (plan: typeof pricingPlans[0]) => {
    setSelectedPlan(plan);
    // Scroll to checkout form
    setTimeout(() => {
      document.getElementById('checkout-section')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }, 100);
  };

  const handleCheckoutSubmit = async (data: Record<string, string>) => {
    console.log("Checkout data:", data);
    // Here you would integrate with Stripe
    alert("This is a demo. In a real app, this would process the payment via Stripe.");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Aurora Background */}
      <section className="relative">
        <AuroraBackground className="h-[60vh]">
          <div className="relative flex flex-col gap-4 items-center justify-center px-4">
            <div className="text-4xl md:text-6xl font-bold dark:text-white text-center">
              Choose Your Plan
            </div>
            <div className="font-extralight text-base md:text-2xl dark:text-neutral-200 py-4 text-center max-w-2xl">
              Unlock the full potential of Aceternity UI with our flexible pricing options
            </div>
          </div>
        </AuroraBackground>
      </section>

      {/* Pricing Cards Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            {pricingPlans.map((plan, index) => (
              <PricingCard
                key={index}
                plan={plan}
                onSelectPlan={() => handleSelectPlan(plan)}
              />
            ))}
          </div>

          {/* Features Comparison */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8 text-neutral-900 dark:text-white">
              Compare Features
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border border-neutral-200 dark:border-neutral-700 rounded-lg">
                <thead>
                  <tr className="bg-neutral-50 dark:bg-neutral-800">
                    <th className="text-left p-4 font-medium text-neutral-900 dark:text-white">
                      Feature
                    </th>
                    <th className="text-center p-4 font-medium text-neutral-900 dark:text-white">
                      Starter
                    </th>
                    <th className="text-center p-4 font-medium text-neutral-900 dark:text-white">
                      Pro
                    </th>
                    <th className="text-center p-4 font-medium text-neutral-900 dark:text-white">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Basic Components", "✓", "✓", "✓"],
                    ["Advanced Components", "✗", "✓", "✓"],
                    ["Custom Themes", "✗", "✓", "✓"],
                    ["Figma Integration", "✗", "✓", "✓"],
                    ["Priority Support", "✗", "✓", "✓"],
                    ["Team Collaboration", "✗", "✓", "✓"],
                    ["Custom Development", "✗", "✗", "✓"],
                    ["Dedicated Support", "✗", "✗", "✓"],
                  ].map(([feature, starter, pro, enterprise], index) => (
                    <tr key={index} className="border-t border-neutral-200 dark:border-neutral-700">
                      <td className="p-4 font-medium text-neutral-900 dark:text-white">
                        {feature}
                      </td>
                      <td className="text-center p-4 text-neutral-600 dark:text-neutral-400">
                        {starter}
                      </td>
                      <td className="text-center p-4 text-neutral-600 dark:text-neutral-400">
                        {pro}
                      </td>
                      <td className="text-center p-4 text-neutral-600 dark:text-neutral-400">
                        {enterprise}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Checkout Section */}
      {selectedPlan && (
        <section id="checkout-section" className="py-20 px-4 bg-neutral-50 dark:bg-neutral-900">
          <div className="container mx-auto flex justify-center">
            <CheckoutForm
              planName={selectedPlan.name}
              planPrice={selectedPlan.price}
              onSubmit={handleCheckoutSubmit}
            />
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <h3 className="text-2xl font-bold text-center mb-12 text-neutral-900 dark:text-white">
            Frequently Asked Questions
          </h3>
          <div className="space-y-6">
            {[
              {
                question: "Can I change my plan later?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
              },
              {
                question: "Do you offer refunds?",
                answer: "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards and PayPal. Enterprise customers can also pay via bank transfer."
              },
              {
                question: "Is there a free trial?",
                answer: "Yes, all plans come with a 14-day free trial. No credit card required to start."
              }
            ].map((faq, index) => (
              <div key={index} className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-6">
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">
                  {faq.question}
                </h4>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}