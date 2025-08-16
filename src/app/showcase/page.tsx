"use client";

import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { AuroraBackground } from "@/components/ui/aurora-background";
import Link from "next/link";

export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-2">
          Aceternity UI Component Showcase
        </h1>
        <p className="text-xl text-muted-foreground text-center mb-12">
          Beautiful components built with Tailwind CSS and Framer Motion
        </p>

        <div className="grid gap-16">
          {/* Aurora Background Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Aurora Background</h2>
            <div className="h-96 rounded-lg overflow-hidden border">
              <AuroraBackground>
                <div className="relative flex flex-col gap-4 items-center justify-center px-4">
                  <div className="text-3xl md:text-4xl font-bold dark:text-white text-center">
                    Background lights are cool you know.
                  </div>
                  <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
                    And this, is chemical burn.
                  </div>
                  <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
                    Debug now
                  </button>
                </div>
              </AuroraBackground>
            </div>
          </section>

          {/* 3D Card Effect Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">3D Card Effect</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <CardContainer className="inter-var">
                <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 dark:text-white"
                  >
                    Make things float in air
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                  >
                    Hover over this card to unleash the power of CSS perspective
                  </CardItem>
                  <CardItem translateZ="100" className="w-full mt-4">
                    <div className="h-60 w-full rounded-xl bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 flex items-center justify-center">
                      <div className="text-white text-lg font-bold">
                        Interactive 3D Card
                      </div>
                    </div>
                  </CardItem>
                  <div className="flex justify-between items-center mt-20">
                    <CardItem
                      translateZ={20}
                      as={Link}
                      href="https://twitter.com/mannupaaji"
                      target="__blank"
                      className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                    >
                      Try now →
                    </CardItem>
                    <CardItem
                      translateZ={20}
                      as="button"
                      className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                    >
                      Sign up
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>

              <CardContainer className="inter-var">
                <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 dark:text-white"
                  >
                    Product Card Example
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                  >
                    Perfect for e-commerce and product showcases
                  </CardItem>
                  <CardItem translateZ="100" className="w-full mt-4">
                    <div className="h-60 w-full rounded-xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 flex items-center justify-center">
                      <div className="text-white text-lg font-bold">
                        Product Image
                      </div>
                    </div>
                  </CardItem>
                  <div className="flex justify-between items-center mt-20">
                    <CardItem
                      translateZ={20}
                      className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                    >
                      $99.99
                    </CardItem>
                    <CardItem
                      translateZ={20}
                      as="button"
                      className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                    >
                      Add to Cart
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>

              <CardContainer className="inter-var">
                <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 dark:text-white"
                  >
                    Service Card
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                  >
                    Great for showcasing services and features
                  </CardItem>
                  <CardItem translateZ="100" className="w-full mt-4">
                    <div className="h-60 w-full rounded-xl bg-gradient-to-br from-green-500 via-teal-500 to-blue-500 flex items-center justify-center">
                      <div className="text-white text-lg font-bold">
                        Service Icon
                      </div>
                    </div>
                  </CardItem>
                  <div className="flex justify-between items-center mt-20">
                    <CardItem
                      translateZ={20}
                      className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                    >
                      Learn more →
                    </CardItem>
                    <CardItem
                      translateZ={20}
                      as="button"
                      className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                    >
                      Get Started
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            </div>
          </section>

          {/* Component Categories */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Available Component Categories</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold mb-2">Animations</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Aurora Background</li>
                  <li>• Background Beams</li>
                  <li>• Meteors</li>
                  <li>• Sparkles</li>
                  <li>• Text Effects</li>
                </ul>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold mb-2">Cards</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 3D Card Effect</li>
                  <li>• Card Hover Effect</li>
                  <li>• Focus Cards</li>
                  <li>• Expandable Card</li>
                  <li>• Glare Card</li>
                </ul>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold mb-2">Layout</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Bento Grid</li>
                  <li>• Layout Grid</li>
                  <li>• Parallax Scroll</li>
                  <li>• Sidebar</li>
                  <li>• Tabs</li>
                </ul>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold mb-2">Navigation</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Floating Navbar</li>
                  <li>• Navbar Menu</li>
                  <li>• Breadcrumbs</li>
                  <li>• Pagination</li>
                  <li>• Steps</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}