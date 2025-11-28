/**
 * ReasoningPanel - AI Primitive Component
 *
 * Low-level component for rendering AI reasoning traces and tool call chains.
 * Uses shadcn/ui Card, Badge, and Separator primitives for consistent styling.
 * Should NOT be imported directly by app routes - use AppReasoningPanel wrapper instead.
 */

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export interface ReasoningStep {
  id: string;
  type: "thought" | "tool_call" | "observation" | "decision";
  content: string;
  toolName?: string;
  toolArgs?: Record<string, unknown>;
  toolResult?: unknown;
  timestamp?: Date;
}

export interface ReasoningPanelProps {
  steps: ReasoningStep[];
  className?: string;
  isCollapsed?: boolean;
}

const getStepIcon = (type: ReasoningStep["type"]) => {
  switch (type) {
    case "thought":
      return "💭";
    case "tool_call":
      return "🔧";
    case "observation":
      return "👁";
    case "decision":
      return "✓";
  }
};

const getBadgeVariant = (type: ReasoningStep["type"]): "default" | "secondary" | "destructive" | "outline" => {
  switch (type) {
    case "thought":
      return "default";
    case "tool_call":
      return "secondary";
    case "observation":
      return "outline";
    case "decision":
      return "default";
  }
};

export function ReasoningPanel({
  steps,
  className,
  isCollapsed = false,
}: ReasoningPanelProps) {
  if (isCollapsed) {
    return (
      <div
        className={cn(
          "rounded-radius border border-border bg-muted/50 p-4 text-sm text-muted-foreground",
          className
        )}
      >
        Reasoning trace collapsed ({steps.length} steps)
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      {steps.map((step, idx) => (
        <Card
          key={step.id}
          className={cn("border-l-4", {
            "border-l-primary/30": step.type === "thought",
            "border-l-secondary/30": step.type === "tool_call",
            "border-l-muted/30": step.type === "observation",
            "border-l-green-500/30": step.type === "decision",
          })}
        >
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              {/* Step indicator */}
              <Badge variant={getBadgeVariant(step.type)} className="mt-1">
                {getStepIcon(step.type)}
              </Badge>

              {/* Step content */}
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-semibold capitalize">
                    {step.type.replace("_", " ")}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    Step {idx + 1}
                  </Badge>
                  {step.timestamp && (
                    <span className="text-xs text-muted-foreground">
                      {step.timestamp.toLocaleTimeString()}
                    </span>
                  )}
                </div>

                {/* Main content */}
                <p className="whitespace-pre-wrap text-sm text-muted-foreground">
                  {step.content}
                </p>

                {/* Tool details */}
                {step.type === "tool_call" && step.toolName && (
                  <>
                    <Separator className="my-2" />
                    <div className="space-y-2">
                      <Badge variant="secondary" className="font-mono text-xs">
                        {step.toolName}
                      </Badge>
                      {step.toolArgs && (
                        <pre className="overflow-x-auto rounded-md bg-muted/50 p-3 text-xs font-mono">
                          {JSON.stringify(step.toolArgs, null, 2)}
                        </pre>
                      )}
                    </div>
                  </>
                )}

                {/* Tool result */}
                {step.toolResult !== undefined && (
                  <>
                    <Separator className="my-2" />
                    <div className="space-y-1">
                      <p className="text-xs font-semibold">Result:</p>
                      <pre className="overflow-x-auto rounded-md bg-muted/50 p-3 text-xs font-mono text-muted-foreground">
                        {JSON.stringify(step.toolResult, null, 2)}
                      </pre>
                    </div>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
