/**
 * AI Demo Page
 *
 * Demonstrates the AI chat with a REAL AI backend powered by OpenAI.
 * Uses the AI SDK's useChat hook for streaming responses.
 *
 * To enable:
 * 1. Add OPENAI_API_KEY to your .env.local file
 * 2. Start chatting!
 */

"use client";

import { useState } from "react";
import { useChat } from "ai/react";
import { AppChat } from "@/components/app/AppChat";
import { AppReasoningPanel } from "@/components/app/AppReasoningPanel";
import { type ReasoningStep } from "@/components/ai/ReasoningPanel";

export default function AIDemoPage() {
  // Use the AI SDK's useChat hook to connect to our API route
  const { messages, isLoading, error, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
  });

  // Mock reasoning steps (for demonstration)
  // In a real app, these would be generated from the AI's tool calls
  const [reasoningSteps] = useState<ReasoningStep[]>([
    {
      id: "step-1",
      type: "thought",
      content:
        "User is asking a question. I need to understand the context and provide a helpful response.",
    },
    {
      id: "step-2",
      type: "decision",
      content:
        "Based on the question, I'll provide a clear and informative answer.",
    },
  ]);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">AI Chat Demo</h1>
          <p className="text-muted-foreground">
            Chat with OpenAI GPT-4 Turbo in real-time with streaming responses.
          </p>

          {/* Status indicator */}
          {!process.env.NEXT_PUBLIC_OPENAI_CONFIGURED && (
            <div className="flex items-center gap-2 text-sm bg-warning/10 border border-warning/20 rounded-radius p-3">
              <span className="font-medium">⚠️ Configuration needed:</span>
              <span>Add OPENAI_API_KEY to your .env.local file to enable chat.</span>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 text-sm bg-destructive/10 border border-destructive/20 rounded-radius p-3">
              <span className="font-medium">❌ Error:</span>
              <span>{error.message}</span>
            </div>
          )}

          {messages.length === 0 && !error && (
            <div className="flex items-center gap-2 text-sm bg-success/10 border border-success/20 rounded-radius p-3">
              <span className="font-medium">✅ Ready:</span>
              <span>AI backend is connected. Start chatting below!</span>
            </div>
          )}
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chat Panel */}
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-medium text-foreground mb-2">
                Chat Interface
              </h2>
              <p className="text-sm text-muted-foreground">
                Send messages and get real AI responses with streaming
              </p>
            </div>
            <AppChat
              messages={messages}
              isLoading={isLoading}
              input={input}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              placeholder="Ask me anything..."
              className="h-[600px]"
            />
          </div>

          {/* Reasoning Panel */}
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-medium text-foreground mb-2">
                Reasoning Trace
              </h2>
              <p className="text-sm text-muted-foreground">
                See how the AI thinks through problems step-by-step
              </p>
            </div>
            <AppReasoningPanel
              steps={reasoningSteps}
              title="AI Reasoning"
              className="h-[600px] overflow-auto"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-radius p-4">
            <div className="text-sm text-muted-foreground mb-1">Messages</div>
            <div className="text-2xl font-bold text-foreground">
              {messages.length}
            </div>
          </div>
          <div className="bg-card border border-border rounded-radius p-4">
            <div className="text-sm text-muted-foreground mb-1">Status</div>
            <div className="text-2xl font-bold text-foreground">
              {isLoading ? "Thinking..." : "Ready"}
            </div>
          </div>
          <div className="bg-card border border-border rounded-radius p-4">
            <div className="text-sm text-muted-foreground mb-1">Model</div>
            <div className="text-2xl font-bold text-foreground">GPT-4</div>
          </div>
        </div>

        {/* Setup Guide */}
        <div className="mt-12 p-6 bg-card border border-border rounded-radius">
          <h3 className="text-lg font-medium text-foreground mb-4">
            🔧 Setup Instructions
          </h3>
          <div className="space-y-4 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-foreground mb-2">
                1. Create a .env.local file in the project root:
              </p>
              <code className="block bg-muted p-3 rounded text-xs font-mono">
                OPENAI_API_KEY=sk-...your-api-key-here...
              </code>
            </div>
            <div>
              <p className="font-medium text-foreground mb-2">
                2. Get your API key from OpenAI:
              </p>
              <a
                href="https://platform.openai.com/api-keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://platform.openai.com/api-keys
              </a>
            </div>
            <div>
              <p className="font-medium text-foreground mb-2">
                3. Restart the development server:
              </p>
              <code className="block bg-muted p-3 rounded text-xs font-mono">
                npm run dev
              </code>
            </div>
            <div className="pt-2 border-t border-border">
              <p className="font-medium text-foreground mb-2">
                💡 Want to use a different AI provider?
              </p>
              <p>
                Edit{" "}
                <code className="bg-muted px-1 py-0.5 rounded text-xs">
                  src/app/api/chat/route.ts
                </code>{" "}
                and change the model. Supports OpenAI, Anthropic (Claude), Google
                (Gemini), and more!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
