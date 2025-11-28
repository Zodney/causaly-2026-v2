/**
 * AppReasoningPanel - App-level Wrapper Component
 *
 * High-level reasoning panel component for application use.
 * Uses shadcn/ui Card, Button, Badge, and ScrollArea primitives for consistent styling.
 * Wraps ReasoningPanel primitive with app-specific controls and styling.
 *
 * Usage:
 *   <AppReasoningPanel steps={reasoningSteps} />
 */

"use client";

import { useState } from "react";
import { ReasoningPanel, type ReasoningStep } from "@/components/ai/ReasoningPanel";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

export interface AppReasoningPanelProps {
  steps: ReasoningStep[];
  title?: string;
  defaultCollapsed?: boolean;
  className?: string;
}

export function AppReasoningPanel({
  steps,
  title = "AI Reasoning",
  defaultCollapsed = false,
  className,
}: AppReasoningPanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  return (
    <Card className={cn("flex h-full flex-col", className)}>
      {/* Header with collapse toggle */}
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">{title}</CardTitle>
            {steps.length > 0 && (
              <Badge variant="secondary">{steps.length} steps</Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <>
                <ChevronDownIcon className="size-4" />
                <span className="ml-1">Expand</span>
              </>
            ) : (
              <>
                <ChevronUpIcon className="size-4" />
                <span className="ml-1">Collapse</span>
              </>
            )}
          </Button>
        </div>
      </CardHeader>

      {/* Content */}
      {!isCollapsed && (
        <CardContent className="flex-1 overflow-hidden p-0">
          {steps.length === 0 ? (
            <div className="flex items-center justify-center p-8 text-center text-sm text-muted-foreground">
              No reasoning steps yet.
            </div>
          ) : (
            <ScrollArea className="h-full">
              <div className="space-y-4 p-4">
                <ReasoningPanel steps={steps} isCollapsed={false} />
              </div>
            </ScrollArea>
          )}
        </CardContent>
      )}
    </Card>
  );
}
