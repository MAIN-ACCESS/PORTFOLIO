# TURA - Junior Web Designer Portfolio

## Overview

This is a modern, full-stack web application for a junior web designer's portfolio named "TURA". The application features a sleek, dark-themed portfolio showcasing design work, skills, and contact information. It's built with a React frontend and Express backend, utilizing modern web technologies and a component-based architecture.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: PostgreSQL session store with connect-pg-simple

### Project Structure
```
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Route components
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Utility functions and configurations
├── server/               # Backend Express application
│   ├── routes.ts         # API route definitions
│   ├── storage.ts        # Data access layer
│   └── vite.ts           # Development server setup
├── shared/               # Shared code between frontend and backend
│   └── schema.ts         # Database schema and validation
└── migrations/           # Database migration files
```

## Key Components

### Frontend Components
- **HeroSection**: Landing page with animated typography
- **AboutSection**: Personal information and skills showcase
- **ProjectsSection**: Portfolio projects with carousel navigation
- **ContactSection**: Contact form with validation
- **Navbar**: Fixed navigation with smooth scrolling
- **AxonChatbot**: AI-powered chatbot with OpenRouter API integration and mobile-responsive interface

### Backend Components
- **Storage Interface**: Abstracted data access layer with in-memory implementation
- **Route Handler**: Express route registration system with AXON chatbot API endpoint
- **Development Server**: Vite integration for hot module replacement
- **AI Integration**: OpenRouter API integration for AXON chatbot responses

### UI System
- **Design System**: Custom Tailwind configuration with CSS variables
- **Component Library**: shadcn/ui components built on Radix UI
- **Typography**: Poppins and Montserrat font families
- **Color Scheme**: Dark theme with neutral base colors

## Data Flow

### User Interactions
1. **Navigation**: Smooth scrolling between sections using intersection observer
2. **Form Submission**: Contact form with client-side validation and toast notifications
3. **Project Carousel**: Interactive project showcase with navigation controls
4. **Resume Download**: Direct file download functionality

### State Management
- **Client State**: React Hook Form for form state
- **Server State**: TanStack Query for API data fetching and caching
- **UI State**: React useState for component-level state

## External Dependencies

### Frontend Dependencies
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight routing
- **@radix-ui/***: Headless UI primitives
- **tailwindcss**: Utility-first CSS framework
- **react-hook-form**: Form handling
- **zod**: Schema validation

### Backend Dependencies
- **express**: Web framework
- **drizzle-orm**: Type-safe ORM
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **connect-pg-simple**: PostgreSQL session store

### Development Dependencies
- **vite**: Build tool and dev server
- **typescript**: Static type checking
- **esbuild**: JavaScript bundler for production

## Deployment Architecture (Render + Vercel)

### Backend → Render
- **Build command**: `esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist`
- **Start command**: `node dist/index.js`
- **Required env vars on Render**:
  - `OPENROUTER_API_KEY` — your OpenRouter API key
  - `FRONTEND_URL` — your Vercel frontend URL (for CORS + HTTP-Referer)
  - `NODE_ENV=production`
- Backend runs independently — no frontend assets referenced

### Frontend → Vercel
- **Build command**: `vite build`
- **Output directory**: `dist/public`
- **Required env vars on Vercel**:
  - `VITE_API_BASE_URL` — your Render backend URL (e.g. `https://your-app.onrender.com`)
- When `VITE_API_BASE_URL` is empty (local dev), API calls go to same-origin `/api/chat`

### CORS
- Backend allows requests from `FRONTEND_URL` env var
- In development, all origins are allowed automatically

### Asset References
- All images live in `attached_assets/` and are resolved via `@assets/` Vite alias
- No external image CDN dependency — all assets bundled at build time
- Assets included in `dist/public/assets/` after `vite build`

## Deployment Strategy (Legacy / Replit)

### Development
- **Dev Server**: Vite development server with HMR
- **Database**: Development database with Drizzle migrations
- **Environment**: NODE_ENV=development

### Production Build
1. **Frontend**: Vite builds optimized static assets to `dist/public`
2. **Backend**: esbuild bundles server code to `dist/index.js`
3. **Database**: Production PostgreSQL with connection pooling
4. **Static Assets**: Served by Express in production mode

### Database Management
- **Schema**: Defined in `shared/schema.ts` using Drizzle
- **Migrations**: Generated and applied using `drizzle-kit`
- **Connection**: Serverless-compatible with Neon Database

## Recent Changes

- June 30, 2025: Initial portfolio setup with dark theme and glassmorphism effects
- June 30, 2025: Implemented mobile floating navigation bar with glassmorphism design
- June 30, 2025: Redesigned hero section with large background text, character silhouette, floating side elements, and animated particles
- June 30, 2025: Added smooth animations including float, twinkle, and fade-from-bottom effects
- June 30, 2025: Enhanced visual design with improved typography, spacing, and modern UI elements
- July 8, 2025: Implemented 3D rotating carousel with proper z-index layering and responsive design
- July 8, 2025: Fixed mobile navbar close button with white color highlighting
- July 8, 2025: Updated resume button with red glow effect on hover/click
- July 8, 2025: Applied hover-only glow effects to all interactive elements
- July 8, 2025: Enhanced project carousel with improved card positioning and smooth transitions
- July 9, 2025: Fixed hero section text centering for perfect horizontal and vertical alignment
- July 9, 2025: Centered "ABOUT ME" heading and improved responsive layout
- July 9, 2025: Removed background boxes from active navbar items, keeping only underline effect
- July 9, 2025: Adjusted project carousel card spacing to prevent overlap while maintaining 3D rotation
- July 9, 2025: Removed all unwanted black shadows and glows from UI elements globally
- July 9, 2025: Enhanced project card bottom spacing with increased padding (pb-10 desktop, pb-8 mobile)
- July 9, 2025: Added proper bottom margin to VIEW PROJECT buttons (mb-6 desktop, mb-5 mobile)
- July 9, 2025: Integrated EmailJS contact form with environment variables for service configuration
- July 9, 2025: Implemented dynamic button text change ("SEND MESSAGE" → "SENDED" → "SEND MESSAGE") with 3-second timer
- July 9, 2025: Updated EmailJS form to use environment variables and proper field mapping (name, email, message)
- July 9, 2025: Configured EmailJS template structure with proper HTML formatting and footer
- July 10, 2025: Integrated actual resume PDF file with proper download functionality
- July 10, 2025: Updated download filename to "DARK_Resume.pdf" across all components
- July 10, 2025: Fixed PDF serving issue by adding static file middleware in development mode
- July 10, 2025: Resume now properly downloads with correct Content-Type (application/pdf)
- July 13, 2025: Integrated Chatbase chatbot with secure API key storage
- July 13, 2025: Added project card images with custom app.png design
- July 15, 2025: Implemented AXON AI chatbot with OpenRouter API integration
- July 15, 2025: Added palette button with smooth animations and mobile-responsive chat interface
- July 15, 2025: Created comprehensive system prompt for AXON with DARK's professional information
- July 16, 2025: Replaced homepage palette button with "Chat with AXON" button (desktop only)
- July 16, 2025: Moved chatbot icon to bottom-left corner instead of bottom-right
- July 16, 2025: Fixed input field visibility with proper text colors and styling
- July 16, 2025: Improved button positioning and prevented overflow in chat interface
- July 16, 2025: Enhanced mobile responsiveness for direct chatbot access
- July 16, 2025: Fixed chatbot icon visibility - now hidden initially and only appears after homepage button click
- July 16, 2025: Improved send button layout with responsive padding for expanded/minimized states
- July 16, 2025: Enhanced spacing and positioning to prevent UI elements from touching chat box borders
- July 16, 2025: Corrected chatbot icon position to appear in bottom-right corner instead of bottom-left
- July 16, 2025: Updated AXON system prompt with comprehensive DARK profile and response guidelines
- July 16, 2025: Configured OpenRouter API key for AI-powered chatbot responses
- July 16, 2025: Implemented focused conversational AI that only discusses DARK's work, skills, and services
- July 16, 2025: Added animated preloader with custom circle animation that displays before main content
- July 16, 2025: Integrated preloader component with 3-second loading duration and smooth transitions
- July 16, 2025: Styled preloader with dark theme matching portfolio design and centered layout
- July 16, 2025: Optimized preloader animations for smoother performance with hardware acceleration
- July 16, 2025: Added smooth fade-out transition with cubic-bezier timing for professional loading experience
- July 16, 2025: Improved animation timing and reduced stutter with better CSS optimization
- August 9, 2025: Fixed tablet view layout issues in Projects section - resolved card overlapping and button cutoff
- August 9, 2025: Adjusted tablet breakpoint (768px-1024px) card spacing and positioning for proper display
- August 9, 2025: Increased card height and improved spacing to match desktop layout quality on tablets
- August 9, 2025: Updated all project cards to use new gradient website image design
- August 9, 2025: Replaced app.png with website_1754840729933.jpg for consistent visual branding
- August 9, 2025: Fixed tablet view card positioning - added container padding and reduced card spacing
- August 9, 2025: Adjusted card dimensions and rotation angles for better tablet display within viewport
- August 9, 2025: Enhanced tablet responsiveness for 1024x600 resolution with specific media queries
- August 9, 2025: Optimized card spacing and positioning to prevent cutoff on all tablet screen sizes
- August 9, 2025: Completely redesigned tablet layout (769px-1024px) to fix overlapping and button cutoff issues
- August 9, 2025: Reduced card spacing, adjusted image heights, and improved content positioning for tablet devices
- August 9, 2025: Fixed "View Project" button visibility and prevented cards from going outside viewport boundaries

## User Preferences

Preferred communication style: Simple, everyday language.