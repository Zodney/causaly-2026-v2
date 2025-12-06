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
  MessageActions,
  MessageAction,
} from "@/components/ai-elements/message";
import { MessageContent as ChartMessageContent } from "@/components/ai/MessageContent";
import { Loader } from "@/components/ai-elements/loader";
import { AppSpinner } from "@/components/app/AppSpinner";
import { Suggestions, Suggestion } from "@/components/ai-elements/suggestion";
import { AppChatInput } from "@/components/app/AppChatInput";
import { AppChainOfThought } from "@/components/app/AppChainOfThought";
import type { ThoughtStep } from "@/components/app/AppChainOfThought";
import { generateMockThoughtSteps } from "@/lib/mockThoughtSteps";
import { getChatHistoryItems, getMockChatById } from "@/lib/mock-data/sample-chats";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FeatureCardButton } from "@/components/ui/feature-card-button";
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
    Record<string, ThoughtStep[]>
  >({});

  // Track current chat mode: 'live' (real API) or 'mock' (pre-saved)
  const [chatMode, setChatMode] = useState<"live" | "mock">("live");
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  // Load chat history from mock data
  const [chatHistory] = useState<ChatHistoryItem[]>(getChatHistoryItems());

  // Chat configuration state
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [deepResearchEnabled, setDeepResearchEnabled] = useState(false);
  const [selectedDataSources, setSelectedDataSources] = useState<string[]>([]);

  // Track which messages should show the visualize button (with fade-in delay)
  const [showVisualizeButton, setShowVisualizeButton] = useState<Set<string>>(
    new Set()
  );

  // Visualization state: Map of message ID to generated chart content
  const [messageCharts, setMessageCharts] = useState<Record<string, string>>({});

  // Track which messages are currently generating visualizations
  const [generatingCharts, setGeneratingCharts] = useState<Set<string>>(new Set());

  // Track visualization errors
  const [chartErrors, setChartErrors] = useState<Record<string, string>>({});

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

        setMessageThoughts((prev) => ({ ...prev, [tempAssistantId]: steps }));

        // Simulate progressive step completion
        let currentStepIndex = 0;
        const interval = setInterval(() => {
          setMessageThoughts((prev) => {
            const steps = prev[tempAssistantId];
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

            return { ...prev, [tempAssistantId]: updatedSteps };
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
        if (prev[tempId]) {
          const steps = prev[tempId];
          const { [tempId]: _, ...rest } = prev;

          // Mark all steps complete when response finishes
          return {
            ...rest,
            [lastAssistantMessage.id]: steps.map((s) => ({ ...s, status: "complete" as const }))
          };
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

  // Show visualize button with 500ms delay after streaming completes
  useEffect(() => {
    if (!isLoading && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];

      // Only show for assistant messages
      if (lastMessage.role === "assistant") {
        const timer = setTimeout(() => {
          setShowVisualizeButton((prev) => new Set(prev).add(lastMessage.id));
        }, 500);

        return () => clearTimeout(timer);
      }
    }
  }, [isLoading, messages]);

  // Persist charts to localStorage
  useEffect(() => {
    if (Object.keys(messageCharts).length > 0) {
      localStorage.setItem("message-charts", JSON.stringify(messageCharts));
    }
  }, [messageCharts]);

  // Load charts from localStorage on mount
  useEffect(() => {
    const savedCharts = localStorage.getItem("message-charts");
    if (savedCharts) {
      try {
        setMessageCharts(JSON.parse(savedCharts));
      } catch (error) {
        console.error("Failed to load saved charts:", error);
      }
    }
  }, []);

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
    setMessageThoughts({});
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

  // Handle visualization button click
  const handleVisualize = async (messageId: string) => {
    // 1. Find the assistant message to visualize
    const targetMessage = messages.find((m) => m.id === messageId);
    if (!targetMessage) return;

    // 2. Hide button immediately and set loading state
    setShowVisualizeButton((prev) => {
      const next = new Set(prev);
      next.delete(messageId);
      return next;
    });
    setGeneratingCharts((prev) => new Set(prev).add(messageId));
    setChartErrors((prev) => {
      const { [messageId]: _, ...rest } = prev;
      return rest;
    });

    // 3. Scroll to loading state after it renders
    setTimeout(() => {
      const loadingElement = document.getElementById(`chart-loading-${messageId}`);
      if (loadingElement) {
        loadingElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100); // Small delay to ensure DOM updates

    try {
      // 4. Build conversation context + visualization prompt
      const conversationContext = messages.slice(
        0,
        messages.indexOf(targetMessage) + 1
      );
      const visualizationPrompt = {
        role: "user" as const,
        content:
          "Visualize the results above using the Vega lite syntax for quantitative information, or the Mermaid syntax for Relationships and flow diagrams",
      };

      // 5. Make background API call
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...conversationContext, visualizationPrompt],
        }),
      });

      if (!response.ok) throw new Error("Failed to generate visualization");

      // 6. Stream and accumulate response
      // The AI SDK returns a data stream format where each token is prefixed with `0:"token"`
      // We need to parse this format to extract the actual text
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let rawResponse = "";

      if (!reader) {
        throw new Error("Response body is not readable");
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        rawResponse += decoder.decode(value, { stream: true });
      }

      // Parse the AI SDK data stream format
      // Format: 0:"token1"\n0:"token2"\n...
      let fullResponse = "";
      const lines = rawResponse.split("\n");

      for (const line of lines) {
        if (line.trim()) {
          // Extract the text from format: 0:"text" or 0:'text'
          const match = line.match(/^\d+:"(.*)"|^\d+:'(.*)'/);
          if (match) {
            const text = match[1] || match[2] || "";
            // Unescape the text
            fullResponse += text.replace(/\\n/g, "\n").replace(/\\"/g, '"');
          }
        }
      }

      // 7. Extract chart code fence from response
      const chartMatch = fullResponse.match(
        /```(?:mermaid|vega-lite|vega)\n([\s\S]*?)```/
      );

      if (!chartMatch) {
        throw new Error("No chart could be produced based on this answer");
      }

      // 8. Save chart content
      const chartContent = fullResponse; // Full response with code fence
      setMessageCharts((prev) => ({ ...prev, [messageId]: chartContent }));
    } catch (error) {
      // 9. Handle errors - show button again so user can retry
      setShowVisualizeButton((prev) => new Set(prev).add(messageId));
      setChartErrors((prev) => ({
        ...prev,
        [messageId]:
          error instanceof Error
            ? error.message
            : "Failed to generate visualization",
      }));
    } finally {
      // 10. Clear loading state
      setGeneratingCharts((prev) => {
        const next = new Set(prev);
        next.delete(messageId);
        return next;
      });
    }
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
            <div className="space-y-4 pt-12 pb-4">
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
                          ? messageThoughts[nextMessage?.id] ||
                            messageThoughts[`assistant-${message.id}`]
                          : messageThoughts[message.id];

                      return (
                        <div
                          key={message.id}
                          className={`flex flex-col gap-6 ${message.role === "assistant" ? "mb-16" : ""}`}
                        >
                          <Message from={message.role}>
                            <MessageContent className="w-full">
                              <ChartMessageContent content={message.content} />
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

                          {/* Visualize Button - OUTSIDE Message component to prevent ANY hover bleed */}
                          {message.role === "assistant" &&
                            !isStreaming &&
                            showVisualizeButton.has(message.id) && (
                              <div className="w-full animate-in fade-in duration-500">
                                <FeatureCardButton
                                  title="Visualise this answer"
                                  description="Causaly AI can visualize this answer into a graph or chart"
                                  onClick={() => handleVisualize(message.id)}
                                  className="w-full"
                                />
                              </div>
                            )}

                          {/* Loading state while generating chart */}
                          {message.role === "assistant" &&
                            generatingCharts.has(message.id) && (
                              <div
                                className="w-full animate-in fade-in duration-200"
                                id={`chart-loading-${message.id}`}
                              >
                                <div className="flex items-center justify-center h-[530px] rounded-lg border border-dashed border-border bg-muted/30">
                                  <div className="flex flex-col items-center gap-2">
                                    <AppSpinner variant="ring" size={32} />
                                    <p className="text-sm text-muted-foreground">
                                      Generating visualization...
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}

                          {/* Render chart if available */}
                          {message.role === "assistant" &&
                            messageCharts[message.id] && (
                              <div className="w-full animate-in fade-in duration-500">
                                <MessageContent className="w-full">
                                  <ChartMessageContent
                                    content={messageCharts[message.id]}
                                  />
                                </MessageContent>
                              </div>
                            )}

                          {/* Show error if visualization failed */}
                          {message.role === "assistant" &&
                            chartErrors[message.id] && (
                              <div className="w-full animate-in fade-in duration-300">
                                <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3">
                                  <p className="text-sm text-destructive">
                                    {chartErrors[message.id]}
                                  </p>
                                </div>
                              </div>
                            )}

                          {/* Chain-of-Thought - Show after user message, before assistant response */}
                          {message.role === "user" &&
                            thoughtSteps &&
                            thoughtSteps.length > 0 && (
                              <div className="-mt-3">
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
