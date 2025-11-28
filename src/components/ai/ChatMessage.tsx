/**
 * ChatMessage - AI Primitive Component
 *
 * Low-level component for rendering a single chat message.
 * Uses shadcn/ui Card and Badge primitives with theme tokens.
 * Should NOT be imported directly by app routes - use AppChat wrapper instead.
 */

import { type Message } from "ai";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface ChatMessageProps {
  message: Message;
  className?: string;
}

export function ChatMessage({ message, className }: ChatMessageProps) {
  const isUser = message.role === "user";
  const isAssistant = message.role === "assistant";
  const isSystem = message.role === "system";

  return (
    <Card
      className={cn(
        isUser && "border-l-4 border-l-primary/30",
        isAssistant && "border-l-4 border-l-secondary/30",
        isSystem && "border-l-4 border-l-warning/30 bg-warning/5",
        className
      )}
    >
      <CardContent className="flex gap-3 pt-6">
        {/* Avatar */}
        <div
          className={cn(
            "flex size-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-medium",
            isUser && "bg-primary text-primary-foreground",
            isAssistant && "bg-secondary text-secondary-foreground",
            isSystem && "bg-warning text-warning-foreground"
          )}
        >
          {isUser && "U"}
          {isAssistant && "A"}
          {isSystem && "S"}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1 space-y-2">
          {/* Role label with badge */}
          <div className="flex items-baseline gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {message.role}
            </span>
            {message.createdAt && (
              <Badge variant="outline" className="text-xs">
                {new Date(message.createdAt).toLocaleTimeString()}
              </Badge>
            )}
          </div>

          {/* Message content */}
          <div className="whitespace-pre-wrap break-words text-sm leading-relaxed text-foreground">
            {message.content}
          </div>

          {/* Tool calls (if any) */}
          {message.toolInvocations && message.toolInvocations.length > 0 && (
            <div className="mt-3 space-y-2">
              {message.toolInvocations.map((tool, idx) => (
                <Card key={idx} className="bg-muted/50">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        🔧 {tool.toolName}
                      </Badge>
                    </div>
                    {tool.state === "result" && (
                      <div className="mt-2 text-xs text-muted-foreground">
                        <pre className="overflow-x-auto rounded-md bg-background/50 p-2 font-mono">
                          {JSON.stringify(tool.result, null, 2)}
                        </pre>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
