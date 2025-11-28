# Coding Patterns & Best Practices

This document contains detailed procedures for common coding tasks. These are Standard Operating Procedures (SOPs) for working with the Causaly 2026 codebase.

---

## Table of Contents

1. [Before Making Changes](#before-making-changes)
2. [Adding a New Page](#adding-a-new-page)
3. [Adding shadcn/ui Components](#adding-shadcnui-components)
4. [Creating App Wrappers](#creating-app-wrappers)
5. [Creating Custom Visualizations](#creating-custom-visualizations)
6. [Extension Guidelines](#extension-guidelines)
7. [Common Patterns](#common-patterns)
8. [Troubleshooting](#troubleshooting)

---

## Before Making Changes

### 1. Locate Existing Patterns

Always search for similar components before creating new ones:

```bash
# Search for similar components
grep -r "BarChart" src/components/viz/
grep -r "AppDataTable" src/components/app/

# Check existing wrappers
ls src/components/app/
ls src/components/viz/
```

### 2. Understand the Layer

Determine which layer your component belongs to:

- **Primitive (shadcn/ui)?** → Use directly in routes
- **Complex block (Kibo/AI)?** → Create/use wrapper in `src/components/app/`
- **Visualization?** → Use/extend wrapper in `src/components/viz/`

### 3. Check Theme Integration

Before styling:

- **Light/dark mode?** → Use CSS variables
- **Using colors?** → Use `--primary`, `--chart-*`, or `--seq-*` tokens
- **Custom styling?** → Extend Tailwind classes, don't hardcode

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
import { BarChart } from "@/components/viz/BarChart";
import { Button } from "@/components/ui/button";
```

**Never import:**
- ✗ `@/components/kibo/*` (use app/ wrappers)
- ✗ `@/components/ai/*` (use app/ wrappers)
- ✗ Raw libraries (vega-embed, mermaid, etc.)

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

## Creating Custom Visualizations

### Vega-Lite Charts

#### Simple Charts (Extend Existing)

```typescript
// src/components/viz/LineChart.tsx
"use client";

import { VegaChart } from "./VegaChart";

export interface LineChartProps {
  data: Array<{ x: number; y: number }>;
  xField: string;
  yField: string;
  title?: string;
  width?: number | "container";
  height?: number;
}

export function LineChart({
  data,
  xField,
  yField,
  title,
  width = "container",
  height = 400
}: LineChartProps) {
  const spec = {
    mark: "line",
    data: { values: data },
    encoding: {
      x: { field: xField, type: "quantitative" },
      y: { field: yField, type: "quantitative" },
    },
    title,
  };

  return <VegaChart spec={spec} width={width} height={height} />;
}
```

#### Multi-Series Charts

Colors are **automatic** - VegaChart applies the `--chart-*` palette:

```typescript
// src/components/viz/GroupedBarChart.tsx
"use client";

import { VegaChart } from "./VegaChart";

export interface GroupedBarChartProps {
  data: Array<Record<string, any>>;
  xField: string;
  categories: string[];
  title?: string;
}

export function GroupedBarChart({
  data,
  xField,
  categories,
  title
}: GroupedBarChartProps) {
  const spec = {
    mark: "bar",
    data: { values: data },
    transform: [
      { fold: categories, as: ["category", "value"] }
    ],
    encoding: {
      x: { field: xField, type: "nominal" },
      y: { field: "value", type: "quantitative" },
      color: {
        field: "category",
        type: "nominal"
        // No color scheme needed - auto uses --chart-* palette
      },
      xOffset: { field: "category" }
    },
    title,
  };

  return <VegaChart spec={spec} width="container" />;
}
```

#### Scatter Plots

```typescript
// src/components/viz/ScatterPlot.tsx
"use client";

import { VegaChart } from "./VegaChart";

export interface ScatterPlotProps {
  data: Array<{ x: number; y: number; category?: string }>;
  xField: string;
  yField: string;
  colorField?: string;
  title?: string;
}

export function ScatterPlot({
  data,
  xField,
  yField,
  colorField,
  title,
}: ScatterPlotProps) {
  const spec = {
    mark: "point",
    data: { values: data },
    encoding: {
      x: { field: xField, type: "quantitative" },
      y: { field: yField, type: "quantitative" },
      ...(colorField && {
        color: { field: colorField, type: "nominal" }
      }),
    },
    title,
  };

  return <VegaChart spec={spec} />;
}
```

**Key Points:**
- Multi-series colors apply `--chart-*` palette automatically
- No need to specify color schemes manually
- Charts adapt to light/dark mode automatically

#### Sequential Color Scales

For heatmaps and gradients, use `type: "quantitative"` - the sequential scale applies automatically:

```typescript
// Heatmap automatically uses --seq-* sequential scale
const heatmapSpec = {
  mark: "rect",
  data: { values: heatmapData },
  encoding: {
    x: { field: "hour", type: "ordinal" },
    y: { field: "day", type: "ordinal" },
    color: {
      field: "value",
      type: "quantitative"  // Auto uses --seq-* scale
    },
  },
};

<VegaChart spec={heatmapSpec} />
```

### Mermaid Diagrams

#### Flow Diagrams (Extend Existing)

```typescript
// src/components/viz/SequenceDiagram.tsx
"use client";

import { MermaidDiagram } from "./MermaidDiagram";

export interface SequenceDiagramProps {
  actors: string[];
  messages: Array<{ from: string; to: string; text: string }>;
}

export function SequenceDiagram({ actors, messages }: SequenceDiagramProps) {
  const dsl = `
    sequenceDiagram
      ${actors.map(a => `participant ${a}`).join('\n')}
      ${messages.map(m => `${m.from}->>${m.to}: ${m.text}`).join('\n')}
  `;

  return <MermaidDiagram chart={dsl} />;
}
```

#### Gantt Charts

```typescript
// src/components/viz/GanttDiagram.tsx
"use client";

import { MermaidDiagram } from "./MermaidDiagram";

export interface GanttTask {
  id: string;
  name: string;
  start: string;
  duration: string;
}

export interface GanttDiagramProps {
  title: string;
  tasks: GanttTask[];
}

export function GanttDiagram({ title, tasks }: GanttDiagramProps) {
  const dsl = `
    gantt
      title ${title}
      dateFormat YYYY-MM-DD
      ${tasks.map(t => `${t.name} :${t.id}, ${t.start}, ${t.duration}`).join('\n')}
  `;

  return <MermaidDiagram chart={dsl} />;
}
```

**Key Points:**
- MermaidDiagram reads CSS variables automatically via `hslToHex()` utility
- Theme integration is automatic - adapts to light/dark mode
- No manual color configuration needed

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
  <h3 className="text-xl font-semibold text-foreground">Title</h3>
  <p className="text-muted-foreground">Description</p>
  <Button className="w-full">Action</Button>
</div>
```

### Pattern 2: Multi-Series Chart

Data with multiple series automatically uses chart palette:

```typescript
// Data with multiple series
const data = [
  { month: "Jan", sales: 30, costs: 20, profit: 10 },
  { month: "Feb", sales: 35, costs: 22, profit: 13 },
];

// Vega spec - automatically uses --chart-* palette
const spec = {
  mark: "bar",
  data: { values: data },
  transform: [
    { fold: ["sales", "costs", "profit"], as: ["category", "value"] }
  ],
  encoding: {
    x: { field: "month", type: "nominal" },
    y: { field: "value", type: "quantitative" },
    color: { field: "category", type: "nominal" },  // Auto themed
  },
};

<VegaChart spec={spec} />
```

### Pattern 3: Heatmap with Sequential Scale

Heatmaps automatically use sequential scale:

```typescript
// VegaChart automatically uses --seq-* for quantitative color scales
const heatmapSpec = {
  mark: "rect",
  data: { values: heatmapData },
  encoding: {
    x: { field: "hour", type: "ordinal" },
    y: { field: "day", type: "ordinal" },
    color: { field: "value", type: "quantitative" },  // Auto uses sequential scale
  },
};

<VegaChart spec={heatmapSpec} />
```

### Pattern 4: Responsive Layout

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

### Pattern 5: Form with Validation

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

### Issue: Chart Colors Don't Match Theme

**Problem:** Vega chart colors are wrong

**Solution:** Make sure you're using VegaChart wrapper, not raw vega-embed:

```typescript
// ❌ Wrong
import vegaEmbed from "vega-embed";

// ✅ Correct
import { VegaChart } from "@/components/viz/VegaChart";
```

**Why:** VegaChart applies theme colors automatically. Raw vega-embed doesn't know about our CSS variables.

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

### Issue: TypeScript Errors in Visualization Components

**Problem:** `getCSSVariable is not defined` or similar

**Solution:** Check that color utilities are imported:

```typescript
import { getCSSVariable } from "@/lib/color-utils";
```

### Issue: Mermaid Diagram Not Rendering

**Problem:** Diagram doesn't show or throws error

**Solution:**
1. Check Mermaid DSL syntax is valid
2. Ensure component is client-side: `"use client"`
3. Verify `MermaidDiagram` wrapper is used, not raw mermaid

```typescript
// ✅ Correct
"use client";

import { MermaidDiagram } from "@/components/viz/MermaidDiagram";

const dsl = `graph TD
  A-->B`;

<MermaidDiagram chart={dsl} />
```

### Issue: Hydration Mismatch

**Problem:** React hydration error in console

**Solution:** For client-only components (charts, diagrams):

```typescript
"use client";

import { useEffect, useState } from "react";

export function MyChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return <VegaChart spec={spec} />;
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
