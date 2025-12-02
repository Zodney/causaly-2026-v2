# Agentic Research Page - Implementation Plan

**Status:** ✅ Completed
**Created:** 2025-12-01
**Type:** Feature Implementation

## Overview

Create a three-panel conversational interface for the "Agentic Research" homepage with ChatGPT/Claude-style layout, plus a global navigation bar that spans all pages.

## Requirements

**Global Navigation (Sticky Top):**
- Mock logo on left ("CAUSALY")
- Left-aligned nav items: Agentic Research, Scientific Search, Bio Graph, Pipeline Graph
- Right-aligned utility menu: "Workspaces" button (secondary style) + user profile dropdown
- White/light theme styling (always, regardless of app theme)
- Sticky at top with `z-50`

**Three-Panel Layout (Below Navigation):**
- Left sidebar (260px fixed): Chat history with "New chat" button
- Middle panel (fluid): Chat interface with streaming AI responses, max-width 800px content area
- Right sidebar (400px fixed, collapsible): Additional context panel, closed by default

## Files Created/Modified

### Created
- `/src/components/app/AppNavBar.tsx` - Global navigation component

### Modified
- `/src/app/layout.tsx` - Integrated AppNavBar for global persistence
- `/src/app/page.tsx` - Agentic Research page with three-panel layout

## Technical Implementation

### Global Navigation
- Component: `AppNavBar` with "use client" directive
- Positioning: `sticky top-0 z-50 h-16`
- Theme: Forced light with `bg-white dark:bg-white`
- Active state: Uses `usePathname()` hook for route highlighting
- Components: Button (ghost variant), DropdownMenu for user menu

### Three-Panel Layout
- Layout: Flexbox with `h-[calc(100vh-4rem)]` to account for navbar
- Panel 1: Fixed 260px width, scrollable chat history
- Panel 2: Fluid width with centered 800px max-width content area
- Panel 3: Collapsible with smooth 300ms transition animation

### AI Integration
- Uses AI SDK's `useChat` hook
- Endpoint: `/api/chat` (OpenAI streaming)
- Component: ChatThread primitive for message display
- Custom input form at bottom with sticky positioning

## Architecture Decisions

1. **Navbar in root layout** - Global persistence across all pages
2. **ChatThread primitive** - Not using AppChat wrapper (Card doesn't fit borderless design)
3. **Local state management** - useState for UI state, useChat for AI functionality
4. **Light theme navbar** - Always white regardless of app theme setting
5. **Flexbox layout** - Better control for three-panel responsive design

## Theme & Styling

**Global Navigation:**
- Uses gray-scale: `gray-100`, `gray-200`, `gray-700`, `gray-900`
- Forced light: `bg-white dark:bg-white`

**Three Panels:**
- Uses theme CSS variables: `bg-sidebar`, `text-sidebar-foreground`, `border-sidebar-border`
- Automatic light/dark mode support

## Testing Checklist

**Navigation:**
- ✅ Sticky positioning works
- ✅ Active route highlighting
- ✅ Dropdown menu functionality
- ✅ Appears on all pages

**Layout:**
- ✅ Three panels render correctly
- ✅ Independent scrolling in each panel
- ✅ Right sidebar collapse animation
- ✅ Responsive to viewport height

**AI Chat:**
- ✅ Message streaming works
- ✅ Input form submission
- ✅ Loading states
- ✅ Empty state display

**Accessibility:**
- ✅ Keyboard navigation
- ✅ ARIA labels on interactive elements
- ✅ Focus management

## Dependencies

All required dependencies already installed:
- `ai` - AI SDK for chat
- `@ai-sdk/openai` - OpenAI provider
- `lucide-react` - Icons
- shadcn/ui components - Button, Input, ScrollArea, DropdownMenu

## Future Enhancements

- Multi-chat support (switch between conversations)
- Persist chat history to backend/localStorage
- Right sidebar content (reasoning panel, file uploads, settings)
- Search/filter chat history
- Mobile responsive layout
- Export/share conversations
- Voice input

## Related Documentation

- [Project Architecture](.agent/system/project_architecture.md)
- [Coding Patterns](.agent/sop/coding_patterns.md)
