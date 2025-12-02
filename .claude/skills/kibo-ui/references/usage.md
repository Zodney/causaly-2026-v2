# Kibo UI Usage Patterns

## Import Patterns

Components are imported from your local component directory:

```typescript
import { ComponentName } from '@/components/kibo-ui/component-name';
```

For components with subcomponents:

```typescript
import {
  Announcement,
  AnnouncementTag,
  AnnouncementTitle,
} from '@/components/kibo-ui/announcement';
```

## Basic Usage Example

```typescript
'use client';

import {
  Announcement,
  AnnouncementTag,
  AnnouncementTitle,
} from '@/components/kibo-ui/announcement';
import { ArrowUpRightIcon } from 'lucide-react';

export default function Hero() {
  return (
    <Announcement>
      <AnnouncementTag>Latest update</AnnouncementTag>
      <AnnouncementTitle>
        New feature added
        <ArrowUpRightIcon size={16} className="shrink-0 text-muted-foreground" />
      </AnnouncementTitle>
    </Announcement>
  );
}
```

## Component Architecture

Kibo UI components follow a composable pattern:

### Parent-Child Structure

```typescript
<ParentComponent>
  <ChildComponent1 />
  <ChildComponent2 />
</ParentComponent>
```

Example:
```typescript
<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
    </DialogHeader>
  </DialogContent>
</Dialog>
```

### Props and Customization

Components accept standard HTML attributes:

```typescript
<Announcement className="custom-class" id="announcement-1">
  {/* content */}
</Announcement>
```

### Styling with Tailwind

Use Tailwind classes for customization:

```typescript
<AnnouncementTitle className="text-lg font-bold text-primary">
  Custom styled title
</AnnouncementTitle>
```

## Client vs Server Components

### Client Components

Components requiring interactivity need the `'use client'` directive:

```typescript
'use client';

import { Dropzone } from '@/components/kibo-ui/dropzone';
import { useState } from 'react';

export default function UploadPage() {
  const [files, setFiles] = useState([]);

  return <Dropzone onDrop={setFiles} />;
}
```

### Server Components

Static components can be used in server components:

```typescript
import { Card } from '@/components/kibo-ui/card';

export default function DashboardPage() {
  return (
    <Card>
      <CardHeader>Dashboard</CardHeader>
    </Card>
  );
}
```

## Common Patterns

### Data Tables

```typescript
'use client';

import { Table } from '@/components/kibo-ui/table';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
];

const data = [
  { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
];

export default function UsersTable() {
  return <Table columns={columns} data={data} />;
}
```

### File Upload

```typescript
'use client';

import { Dropzone } from '@/components/kibo-ui/dropzone';

export default function UploadForm() {
  const handleDrop = (files: File[]) => {
    console.log('Files dropped:', files);
  };

  return (
    <Dropzone
      onDrop={handleDrop}
      accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
      maxSize={5242880} // 5MB
    />
  );
}
```

### Rich Text Editor

```typescript
'use client';

import { Editor } from '@/components/kibo-ui/editor';
import { useState } from 'react';

export default function ContentEditor() {
  const [content, setContent] = useState('');

  return (
    <Editor
      value={content}
      onChange={setContent}
      placeholder="Start typing..."
    />
  );
}
```

### Kanban Board

```typescript
'use client';

import { Kanban } from '@/components/kibo-ui/kanban';

const columns = [
  { id: 'todo', title: 'To Do', tasks: [] },
  { id: 'in-progress', title: 'In Progress', tasks: [] },
  { id: 'done', title: 'Done', tasks: [] },
];

export default function TaskBoard() {
  return <Kanban columns={columns} />;
}
```

## Theming

Kibo UI uses the same CSS Variables as shadcn/ui:

```css
/* In your globals.css */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    /* ... other variables */
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    /* ... other variables */
  }
}
```

Components automatically adapt to light/dark themes.

## Best Practices

1. **Composition**: Build complex interfaces by combining subcomponents
2. **Customization**: Use Tailwind classes and CSS variables for styling
3. **Performance**: Use client components only when interactivity is needed
4. **Type Safety**: Leverage TypeScript for prop validation
5. **Accessibility**: Components include ARIA attributes by default
6. **Responsive**: Use Tailwind responsive modifiers (`md:`, `lg:`, etc.)

## Integration with Forms

Kibo UI components work with form libraries:

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
        placeholder="Select country"
      />
    </form>
  );
}
```

## Next.js App Router

Components integrate seamlessly with Next.js 13+ App Router:

```typescript
// app/dashboard/page.tsx
import { Card } from '@/components/kibo-ui/card';

export default function DashboardPage() {
  return (
    <main className="container mx-auto p-8">
      <Card>Dashboard content</Card>
    </main>
  );
}
```

## Error Handling

Handle component errors gracefully:

```typescript
'use client';

import { Dropzone } from '@/components/kibo-ui/dropzone';
import { toast } from 'sonner';

export default function Upload() {
  const handleError = (error: Error) => {
    toast.error(`Upload failed: ${error.message}`);
  };

  return <Dropzone onError={handleError} />;
}
```
