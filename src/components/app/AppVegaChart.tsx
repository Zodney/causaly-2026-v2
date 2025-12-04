"use client";

/**
 * AppVegaChart - Application-level Vega-Lite chart component
 *
 * A simplified, opinionated Vega-Lite chart renderer with automatic theme integration.
 * This component provides a clean API for displaying data visualizations in app routes.
 *
 * Usage in app routes:
 * ```tsx
 * import { AppVegaChart } from "@/components/app/AppVegaChart";
 *
 * <AppVegaChart
 *   spec={{
 *     mark: 'bar',
 *     encoding: {
 *       x: {field: 'category', type: 'nominal'},
 *       y: {field: 'value', type: 'quantitative'}
 *     }
 *   }}
 *   data={{values: [{category: 'A', value: 10}]}}
 * />
 * ```
 *
 * Features:
 * - Automatic theme integration using CSS variables
 * - Responsive container-based width
 * - Error boundaries with user-friendly messages
 * - Optional title and description
 *
 * Theming:
 * All colors automatically use CSS variables from globals.css:
 * - Chart colors: --chart-1 through --chart-5
 * - Text: --foreground, --muted-foreground
 * - Borders: --border
 * - Background: transparent (inherits from container)
 */

import { VegaChart } from "@/components/charts/VegaChart";
import type { VisualizationSpec } from 'vega-embed';

export interface AppVegaChartProps {
  /**
   * The Vega-Lite specification
   */
  spec: VisualizationSpec;

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

  /**
   * Show export actions
   * @default false
   */
  showActions?: boolean;
}

export function AppVegaChart({
  spec,
  title,
  description,
  className = '',
  showActions = false,
}: AppVegaChartProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {/* Header */}
      {(title || description) && (
        <div className="space-y-1">
          {title && (
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}

      {/* Chart Container */}
      <div className="rounded-lg border border-border bg-card p-6">
        <VegaChart
          spec={spec}
          showActions={showActions}
        />
      </div>
    </div>
  );
}
