# 💳 CashCat

A mobile-first Progressive Web App for optimizing credit card cash back rewards. Add your credit cards, configure cash back percentages by category, and get real-time recommendations for which card to use for maximum rewards.

## Features

- 📱 **Mobile-First Design** - Optimized for mobile usage with touch-friendly interactions
- 💾 **Offline Capable** - PWA with service worker for offline functionality
- 🎯 **Smart Recommendations** - Real-time suggestions for best cash back per category
- 🏪 **10 Categories** - Groceries, gas, restaurants, travel, entertainment, and more
- 🎨 **Beautiful UI** - Modern gradient design with smooth animations
- 🚀 **Static Deployment** - No backend required, deploy to any CDN/S3

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Development

```bash
npm run dev          # Start dev server at localhost:5173
npm run build        # Build static files to /build directory
npm run preview      # Preview production build
npm run check        # Type check with svelte-check
npm run format       # Format code with Prettier
npm run lint         # Check code formatting
```

## Tech Stack

- **SvelteKit** - Static adapter for client-side only app
- **TypeScript** - Full type safety
- **Tailwind CSS 4.0** - Mobile-first styling
- **PWA** - Service worker, manifest, installable
- **localStorage** - Client-side data persistence

## Deployment

The app builds to static files ready for deployment to:
- AWS S3 + CloudFront
- Netlify
- Vercel
- Any static hosting provider

All data is stored locally in the browser - no backend required.
