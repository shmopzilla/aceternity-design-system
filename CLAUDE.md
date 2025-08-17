# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Workspace Overview

This is a Next.js 15 application showcasing Aceternity UI components with comprehensive Figma integration, Supabase backend, and Stripe payment processing. The project demonstrates production-ready patterns for design-to-code workflows and modern React architecture.

## Development Commands

- `npm run dev` - Start development server (localhost:3000)
- `npm run build` - Build for production with TypeScript checking
- `npm run start` - Start production server
- `npm run lint` - Run ESLint on the codebase

## Architecture Overview

### Core Technologies
- **Frontend**: Next.js 15 + React 19 + TypeScript
- **UI Library**: Aceternity UI (premium animated components)
- **Styling**: Tailwind CSS + tailwindcss-animate
- **Animation**: Motion (Framer Motion successor)
- **Backend**: Supabase (auth, database, real-time)
- **Payments**: Stripe (subscriptions, checkout)
- **Design Integration**: Custom Figma MCP integration

### Data Architecture & Supabase Integration

**Critical Pattern**: The application uses a **graceful fallback system** for Supabase integration:

- **Environment-aware**: Automatically detects missing Supabase credentials and uses fallback data
- **Typed responses**: All database functions return `{ data, error }` structure consistently
- **Error boundary**: Functions check `if (!supabase)` before database calls
- **Development workflow**: Uses `src/lib/fallback-data.ts` when Supabase isn't configured

**Database Functions Pattern** (`src/lib/supabase/database.ts`):
```typescript
export async function getLocations() {
  if (!supabase) {
    return { data: null, error: new Error('Supabase not configured') };
  }
  // Actual Supabase call...
}
```

**Component Integration Pattern** (`src/components/raven/enhanced-raven-landing.tsx`):
```typescript
useEffect(() => {
  async function fetchData() {
    const { data: locationsResult, error: locationsError } = await getLocations();
    if (locationsError || !locationsResult) {
      setLocations(fallbackLocations);
    } else {
      setLocations(locationsResult);
    }
  }
  fetchData();
}, []);
```

### Application Structure

**App Router with Route Groups**:
- `src/app/page.tsx` - Homepage with hero and features
- `src/app/showcase/` - Interactive component showcase
- `src/app/pricing/` - Pricing and payment flows  
- `src/app/raven/` - Complete landing page implementation demonstrating pixel-perfect Figma conversion

**Component Architecture**:
- `src/components/ui/` - Aceternity UI components (3D cards, aurora backgrounds, animated modals, search components)
- `src/components/payment/` - Stripe integration (pricing cards, checkout forms)
- `src/components/raven/` - Demo implementation showing production patterns
- `src/components/icons/` - Centralized icon exports

**Design System Integration**:
- `src/designs/types.ts` - Complete TypeScript definitions for Figma API responses
- `src/designs/utils.ts` - Utilities for converting Figma nodes to design tokens and CSS
- `src/designs/mappings/component-map.ts` - Intelligent mapping from Figma node types to Aceternity components

### Key Architectural Patterns

**Motion Animation System**:
- Uses `motion` (Framer Motion successor) for all animations
- Custom Tailwind keyframes defined in `tailwind.config.ts`: `aurora`, `shimmer`, `moveInCircle`, etc.
- Consistent animation patterns: `whileHover={{ scale: 1.02 }}`, `whileTap={{ scale: 0.98 }}`

**Search Modal Architecture** (`src/components/ui/search-modal.tsx`):
- **Multi-step modal system**: Location → Sport → Participants
- **Debounced search**: 300ms delay with `setTimeout` cleanup
- **Result optimization**: 4 initial results, 6 maximum when searching
- **Data-driven**: Accepts external data props but falls back to internal defaults
- **Comprehensive ski resort database**: 30+ French ski resorts with pricing in EUR

**Typography System**:
- Custom font loading: Archivo, Inter, Playfair Display, PP Editorial New
- Font CSS variables: `--font-archivo`, `--font-inter`, etc.
- Consistent usage: `font-['Archivo']` for body text, `font-inter` for headings

**CSS-in-JS Pattern**:
- Uses `cn()` utility for conditional class merging (tailwind-merge + clsx)
- Backdrop blur effects: `backdrop-blur-[25px] backdrop-filter`
- Glassmorphism: `bg-[rgba(255,255,255,0.1)]`

### Environment Variables & Configuration

**Required Environment Variables**:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
```

**Graceful Degradation**: Application works without environment variables by using fallback data.

### Figma Integration Workflow

**Design Token Extraction**:
```typescript
import { nodeToDesignTokens, figmaColorToHsl } from "@/designs/utils";
import { getRecommendedAceternityComponent } from "@/designs/mappings/component-map";

// Extract design tokens from Figma node
const tokens = nodeToDesignTokens(figmaNode);

// Get recommended Aceternity component
const component = getRecommendedAceternityComponent(figmaNode.name, figmaNode.type);
```

**Component Mapping System**: Categorizes Aceternity components into:
- `animations`, `layout`, `cards`, `buttons`, `modals`, `loaders`, `forms`, `navigation`

### Raven Landing Page Implementation

**Production Patterns Demonstrated**:
- **Pixel-perfect Figma conversion** with exact spacing and typography
- **Complex state management**: Toggle switches, dropdown interactions, modal steps
- **Event handling**: `stopPropagation` for nested interactive elements
- **Data integration**: Sport selection with fallback to "All Sports"
- **Responsive design**: Mobile-first with breakpoint-specific behavior

### Development Patterns & Conventions

**Import Patterns**:
- Aceternity components: `@/components/ui/`
- Database functions: `@/lib/supabase/database`
- Utilities: `@/lib/utils` (mainly for `cn()` helper)
- Fallback data: `@/lib/fallback-data`

**Component Structure**:
- Always use `"use client"` directive for interactive components
- Consistent prop interfaces with optional types using `?`
- Default parameter patterns: `isOpen = false`, `onClose = () => {}`

**Error Handling Pattern**:
```typescript
const { data, error } = await databaseFunction();
if (error || !data) {
  // Use fallback data or show error state
} else {
  // Use real data
}
```

**Animation Patterns**:
- Consistent hover effects: `whileHover={{ scale: 1.02, y: -8 }}`
- Spring transitions: `transition={{ type: "spring", stiffness: 300, damping: 30 }}`
- Staggered animations for lists using Motion's layout features

### Adding New Aceternity Components

1. Download from [ui.aceternity.com](https://ui.aceternity.com)
2. Place in `src/components/ui/`
3. Add to `src/components/icons/index.tsx` if using icons
4. Update showcase page (`src/app/showcase/page.tsx`)
5. Add to `ACETERNITY_UI_COMPONENTS` mapping in `src/designs/mappings/component-map.ts`

### Payment Integration Architecture

**Stripe Integration Pattern**:
- Client-side: `@/lib/stripe/client` for frontend operations
- Server-side: `@/lib/stripe/server` for secure operations
- Component integration in `src/components/payment/`

**Checkout Flow**:
1. Display pricing cards with 3D animations
2. Handle selection with smooth state transitions  
3. Process payment through Stripe
4. Handle success/error states

### Performance Considerations

**Image Optimization**: Uses Next.js `<Image />` component for automatic optimization (note: current implementation uses `<img>` tags - consider upgrading for better performance)

**Bundle Optimization**: Motion library provides tree-shaking for animation imports

**Search Optimization**: Debounced search with result limiting prevents excessive re-renders