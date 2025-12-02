# Kibo UI Installation Guide

## Prerequisites

Before using Kibo UI, ensure your environment meets these requirements:

- **Node.js**: Version 18 or later
- **React**: Version 18 or later
- **shadcn/ui**: Must be pre-installed with Tailwind CSS configured
- **Theme Mode**: Kibo UI supports only the CSS Variables mode of shadcn/ui

## Initial Setup

If starting a new project, first set up shadcn/ui:

```bash
npx shadcn@latest init
```

This configures:
- Tailwind CSS
- CSS Variables for theming
- Component directory structure
- TypeScript configuration

## Installing Components

Kibo UI offers two equivalent installation methods:

### Method 1: Kibo UI CLI (Recommended)

```bash
npx kibo-ui add [component-name]
```

Examples:
```bash
npx kibo-ui add gantt
npx kibo-ui add table
npx kibo-ui add dropzone
```

### Method 2: shadcn/ui CLI

```bash
npx shadcn@latest add [component-name]
```

Both methods achieve identical results:
- Download component code into your project
- Install required dependencies automatically
- Place files in `@/components/kibo-ui/` (or your configured directory)
- Handle headless library dependencies

## Component Location

Components are installed as source code in your project:

```
src/
└── components/
    └── kibo-ui/
        ├── gantt/
        │   ├── gantt.tsx
        │   └── types.ts
        ├── table/
        │   └── table.tsx
        └── ...
```

This gives you full ownership to:
- Modify component styles
- Adjust behavior and props
- Extend functionality
- Fix bugs directly

## Installation Time

Component installation completes in seconds. No build step or compilation required—components are immediately ready to use.

## Multiple Components

Install multiple components by running the command multiple times:

```bash
npx kibo-ui add table
npx kibo-ui add dropzone
npx kibo-ui add editor
```

Or chain commands:

```bash
npx kibo-ui add table && npx kibo-ui add dropzone && npx kibo-ui add editor
```

## Updating Components

Since components are source code in your project, updates require manually:
1. Checking for new versions
2. Re-running the add command
3. Reviewing and merging changes

This gives you control over when to adopt updates and how to handle customizations.
