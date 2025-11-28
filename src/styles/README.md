# Design Tokens & Theme System

This directory contains the design token and theming configuration for the project.

## Files

- **`tokens.css`** - Core design tokens (colors, spacing, typography)
- **`globals.css`** - Global styles and Tailwind configuration

## Usage

### In Tailwind/JSX Components

```tsx
// Use semantic color names
<div className="bg-primary text-primary-foreground">
  Primary button
</div>

<div className="bg-secondary text-secondary-foreground">
  Secondary button
</div>

// Use brand colors
<div className="bg-brand-500 text-white">
  Brand colored element
</div>

// Use chart colors for data visualization
<div className="bg-chart-1">Data point 1</div>
<div className="bg-chart-2">Data point 2</div>
```

### In Custom CSS

```css
.my-component {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border-radius: var(--radius);
}
```

### For Data Visualization Libraries

#### Vega-Lite

```typescript
const vegaSpec = {
  // ...
  config: {
    range: {
      category: [
        'hsl(var(--chart-1))',
        'hsl(var(--chart-2))',
        'hsl(var(--chart-3))',
        // ... up to chart-9
      ]
    }
  }
}
```

#### Mermaid

```typescript
const mermaidConfig = {
  theme: 'base',
  themeVariables: {
    primaryColor: 'hsl(var(--primary))',
    primaryBorderColor: 'hsl(var(--border))',
    primaryTextColor: 'hsl(var(--primary-foreground))',
    // ... map other tokens as needed
  }
}
```

## Token Categories

### Semantic Colors
- `background`, `foreground` - Base page colors
- `card`, `card-foreground` - Card components
- `popover`, `popover-foreground` - Popover/dropdown components
- `primary`, `primary-foreground` - Primary actions
- `secondary`, `secondary-foreground` - Secondary actions
- `muted`, `muted-foreground` - Subtle/disabled states
- `accent`, `accent-foreground` - Highlights and hover states

### Status Colors
- `destructive`, `destructive-foreground` - Errors/delete actions
- `success`, `success-foreground` - Success states
- `warning`, `warning-foreground` - Warning states
- `info`, `info-foreground` - Informational states

### Brand Scale
- `brand-50` through `brand-900` - Brand color scale

### Chart Colors
- `chart-1` through `chart-9` - Categorical chart colors

### Sequential Colors
- `seq-1` through `seq-6` - Sequential scale for heatmaps

### Border Radius
- `radius-sm`, `radius`, `radius-md`, `radius-lg`, `radius-xl`

## Dark Mode

Dark mode is automatically applied via:
- `[data-theme="dark"]` attribute on any parent element
- `.dark` class on any parent element
- System preference via `@media (prefers-color-scheme: dark)`

To manually toggle dark mode, add `data-theme="dark"` to the `<html>` element:

```tsx
<html lang="en" data-theme="dark">
```

## Compatibility

These tokens are designed to be compatible with:
- ✅ shadcn/ui components
- ✅ Kibo UI (via CSS variable mapping)
- ✅ AI SDK UI (via Tailwind utilities)
- ✅ Vega-Lite (via config.range and themeVariables)
- ✅ Mermaid (via themeVariables)
