/**
 * AppChainOfThought - App-level Wrapper Component
 *
 * High-level chain-of-thought display for application use.
 * Wraps AI SDK Elements ChainOfThought with app-specific styling and controls.
 *
 * Features:
 * - Accordion-style collapsible interface
 * - Step count badge showing progress
 * - Inline display below assistant messages
 * - Theme-aware styling with light/dark mode support
 * - Smooth expand/collapse animations
 * - ScrollArea for long reasoning chains
 *
 * Usage:
 * ```tsx
 * import { AppChainOfThought } from "@/components/app/AppChainOfThought";
 *
 * <AppChainOfThought
 *   steps={thoughtSteps}
 *   defaultCollapsed={false}
 *   onStepClick={(step) => console.log(step)}
 * />
 * ```
 */

"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChainOfThought,
  ChainOfThoughtContent,
  ChainOfThoughtHeader,
  ChainOfThoughtSearchResult,
  ChainOfThoughtSearchResults,
  ChainOfThoughtStep,
} from "@/components/ai-elements/chain-of-thought";
import { cn } from "@/lib/utils";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";

export interface ThoughtStep {
  id: string;
  title: string;
  description?: string;
  status: "pending" | "active" | "complete" | "error";
  timestamp?: Date;
  searchResults?: Array<{
    title: string;
    url: string;
    snippet: string;
  }>;
  images?: Array<{
    url: string;
    alt: string;
    caption?: string;
  }>;
  metadata?: Record<string, any>;
}

export interface AppChainOfThoughtProps {
  steps: ThoughtStep[];
  defaultCollapsed?: boolean;
  className?: string;
  onStepClick?: (step: ThoughtStep) => void;
}

/**
 * Get the appropriate icon for a step based on its status
 */
function getStepIcon(status: ThoughtStep["status"]) {
  switch (status) {
    case "complete":
      return CheckCircle2;
    case "active":
      return Loader2;
    case "pending":
      return Circle;
    case "error":
      return Circle;
    default:
      return Circle;
  }
}

/**
 * AppChainOfThought Component
 *
 * Displays AI reasoning steps in an accordion format.
 * Expanded during streaming, auto-collapses when complete.
 */
export function AppChainOfThought({
  steps,
  defaultCollapsed = false,
  className,
  onStepClick,
}: AppChainOfThoughtProps) {
  // Count steps by status
  const completedCount = steps.filter((s) => s.status === "complete").length;
  const activeCount = steps.filter((s) => s.status === "active").length;
  const totalCount = steps.length;

  // Determine if any steps are currently processing
  const isProcessing = activeCount > 0;

  // Local state for manual control
  const [isOpen, setIsOpen] = useState(!defaultCollapsed);

  // Auto-open when processing starts, auto-close when processing ends
  useEffect(() => {
    if (isProcessing) {
      setIsOpen(true);
    } else if (completedCount === totalCount && totalCount > 0) {
      // Auto-collapse when all steps are complete
      setIsOpen(false);
    }
  }, [isProcessing, completedCount, totalCount]);

  return (
    <ChainOfThought
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn(
        "rounded-lg border border-border bg-card p-4",
        "transition-all duration-300",
        "!space-y-0", // Override default space-y-4 from primitive
        "!max-w-none w-full", // Override max-w-prose and make full width
        className
      )}
    >
      {/* Header with step count badge */}
      <div className="flex items-center justify-between">
        <ChainOfThoughtHeader className="flex-1">
          <span className="flex items-center gap-2">
            <span className="text-xs font-medium text-foreground">
              Reasoning
            </span>
            <Badge
              variant="secondary"
              className={cn(
                "font-normal text-xs",
                isProcessing && "animate-pulse"
              )}
            >
              {completedCount}/{totalCount} steps
            </Badge>
          </span>
        </ChainOfThoughtHeader>
      </div>

      {/* Content with steps */}
      <ChainOfThoughtContent className="!mt-0 pt-4">
        <ScrollArea className="max-h-[400px]">
          <div className="space-y-3 pr-4">
            {steps.map((step, index) => {
              const Icon = getStepIcon(step.status);
              const isLast = index === steps.length - 1;

              return (
                <div
                  key={step.id}
                  onClick={() => onStepClick?.(step)}
                  className={cn(
                    onStepClick && "cursor-pointer hover:opacity-80",
                    "transition-opacity"
                  )}
                >
                  <ChainOfThoughtStep
                    icon={Icon}
                    label={
                      <span className="font-medium text-sm">
                        {step.title}
                      </span>
                    }
                    description={step.description}
                    status={step.status}
                    className={cn(
                      // Remove connecting line for last step
                      isLast && "[&>div>div:last-child]:hidden"
                    )}
                  >
                    {/* Search Results */}
                    {step.searchResults && step.searchResults.length > 0 && (
                      <ChainOfThoughtSearchResults className="flex-wrap">
                        {step.searchResults.map((result, idx) => (
                          <ChainOfThoughtSearchResult
                            key={idx}
                            className="cursor-pointer hover:bg-secondary/80"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (result.url) {
                                window.open(result.url, "_blank");
                              }
                            }}
                          >
                            {result.title}
                          </ChainOfThoughtSearchResult>
                        ))}
                      </ChainOfThoughtSearchResults>
                    )}

                    {/* Images - future enhancement */}
                    {step.images && step.images.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {step.images.map((image, idx) => (
                          <div
                            key={idx}
                            className="rounded-md border border-border overflow-hidden"
                          >
                            <img
                              src={image.url}
                              alt={image.alt}
                              className="w-full h-auto object-cover"
                            />
                            {image.caption && (
                              <p className="text-xs text-muted-foreground p-2">
                                {image.caption}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </ChainOfThoughtStep>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </ChainOfThoughtContent>
    </ChainOfThought>
  );
}
