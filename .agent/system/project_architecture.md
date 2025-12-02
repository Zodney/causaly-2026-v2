# Project Architecture

## Overview

Causaly 2026 is a modern, theme-aware web application built with Next.js 16, featuring a sophisticated design system that integrates shadcn/ui primitives, Kibo UI components, AI capabilities, and powerful data visualizations. The architecture emphasizes clear separation of concerns, theme consistency, and developer experience.

**Project Goal:** Build a scalable, maintainable foundation for a data-driven application with AI capabilities, complex UI components, and rich visualizations - all while maintaining perfect theme consistency across light and dark modes.

---

## Tech Stack

### Core Framework
- **Next.js 16** (App Router)
  - React Server Components & Client Components
  - File-based routing (`src/app/`)
  - API Routes (`src/app/api/`)
  - Turbopack for fast development
  - TypeScript for type safety

### UI & Styling
- **Tailwind CSS v4**
  - CSS Variable-based design system
  - Custom theme configuration
  - Dark mode support via `.dark` class or `data-theme="dark"`
  - oklch color space for smooth transitions

- **shadcn/ui** (Primary Component Library)
  - Radix UI primitives
  - Accessible by default
  - Customizable with Tailwind
  - Components: Button, Card, Input, Table, Dialog, Dropdown, etc.

### Component Libraries

1. **Kibo UI** - Complex data-focused components
   - Data tables with sorting, filtering
   - File upload/dropzone
   - Form builders

2. **AI SDK & Components**
   - `ai` package for streaming AI responses
   - `@ai-sdk/openai` for OpenAI integration
   - Custom chat interfaces
   - Reasoning panels

### State Management
- **Jotai** - Atomic state management
- React hooks for local state
- AI SDK's `useChat` hook for chat state

### Data & Tables
- **@tanstack/react-table** - Powerful table component

### Development Tools
- **TypeScript 5**
- **ESLint** with Next.js config
- **PostCSS** for CSS processing
- **Roboto** fonts (sans & mono) - from tweakcn.com theme

---

## Project Structure

```
causaly-2026/
├── .agent/                          # Documentation hub
│   ├── system/                      # System & architecture docs
│   │   └── project_architecture.md  # This file
│   ├── sop/                         # Standard Operating Procedures
│   │   └── (best practices guides)
│   ├── tasks/                       # PRDs & implementation plans
│   │   └── (feature specifications)
│   └── README.md                    # Documentation index
│
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── page.tsx                 # Homepage
│   │   ├── layout.tsx               # Root layout with Roboto fonts
│   │   ├── demo/                    # Demo pages
│   │   │   ├── kibo/                # Kibo components demo
│   │   │   └── ai/                  # AI chat demo
│   │   └── api/                     # API routes
│   │       └── chat/                # Chat API endpoint
│   │           └── route.ts         # OpenAI streaming handler
│   │
│   ├── components/
│   │   ├── ui/                      # shadcn/ui primitives (ONLY)
│   │   │   ├── button.tsx           # ✓ Import directly
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── table.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ...
│   │   │
│   │   ├── kibo-ui/                 # Raw Kibo implementations
│   │   │   ├── table/               # Table component
│   │   │   └── dropzone/            # File dropzone
│   │   │
│   │   ├── kibo/                    # Kibo wrappers (do NOT import)
│   │   │   ├── DataTable.tsx        # Table wrapper
│   │   │   └── FileDropzone.tsx     # Dropzone wrapper
│   │   │
│   │   ├── ai/                      # Raw AI components (do NOT import)
│   │   │   ├── ChatMessage.tsx      # Single message
│   │   │   ├── ChatThread.tsx       # Message list
│   │   │   └── ReasoningPanel.tsx   # Reasoning display
│   │   │
│   │   └── app/                     # App-level wrappers (✓ IMPORT)
│   │       ├── AppDataTable.tsx     # Wraps Kibo DataTable
│   │       ├── AppFileDropzone.tsx  # Wraps Kibo FileDropzone
│   │       ├── AppChat.tsx          # Wraps AI ChatThread
│   │       └── AppReasoningPanel.tsx # Wraps AI ReasoningPanel
│   │
│   ├── lib/                         # Utility functions
│   │   └── utils.ts                 # General utilities (cn, etc.)
│   │
│   ├── hooks/                       # Custom React hooks
│   │   └── (empty - ready for custom hooks)
│   │
│   ├── types/                       # TypeScript type definitions
│   │   └── (empty - ready for types)
│   │
│   ├── data/                        # Static data, fixtures
│   │   └── (empty - ready for data)
│   │
│   └── styles/                      # Global styles
│       ├── globals.css              # Tailwind imports + theme config
│       └── tokens.css               # Design tokens (CSS variables)
│
├── public/                          # Static assets
│   ├── *.svg                        # Icons
│   └── favicon.ico
│
├── .claude/                         # Claude Code config
│   └── skills/                      # Custom skills
│
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript config
├── next.config.ts                   # Next.js config
├── tailwind.config.js               # Tailwind config (if needed)
├── postcss.config.mjs               # PostCSS config
├── eslint.config.mjs                # ESLint config
├── CLAUDE.md                        # AI agent guide
└── README.md                        # Project README
```

---

## Architecture Principles

### 1. Layered Component Architecture

The project uses a strict 3-layer architecture to maintain separation of concerns:

```
┌─────────────────────────────────────────────────┐
│  Layer 3: App Routes (src/app/*/page.tsx)       │
│  ✓ Import from: @/components/app, @/components/ui│
│  ✗ NEVER import: raw Kibo or AI libraries       │
└─────────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────┐
│  Layer 2: App-Level Wrappers (src/components/app)│
│  • Wrap Kibo UI components                      │
│  • Wrap AI SDK components                       │
│  • Add app-specific logic                       │
│  • Apply theme integration                      │
└─────────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────┐
│  Layer 1: Raw Component Libraries               │
│  • Kibo UI (src/components/kibo-ui/)            │
│  • AI Components (src/components/ai/)           │
│  • shadcn/ui (src/components/ui/)               │
└─────────────────────────────────────────────────┘
```

**Why this matters:**
- **Consistency:** All routes use the same component API
- **Maintainability:** Changes to raw libraries only affect wrappers
- **Theme enforcement:** Theme integration happens once in wrappers
- **Developer experience:** Simpler imports, clearer patterns

### 2. Theme-First Design

All visual elements use CSS variables defined in `src/styles/tokens.css`:

```css
/* Light mode */
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 221 83% 53%;
  --secondary: 240 4.8% 95.9%;
  --accent: 240 4.8% 95.9%;
  /* ... all theme colors */
}

/* Dark mode */
.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  /* ... all colors redefined */
}
```

**Benefits:**
- Single source of truth for colors
- Automatic dark mode for all components
- Easy brand customization

### 3. TypeScript-First

All components, utilities, and API routes use TypeScript:
- Props interfaces for all components
- Type-safe data structures
- Strict type checking enabled
- Path aliases (`@/*`) for clean imports

---

## Key Features

### 1. Design System (shadcn/ui)
- **Location:** `src/components/ui/`
- **Usage:** Import directly in routes and other components
- **Examples:** Button, Card, Input, Table, Dialog
- **Installation:** `npx shadcn@latest add [component]`

### 2. Data Components (Kibo UI)
- **Location:** Raw in `src/components/kibo-ui/`, wrapped in `src/components/app/`
- **Usage:** Always import from `@/components/app/`
- **Examples:**
  - `AppDataTable` - Sortable, filterable tables
  - `AppFileDropzone` - Drag-and-drop file upload

### 3. AI Integration
- **Backend:** `src/app/api/chat/route.ts` - Streaming OpenAI responses
- **Frontend:** `src/components/app/AppChat.tsx` - Chat interface
- **State:** AI SDK's `useChat` hook
- **Features:**
  - Streaming responses
  - Message history
  - Error handling
  - Loading states

---

## Integration Points

### 1. API Routes
- **Chat API:** `/api/chat` (POST)
  - Receives: `{ messages: Message[] }`
  - Returns: Streaming response
  - Provider: OpenAI (configurable)
  - Auth: API key via `OPENAI_API_KEY` env variable

### 2. Environment Variables
```env
# Required for AI features
OPENAI_API_KEY=sk-...
```

### 3. External Dependencies
- **Radix UI:** Accessible primitive components
- **TanStack Table:** Advanced table functionality
- **OpenAI Edge:** Edge-compatible OpenAI client

---

## Component Usage Patterns

### Pattern 1: Creating a Page

```typescript
// src/app/my-page/page.tsx
import { AppDataTable } from "@/components/app/AppDataTable";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function MyPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <Card className="p-6">
        <h1 className="text-2xl font-bold text-foreground">My Page</h1>
        <AppDataTable data={myData} />
      </Card>
    </div>
  );
}
```

### Pattern 2: Adding a New Wrapper

```typescript
// src/components/app/AppMyComponent.tsx
"use client";

import { SomeKiboComponent } from "@/components/kibo/SomeKiboComponent";

export interface AppMyComponentProps {
  data: any[];
  onAction?: () => void;
}

export function AppMyComponent({ data, onAction }: AppMyComponentProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <SomeKiboComponent
        data={data}
        onAction={onAction}
        className="text-foreground"
      />
    </div>
  );
}
```

---

## Data Flow

### 1. User Interaction Flow
```
User Action (UI)
  ↓
Client Component (useState, useChat)
  ↓
API Route (if needed)
  ↓
External Service (OpenAI, Database, etc.)
  ↓
Streaming Response (or JSON)
  ↓
UI Update (React state)
  ↓
Visual Feedback
```

### 2. Theme System Flow
```
User toggles theme (.dark class added to <html>)
  ↓
CSS variables update (tokens.css)
  ↓
Tailwind classes re-evaluate
  ↓
Components update (bg-background, text-foreground, etc.)
  ↓
Instant theme switch
```

### 3. Chat Flow
```
User types message
  ↓
useChat hook sends POST to /api/chat
  ↓
OpenAI API called with message history
  ↓
Stream returned
  ↓
Messages array updated in real-time
  ↓
ChatThread component renders new messages
  ↓
User sees streaming response
```

---

## Performance Considerations

### 1. Component Optimization
- Client components use `"use client"` directive
- Server components by default (no directive)
- Dynamic imports for heavy libraries when needed
- `useEffect` hooks prevent SSR issues

### 2. Build Optimization
- Turbopack for fast development
- Tree-shaking for unused code
- CSS purging via Tailwind
- TypeScript for type-safety and better IDE support

---

## Security Considerations

### 1. API Security
- API keys stored in environment variables
- Never expose keys to client
- Validate inputs in API routes
- Error messages don't leak sensitive info

### 2. File Upload Security
- File type validation in `AppFileDropzone`
- Size limits enforced
- Client-side validation + server-side validation (when needed)

### 3. Environment Variables
```
# NEVER commit .env.local to git
# Add to .gitignore
.env.local
.env.*.local
```

---

## Scalability & Future Extensibility

### 1. Adding New Component Libraries
Follow the wrapper pattern:
1. Install library: `npm install new-library`
2. Create raw components in `src/components/new-library/`
3. Create wrappers in `src/components/app/`
4. Import wrappers in routes

### 2. Database Integration
Future considerations:
- ORM: Prisma, Drizzle, or TypeORM
- Database: PostgreSQL, MySQL, or MongoDB
- Migration pattern: `src/db/migrations/`
- Schema: `src/db/schema/`

### 3. Authentication
Future considerations:
- Auth provider: NextAuth.js, Clerk, or Supabase Auth
- Middleware: `middleware.ts` for route protection
- Session management: JWT or session cookies
- User context: React Context or Jotai atoms

---

## Related Documentation

- **CLAUDE.md:** Comprehensive guide for AI agents and developers
- **README.md:** Project overview and setup instructions
- **.agent/README.md:** Documentation index
- **src/styles/README.md:** Design tokens documentation

---

**Last Updated:** 2025-12-01
**Version:** 1.0.1
**Status:** Typography updated to Roboto fonts (tweakcn.com theme)
