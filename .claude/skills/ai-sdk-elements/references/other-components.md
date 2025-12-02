# Other AI Elements Components

## PromptInput

Advanced input component for chat interfaces with file attachment support.

### Installation
```bash
npx ai-elements@latest add prompt-input
```

### Basic Usage
```tsx
import { PromptInput } from "@/components/ai/prompt-input";

<PromptInput
  value={input}
  onChange={handleInputChange}
  onSubmit={handleSubmit}
  placeholder="Ask me anything..."
  disabled={isLoading}
  allowAttachments={true}
/>
```

### Features
- Multi-line text input with auto-resize
- File attachment support (drag-and-drop, click to upload)
- Submit button with loading states
- Keyboard shortcuts (Enter to submit, Shift+Enter for newline)
- Attachment preview and removal
- Character/token limits

## CodeBlock

Syntax-highlighted code display with copy functionality.

### Installation
```bash
npx ai-elements@latest add code-block
```

### Usage
```tsx
import { CodeBlock } from "@/components/ai/code-block";

<CodeBlock
  language="typescript"
  code={`function hello() {
  console.log("Hello world!");
}`}
  showLineNumbers={true}
  highlightLines={[2]}
  filename="hello.ts"
/>
```

### Props
- `language: string` - Programming language for syntax highlighting
- `code: string` - Code content
- `showLineNumbers?: boolean` - Display line numbers
- `highlightLines?: number[]` - Lines to highlight
- `filename?: string` - Show filename above code block
- `allowCopy?: boolean` - Enable copy button (default: true)

### Features
- Syntax highlighting for 100+ languages
- Copy to clipboard
- Line numbering
- Line highlighting
- Filename display
- Light/dark theme support

## Loader

Loading indicators for async operations.

### Installation
```bash
npx ai-elements@latest add loader
```

### Usage
```tsx
import { Loader } from "@/components/ai/loader";

// Spinner
<Loader variant="spinner" size="md" />

// Dots
<Loader variant="dots" size="sm" />

// Pulse
<Loader variant="pulse" />
```

### Props
- `variant?: "spinner" | "dots" | "pulse"` - Animation style
- `size?: "sm" | "md" | "lg"` - Size (default: "md")
- `className?: string` - Custom styling

## Image

Image display with loading states and error handling.

### Installation
```bash
npx ai-elements@latest add image
```

### Usage
```tsx
import { Image } from "@/components/ai/image";

<Image
  src="/generated-image.png"
  alt="AI generated diagram"
  width={800}
  height={600}
  fallback={<div>Failed to load image</div>}
  loading="lazy"
/>
```

### Props
- `src: string` - Image URL
- `alt: string` - Alt text
- `width?: number` - Image width
- `height?: number` - Image height
- `fallback?: ReactNode` - Error fallback UI
- `loading?: "lazy" | "eager"` - Loading strategy
- `onLoad?: () => void` - Load callback
- `onError?: () => void` - Error callback

## Tool Components

Components for displaying tool calls and results.

### Installation
```bash
npx ai-elements@latest add tool
```

### ToolInvocation
Display tool execution with parameters and results.

```tsx
import { Tool, ToolInvocation, ToolResult } from "@/components/ai/tool";

<Tool>
  <ToolInvocation
    name="search_database"
    parameters={{
      query: "active users",
      limit: 100
    }}
    status="complete"
  />

  <ToolResult>
    Found 1,234 active users
  </ToolResult>
</Tool>
```

### Props
- `name: string` - Tool name
- `parameters: Record<string, any>` - Tool parameters
- `status?: "pending" | "running" | "complete" | "error"` - Execution status
- `error?: string` - Error message if failed

### Integration with useChat
```tsx
const { messages } = useChat();

{messages.map((message) => (
  <Message key={message.id} from={message.role}>
    {message.toolInvocations?.map((tool) => (
      <Tool key={tool.toolCallId}>
        <ToolInvocation
          name={tool.toolName}
          parameters={tool.args}
          status={tool.state}
        />
        {tool.result && (
          <ToolResult>
            {JSON.stringify(tool.result, null, 2)}
          </ToolResult>
        )}
      </Tool>
    ))}
  </Message>
))}
```

## Sources & Citations

Display source references and citations.

### Installation
```bash
npx ai-elements@latest add sources
```

### Usage
```tsx
import { Sources, Source } from "@/components/ai/sources";

<Sources>
  <Source
    title="OpenAI API Documentation"
    url="https://platform.openai.com/docs"
    excerpt="The OpenAI API uses API keys for authentication..."
  />
  <Source
    title="React Documentation"
    url="https://react.dev"
    excerpt="React is a JavaScript library for building user interfaces..."
  />
</Sources>
```

### Props (Source)
- `title: string` - Source title
- `url: string` - Source URL
- `excerpt?: string` - Text excerpt/preview
- `favicon?: string` - Site favicon URL
- `timestamp?: string` - When accessed/retrieved

## Suggestions

Quick action chips for suggested prompts.

### Installation
```bash
npx ai-elements@latest add suggestion
```

### Usage
```tsx
import { Suggestions, Suggestion } from "@/components/ai/suggestions";

<Suggestions>
  <Suggestion
    text="Analyze this data"
    icon={BarChart}
    onClick={() => sendMessage("Analyze this data")}
  />
  <Suggestion
    text="Generate summary"
    icon={FileText}
    onClick={() => sendMessage("Generate summary")}
  />
  <Suggestion
    text="Create visualization"
    icon={PieChart}
    onClick={() => sendMessage("Create visualization")}
  />
</Suggestions>
```

### Props (Suggestion)
- `text: string` - Suggestion text
- `icon?: LucideIcon` - Optional icon
- `onClick: () => void` - Click handler
- `variant?: "default" | "outline"` - Visual style

## ModelSelector

Dropdown for selecting AI models.

### Installation
```bash
npx ai-elements@latest add model-selector
```

### Usage
```tsx
import { ModelSelector } from "@/components/ai/model-selector";

<ModelSelector
  value={selectedModel}
  onChange={setSelectedModel}
  models={[
    { id: "gpt-4", name: "GPT-4", description: "Most capable" },
    { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", description: "Fast and efficient" },
    { id: "claude-3-opus", name: "Claude 3 Opus", description: "Powerful reasoning" }
  ]}
/>
```

### Props
- `value: string` - Currently selected model ID
- `onChange: (modelId: string) => void` - Selection callback
- `models: Model[]` - Available models
  - `id: string` - Model identifier
  - `name: string` - Display name
  - `description?: string` - Model description
  - `icon?: ReactNode` - Model icon
- `disabled?: boolean` - Disable selection

## Context Components

Display and manage conversation context.

### Installation
```bash
npx ai-elements@latest add context
```

### Usage
```tsx
import { Context, ContextItem } from "@/components/ai/context";

<Context>
  <ContextItem
    type="file"
    name="schema.sql"
    size="2.4 KB"
    onRemove={() => removeFile("schema.sql")}
  />
  <ContextItem
    type="url"
    name="Documentation"
    url="https://docs.example.com"
    onRemove={() => removeURL("https://docs.example.com")}
  />
</Context>
```

### Props (ContextItem)
- `type: "file" | "url" | "text"` - Context type
- `name: string` - Display name
- `size?: string` - File size (for files)
- `url?: string` - URL (for URLs)
- `onRemove?: () => void` - Remove callback
- `icon?: LucideIcon` - Custom icon
