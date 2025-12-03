/**
 * Agentic Research Page
 *
 * Three-panel conversational interface for AI-powered research.
 * - Left sidebar: Chat history
 * - Main panel: Chat interface with AI SDK Elements components
 * - Right sidebar: Collapsible panel for additional context
 */

"use client";

import { useState, useEffect, useRef } from "react";
import { useChat } from "ai/react";
import type { Message as AIMessage } from "ai/react";
import {
  Message,
  MessageContent,
  MessageResponse,
  MessageActions,
  MessageAction,
} from "@/components/ai-elements/message";
import { Loader } from "@/components/ai-elements/loader";
import { Suggestions, Suggestion } from "@/components/ai-elements/suggestion";
import { AppChatInput } from "@/components/app/AppChatInput";
import { AppChainOfThought } from "@/components/app/AppChainOfThought";
import type { ThoughtStep } from "@/components/app/AppChainOfThought";
import { generateMockThoughtSteps } from "@/lib/mockThoughtSteps";
import { getChatHistoryItems, getMockChatById } from "@/lib/mock-data/sample-chats";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  SquarePen,
  X,
  Copy,
  BarChart,
  FileText,
  Lightbulb,
  Database,
  MessagesSquare,
} from "lucide-react";

// Types
interface ChatHistoryItem {
  id: string;
  title: string;
  timestamp: string;
}

export default function AgenticResearchPage() {
  // AI SDK hook for chat functionality
  const { messages, isLoading, input, handleInputChange, handleSubmit, setMessages } =
    useChat({
      api: "/api/chat",
    });

  // UI state
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  // Chain-of-thought state: Map of message ID to thought steps
  const [messageThoughts, setMessageThoughts] = useState<
    Map<string, ThoughtStep[]>
  >(new Map());

  // Track current chat mode: 'live' (real API) or 'mock' (pre-saved)
  const [chatMode, setChatMode] = useState<"live" | "mock">("live");
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  // Load chat history from mock data
  const [chatHistory] = useState<ChatHistoryItem[]>(getChatHistoryItems());

  // Chat configuration state
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [deepResearchEnabled, setDeepResearchEnabled] = useState(false);
  const [selectedDataSources, setSelectedDataSources] = useState<string[]>([]);

  // Scroll container ref for auto-scrolling to new messages
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Generate and animate mock thought steps when AI is processing
  useEffect(() => {
    if (isLoading && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];

      // Only generate thoughts for user messages (the question)
      if (lastMessage.role === "user") {
        const steps = generateMockThoughtSteps(lastMessage.content);

        // Use a temporary ID for the assistant message (will be updated when it arrives)
        const tempAssistantId = `assistant-${lastMessage.id}`;

        setMessageThoughts((prev) => new Map(prev).set(tempAssistantId, steps));

        // Simulate progressive step completion
        let currentStepIndex = 0;
        const interval = setInterval(() => {
          setMessageThoughts((prev) => {
            const updated = new Map(prev);
            const steps = updated.get(tempAssistantId);
            if (!steps) return prev;

            const updatedSteps = steps.map((step, idx) => {
              if (idx < currentStepIndex) {
                return { ...step, status: "complete" as const };
              }
              if (idx === currentStepIndex) {
                return { ...step, status: "active" as const };
              }
              return step;
            });

            updated.set(tempAssistantId, updatedSteps);
            return updated;
          });

          currentStepIndex++;
          if (currentStepIndex >= steps.length) {
            clearInterval(interval);
          }
        }, 2000); // Update every 2 seconds

        return () => clearInterval(interval);
      }
    }
  }, [isLoading, messages]);

  // Update thought map key when actual assistant message arrives
  useEffect(() => {
    const lastAssistantMessage = messages
      .filter((m) => m.role === "assistant")
      .pop();
    if (lastAssistantMessage && !isLoading) {
      const lastUserMessage = messages.filter((m) => m.role === "user").pop();
      const tempId = `assistant-${lastUserMessage?.id}`;

      setMessageThoughts((prev) => {
        if (prev.has(tempId)) {
          const updated = new Map(prev);
          const steps = updated.get(tempId);
          updated.delete(tempId);
          if (steps) {
            // Mark all steps complete when response finishes
            updated.set(
              lastAssistantMessage.id,
              steps.map((s) => ({ ...s, status: "complete" as const }))
            );
          }
          return updated;
        }
        return prev;
      });
    }
  }, [messages, isLoading]);

  // Auto-scroll to new user message when sent
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];

      // Only scroll when a new user message is added (follow-up question)
      if (lastMessage.role === "user") {
        // Use a small timeout to ensure DOM has updated
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end"
          });
        }, 100);
      }
    }
  }, [messages]);

  // Load a mock chat by ID
  const loadMockChat = (chatId: string) => {
    const mockChat = getMockChatById(chatId);
    if (!mockChat) return;

    // Set messages from mock data
    setMessages(mockChat.messages as AIMessage[]);

    // Set thought steps from mock data
    setMessageThoughts(mockChat.thoughtSteps);

    // Update state
    setChatMode("mock");
    setCurrentChatId(chatId);
  };

  // Start a new live chat
  const startNewChat = () => {
    setMessages([]);
    setMessageThoughts(new Map());
    setChatMode("live");
    setCurrentChatId(null);
  };

  // Handle suggestion clicks
  const handleSuggestionClick = (suggestion: string) => {
    handleInputChange({
      target: { value: suggestion },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  // Handle form submission
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // If in mock mode, switch to live mode for new messages
    if (chatMode === "mock") {
      setChatMode("live");
      setCurrentChatId(null);
    }

    handleSubmit(e);
  };

  return (
    <div className="flex h-full w-full overflow-hidden bg-background">
      {/* Panel 1: Left Sidebar - Chat History */}
      <div className="flex w-[260px] flex-col border-r border-sidebar-border bg-sidebar">
        {/* Header */}
        <div className="p-6">
          <h1 className="flex items-center gap-2 text-base font-medium text-sidebar-foreground">
            <MessagesSquare className="size-4" strokeWidth={1.5} />
            Agentic Research
          </h1>
        </div>

        {/* New Chat Button */}
        <div className="p-2">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            onClick={startNewChat}
          >
            <SquarePen className="size-4" strokeWidth={1.5} />
            New chat
          </Button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto p-2 pr-3">
            <h2 className="px-3 py-2 text-xs font-normal text-muted-foreground">
              Chat history
            </h2>
            <div className="">
              {chatHistory.map((chat) => (
                <button
                  key={chat.id}
                  className={cn(
                    "w-full rounded-md px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer transition-colors text-left flex items-center min-w-0",
                    currentChatId === chat.id && "bg-sidebar-accent text-sidebar-accent-foreground"
                  )}
                  onClick={() => loadMockChat(chat.id)}
                >
                  <span className="truncate">{chat.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Panel 2: Main Chat Interface */}
      <div className="flex flex-1 flex-col overflow-hidden bg-card">
        {/* Messages Area - Full Width with Scrollbar at Edge */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden" ref={scrollContainerRef}>
          <div className="mx-auto w-full max-w-[800px] px-5">
            <div className="space-y-4 py-4">
                {messages.length === 0 ? (
                  /* Empty State with Suggestions */
                  <div className="flex h-full min-h-[400px] flex-col items-center justify-center gap-6 p-8">
                    <div className="space-y-2 text-center">
                      <h2 className="text-2xl font-medium text-foreground">
                        Start Your Research
                      </h2>
                      <p className="max-w-md text-sm text-muted-foreground">
                        Ask questions, analyze data, or generate insights with AI-powered research
                      </p>
                    </div>

                    <Suggestions className="flex flex-wrap justify-center gap-2">
                      <Suggestion
                        suggestion="Analyze current market trends in AI technology"
                        onClick={handleSuggestionClick}
                      >
                        <BarChart className="mr-2 size-4" strokeWidth={1.5} />
                        Analyze market trends
                      </Suggestion>
                      <Suggestion
                        suggestion="Help me summarize key findings from recent research papers"
                        onClick={handleSuggestionClick}
                      >
                        <FileText className="mr-2 size-4" strokeWidth={1.5} />
                        Summarize research papers
                      </Suggestion>
                      <Suggestion
                        suggestion="What are the emerging trends in quantum computing?"
                        onClick={handleSuggestionClick}
                      >
                        <Lightbulb className="mr-2 size-4" strokeWidth={1.5} />
                        Generate insights
                      </Suggestion>
                      <Suggestion
                        suggestion="Help me query and analyze my research data"
                        onClick={handleSuggestionClick}
                      >
                        <Database className="mr-2 size-4" strokeWidth={1.5} />
                        Query data
                      </Suggestion>
                    </Suggestions>
                  </div>
                ) : (
                  /* Messages */
                  <>
                    {messages.map((message, index) => {
                      const isLastMessage = index === messages.length - 1;
                      const isStreaming = isLoading && isLastMessage;

                      // Get thought steps for this message
                      // For user messages, look ahead to see if next (assistant) message has thoughts
                      const nextMessage = messages[index + 1];
                      const thoughtSteps =
                        message.role === "user"
                          ? messageThoughts.get(nextMessage?.id) ||
                            messageThoughts.get(`assistant-${message.id}`)
                          : messageThoughts.get(message.id);

                      return (
                        <div key={message.id}>
                          <Message from={message.role}>
                            <MessageContent>
                              <MessageResponse
                                parseIncompleteMarkdown={isStreaming}
                              >
                                {message.content}
                              </MessageResponse>
                            </MessageContent>

                            {message.role === "assistant" && !isStreaming && (
                              <MessageActions>
                                <MessageAction
                                  tooltip="Copy"
                                  label="Copy message"
                                  onClick={() =>
                                    navigator.clipboard.writeText(
                                      message.content
                                    )
                                  }
                                >
                                  <Copy className="size-4" strokeWidth={1.5} />
                                </MessageAction>
                              </MessageActions>
                            )}
                          </Message>

                          {/* Chain-of-Thought - Show after user message, before assistant response */}
                          {message.role === "user" &&
                            thoughtSteps &&
                            thoughtSteps.length > 0 && (
                              <div className="mt-4">
                                <AppChainOfThought
                                  steps={thoughtSteps}
                                  defaultCollapsed={
                                    !isLoading || !isLastMessage
                                  }
                                  onStepClick={(step) =>
                                    console.log("Step clicked:", step)
                                  }
                                />
                              </div>
                            )}
                        </div>
                      );
                    })}

                    {/* Loading State */}
                    {isLoading && (
                      <Message from="assistant">
                        <MessageContent>
                          <Loader size={20} />
                        </MessageContent>
                      </Message>
                    )}

                    {/* Invisible marker for auto-scroll */}
                    <div ref={messagesEndRef} />
                  </>
                )}
            </div>
          </div>
        </div>

        {/* Enhanced Chat Input - Full Width Footer */}
        <AppChatInput
          value={input}
          isLoading={isLoading}
          onChange={handleInputChange}
          onSubmit={onSubmit}
          placeholder="Explore your research idea"
          selectedAgent={selectedAgent}
          onAgentChange={setSelectedAgent}
          deepResearchEnabled={deepResearchEnabled}
          onDeepResearchChange={setDeepResearchEnabled}
          selectedDataSources={selectedDataSources}
          onDataSourcesChange={setSelectedDataSources}
        />
      </div>

      {/* Panel 3: Right Sidebar - Collapsible */}
      <div
        className={cn(
          "flex flex-col border-l border-sidebar-border bg-sidebar transition-all duration-300",
          isRightSidebarOpen ? "w-[400px]" : "w-0 overflow-hidden"
        )}
      >
        {/* Header with close button */}
        <div className="flex items-center justify-between border-b border-sidebar-border p-4">
          <h2 className="text-lg font-medium text-sidebar-foreground">
            Details
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsRightSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="size-5" strokeWidth={1.5} />
          </Button>
        </div>

        {/* Content Area */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            <p className="text-sm text-sidebar-foreground">
              Additional context and details will appear here.
            </p>
            <div className="rounded-md border border-sidebar-border p-4">
              <h3 className="text-sm font-medium text-sidebar-foreground mb-2">
                Placeholder Content
              </h3>
              <p className="text-xs text-muted-foreground">
                This panel can be used for displaying reasoning steps, file
                uploads, settings, or other supplementary information.
              </p>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
