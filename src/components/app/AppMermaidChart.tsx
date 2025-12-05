"use client";

/**
 * AppMermaidChart - Application-level Mermaid chart component
 *
 * A simplified Mermaid diagram renderer with automatic theme integration.
 * This component provides a clean API for displaying diagrams in app routes.
 *
 * Usage in app routes:
 * ```tsx
 * import { AppMermaidChart } from "@/components/app/AppMermaidChart";
 *
 * <AppMermaidChart
 *   definition={`flowchart TD
 *     A[Start] --> B[End]
 *   `}
 *   title="My Flowchart"
 *   description="A simple example"
 * />
 * ```
 *
 * Features:
 * - Automatic theme integration using CSS variables
 * - Error boundaries with user-friendly messages
 * - Optional title and description
 * - Consistent card styling
 *
 * Theming:
 * All colors automatically use CSS variables from globals.css:
 * - Chart colors: --chart-1 through --chart-5
 * - Text: --foreground, --muted-foreground
 * - Borders: --border
 * - Background: --card
 */

import { MermaidChart } from "@/components/charts/MermaidChart";

export interface AppMermaidChartProps {
  /**
   * The Mermaid diagram definition
   */
  definition: string;

  /**
   * Optional title to display above the chart
   */
  title?: string;

  /**
   * Optional description to display below the title
   */
  description?: string;

  /**
   * Optional class name for the container
   */
  className?: string;
}

export function AppMermaidChart({
  definition,
  title,
  description,
  className = '',
}: AppMermaidChartProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {/* Header */}
      {(title || description) && (
        <div className="space-y-1">
          {title && (
            <h3 className="text-lg font-medium text-foreground">{title}</h3>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}

      {/* Chart Container */}
      <div className="rounded-lg border border-border bg-card p-6">
        <MermaidChart definition={definition} />
      </div>
    </div>
  );
}
