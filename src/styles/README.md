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

```

### In Custom CSS

```css
.my-component {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border-radius: var(--radius);
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

### Border Radius
- `radius-sm`, `radius`, `radius-md`, `radius-lg`, `radius-xl`

### Border Colors
- `border-subtle` - Very light, minimal contrast (dividers in low-emphasis areas)
- `border-light` - Lighter than default (subtle separations)
- `border` - Default border color (standard UI elements)
- `border-medium` - Medium intensity (forms, interactive elements)
- `border-strong` - High contrast (emphasis, focus states)

## Border Color System

The theme provides five border intensity tiers for flexible styling using the OKLch color space.

### Available Border Colors

| Class | Use Case | Example |
|-------|----------|---------|
| `border-subtle` | Low-emphasis dividers, background separators | `<hr className="border-subtle" />` |
| `border-light` | Secondary content boundaries, nested containers | `<div className="border-light border" />` |
| `border` | Standard UI elements, cards, dialogs (default) | `<div className="border rounded-lg" />` |
| `border-medium` | Form inputs, interactive elements, table borders | `<input className="border-medium" />` |
| `border-strong` | Emphasis, selected states, high-priority boundaries | `<button className="border-strong" />` |

### Usage Examples

```tsx
// Subtle divider between sections
<div className="border-subtle border-b" />

// Default card border (existing behavior)
<div className="border rounded-lg p-4">
  Card content
</div>

// Strong form field border for emphasis
<input className="border-medium rounded-md focus:border-strong" />

// Interactive button with medium border that strengthens on hover
<button className="border-medium hover:border-strong transition-colors">
  Click me
</button>

// Table with light row separators
<table className="[&_tr]:border-light [&_tr]:border-b">
  <tbody>
    <tr><td>Row 1</td></tr>
    <tr><td>Row 2</td></tr>
  </tbody>
</table>
```

### Light/Dark Mode

All border colors automatically adapt to light/dark mode. The same class name produces appropriate contrast in both themes:

- **Light mode:** Darker values create stronger borders
- **Dark mode:** Lighter values create stronger borders

### Choosing the Right Border

Use this decision guide:

```
Need stronger border?
├─ Yes: Try border-medium first
│   └─ Still too subtle? Use border-strong
└─ No: Need lighter?
    ├─ Yes: Try border-light
    └─ Very subtle? Use border-subtle
```

**Guidelines:**
- **subtle**: Background dividers, low-priority separators where structure matters but shouldn't draw attention
- **light**: Secondary content boundaries, nested containers within cards or sections
- **default**: Standard UI elements—cards, dialogs, standard table borders (this is the existing `border` class)
- **medium**: Form inputs, interactive elements, data tables where structure is important
- **strong**: Emphasis states, selected items, focus rings, high-priority boundaries

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
