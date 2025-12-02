# Artifact Component Reference

Container component for displaying AI-generated content (code, documents, outputs) with built-in actions and metadata display.

## Installation

```bash
npx ai-elements@latest add artifact
```

## Components

### Artifact (Root Container)
Main wrapper for generated content display.

```tsx
<Artifact>
  <ArtifactHeader>{/* metadata */}</ArtifactHeader>
  <ArtifactContent>{/* generated content */}</ArtifactContent>
</Artifact>
```

### ArtifactHeader
Header section for title, description, and actions.

```tsx
<ArtifactHeader>
  <ArtifactTitle>Code Generator</ArtifactTitle>
  <ArtifactDescription>
    Generated React component based on your requirements
  </ArtifactDescription>
  <ArtifactActions>
    {/* action buttons */}
  </ArtifactActions>
</ArtifactHeader>
```

**Subcomponents:**
- `ArtifactTitle` - Displays artifact title
- `ArtifactDescription` - Descriptive text
- `ArtifactActions` - Container for action buttons

### ArtifactContent
Content area for displaying generated output.

```tsx
<ArtifactContent>
  <CodeBlock language="tsx" code={generatedCode} />
</ArtifactContent>
```

### ArtifactActions & ArtifactAction
Action buttons for artifact operations.

```tsx
<ArtifactActions>
  <ArtifactAction
    tooltip="Copy code"
    label="Copy to clipboard"
    icon={Copy}
    onClick={handleCopy}
  />
  <ArtifactAction
    tooltip="Download"
    label="Download file"
    icon={Download}
    onClick={handleDownload}
  />
  <ArtifactClose />
</ArtifactActions>
```

**ArtifactAction Props:**
- `tooltip?: string` - Hover tooltip text
- `label?: string` - ARIA label for screen readers
- `icon?: LucideIcon` - Icon component
- `onClick?: () => void` - Click handler
- `...ButtonProps` - Standard button props

**ArtifactClose:**
Pre-configured close button variant.

## Props & Types

All components extend standard React HTML attributes:
- `Artifact` - `HTMLAttributes<HTMLDivElement>`
- `ArtifactHeader` - `HTMLAttributes<HTMLDivElement>`
- `ArtifactTitle` - `HTMLAttributes<HTMLHeadingElement>`
- `ArtifactDescription` - `HTMLAttributes<HTMLParagraphElement>`
- `ArtifactContent` - `HTMLAttributes<HTMLDivElement>`
- `ArtifactActions` - `HTMLAttributes<HTMLDivElement>`

## Common Patterns

### Code Display
```tsx
<Artifact>
  <ArtifactHeader>
    <ArtifactTitle>React Component</ArtifactTitle>
    <ArtifactDescription>Todo list with state management</ArtifactDescription>
    <ArtifactActions>
      <ArtifactAction
        tooltip="Copy"
        icon={Copy}
        onClick={() => navigator.clipboard.writeText(code)}
      />
      <ArtifactAction
        tooltip="Run in sandbox"
        icon={Play}
        onClick={openSandbox}
      />
      <ArtifactClose />
    </ArtifactActions>
  </ArtifactHeader>
  <ArtifactContent>
    <CodeBlock language="tsx" code={generatedCode} />
  </ArtifactContent>
</Artifact>
```

### Document Display
```tsx
<Artifact>
  <ArtifactHeader>
    <ArtifactTitle>Generated Report</ArtifactTitle>
    <ArtifactDescription>Q4 2024 Sales Analysis</ArtifactDescription>
    <ArtifactActions>
      <ArtifactAction tooltip="Download PDF" icon={FileDown} onClick={downloadPDF} />
      <ArtifactAction tooltip="Share" icon={Share2} onClick={shareReport} />
      <ArtifactAction tooltip="Regenerate" icon={RefreshCw} onClick={regenerate} />
    </ArtifactActions>
  </ArtifactHeader>
  <ArtifactContent>
    <div className="prose">{/* Markdown or HTML content */}</div>
  </ArtifactContent>
</Artifact>
```

### Chart/Visualization
```tsx
<Artifact>
  <ArtifactHeader>
    <ArtifactTitle>Sales Trend Chart</ArtifactTitle>
    <ArtifactDescription>Monthly revenue 2024</ArtifactDescription>
    <ArtifactActions>
      <ArtifactAction tooltip="Download PNG" icon={Download} onClick={exportImage} />
      <ArtifactAction tooltip="View data" icon={Table} onClick={showData} />
    </ArtifactActions>
  </ArtifactHeader>
  <ArtifactContent>
    <ResponsiveContainer width="100%" height={400}>
      {/* Chart component */}
    </ResponsiveContainer>
  </ArtifactContent>
</Artifact>
```

## Integration with AI SDK

```tsx
import { useChat } from "ai/react";
import { Artifact, ArtifactHeader, ArtifactTitle, ArtifactContent } from "@/components/ai/artifact";

export function ArtifactViewer() {
  const { messages } = useChat();

  // Find messages with artifacts
  const artifactMessages = messages.filter(m =>
    m.role === "assistant" && m.experimental_attachments?.some(a => a.type === "artifact")
  );

  return (
    <>
      {artifactMessages.map((message) => {
        const artifact = message.experimental_attachments?.find(a => a.type === "artifact");

        return (
          <Artifact key={message.id}>
            <ArtifactHeader>
              <ArtifactTitle>{artifact.title}</ArtifactTitle>
              <ArtifactDescription>{artifact.description}</ArtifactDescription>
            </ArtifactHeader>
            <ArtifactContent>
              <CodeBlock language={artifact.language} code={artifact.content} />
            </ArtifactContent>
          </Artifact>
        );
      })}
    </>
  );
}
```

## Styling

Default styling includes:
- Border and shadow for container
- Structured header with flexible layout
- Responsive content area
- Professional action button styling
- Light/dark mode support

Override with `className`:
```tsx
<Artifact className="my-custom-artifact">
  {/* ... */}
</Artifact>
```

## Accessibility

- Proper heading hierarchy (`ArtifactTitle` uses appropriate heading level)
- ARIA labels on action buttons
- Keyboard navigation support
- Screen reader friendly structure

## Best Practices

1. **Clear titles** - Use descriptive, specific titles
2. **Meaningful descriptions** - Explain what was generated and why
3. **Appropriate actions** - Include relevant operations (Copy, Download, Run, etc.)
4. **Consistent icons** - Use standard icons for common actions
5. **Error handling** - Show error states within ArtifactContent
6. **Loading states** - Display progress during generation
7. **Close functionality** - Always provide a way to dismiss the artifact
