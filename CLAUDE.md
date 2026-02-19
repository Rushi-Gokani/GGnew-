# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Global Gourmet is a premium catering service website built with React, TypeScript, and Vite. The project features a sophisticated design system with custom color palettes for the main brand and sub-brands.

## Development Commands

```bash
# Start development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview

# Run linting (standard config)
yarn lint

# Run linting with relaxed rules (dualite mode)
yarn lint:dualite

# Type checking with dualite config
yarn tsc:dualite
```

## Architecture

### Tech Stack
- **Frontend**: React 19.1.0 with TypeScript
- **Build Tool**: Vite 6.3.5
- **Styling**: Tailwind CSS 3.4.1 with custom color palette
- **Routing**: React Router DOM 7.10.1
- **Animation**: Framer Motion 12.23.26 and GSAP 3.14.2
- **Icons**: Lucide React 0.511.0

### Project Structure
- `src/components/` - React components organized by feature
  - `ui/` - Reusable UI components (Masonry, Section)
- `src/pages/` - Route-level components
  - `brands/` - Sub-brand pages (Saras, TheFifthCourse)
- `src/App.tsx` - Main routing component
- `src/main.tsx` - Application entry point

### Design System

The project uses two distinct color palettes defined in `tailwind.config.js`:

**Global Gourmet (GG) Palette**:
- Cream: `#FFF7ED` (primary light background)
- Navy: `#284D6A` (primary brand color)
- Taupe: `#B4ADA2` (secondary accent)
- Slate: `#29343B` (dark text/footer)
- Mist: `#D7DDDE` (light secondary background)

**SARAS Palette** (sub-brand):
- Clay: `#A2846D`
- Spice: `#E18500`
- Sand: `#F5E4BE`
- Olive: `#3E432E`
- Crimson: `#6F1C2C`

## Development Configuration

The project has two development configurations:

1. **Standard Mode**: Full TypeScript strictness and ESLint rules
2. **Dualite Mode**: Relaxed TypeScript checking (`tsconfig.dualite.json`) and disabled type checking in ESLint (`eslint.dualite.config.js`)

## Notable Features

- Custom scrollbar styling matching brand colors
- CSS marquee animations for logo carousels
- Route-based architecture with nested brand pages
- Responsive design with Tailwind CSS
- React StrictMode enabled for development