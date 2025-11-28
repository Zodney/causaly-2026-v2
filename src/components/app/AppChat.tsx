/**
 * AppChat - App-level Wrapper Component
 *
 * High-level chat interface component for application use.
 * Uses shadcn/ui Card, Input, Button, and Badge primitives for consistent styling.
 * Wraps AI primitive components with app-specific styling and behavior.
 *
 * Usage:
 *   <AppChat messages={messages} onSend={handleSend} />
 */

"use client";

import { type Message } from "ai";
import { ChatThread } from "@/components/ai/ChatThread";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface AppChatProps {
  messages: Message[];
  isLoading?: boolean;
  input?: string;
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  placeholder?: string;
  className?: string;
}

export function AppChat({
  messages,
  isLoading = false,
  input = "",
  handleInputChange,
  handleSubmit,
  placeholder = "Type your message...",
  className,
}: AppChatProps) {
  return (
    <Card className={cn("flex h-full flex-col", className)}>
      {/* Header */}
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">Chat</CardTitle>
            {isLoading && (
              <Badge variant="secondary">
                <span className="mr-1 size-2 animate-pulse rounded-full bg-current" />
                Live
              </Badge>
            )}
          </div>
          <Badge variant="outline">
            {messages.length} message{messages.length !== 1 ? "s" : ""}
          </Badge>
        </div>
      </CardHeader>

      {/* Message Thread */}
      <CardContent className="flex-1 overflow-hidden p-0">
        <ChatThread messages={messages} isLoading={isLoading} className="h-full" />
      </CardContent>

      {/* Input Area */}
      <CardFooter className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder={placeholder}
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={!input.trim() || isLoading}>
            {isLoading ? "Sending..." : "Send"}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
