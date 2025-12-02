# Message Component Reference

The Message component suite provides comprehensive chat message display with markdown rendering, attachments, actions, and branching support.

## Installation

```bash
npx ai-elements@latest add message
```

**Required CSS:** Add to globals.css:
```css
@source '../node_modules/streamdown/dist/index.js';
```

## Core Components

### Message (Root Container)
```tsx
<Message from={message.role}>
  {/* Content */}
</Message>
```

**Props:**
- `from?: "user" | "assistant" | "system"` - Message role (determines alignment/styling)
- `...HTMLAttributes<HTMLDivElement>` - Standard div props

### MessageContent
Wrapper for message content area.

```tsx
<MessageContent>
  <MessageResponse>{message.content}</MessageResponse>
</MessageContent>
```

### MessageResponse
Renders markdown content with streaming support and GFM extensions.

```tsx
<MessageResponse
  parseIncompleteMarkdown={status === "streaming"}
  components={{
    code: CustomCodeBlock,
    img: CustomImage
  }}
  allowedImagePrefixes={["https://trusted-cdn.com"]}
  allowedLinkPrefixes={["https://", "mailto:"]}
>
  {message.content}
</MessageResponse>
```

**Props:**
- `children?: string` - Markdown content to render
- `parseIncompleteMarkdown?: boolean` - Handle streaming incomplete markdown
- `components?: Record<string, React.ComponentType>` - Override default renderers
- `allowedImagePrefixes?: string[]` - Security: whitelist image sources
- `allowedLinkPrefixes?: string[]` - Security: whitelist link protocols
- `rehypePlugins?: Pluggable[]` - Custom rehype plugins
- `remarkPlugins?: Pluggable[]` - Custom remark plugins

**Features:**
- GFM support (tables, task lists, strikethrough, autolinks)
- Syntax highlighting for code blocks
- Streaming markdown parsing
- Custom component overrides
- Security controls for images/links

## Actions

### MessageActions
Container for action buttons (copy, regenerate, etc.)

```tsx
<MessageActions>
  <MessageAction
    tooltip="Copy"
    label="Copy message"
    icon={Copy}
    onClick={() => copyToClipboard(message.content)}
  />
  <MessageAction
    tooltip="Regenerate"
    label="Regenerate response"
    icon={RefreshCw}
    onClick={() => regenerate(message.id)}
  />
</MessageActions>
```

**MessageAction Props:**
- `tooltip?: string` - Tooltip text on hover
- `label?: string` - ARIA label for accessibility
- `icon?: LucideIcon` - Icon component (from lucide-react)
- `onClick?: () => void` - Click handler
- `...ButtonProps` - Standard button props

## Attachments

### MessageAttachments & MessageAttachment
Display file/image attachments with the message.

```tsx
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

**MessageAttachment Props:**
- `data?: FileUIPart` - Attachment metadata
  - `url: string` - File URL
  - `mediaType: string` - MIME type
  - `filename?: string` - Display name
- `onRemove?: () => void` - Delete callback

**Display:**
- Images: 96×96px thumbnails
- Files: Paperclip icon with filename

## Branching

Handle multiple AI response versions.

### MessageBranch
```tsx
<MessageBranch
  currentIndex={currentBranch}
  totalBranches={branches.length}
  onNavigate={(direction) => navigateBranch(direction)}
>
  <MessageBranchContent>
    <MessageResponse>{branches[currentBranch].content}</MessageResponse>
  </MessageBranchContent>

  <MessageBranchSelector>
    <MessageBranchPrevious />
    <MessageBranchPage />
    <MessageBranchNext />
  </MessageBranchSelector>
</MessageBranch>
```

**Components:**
- `MessageBranch` - Root container managing branch state
- `MessageBranchContent` - Content wrapper
- `MessageBranchSelector` - Navigation controls container
- `MessageBranchPrevious` - Previous branch button
- `MessageBranchNext` - Next branch button
- `MessageBranchPage` - Current page indicator (e.g., "2/5")

## Integration with useChat

```tsx
import { useChat } from "ai/react";
import { Message, MessageContent, MessageResponse, MessageActions, MessageAction } from "@/components/ai/message";

export function ChatInterface() {
  const { messages, reload, status } = useChat();

  return (
    <>
      {messages.map((message) => (
        <Message key={message.id} from={message.role}>
          <MessageContent>
            <MessageResponse parseIncompleteMarkdown={status === "streaming"}>
              {message.content}
            </MessageResponse>
          </MessageContent>

          {message.role === "assistant" && (
            <MessageActions>
              <MessageAction
                tooltip="Regenerate"
                icon={RefreshCw}
                onClick={() => reload()}
              />
            </MessageActions>
          )}
        </Message>
      ))}
    </>
  );
}
```

## Styling

All components accept `className` prop for custom styling. Default styling includes:
- User messages: Right-aligned
- Assistant messages: Left-aligned
- Markdown: Proper typography, code blocks with syntax highlighting
- Actions: Icon buttons with hover tooltips
- Attachments: Thumbnail grid layout

## Complete Example

```tsx
<Message from="assistant">
  <MessageContent>
    <MessageAttachments>
      <MessageAttachment
        data={{
          url: "/chart.png",
          mediaType: "image/png",
          filename: "sales-chart.png"
        }}
      />
    </MessageAttachments>

    <MessageResponse parseIncompleteMarkdown={isStreaming}>
      {content}
    </MessageResponse>
  </MessageContent>

  <MessageActions>
    <MessageAction tooltip="Copy" icon={Copy} onClick={handleCopy} />
    <MessageAction tooltip="Like" icon={ThumbsUp} onClick={handleLike} />
    <MessageAction tooltip="Dislike" icon={ThumbsDown} onClick={handleDislike} />
  </MessageActions>
</Message>
```
