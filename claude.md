# Claude.md - AI Agent Quick Reference

Causaly 2026 is a theme-aware Next.js 16 application with shadcn/ui primitives, integrated data components, AI capabilities, and rich visualizations. This guide provides quick reference for AI coding agents.

---

## 📂 Documentation Hub

All detailed documentation lives in `.agent/` folder:
- **System Docs:** `.agent/system/` - Architecture, tech stack, integration points
- **SOPs:** `.agent/sop/` - Coding patterns, procedures, best practices
- **Tasks:** `.agent/tasks/` - Feature specifications & PRDs

**Quick links:**
- [Complete Architecture](.agent/system/project_architecture.md) - Full system overview
- [Coding Patterns](.agent/sop/coding_patterns.md) - Detailed how-to guides
- [Documentation Index](.agent/README.md) - All documentation

---

## 🏗️ Stack (Quick Reference)

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** (CSS variables in `src/styles/tokens.css`)
- **shadcn/ui** - Primitive components (import directly)
- **Kibo UI** - Data components (wrapped in `app/`)
- **AI SDK** + OpenAI - Chat & streaming
- **Vega-Lite** + **Mermaid** - Visualizations (wrapped in `viz/`)
- **Jotai** - State management

---

## 📁 Key Directories

```
src/
├── app/          # Next.js routes (import from app/ or ui/ only)
├── components/
│   ├── ui/       # ✓ shadcn/ui - import directly
│   ├── app/      # ✓ App wrappers - import in routes
│   ├── viz/      # ✓ Visualizations - import in routes
│   ├── kibo/     # ✗ Raw Kibo - do NOT import in routes
│   └── ai/       # ✗ Raw AI - do NOT import in routes
├── lib/          # Utilities
└── styles/       # globals.css + tokens.css
```

---

## 🚨 Critical Import Rules

**Routes MUST import from:**
- ✓ `@/components/ui/*` (shadcn/ui primitives)
- ✓ `@/components/app/*` (Kibo & AI wrappers)
- ✓ `@/components/viz/*` (chart & diagram wrappers)

**Routes MUST NOT import from:**
- ✗ `@/components/kibo/*` (use `app/` wrappers instead)
- ✗ `@/components/ai/*` (use `app/` wrappers instead)
- ✗ Raw libraries (`vega-embed`, `mermaid`, etc.)

**Why:** Maintains consistent theming and single source of integration logic.

---

## 🎨 Theme Rules

- **Use Tailwind classes:** `bg-background`, `text-foreground`, `border-border`
- **Never hardcode colors:** ❌ `#ffffff`, `bg-blue-500`
- **CSS variables:** Defined in `src/styles/tokens.css`
- **Auto light/dark mode:** All components adapt automatically

**Key CSS variables:**
```css
--background, --foreground
--primary, --secondary, --muted, --accent
--card, --border, --ring
--chart-1 through --chart-9  /* 9-color palette */
--seq-1 through --seq-6      /* sequential scale */
```

---

## 📝 Common Patterns

### Creating a Page

```typescript
// src/app/my-page/page.tsx
import { Button } from "@/components/ui/button";
import { AppDataTable } from "@/components/app/AppDataTable";
import { BarChart } from "@/components/viz/BarChart";

export default function MyPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      {/* Use theme-aware classes */}
    </div>
  );
}
```

### Adding shadcn/ui Component

```bash
npx shadcn@latest add [component-name]
# Adds to src/components/ui/ automatically
```

### Creating App Wrapper

See [Coding Patterns](.agent/sop/coding_patterns.md#creating-app-wrappers)

### Creating Custom Chart

See [Coding Patterns](.agent/sop/coding_patterns.md#creating-custom-visualizations)

---

## 🔍 Need More Details?

- **Architecture & System Design** → [project_architecture.md](.agent/system/project_architecture.md)
- **Detailed Code Patterns** → [coding_patterns.md](.agent/sop/coding_patterns.md)
- **All Documentation** → [.agent/README.md](.agent/README.md)

---

**Last Updated:** 2025-11-28
