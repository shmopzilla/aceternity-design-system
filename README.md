# Aceternity UI Design System

A comprehensive React design system built with Aceternity UI components, featuring Figma integration, Supabase backend, and Stripe payment processing.

## 🚀 Quick Start

This project is located in your `~/Documents/workspaces/aceternity-design-system/` directory.

```bash
cd ~/Documents/workspaces/aceternity-design-system
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
aceternity-design-system/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── page.tsx           # Homepage with hero and features
│   │   ├── showcase/          # Component showcase
│   │   └── pricing/           # Pricing and checkout pages
│   ├── components/
│   │   ├── ui/                # Aceternity UI components
│   │   │   ├── 3d-card.tsx   # Interactive 3D card effect
│   │   │   └── aurora-background.tsx # Aurora background animation
│   │   └── payment/           # Payment flow components
│   │       ├── pricing-card.tsx     # 3D pricing cards
│   │       └── checkout-form.tsx    # Animated checkout form
│   ├── designs/               # Figma integration utilities
│   │   ├── types.ts          # Figma node type definitions
│   │   ├── utils.ts          # Design token extraction
│   │   └── mappings/         # Figma to Aceternity component mappings
│   ├── lib/
│   │   ├── utils.ts          # Utility functions (cn helper)
│   │   ├── supabase/         # Supabase client and utilities
│   │   └── stripe/           # Stripe client and server utilities
│   └── globals.css           # Global styles and design tokens
├── tailwind.config.ts        # Tailwind configuration with Aceternity animations
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

## 🎨 Features

### ✨ Aceternity UI Components
- **70+ Premium Components**: Access to the complete Aceternity UI library
- **3D Card Effects**: Interactive cards with perspective transformations
- **Aurora Backgrounds**: Dynamic, animated gradient backgrounds
- **Advanced Animations**: Built with Framer Motion and CSS animations
- **Dark Mode Support**: Automatic theme switching
- **Responsive Design**: Mobile-first approach

### 🎯 Figma Integration Ready
- **Design Token Extraction**: Convert Figma variables to CSS custom properties
- **Component Mapping**: Intelligent mapping from Figma nodes to Aceternity components
- **Type Safety**: Full TypeScript support for Figma data structures
- **MCP Integration**: Ready for Figma MCP server integration

### 🔗 Supabase Backend
- **Authentication**: Email/password and social login ready
- **Database**: PostgreSQL with real-time subscriptions
- **Row Level Security**: Built-in security patterns
- **Type Generation**: Automatic TypeScript types from your schema

### 💳 Stripe Payment Integration
- **Beautiful Checkout**: Animated payment forms using Aceternity UI
- **Subscription Management**: Handle recurring payments
- **Webhook Support**: Process payment events securely
- **Multiple Payment Methods**: Credit cards, digital wallets

## 🛠️ Setup Instructions

### 1. Environment Variables

Copy the example environment file and configure your services:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual credentials:

```env
# Supabase (https://supabase.com)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe (https://stripe.com)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
```

### 2. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from Settings > API
3. Create your database tables (optional starter schema provided)

### 3. Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your test API keys from Dashboard > Developers > API keys
3. Create products and prices in the Stripe Dashboard

### 4. Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📖 Usage Examples

### Using Aceternity UI Components

```tsx
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { AuroraBackground } from "@/components/ui/aurora-background";

export function MyComponent() {
  return (
    <AuroraBackground>
      <CardContainer>
        <CardBody>
          <CardItem translateZ="50">
            <h1>3D Card with Aurora Background</h1>
          </CardItem>
        </CardBody>
      </CardContainer>
    </AuroraBackground>
  );
}
```

### Figma Integration

```tsx
import { nodeToDesignTokens, figmaColorToHsl } from "@/designs/utils";
import { getRecommendedAceternityComponent } from "@/designs/mappings/component-map";

// Convert Figma node to design tokens
const tokens = nodeToDesignTokens(figmaNode);

// Get recommended Aceternity component
const component = getRecommendedAceternityComponent(
  figmaNode.name, 
  figmaNode.type
);
```

### Supabase Integration

```tsx
import { supabase } from "@/lib/supabase/client";
import { signInWithEmail, getCurrentUser } from "@/lib/supabase/auth";

// Sign in user
const { data, error } = await signInWithEmail(email, password);

// Get current user
const user = await getCurrentUser();
```

### Stripe Integration

```tsx
import { PricingCard } from "@/components/payment/pricing-card";
import { CheckoutForm } from "@/components/payment/checkout-form";

// Display pricing options
<PricingCard 
  plan={pricingPlan} 
  onSelectPlan={() => handleSelectPlan(plan)} 
/>

// Handle checkout
<CheckoutForm 
  planName="Pro Plan"
  planPrice="$29"
  onSubmit={handleCheckout}
/>
```

## 🎭 Component Showcase

Visit `/showcase` to see all available Aceternity UI components in action:

- **Animations**: Aurora, Background Beams, Meteors, Sparkles
- **Cards**: 3D Card Effect, Hover Effects, Focus Cards
- **Layout**: Bento Grid, Parallax Scroll, Sidebar
- **Navigation**: Floating Navbar, Menu Components
- **Forms**: Floating Label Inputs, Animated Buttons

## 💰 Pricing Integration

Visit `/pricing` to see the complete payment flow:

- Animated pricing cards with 3D effects
- Interactive checkout forms
- Subscription management
- Payment success/error handling

## 🏔️ Raven Landing Page Demo

Visit `/raven` to see a complete landing page implementation based on Figma design:

- **Pixel-perfect Figma implementation** with Motion animations
- **Interactive filter chips** with smooth state transitions
- **Beautiful destination cards** with hover effects and image overlays
- **Responsive search functionality** with focus states
- **Smooth animations** using Motion (Framer Motion successor)
- **Typography matching** with Archivo font family
- **Real-time filtering** of destinations based on sport selection

## 🔧 Customization

### Adding New Aceternity Components

1. Download component from [ui.aceternity.com](https://ui.aceternity.com)
2. Add to `src/components/ui/`
3. Update imports and showcase page

### Extending Figma Integration

1. Add new node types to `src/designs/types.ts`
2. Create mapping functions in `src/designs/utils.ts`
3. Update component mappings in `src/designs/mappings/`

### Customizing Themes

Edit `src/app/globals.css` and `tailwind.config.ts` to customize:

- Color schemes
- Typography
- Spacing
- Animation durations
- Component styles

## 📚 Resources

- **Aceternity UI**: [ui.aceternity.com](https://ui.aceternity.com)
- **Next.js**: [nextjs.org](https://nextjs.org)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)
- **Supabase**: [supabase.com](https://supabase.com)
- **Stripe**: [stripe.com](https://stripe.com)
- **Figma**: [figma.com](https://figma.com)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License. See LICENSE for details.

## 🆘 Support

For questions and support:

- Check the documentation
- Browse component examples in `/showcase`
- Review the codebase structure
- Open an issue for bugs or feature requests

---

**Built with ❤️ using Aceternity UI, Next.js, Supabase, and Stripe**
