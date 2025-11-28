/**
 * ChatThread - AI Primitive Component
 *
 * Low-level component for rendering a thread of chat messages.
 * Uses shadcn/ui ScrollArea primitive for consistent scrolling behavior.
 * Should NOT be imported directly by app routes - use AppChat wrapper instead.
 */

import { type Message } from "ai";
import { ChatMessage } from "./ChatMessage";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface ChatThreadProps {
  messages: Message[];
  isLoading?: boolean;
  className?: string;
}

export function ChatThread({
  messages,
  isLoading = false,
  className,
}: ChatThreadProps) {
  return (
    <ScrollArea className={cn("h-full w-full", className)}>
      <div className="space-y-4 p-4">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No messages yet. Start a conversation!
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex gap-3 rounded-radius bg-muted/50 p-4">
            <div className="flex size-8 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
              A
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                assistant
              </div>
              <div className="flex gap-1">
                <span className="size-2 animate-pulse rounded-full bg-primary" />
                <span
                  className="size-2 animate-pulse rounded-full bg-primary"
                  style={{ animationDelay: "0.2s" }}
                />
                <span
                  className="size-2 animate-pulse rounded-full bg-primary"
                  style={{ animationDelay: "0.4s" }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
