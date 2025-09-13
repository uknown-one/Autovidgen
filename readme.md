# Overview

DarkFlow is a specialized YouTube video content creation platform focused on horror stories and conspiracy theory videos. The application provides AI-powered script generation, atmospheric voiceover creation, and comprehensive project management tools for content creators in the horror and conspiracy niches.

The platform features a dark-themed, productivity-focused interface inspired by YouTube Studio and Notion, designed to handle complex content workflows with data-dense interfaces that creators will use for extended periods.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**React-based SPA with TypeScript**: The client is built using Vite + React with TypeScript, providing fast development and type safety. The application uses a file-based routing system with Wouter for client-side navigation.

**Component Design System**: Built on shadcn/ui components with Radix UI primitives, providing accessibility and consistency. The design system includes:
- Dark/light mode theming with CSS variables
- Tailwind CSS for styling with a custom color palette
- Material Design-inspired components optimized for productivity workflows

**State Management**: Uses TanStack Query (React Query) for server state management, providing caching, background updates, and optimistic updates. Local state is managed with React hooks.

**Layout Structure**: 
- Collapsible sidebar navigation with project tree
- Main content area with tabbed interfaces
- Responsive design optimized for desktop workflows

## Backend Architecture

**Express.js API Server**: Node.js server built with Express providing RESTful API endpoints for project management, script generation, and AI integrations.

**Development Architecture**: Uses Vite middleware integration for hot module replacement and seamless development experience. Production builds are optimized with ESBuild.

**Storage Layer**: Implemented with an interface-based storage system supporting both in-memory (development) and database persistence. Currently uses memory storage with UUID-based entity management.

**API Integration**: OpenAI integration for AI-powered script generation with category-specific prompts for conspiracy theories and horror stories.

## Data Architecture

**Project Management**: Core entity model includes:
- Projects with metadata (title, description, category, tone, target length)
- Status tracking (draft → script-ready → voiceover-done → complete)
- Timestamps for creation and updates

**Content Categories**: Specialized handling for:
- Conspiracy theories (Government Cover-Ups, Ancient Mysteries, Secret Societies)
- Horror content (True Horror Stories, Creepypasta, Urban Legends)

**Database Schema**: Drizzle ORM with PostgreSQL schema definitions, supporting migrations and type-safe database operations.

## Authentication & Security

**Session-Based Authentication**: Uses connect-pg-simple for PostgreSQL session storage with secure cookie handling.

**API Security**: Request/response logging middleware with error handling and status code management.

# External Dependencies

## Database & Storage
- **PostgreSQL**: Primary database with Neon serverless hosting
- **Drizzle ORM**: Type-safe database operations with migration support
- **connect-pg-simple**: PostgreSQL session store for authentication

## AI & Content Generation
- **OpenAI API**: GPT-powered script generation with specialized prompts for horror and conspiracy content
- **Custom prompt engineering**: Category-specific system prompts for different content types

## UI & Styling
- **shadcn/ui**: Component library built on Radix UI primitives
- **Radix UI**: Accessible, unstyled UI components for complex interactions
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Lucide React**: Icon library for consistent iconography

## Development Tools
- **Vite**: Fast build tool with HMR and optimized production builds
- **TypeScript**: Type safety across client, server, and shared code
- **ESBuild**: Fast bundling for production server builds
- **Replit integration**: Development environment plugins and runtime error handling

## Form & Data Management
- **React Hook Form**: Form state management with validation
- **Zod**: Runtime type validation and schema parsing
- **TanStack Query**: Server state management with caching and synchronization
- **date-fns**: Date manipulation and formatting utilities