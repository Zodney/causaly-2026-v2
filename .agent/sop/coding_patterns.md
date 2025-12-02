# Coding Patterns & Best Practices

This document contains detailed procedures for common coding tasks. These are Standard Operating Procedures (SOPs) for working with the Causaly 2026 codebase.

---

## Table of Contents

1. [Before Making Changes](#before-making-changes)
   - [Typography Guidelines](#4-typography-guidelines)
   - [Icon Guidelines](#5-icon-guidelines)
2. [Adding a New Page](#adding-a-new-page)
3. [Adding shadcn/ui Components](#adding-shadcnui-components)
4. [Creating App Wrappers](#creating-app-wrappers)
5. [Updating the Design System Page](#updating-the-design-system-page)
6. [Extension Guidelines](#extension-guidelines)
7. [Common Patterns](#common-patterns)
8. [Troubleshooting](#troubleshooting)

---

## Before Making Changes

### 1. Locate Existing Patterns

Always search for similar components before creating new ones:

```bash
# Search for similar components
grep -r "AppDataTable" src/components/app/

# Check existing wrappers
ls src/components/app/
```

### 2. Understand the Layer

Determine which layer your component belongs to:

- **Primitive (shadcn/ui)?** → Use directly in routes
- **Complex block (Kibo/AI)?** → Create/use wrapper in `src/components/app/`

### 3. Check Theme Integration

Before styling:

- **Light/dark mode?** → Use CSS variables
- **Using colors?** → Use `--primary`, `--secondary`, `--accent` tokens
- **Custom styling?** → Extend Tailwind classes, don't hardcode

### 4. Typography Guidelines

**Font Weight Rules (CRITICAL):**

- **NEVER use `font-semibold`** → Use `font-medium` instead
- **Allowed font weights:** `font-normal`, `font-medium`, `font-bold`
- **Prohibited:** `font-semibold`, `font-[600]`

```typescript
// ❌ WRONG - Never use semibold
<h3 className="text-xl font-semibold">Title</h3>

// ✅ CORRECT - Use medium for emphasis
<h3 className="text-xl font-medium">Title</h3>

// ✅ CORRECT - Use bold for strong emphasis
<h1 className="text-4xl font-bold">Heading</h1>

// ✅ CORRECT - Use normal for body text
<p className="text-base font-normal">Body text</p>
```

### 5. Icon Guidelines

**Lucide Icon Rules (CRITICAL):**

- **ALWAYS use `strokeWidth={1.5}`** for all Lucide icons
- Use consistent sizing with Tailwind's `size-*` utilities
- Common sizes: `size-4` (16px), `size-5` (20px), `size-6` (24px)

```typescript
import { Check, X, Plus } from "lucide-react";

// ❌ WRONG - No strokeWidth specified
<Check className="size-4" />

// ✅ CORRECT - Always include strokeWidth={1.5}
<Check className="size-4" strokeWidth={1.5} />

// ✅ CORRECT - Larger icon with consistent stroke
<Plus className="size-6" strokeWidth={1.5} />

// ✅ CORRECT - Icon in button
<Button>
  <X className="size-4" strokeWidth={1.5} />
  Close
</Button>
```

**Why strokeWidth={1.5}?**
- Provides visual consistency across all icons
- Matches modern UI design trends
- Ensures icons remain legible at all sizes

---

## Adding a New Page

### Step 1: Create Route File

```typescript
// src/app/my-page/page.tsx
export default function MyPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-4xl font-bold text-foreground">My Page</h1>
    </div>
  );
}
```

### Step 2: Import App-Level Components Only

```typescript
import { AppDataTable } from "@/components/app/AppDataTable";
import { Button } from "@/components/ui/button";
```

**Never import:**
- ✗ `@/components/kibo/*` (use app/ wrappers)
- ✗ `@/components/ai/*` (use app/ wrappers)

### Step 3: Use Theme-Aware Styling

```typescript
<div className="bg-card border border-border rounded-lg p-6">
  <h2 className="text-2xl text-foreground mb-4">Section</h2>
  <p className="text-muted-foreground">Description...</p>
</div>
```

---

## Adding shadcn/ui Components

shadcn/ui is our ONLY primitive component library. Always use the CLI to add components:

```bash
# Use shadcn CLI to add components
npx shadcn@latest add [component-name]

# Examples:
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add select
```

**This automatically:**
- Adds component to `src/components/ui/`
- Includes proper TypeScript types
- Applies theme integration

**Then import directly:**
```typescript
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
```

---

## Creating App Wrappers

App wrappers provide a simplified interface for complex components while maintaining theme consistency.

### For Kibo Components

**Step 1: Identify the Kibo component**

Determine which Kibo component you need (e.g., `DataTable`, `FileUpload`, `FormBuilder`)

**Step 2: Create wrapper in `src/components/app/`**

```typescript
// src/components/app/AppFileUpload.tsx
"use client";

import { FileUpload } from "@kibo-ui/file-upload";

export interface AppFileUploadProps {
  onUpload: (files: File[]) => void;
  accept?: string;
  maxSize?: number;
}

export function AppFileUpload({ onUpload, accept, maxSize }: AppFileUploadProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <FileUpload
        onUpload={onUpload}
        accept={accept}
        maxSize={maxSize}
        className="text-foreground"
      />
    </div>
  );
}
```

**Step 3: Export from index** (optional)

```typescript
// src/components/app/index.ts
export { AppFileUpload } from "./AppFileUpload";
export { AppDataTable } from "./AppDataTable";
export { AppChat } from "./AppChat";
```

**Step 4: Use in routes**

```typescript
import { AppFileUpload } from "@/components/app/AppFileUpload";

// In your component:
<AppFileUpload
  onUpload={handleUpload}
  accept="image/*"
  maxSize={5 * 1024 * 1024}
/>
```

### For AI Components

**Step 1: Create wrapper in `src/components/app/`**

```typescript
// src/components/app/AppAgentView.tsx
"use client";

import { AgentView } from "@ai-sdk/ui";
import { useTheme } from "next-themes";

export interface AppAgentViewProps {
  agentId: string;
  onComplete?: () => void;
}

export function AppAgentView({ agentId, onComplete }: AppAgentViewProps) {
  const { theme } = useTheme();

  return (
    <div className="bg-background text-foreground">
      <AgentView
        agentId={agentId}
        onComplete={onComplete}
        theme={theme}
      />
    </div>
  );
}
```

**Step 2: Use in routes**

```typescript
import { AppAgentView } from "@/components/app/AppAgentView";

<AppAgentView
  agentId="my-agent"
  onComplete={handleComplete}
/>
```

---

## Updating the Design System Page

The design system page (`/design-system`) provides a visual cheat sheet of all components in the application. When you add a new component, you should also add it to this page.

### When to Update

Update the design system page when you:
- Add a new shadcn/ui component to `src/components/ui/`
- Create a new app wrapper in `src/components/app/`
- Add a new AI element to `src/components/ai-elements/`

### Step 1: Locate the Page

The design system page is at:
```
src/app/design-system/page.tsx
```

### Step 2: Import Your Component

Add the import at the top of the file with the other imports:

```typescript
// For UI primitives
import { YourComponent } from "@/components/ui/your-component";

// For app components
import { AppYourComponent } from "@/components/app/AppYourComponent";

// For AI elements
import { YourAIComponent } from "@/components/ai-elements/your-ai-component";
```

### Step 3: Add to the Appropriate Section

Find the correct section based on your component type:

**For Primitives (shadcn/ui):**
Add a new `<Card>` in the Primitives grid:

```typescript
<Card>
  <CardHeader>
    <CardTitle>YourComponent</CardTitle>
  </CardHeader>
  <CardContent className="space-y-2">
    {/* Show different variants */}
    <YourComponent variant="default">Default</YourComponent>
    <YourComponent variant="secondary">Secondary</YourComponent>
  </CardContent>
</Card>
```

**For App Components:**
Add a new `<Card>` in the App Components section:

```typescript
<Card>
  <CardHeader>
    <CardTitle>AppYourComponent</CardTitle>
    <CardDescription>Brief description of what it does</CardDescription>
  </CardHeader>
  <CardContent>
    <AppYourComponent
      // Add minimal sample props
      sampleProp="value"
    />
  </CardContent>
</Card>
```

**For AI Elements:**
Add a new `<Card>` in the AI Elements grid:

```typescript
<Card>
  <CardHeader>
    <CardTitle>YourAIComponent</CardTitle>
  </CardHeader>
  <CardContent>
    <YourAIComponent />
  </CardContent>
</Card>
```

### Step 4: Test

1. Run the dev server: `npm run dev`
2. Navigate to `/design-system`
3. Verify your component appears and renders correctly
4. Test that live editing works (edit component → see update)

### Example: Adding a New Badge Variant

```typescript
// 1. Import (already imported)
import { Badge } from "@/components/ui/badge";

// 2. Find the Badge card in Primitives section
<Card>
  <CardHeader>
    <CardTitle>Badge</CardTitle>
  </CardHeader>
  <CardContent className="space-y-2">
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
      {/* ADD YOUR NEW VARIANT */}
      <Badge variant="success">Success</Badge>
    </div>
  </CardContent>
</Card>
```

### Tips

- **Keep it simple:** Just show the component, no complex examples
- **Show variants:** If the component has variants, show them all
- **Use sample data:** Use minimal, realistic sample data for complex components
- **Test responsiveness:** Check on mobile, tablet, and desktop

---

## Extension Guidelines

### Adding a New Component Library

If you need to integrate a new external library:

1. **Install library:** `npm install new-library`
2. **Create raw components** in `src/components/new-library/`
3. **Create wrappers** in `src/components/app/`
4. **Import wrappers** in routes (never raw components)

### Adding a New Data Source

For new APIs or data sources:

1. Create utilities in `src/lib/`
2. Define types in `src/types/`
3. Create custom hooks in `src/hooks/` if needed
4. Use in app components

### Adding Custom Hooks

```typescript
// src/hooks/useTheme.ts
import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Theme logic here
  }, []);

  return { theme, setTheme };
}
```

---

## Common Patterns

### Pattern 1: Theme-Aware Card

Standard card with theme-aware colors:

```typescript
<div className="bg-card border border-border rounded-lg p-6 space-y-4">
  <h3 className="text-xl font-medium text-foreground">Title</h3>
  <p className="text-muted-foreground">Description</p>
  <Button className="w-full">Action</Button>
</div>
```

### Pattern 2: Responsive Layout

Use container queries and responsive grid:

```typescript
<div className="container mx-auto p-8">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {items.map((item) => (
      <Card key={item.id} className="p-6">
        {/* Card content */}
      </Card>
    ))}
  </div>
</div>
```

### Pattern 3: Form with Validation

```typescript
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function MyForm() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation logic
    if (!formData.name) {
      setErrors({ name: "Name is required" });
      return;
    }
    // Submit logic
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={errors.name ? "border-destructive" : ""}
        />
        {errors.name && (
          <p className="text-sm text-destructive mt-1">{errors.name}</p>
        )}
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

---

## Troubleshooting

### Issue: Component Not Themed Correctly

**Problem:** Component colors don't match the theme

**Solution:** Check if you're using CSS variables:

```typescript
// ❌ Wrong
<div style={{ color: "#000" }}>

// ✅ Correct
<div className="text-foreground">
```

**Available classes:**
- `bg-background`, `text-foreground`
- `bg-card`, `text-card-foreground`
- `bg-primary`, `text-primary-foreground`
- `border-border`, `ring-ring`

### Issue: Can't Import Kibo/AI Component

**Problem:** Import fails or component not themed

**Solution:** Never import raw libraries in routes. Create/use wrapper:

```typescript
// ❌ Wrong (in route)
import { DataTable } from "@kibo-ui/data-table";

// ✅ Correct (in route)
import { AppDataTable } from "@/components/app/AppDataTable";
```

**Why:** App wrappers provide:
- Theme integration
- Simplified API
- Consistent styling

### Issue: Hydration Mismatch

**Problem:** React hydration error in console

**Solution:** For client-only components:

```typescript
"use client";

import { useEffect, useState } from "react";

export function MyClientComponent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return <div>Client-only content</div>;
}
```

**Why:** Server and client may render differently. Wait for client mount.

---

## Related Documentation

- [Project Architecture](../system/project_architecture.md) - Understanding the system
- [Documentation Index](../README.md) - All docs
- [CLAUDE.md](../../CLAUDE.md) - Quick reference for AI agents

---

**Last Updated:** 2025-11-28
**Version:** 1.0.0
