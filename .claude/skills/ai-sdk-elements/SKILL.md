---
name: ai-sdk-elements
description: AI SDK Elements is a comprehensive component library built on shadcn/ui for building AI-native applications. Use when working with AI-powered chat interfaces, conversational UI, AI-generated content display, tool invocations, or any AI SDK integration requiring pre-built, production-ready components for (1) chat messages with markdown/attachments/actions, (2) AI-generated artifacts (code, documents, visualizations), (3) prompt inputs with file attachments, (4) tool invocations and results, (5) code blocks with syntax highlighting, (6) loading states, suggestions, sources, or model selection.
---

# AI SDK Elements

Comprehensive component library for building AI-native applications with React, Next.js, and the AI SDK.

## Overview

AI SDK Elements provides production-ready, composable components built on shadcn/ui specifically designed for AI-powered interfaces. All components integrate seamlessly with the AI SDK's `useChat`, `useCompletion`, and other hooks.

## Installation

### Prerequisites
- Next.js 14+ with App Router
- shadcn/ui configured
- AI SDK installed (`npm install ai`)
- Tailwind CSS configured

### Adding Components

Install individual components:
```bash
npx ai-elements@latest add [component-name]
```

Available components: `message`, `artifact`, `prompt-input`, `code-block`, `tool`, `loader`, `image`, `sources`, `suggestions`, `model-selector`, `context`

## Core Components

### Message Components
For displaying chat messages with markdown, attachments, and actions. **See [message-component.md](references/message-component.md) for complete API.**

**Quick start:**
```tsx
import { useChat } from "ai/react";
import { Message, MessageContent, MessageResponse, MessageActions, MessageAction } from "@/components/ai/message";
import { Copy, RefreshCw } from "lucide-react";

export function Chat() {
  const { messages, reload } = useChat();

  return (
    <>
      {messages.map((message) => (
        <Message key={message.id} from={message.role}>
          <MessageContent>
            <MessageResponse>{message.content}</MessageResponse>
          </MessageContent>

          {message.role === "assistant" && (
            <MessageActions>
              <MessageAction tooltip="Copy" icon={Copy} onClick={handleCopy} />
              <MessageAction tooltip="Regenerate" icon={RefreshCw} onClick={() => reload()} />
            </MessageActions>
          )}
        </Message>
      ))}
    </>
  );
}
```

**Key features:**
- Automatic role-based alignment (user: right, assistant: left)
- Markdown rendering with GFM support
- Streaming markdown parsing
- File/image attachments (96×96px thumbnails)
- Action buttons with tooltips
- Response branching for multiple versions
- Syntax-highlighted code blocks

**Important:** Add to globals.css: `@source '../node_modules/streamdown/dist/index.js';`

### Artifact Components
For displaying AI-generated content (code, documents, outputs) with actions. **See [artifact-component.md](references/artifact-component.md) for complete API.**

**Quick start:**
```tsx
import { Artifact, ArtifactHeader, ArtifactTitle, ArtifactDescription, ArtifactContent, ArtifactActions, ArtifactAction, ArtifactClose } from "@/components/ai/artifact";
import { Copy, Download, Play } from "lucide-react";

<Artifact>
  <ArtifactHeader>
    <ArtifactTitle>Generated Component</ArtifactTitle>
    <ArtifactDescription>React todo list with state management</ArtifactDescription>
    <ArtifactActions>
      <ArtifactAction tooltip="Copy" icon={Copy} onClick={handleCopy} />
      <ArtifactAction tooltip="Run" icon={Play} onClick={openSandbox} />
      <ArtifactClose />
    </ArtifactActions>
  </ArtifactHeader>
  <ArtifactContent>
    <CodeBlock language="tsx" code={generatedCode} />
  </ArtifactContent>
</Artifact>
```

**Use cases:**
- Code generation display
- Document/report output
- Charts and visualizations
- Any structured AI output requiring metadata and actions

### Other Components
**See [other-components.md](references/other-components.md) for complete documentation on:**
- **PromptInput** - Advanced input with file attachments
- **CodeBlock** - Syntax-highlighted code with copy button
- **Tool/ToolInvocation** - Display tool calls and results
- **Sources/Source** - Citations and references
- **Suggestions** - Quick action chips
- **ModelSelector** - AI model dropdown
- **Context** - Conversation context display
- **Loader** - Loading indicators
- **Image** - Image display with loading/error states

## Integration Patterns

### Basic Chat Interface
```tsx
import { useChat } from "ai/react";
import { Message, MessageContent, MessageResponse } from "@/components/ai/message";
import { PromptInput } from "@/components/ai/prompt-input";

export function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat"
  });

  return (
    <div className="flex h-screen flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <Message key={message.id} from={message.role}>
            <MessageContent>
              <MessageResponse>{message.content}</MessageResponse>
            </MessageContent>
          </Message>
        ))}
      </div>

      <div className="border-t p-4">
        <PromptInput
          value={input}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          disabled={isLoading}
        />
      </div>
    </div>
  );
}
```

### Chat with Tool Invocations
```tsx
import { Tool, ToolInvocation, ToolResult } from "@/components/ai/tool";

{messages.map((message) => (
  <Message key={message.id} from={message.role}>
    <MessageContent>
      {message.content && <MessageResponse>{message.content}</MessageResponse>}

      {message.toolInvocations?.map((tool) => (
        <Tool key={tool.toolCallId}>
          <ToolInvocation
            name={tool.toolName}
            parameters={tool.args}
            status={tool.state}
          />
          {tool.result && <ToolResult>{JSON.stringify(tool.result)}</ToolResult>}
        </Tool>
      ))}
    </MessageContent>
  </Message>
))}
```

### Chat with Artifacts
```tsx
const { messages } = useChat();

{messages.map((message) => {
  // Check if message has artifact attachment
  const artifact = message.experimental_attachments?.find(a => a.type === "artifact");

  if (artifact) {
    return (
      <Artifact key={message.id}>
        <ArtifactHeader>
          <ArtifactTitle>{artifact.title}</ArtifactTitle>
          <ArtifactDescription>{artifact.description}</ArtifactDescription>
          <ArtifactActions>
            <ArtifactAction tooltip="Copy" icon={Copy} onClick={() => copy(artifact.content)} />
          </ArtifactActions>
        </ArtifactHeader>
        <ArtifactContent>
          <CodeBlock language={artifact.language} code={artifact.content} />
        </ArtifactContent>
      </Artifact>
    );
  }

  return (
    <Message key={message.id} from={message.role}>
      <MessageContent>
        <MessageResponse>{message.content}</MessageResponse>
      </MessageContent>
    </Message>
  );
})}
```

### Streaming with Incomplete Markdown
```tsx
const { messages, status } = useChat();

<MessageResponse parseIncompleteMarkdown={status === "streaming"}>
  {message.content}
</MessageResponse>
```

### File Attachments
```tsx
import { MessageAttachments, MessageAttachment } from "@/components/ai/message";

<MessageAttachments>
  {message.experimental_attachments?.map((attachment, index) => (
    <MessageAttachment
      key={index}
      data={{
        url: attachment.url,
        mediaType: attachment.contentType,
        filename: attachment.name
      }}
      onRemove={() => removeAttachment(index)}
    />
  ))}
</MessageAttachments>
```

## Styling & Theming

All components:
- Extend standard HTML attributes
- Accept `className` prop for custom styling
- Support light/dark mode automatically
- Use Tailwind CSS for styling
- Follow shadcn/ui design patterns

Override default styles:
```tsx
<Message className="my-custom-message bg-blue-50">
  {/* content */}
</Message>
```

## Accessibility

All components include:
- Proper ARIA labels
- Keyboard navigation support
- Screen reader friendly structure
- Focus management
- Semantic HTML

## Best Practices

### Component Organization
- Use Message suite for all chat messages
- Use Artifact for any generated content requiring metadata
- Use PromptInput for user input (better than basic textarea)
- Use CodeBlock for code display (syntax highlighting + copy)
- Use Tool components when showing tool executions

### Performance
- Message components handle streaming efficiently
- Use `parseIncompleteMarkdown` only when actively streaming
- Lazy load images with Image component
- Virtualize long message lists if needed

### Security
- Use `allowedImagePrefixes` and `allowedLinkPrefixes` in MessageResponse
- Sanitize user-generated content
- Validate tool invocation results before display
- Implement proper error boundaries

### User Experience
- Always provide loading states (use Loader component)
- Add action tooltips for clarity
- Include regenerate/retry options for failed messages
- Show clear error states
- Provide suggestions to guide users

## Common Patterns

### Empty State
```tsx
{messages.length === 0 && (
  <div className="flex flex-col items-center justify-center h-full gap-4">
    <p className="text-muted-foreground">Start a conversation</p>
    <Suggestions>
      <Suggestion text="Analyze data" onClick={() => sendMessage("Analyze data")} />
      <Suggestion text="Generate code" onClick={() => sendMessage("Generate code")} />
    </Suggestions>
  </div>
)}
```

### Error Handling
```tsx
{error && (
  <Message from="assistant">
    <MessageContent>
      <div className="text-destructive">
        Error: {error.message}
      </div>
    </MessageContent>
    <MessageActions>
      <MessageAction tooltip="Retry" icon={RefreshCw} onClick={retry} />
    </MessageActions>
  </Message>
)}
```

### Loading States
```tsx
{isLoading && (
  <Message from="assistant">
    <MessageContent>
      <Loader variant="dots" />
    </MessageContent>
  </Message>
)}
```

## Troubleshooting

**Markdown not rendering:**
- Ensure `@source '../node_modules/streamdown/dist/index.js';` is in globals.css
- Check that MessageResponse wraps the content

**Streaming issues:**
- Set `parseIncompleteMarkdown={status === "streaming"}`
- Verify AI SDK is configured correctly

**Styling issues:**
- Confirm Tailwind CSS is processing the components
- Check that shadcn/ui theme variables are defined
- Verify globals.css includes all necessary imports

**Type errors:**
- Install latest AI SDK version
- Check that component imports match installation method
- Verify TypeScript configuration

## Resources

For detailed component APIs and advanced usage:
- [Message Component Details](references/message-component.md)
- [Artifact Component Details](references/artifact-component.md)
- [Other Components](references/other-components.md)
