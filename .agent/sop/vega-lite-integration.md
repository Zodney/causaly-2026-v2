# Vega-Lite Chart Integration SOP

**Standard Operating Procedure for integrating Vega-Lite charts with theme-aware styling**

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Quick Start](#quick-start)
4. [Creating Chart Specifications](#creating-chart-specifications)
5. [Styling & Theming](#styling--theming)
6. [Responsive Sizing](#responsive-sizing)
7. [Common Patterns](#common-patterns)
8. [Troubleshooting](#troubleshooting)
9. [Related Documentation](#related-documentation)

---

## Overview

### What is Vega-Lite?

Vega-Lite is a declarative JSON-based visualization grammar for creating interactive charts. We integrate it using `react-vega` and apply our theme system for consistent styling.

### Component Architecture

```
AppVegaChart (App Wrapper)
    ├── VegaChart (Raw Component)
    │   └── VegaEmbed (react-vega)
    └── Theme Integration Layer
```

### Key Files

- **Raw Component:** `src/components/charts/VegaChart.tsx`
- **App Wrapper:** `src/components/app/AppVegaChart.tsx`
- **Mock Data:** `src/lib/mock-data/sample-vega-specs.ts`
- **Demo Page:** `src/app/demo/charts/vega/page.tsx`

---

## Architecture

### Three-Layer Design

#### 1. VegaChart (Raw Component)
**Location:** `src/components/charts/VegaChart.tsx`

**Purpose:**
- Handles Vega-Lite rendering via `react-vega`
- Applies theme colors via CSS variables (fully theme-aware)
- Manages responsive width with ResizeObserver
- Provides error boundaries

**Key Features:**
```typescript
- Responsive width tracking with ResizeObserver
- Automatic theme injection into spec config
- SVG rendering for performance
- Container-based width (width: "container")
- Autosize configuration for proper fitting
```

#### 2. AppVegaChart (App Wrapper)
**Location:** `src/components/app/AppVegaChart.tsx`

**Purpose:**
- Provides simplified API for app routes
- Adds optional title and description
- Wraps chart in themed card container
- Manages spacing and layout

**API:**
```typescript
interface AppVegaChartProps {
  spec: VisualizationSpec;
  title?: string;
  description?: string;
  className?: string;
  showActions?: boolean;
}
```

#### 3. App Routes (Usage Layer)
**Location:** `src/app/*/page.tsx`

**Purpose:**
- Import and use `AppVegaChart` only (never `VegaChart` directly)
- Pass Vega-Lite spec with data
- Provide chart metadata (title, description)

---

## Quick Start

### Step 1: Import the Component

```typescript
import { AppVegaChart } from "@/components/app/AppVegaChart";
import type { VisualizationSpec } from 'vega-embed';
```

### Step 2: Create Your Spec

```typescript
const spec: VisualizationSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": "container",  // REQUIRED for responsive sizing
  "height": 300,
  "data": {
    "values": [
      { "category": "A", "value": 28 },
      { "category": "B", "value": 55 },
      { "category": "C", "value": 43 }
    ]
  },
  "mark": "bar",
  "encoding": {
    "x": { "field": "category", "type": "nominal" },
    "y": { "field": "value", "type": "quantitative" }
  }
};
```

### Step 3: Render the Chart

```typescript
<AppVegaChart
  spec={spec}
  title="My Chart Title"
  description="Brief description of what this chart shows"
/>
```

---

## Creating Chart Specifications

### Basic Structure

Every Vega-Lite spec needs:

```typescript
{
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": "container",      // REQUIRED - makes chart responsive
  "height": 300,             // Fixed height recommended
  "data": { /* ... */ },     // Inline data or URL
  "mark": "...",             // Chart type
  "encoding": { /* ... */ }  // Visual encodings
}
```

### Data Embedding

**Always embed data in the spec** (not as separate prop):

```typescript
// ✅ CORRECT
spec: {
  "data": {
    "values": [
      { "x": 1, "y": 10 },
      { "x": 2, "y": 20 }
    ]
  },
  // ...
}

// ❌ WRONG - VegaEmbed doesn't accept separate data prop
<AppVegaChart spec={spec} data={myData} />
```

### Width Configuration

**CRITICAL:** Always use `"width": "container"` for responsive charts:

```typescript
{
  "width": "container",  // Chart fills available width
  "height": 300          // Fixed height prevents layout shift
}
```

**Why this matters:**
- Container width is measured via ResizeObserver
- VegaChart applies `autosize: { type: 'fit', contains: 'padding' }`
- Chart fits perfectly within card padding (800px max-width → 710px available)

---

## Styling & Theming

### CSS Variable Integration ✅

**Status:** Fully implemented as of 2025-12-04

VegaChart now fully supports CSS variables for theme-aware styling. The component automatically injects theme colors that adapt to light/dark mode.

> **Migration Note:** If you have existing charts using hardcoded hex colors, they will continue to work but won't adapt to theme changes. Update color values to use CSS variables for full theme support.

```typescript
config: {
  background: 'transparent',
  view: {
    stroke: 'transparent',
  },
  axis: {
    labelColor: 'var(--muted-foreground)',
    titleColor: 'var(--foreground)',
    gridColor: 'var(--border)',
    domainColor: 'var(--border)',
    tickColor: 'var(--border)',
    labelFontSize: 11,
    titleFontSize: 12,
    labelFont: 'var(--font-sans)',
    titleFont: 'var(--font-sans)',
  },
  legend: {
    labelColor: 'var(--foreground)',
    titleColor: 'var(--foreground)',
    labelFontSize: 11,
    titleFontSize: 12,
    labelFont: 'var(--font-sans)',
    titleFont: 'var(--font-sans)',
  },
  title: {
    color: 'var(--foreground)',
    fontSize: 14,
    font: 'var(--font-sans)',
  },
  ...spec.config,
}
```

**Key Features:**
- ✅ Automatic light/dark mode adaptation
- ✅ Uses theme CSS variables directly
- ✅ Consistent with app-wide design system
- ✅ No manual color management needed

### Available Theme Variables

**Text & Foreground:**
- `var(--foreground)` - Primary text color
- `var(--muted-foreground)` - Secondary/muted text

**Borders & Structure:**
- `var(--border)` - Border, grid lines, axes

**Backgrounds:**
- `transparent` - Always use transparent for chart backgrounds

**Typography:**
- `var(--font-sans)` - System font stack

### Color Scales

For color encodings in your specs, use CSS variable references:

```typescript
"encoding": {
  "color": {
    "field": "category",
    "scale": {
      "range": [
        "var(--chart-1)",
        "var(--chart-2)",
        "var(--chart-3)",
        "var(--chart-4)",
        "var(--chart-5)"
      ]
    }
  }
}
```

**Current Status:**
- Chart color variables (`--chart-1` through `--chart-5`) are defined in theme
- These work when specified in color scales
- Theme automatically handles light/dark variants

### Chart Color Palette

Our theme defines 5 chart colors in `src/styles/tokens.css`:

```css
--chart-1: hsl(221 83% 53%);   /* Blue */
--chart-2: hsl(212 95% 68%);   /* Light Blue */
--chart-3: hsl(216 92% 60%);   /* Medium Blue */
--chart-4: hsl(210 98% 78%);   /* Lighter Blue */
--chart-5: hsl(212 97% 87%);   /* Lightest Blue */
```

### Font Styling

All chart text uses the app's theme font via CSS variable:

```typescript
labelFont: 'var(--font-sans)'
titleFont: 'var(--font-sans)'
```

This ensures charts use the same typeface as the rest of the application.

---

## Responsive Sizing

### How It Works

1. **Container Measurement:**
```typescript
const containerRef = useRef<HTMLDivElement>(null);
const [containerWidth, setContainerWidth] = useState<number>(0);

useEffect(() => {
  const updateWidth = () => {
    if (containerRef.current) {
      const width = containerRef.current.clientWidth;
      setContainerWidth(width);
    }
  };

  // Initial measurement + ResizeObserver
  const timer = setTimeout(updateWidth, 100);
  const resizeObserver = new ResizeObserver(updateWidth);
  resizeObserver.observe(containerRef.current);
}, []);
```

2. **Width Application:**
```typescript
if (themedSpec.width === 'container' && containerWidth > 0) {
  themedSpec.width = containerWidth;
}
```

3. **Autosize Configuration:**
```typescript
autosize: {
  type: 'fit',           // Fit chart to specified width
  contains: 'padding'    // Include padding, axes, legends in width
}
```

### Width Calculation Flow

```
Page Container (800px max-width)
  - 40px horizontal padding (px-5)
= 760px

Card Container (p-6)
  - 48px horizontal padding
= 712px

Measured clientWidth
≈ 710px (accounting for borders)

Vega Chart
= Exactly 710px (all elements contained)
```

### Overflow Prevention

```typescript
<div style={{ width: '100%', overflow: 'hidden' }}>
  <VegaEmbed spec={themedSpec} />
</div>
```

---

## Common Patterns

### Bar Chart

```typescript
{
  "mark": {
    "type": "bar",
    "cornerRadiusEnd": 4  // Rounded tops
  },
  "encoding": {
    "x": {
      "field": "category",
      "type": "nominal",
      "axis": { "labelAngle": 0, "title": "Category" }
    },
    "y": {
      "field": "value",
      "type": "quantitative",
      "axis": { "title": "Value", "format": ",.0f" }
    },
    "color": {
      "field": "category",
      "legend": null  // Hide legend if not needed
    },
    "tooltip": [
      { "field": "category", "type": "nominal" },
      { "field": "value", "type": "quantitative", "format": ",.0f" }
    ]
  }
}
```

### Line Chart with Multiple Series

```typescript
{
  "transform": [
    { "fold": ["series1", "series2"], "as": ["type", "value"] }
  ],
  "mark": {
    "type": "line",
    "point": true,
    "strokeWidth": 2
  },
  "encoding": {
    "x": { "field": "date", "type": "temporal" },
    "y": { "field": "value", "type": "quantitative" },
    "color": {
      "field": "type",
      "type": "nominal",
      "legend": { "title": "Series" }
    }
  }
}
```

### Scatter Plot

```typescript
{
  "mark": {
    "type": "point",
    "filled": true,
    "size": 100
  },
  "encoding": {
    "x": { "field": "x_value", "type": "quantitative" },
    "y": { "field": "y_value", "type": "quantitative" },
    "color": { "field": "category", "type": "nominal" },
    "size": { "field": "magnitude", "type": "quantitative" }
  }
}
```

### Area Chart

```typescript
{
  "mark": {
    "type": "area",
    "opacity": 0.7
  },
  "encoding": {
    "x": { "field": "date", "type": "temporal" },
    "y": { "field": "value", "type": "quantitative" },
    "color": { "field": "category", "type": "nominal" }
  }
}
```

### Heatmap

```typescript
{
  "mark": "rect",
  "encoding": {
    "x": { "field": "hour", "type": "ordinal" },
    "y": { "field": "day", "type": "ordinal" },
    "color": {
      "field": "value",
      "type": "quantitative",
      "scale": { "scheme": "blues" }
    }
  }
}
```

---

## Troubleshooting

### Charts Overflow Container

**Symptom:** Charts extend beyond white card boundaries

**Cause:** Width not properly constrained or autosize not configured

**Solution:**
1. Ensure spec uses `"width": "container"`
2. Check VegaChart has `autosize` config:
```typescript
autosize: {
  type: 'fit',
  contains: 'padding'
}
```
3. Verify container has `overflow: hidden`

### Axes/Labels Not Visible

**Symptom:** Only chart colors visible, no axes or labels

**Possible Causes:**

1. **Config being overridden** - Check if your spec includes a `config` property that overrides the theme
2. **Invalid spec structure** - Verify encoding fields match your data
3. **Rendering error** - Check browser console for Vega errors

**Solution:**
```typescript
// ✅ CORRECT - Let VegaChart apply theme config
const spec = {
  mark: 'bar',
  encoding: { /* ... */ }
  // No config property - theme is applied automatically
};

// ⚠️ CAREFUL - Only add config if you need custom overrides
const spec = {
  mark: 'bar',
  encoding: { /* ... */ },
  config: {
    // Your custom config here
    // Theme config is merged in via ...spec.config
  }
};
```

### Colors Don't Match Theme

**Symptom:** Chart colors don't adapt to light/dark mode

**Possible Causes:**

1. **Hardcoded colors in spec** - Using hex values instead of CSS variables
2. **Color scale not using theme variables**

**Solution:**
```typescript
// ✅ CORRECT - Use CSS variables for theme-aware colors
"encoding": {
  "color": {
    "scale": {
      "range": ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)"]
    }
  }
}

// ❌ WRONG - Hardcoded colors won't adapt to theme
"encoding": {
  "color": {
    "scale": {
      "range": ["#3b82f6", "#60a5fa", "#93c5fd"]
    }
  }
}
```

### Chart Not Rendering

**Symptom:** Empty white card, no chart

**Possible Causes:**

1. **Width not measured yet**
   - Charts only render when `containerWidth > 0`
   - Check console logs for "VegaChart container width"

2. **Invalid spec**
   - Check browser console for Vega errors
   - Validate spec at [Vega Editor](https://vega.github.io/editor/)

3. **Missing data**
   - Ensure `data.values` array is populated
   - Check data structure matches encoding fields

4. **Import error**
   - Verify using `AppVegaChart` not `VegaChart` in routes
   - Check import path: `@/components/app/AppVegaChart`

### Vega-Lite Version Warning

**Warning:** `"The input spec uses Vega-Lite v5, but the current version is v6"`

**Cause:** react-vega uses Vega-Lite v6, but specs use v5 schema

**Impact:** Non-blocking warning, charts render correctly

**Solution (Optional):**
Update schema URL to v6:
```typescript
"$schema": "https://vega.github.io/schema/vega-lite/v6.json"
```

### ResizeObserver Warnings

**Warning:** Console warnings about ResizeObserver

**Cause:** Rapid resize events during development hot-reload

**Impact:** None - charts still render correctly

**Solution:** Ignore in development, won't occur in production

---

## Best Practices

### DO

✅ Always use `"width": "container"` for responsive charts

✅ Embed data in spec, not as separate prop

✅ Import `AppVegaChart` in app routes (never `VegaChart`)

✅ Provide title and description for accessibility

✅ Use tooltips for interactive data exploration

✅ Test charts at different screen sizes

✅ Keep height fixed to prevent layout shift

✅ Format numbers appropriately (`,` `.0f` `$,` etc.)

### DON'T

❌ Don't use fixed pixel widths (except for specific cases)

❌ Don't pass data as separate prop to AppVegaChart

❌ Don't import VegaChart directly in app routes

❌ Don't use hardcoded hex colors (use CSS variables instead)

❌ Don't skip the schema declaration

❌ Don't use auto height (causes layout issues)

❌ Don't forget error handling for data loading

❌ Don't override the entire `config` object (merge instead)

---

## Examples

### Complete Working Example

```typescript
// src/app/my-page/page.tsx
"use client";

import { AppVegaChart } from "@/components/app/AppVegaChart";
import type { VisualizationSpec } from 'vega-embed';

export default function MyPage() {
  const spec: VisualizationSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": "container",
    "height": 300,
    "data": {
      "values": [
        { "month": "Jan", "sales": 45000 },
        { "month": "Feb", "sales": 52000 },
        { "month": "Mar", "sales": 48000 }
      ]
    },
    "mark": {
      "type": "bar",
      "cornerRadiusEnd": 4
    },
    "encoding": {
      "x": {
        "field": "month",
        "type": "ordinal",
        "axis": { "labelAngle": 0, "title": "Month" }
      },
      "y": {
        "field": "sales",
        "type": "quantitative",
        "axis": { "title": "Sales ($)", "format": "$,.0f" }
      },
      "color": {
        "value": "var(--chart-1)"  // Single color for all bars
      },
      "tooltip": [
        { "field": "month", "type": "ordinal", "title": "Month" },
        { "field": "sales", "type": "quantitative", "title": "Sales", "format": "$,.0f" }
      ]
    }
  };

  return (
    <div className="p-8">
      <AppVegaChart
        spec={spec}
        title="Monthly Sales Performance"
        description="Sales trends for Q1 2024"
      />
    </div>
  );
}
```

### Dynamic Data Example

```typescript
"use client";

import { useState, useEffect } from 'react';
import { AppVegaChart } from "@/components/app/AppVegaChart";
import type { VisualizationSpec } from 'vega-embed';

export default function DynamicChartPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from API
    fetch('/api/chart-data')
      .then(res => res.json())
      .then(setData);
  }, []);

  const spec: VisualizationSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": "container",
    "height": 300,
    "data": { "values": data },  // Dynamic data
    "mark": "line",
    "encoding": {
      "x": { "field": "date", "type": "temporal" },
      "y": { "field": "value", "type": "quantitative" }
    }
  };

  if (data.length === 0) {
    return <div>Loading chart data...</div>;
  }

  return <AppVegaChart spec={spec} title="Real-time Data" />;
}
```

---

## Related Documentation

### Must Read
- [Project Architecture](../system/project_architecture.md) - Overall system design
- [Coding Patterns](./coding_patterns.md) - General coding practices
- [CLAUDE.md](../../CLAUDE.md) - Quick reference guide

### Vega-Lite Resources
- [Vega-Lite Documentation](https://vega.github.io/vega-lite/)
- [Vega-Lite Examples](https://vega.github.io/vega-lite/examples/)
- [Vega Editor](https://vega.github.io/editor/) - Interactive playground
- [react-vega GitHub](https://github.com/vega/react-vega)

### Internal Examples
- `src/app/demo/charts/vega/page.tsx` - Demo page with 6 chart types
- `src/lib/mock-data/sample-vega-specs.ts` - Complete spec examples
- `src/components/charts/VegaChart.tsx` - Raw component implementation
- `src/components/app/AppVegaChart.tsx` - App wrapper implementation

---

**Last Updated:** 2025-12-04
**Maintainers:** Development Team
**Version:** 1.1.0 - CSS Variable Integration
