---
name: kibo-ui
description: Component library built on shadcn/ui for creating feature-rich React interfaces with 41+ pre-built components including tables, kanban boards, gantt charts, file dropzones, code blocks, editors, and more. Use when working with Next.js/React applications that need (1) data visualization components (tables, charts, calendars), (2) project management UI (kanban, gantt, roadmaps), (3) file handling (dropzone, image crop/zoom), (4) rich editing (code blocks, text editor), (5) collaboration features (cursors, avatar stacks), or (6) pre-built blocks (pricing, hero, forms). Installed via CLI as source code for full customization.
---

# Kibo UI

## Overview

Kibo UI extends shadcn/ui with production-ready React components for data-rich interfaces. Components are installed as source code in your project, giving you full ownership to customize and extend.

Key features:
- 41+ composable components across 10 categories
- Built on shadcn/ui with identical Tailwind CSS theming
- Full TypeScript support with type definitions
- Next.js App Router compatible (Server and Client Components)
- Automatic light/dark mode support

## Quick Start

### Prerequisites Check

Before using Kibo UI, verify:

```bash
# Check Node.js version (need 18+)
node --version

# Verify shadcn/ui is initialized
ls src/components/ui
```

If shadcn/ui is not set up:

```bash
npx shadcn@latest init
```

### Installing Components

Use the Kibo UI CLI to add components:

```bash
npx kibo-ui add [component-name]
```

Examples:
```bash
npx kibo-ui add table       # Data tables
npx kibo-ui add gantt       # Project timelines
npx kibo-ui add dropzone    # File uploads
npx kibo-ui add editor      # Rich text editor
```

Components install to `@/components/kibo-ui/[component-name]/` as editable source code.

## Component Selection Guide

Choose components based on your use case:

### Data Display & Tables
- **Table**: Complex data with sorting, filtering, pagination
- **List**: Simple item collections with basic sorting
- **Contribution Graph**: Activity heatmaps (GitHub-style)

### Project Management
- **Kanban**: Drag-and-drop task boards
- **Gantt**: Timeline visualization with dependencies
- **Calendar**: Event scheduling and planning
- **Roadmap Block**: Product roadmap layouts

### File Handling
- **Dropzone**: Drag-and-drop file uploads
- **Image Crop**: Interactive image cropping
- **Image Zoom**: Zoom and pan for product images

### Rich Content Editing
- **Editor**: WYSIWYG text editor
- **Code Block**: Syntax-highlighted code display
- **Snippet**: Inline code examples

### Forms & Input
- **Combobox**: Searchable dropdowns
- **Tags**: Tag/keyword input
- **Choicebox**: Enhanced checkbox/radio groups
- **Color Picker**: Interactive color selection

### Collaboration
- **Cursor**: Real-time collaborative cursors
- **Avatar Stack**: User presence indicators
- **Dialog Stack**: Multi-modal workflows

### Media
- **Video Player**: Custom video controls
- **Stories**: Instagram-style stories
- **Reel**: Short video feeds

For the complete catalog with descriptions, see [components.md](references/components.md).

## Usage Patterns

### Basic Component Usage

```typescript
'use client';

import {
  Announcement,
  AnnouncementTag,
  AnnouncementTitle,
} from '@/components/kibo-ui/announcement';

export default function Hero() {
  return (
    <Announcement>
      <AnnouncementTag>New</AnnouncementTag>
      <AnnouncementTitle>Feature launched</AnnouncementTitle>
    </Announcement>
  );
}
```

### Data Table Example

```typescript
'use client';

import { Table } from '@/components/kibo-ui/table';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
];

const data = [
  { name: 'John Doe', email: 'john@example.com' },
];

export default function UsersTable() {
  return <Table columns={columns} data={data} />;
}
```

### File Upload Example

```typescript
'use client';

import { Dropzone } from '@/components/kibo-ui/dropzone';

export default function Upload() {
  const handleDrop = (files: File[]) => {
    console.log('Uploaded:', files);
  };

  return (
    <Dropzone
      onDrop={handleDrop}
      accept={{ 'image/*': ['.png', '.jpg'] }}
      maxSize={5242880} // 5MB
    />
  );
}
```

For comprehensive usage patterns including forms, theming, and error handling, see [usage.md](references/usage.md).

## Component Architecture

Kibo UI follows a composable pattern with parent-child relationships:

```typescript
<ParentComponent>
  <ChildComponent1 />
  <ChildComponent2 />
</ParentComponent>
```

Benefits:
- **Flexibility**: Compose features as needed
- **Customization**: Style with Tailwind classes
- **Type Safety**: Full TypeScript support
- **Accessibility**: Built-in ARIA attributes

## Client vs Server Components

### When to use `'use client'`

Add the directive for components requiring:
- State management (`useState`, `useReducer`)
- Event handlers (`onClick`, `onChange`)
- Effects (`useEffect`, `useLayoutEffect`)
- Browser APIs (`localStorage`, `window`)

```typescript
'use client';

import { Dropzone } from '@/components/kibo-ui/dropzone';
import { useState } from 'react';

export default function InteractiveUpload() {
  const [files, setFiles] = useState<File[]>([]);
  return <Dropzone onDrop={setFiles} />;
}
```

### Server Components

Use server components for:
- Static content
- Data fetching
- SEO-critical content

```typescript
// No 'use client' needed
import { Card } from '@/components/kibo-ui/card';

export default async function Dashboard() {
  const data = await fetchData();
  return <Card>{data}</Card>;
}
```

## Theming

Kibo UI uses shadcn/ui's CSS Variables system. Components automatically adapt to your theme:

```css
/* globals.css */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 217.2 91.2% 59.8%;
}
```

Use theme-aware Tailwind classes:
- `bg-background`, `text-foreground`
- `bg-primary`, `text-primary`
- `border-border`, `ring-ring`

## Best Practices

1. **Import from local paths**: Always import from `@/components/kibo-ui/[component]`
2. **Add 'use client' sparingly**: Only when interactivity is required
3. **Customize freely**: Components are your source code—modify as needed
4. **Use Tailwind for styling**: Leverage utility classes and CSS variables
5. **Check dependencies**: Some components require additional packages (auto-installed)
6. **Follow composable patterns**: Combine subcomponents for flexibility

## Troubleshooting

### Component not found after installation

Check the component was installed:
```bash
ls src/components/kibo-ui/[component-name]
```

Verify your import path matches your project structure.

### TypeScript errors

Ensure TypeScript is configured correctly:
```bash
# Check tsconfig.json has path aliases
cat tsconfig.json | grep "@/*"
```

### Styling issues

Verify Tailwind CSS is configured with CSS Variables mode:
```css
/* Should see variables in globals.css */
:root {
  --background: ...;
}
```

### Component appears unstyled

Check that globals.css is imported in your root layout:
```typescript
// app/layout.tsx
import '@/styles/globals.css';
```

## Additional Resources

- **Component Catalog**: [components.md](references/components.md) - Complete list of 41+ components
- **Installation Guide**: [installation.md](references/installation.md) - Setup and prerequisites
- **Usage Patterns**: [usage.md](references/usage.md) - Code examples and best practices

## Common Workflows

### Adding a new component to an existing page

1. Identify the component needed from the catalog
2. Install: `npx kibo-ui add [component-name]`
3. Import in your page/component file
4. Add `'use client'` if the component needs interactivity
5. Use Tailwind classes to customize styling

### Building a dashboard with multiple components

1. Install all needed components:
   ```bash
   npx kibo-ui add table
   npx kibo-ui add chart
   npx kibo-ui add card
   ```
2. Create a layout component (server component)
3. Import and compose components
4. Add `'use client'` only to interactive sections
5. Use CSS Grid or Flexbox for responsive layout

### Customizing a component's appearance

1. Open the component file in `src/components/kibo-ui/[component]/`
2. Modify Tailwind classes or add custom styles
3. Use CSS variables for theme-aware colors
4. Test in both light and dark modes

### Integrating with forms

```typescript
'use client';

import { useForm } from 'react-hook-form';
import { Combobox } from '@/components/kibo-ui/combobox';

export default function UserForm() {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Combobox
        {...register('country')}
        options={countries}
      />
    </form>
  );
}
```
