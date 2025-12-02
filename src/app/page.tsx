/**
 * Agentic Research Page
 *
 * Three-panel conversational interface for AI-powered research.
 * - Left sidebar: Chat history
 * - Main panel: Chat interface with AI SDK Elements components
 * - Right sidebar: Collapsible panel for additional context
 */

"use client";

import { useState } from "react";
import { useChat } from "ai/react";
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
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  SquarePen,
  X,
  Copy,
  RefreshCw,
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
  const { messages, isLoading, input, handleInputChange, handleSubmit, reload } =
    useChat({
      api: "/api/chat",
    });

  // UI state
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  // Mock chat history
  const [chatHistory] = useState<ChatHistoryItem[]>([
    {
      id: "1",
      title: "Previous research on quantum computing and its applications in modern cryptography",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      title: "Analysis of market trends in artificial intelligence technology sector",
      timestamp: "Yesterday",
    },
    {
      id: "3",
      title: "Literature review summary for biomedical engineering research",
      timestamp: "3 days ago",
    },
    {
      id: "4",
      title: "Data synthesis project combining multiple research methodologies",
      timestamp: "1 week ago",
    },
    {
      id: "5",
      title: "Climate change impact assessment on coastal regions",
      timestamp: "1 week ago",
    },
    {
      id: "6",
      title: "Machine learning models for predictive analytics",
      timestamp: "2 weeks ago",
    },
    {
      id: "7",
      title: "Comparative analysis of renewable energy sources worldwide",
      timestamp: "2 weeks ago",
    },
    {
      id: "8",
      title: "Neural network optimization techniques",
      timestamp: "3 weeks ago",
    },
    {
      id: "9",
      title: "Blockchain technology applications in supply chain management systems",
      timestamp: "3 weeks ago",
    },
    {
      id: "10",
      title: "Genomic data analysis workflow",
      timestamp: "1 month ago",
    },
    {
      id: "11",
      title: "Urban planning and sustainable development strategies",
      timestamp: "1 month ago",
    },
    {
      id: "12",
      title: "Cybersecurity threats in IoT devices",
      timestamp: "1 month ago",
    },
  ]);

  // Chat configuration state
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [deepResearchEnabled, setDeepResearchEnabled] = useState(false);
  const [selectedDataSources, setSelectedDataSources] = useState<string[]>([]);

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
    handleSubmit(e);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full overflow-hidden bg-background">
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
            onClick={() => {
              // TODO: Implement new chat functionality
            }}
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
                  className="w-full rounded-md px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer transition-colors text-left flex items-center min-w-0"
                  onClick={() => {
                    // TODO: Switch to selected chat
                  }}
                >
                  <span className="truncate">{chat.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Panel 2: Main Chat Interface */}
      <div className="flex flex-1 flex-col overflow-hidden bg-white">
        {/* Messages Area - Full Width with Scrollbar at Edge */}
        <div className="flex-1 overflow-y-auto">
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

                      return (
                        <Message key={message.id} from={message.role}>
                          <MessageContent>
                            <MessageResponse parseIncompleteMarkdown={isStreaming}>
                              {message.content}
                            </MessageResponse>
                          </MessageContent>

                          {message.role === "assistant" && !isStreaming && (
                            <MessageActions>
                              <MessageAction
                                tooltip="Copy"
                                label="Copy message"
                                onClick={() =>
                                  navigator.clipboard.writeText(message.content)
                                }
                              >
                                <Copy className="size-4" strokeWidth={1.5} />
                              </MessageAction>
                              <MessageAction
                                tooltip="Regenerate"
                                label="Regenerate response"
                                onClick={() => reload()}
                              >
                                <RefreshCw className="size-4" strokeWidth={1.5} />
                              </MessageAction>
                            </MessageActions>
                          )}
                        </Message>
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
