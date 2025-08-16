# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server (localhost:3000)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint on the codebase

## Architecture Overview

Next.js 15 application with Aceternity UI components, integrated with Figma design system tools, Supabase backend, and Stripe payments.

### Core Technologies
- **Frontend**: Next.js 15 + React 19 + TypeScript
- **UI Library**: Aceternity UI (premium animated components)
- **Styling**: Tailwind CSS + tailwindcss-animate
- **Backend**: Supabase (auth, database, real-time)
- **Payments**: Stripe (subscriptions, checkout)
- **Design Integration**: Custom Figma integration utilities
- **Animations**: Motion (Framer Motion successor) + CSS animations

### Application Structure

**App Router Architecture**: Uses Next.js App Router with route groups:
- `src/app/page.tsx` - Homepage with hero and features
- `src/app/showcase/` - Interactive component showcase
- `src/app/pricing/` - Pricing and payment flows
- `src/app/raven/` - Demo landing page implementation

**Component Organization**:
- `src/components/ui/` - Aceternity UI components (3D cards, aurora backgrounds, etc.)
- `src/components/payment/` - Stripe integration components (pricing cards, checkout forms)
- `src/components/raven/` - Demo landing page components
- `src/components/icons/` - Icon definitions and exports

**Figma Integration System**: 
- `src/designs/types.ts` - Complete TypeScript definitions for Figma API responses
- `src/designs/utils.ts` - Utilities for converting Figma nodes to design tokens and CSS
- `src/designs/mappings/component-map.ts` - Intelligent mapping from Figma node types to Aceternity components
- Uses MCP Figma integration for real-time design-to-code workflows

**Backend Architecture**:
- `src/lib/supabase/` - Database client, auth utilities, and typed queries
- `src/lib/stripe/` - Payment processing, webhook handling, and subscription management
- `src/lib/utils.ts` - Utility functions including `cn()` helper for class merging

### Key Features

**Aceternity UI Integration**:
- 70+ premium animated components available
- 3D card effects with perspective transformations
- Aurora/gradient background animations
- Text generation and typewriter effects
- Floating navigation and interactive elements

**Figma-to-Code Workflow**:
- Extract design tokens from Figma variables (colors, spacing, typography)
- Map Figma node types to appropriate Aceternity components
- Generate responsive CSS from Figma constraints
- Support for component variants and properties

**Payment System**:
- Beautiful animated checkout forms using Aceternity UI
- Subscription management with Stripe Customer Portal
- Webhook handling for payment events
- Multiple payment methods support

### Development Patterns

- Import Aceternity components from `@/components/ui/`
- Use `cn()` utility for conditional class merging
- Figma integration: Use `nodeToDesignTokens()` and `getRecommendedAceternityComponent()` functions
- Supabase: Use typed client from `@/lib/supabase/client`
- Stripe: Use server-side utilities from `@/lib/stripe/server`
- Environment variables required: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`

### Adding New Aceternity Components

1. Download from [ui.aceternity.com](https://ui.aceternity.com)
2. Place in `src/components/ui/`
3. Add to `src/components/icons/index.tsx` if using icons
4. Update showcase page for discoverability
5. Add to `ACETERNITY_UI_COMPONENTS` mapping if needed for Figma integration

### Figma Integration Usage

```typescript
// Extract design tokens from Figma node
const tokens = nodeToDesignTokens(figmaNode);

// Get recommended Aceternity component
const component = getRecommendedAceternityComponent(figmaNode.name, figmaNode.type);

// Convert Figma color to HSL
const hslColor = figmaColorToHsl(figmaColor);
```