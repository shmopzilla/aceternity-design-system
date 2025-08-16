"use client";

import Link from "next/link";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 p-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="text-2xl font-bold text-white">
            Aceternity UI
          </div>
          <div className="flex gap-6">
            <Link 
              href="/showcase" 
              className="text-white hover:text-neutral-300 transition-colors"
            >
              Components
            </Link>
            <Link 
              href="/pricing" 
              className="text-white hover:text-neutral-300 transition-colors"
            >
              Pricing
            </Link>
            <Link 
              href="/raven" 
              className="text-white hover:text-neutral-300 transition-colors"
            >
              Raven Demo
            </Link>
            <Link 
              href="https://github.com" 
              className="text-white hover:text-neutral-300 transition-colors"
            >
              GitHub
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/images/landing-hero-bg.png?v=2')"
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative z-10 flex flex-col gap-6 items-center justify-center px-4 max-w-4xl mx-auto text-center">
          <div className="text-5xl md:text-7xl font-bold text-white text-center">
            Build Beautiful UIs
          </div>
          <div className="text-5xl md:text-7xl font-bold text-white text-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            With Aceternity
          </div>
          <div className="font-light text-lg md:text-2xl text-neutral-200 py-4 max-w-2xl">
            A comprehensive design system combining Figma integration, Supabase backend, 
            and Stripe payments with beautiful Aceternity UI components.
          </div>
          <div className="flex gap-4 flex-col sm:flex-row">
            <Link 
              href="/showcase"
              className="bg-white rounded-full text-black px-8 py-4 font-medium hover:bg-neutral-100 transition-colors"
            >
              Explore Components
            </Link>
            <Link 
              href="/pricing"
              className="border border-white/20 rounded-full text-white px-8 py-4 font-medium hover:bg-white/10 transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A complete starter kit with modern tooling and beautiful components
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CardContainer className="inter-var">
              <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto h-auto rounded-xl p-6 border">
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                  Figma Integration
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                  Seamlessly import designs from Figma and convert them to beautiful components
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  <div className="h-32 w-full rounded-xl bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center">
                    <div className="text-white text-lg font-bold">
                      🎨 Design-to-Code
                    </div>
                  </div>
                </CardItem>
              </CardBody>
            </CardContainer>

            <CardContainer className="inter-var">
              <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto h-auto rounded-xl p-6 border">
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                  Supabase Backend
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                  Full-stack ready with authentication, database, and real-time features
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  <div className="h-32 w-full rounded-xl bg-gradient-to-br from-green-500 via-blue-500 to-purple-500 flex items-center justify-center">
                    <div className="text-white text-lg font-bold">
                      🚀 Full-Stack
                    </div>
                  </div>
                </CardItem>
              </CardBody>
            </CardContainer>

            <CardContainer className="inter-var">
              <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto h-auto rounded-xl p-6 border">
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                  Stripe Payments
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                  Beautiful payment flows with subscription management built-in
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  <div className="h-32 w-full rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
                    <div className="text-white text-lg font-bold">
                      💳 Payments
                    </div>
                  </div>
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="py-20 px-4 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            This project is set up and ready to go in ~/Documents/workspaces/aceternity-design-system/
          </p>
          <div className="bg-black dark:bg-white text-white dark:text-black p-6 rounded-lg text-left max-w-2xl mx-auto">
            <code className="text-sm">
              cd ~/Documents/workspaces/aceternity-design-system<br/>
              npm run dev
            </code>
          </div>
          <div className="mt-8">
            <Link 
              href="/showcase"
              className="bg-foreground text-background px-8 py-4 rounded-full font-medium hover:opacity-90 transition-opacity inline-block"
            >
              Explore Components →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
