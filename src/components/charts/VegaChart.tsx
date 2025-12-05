"use client";

/**
 * VegaChart - Raw Vega-Lite chart renderer
 *
 * Renders Vega-Lite visualizations with theme integration and responsive sizing.
 * This is a low-level component - prefer using AppVegaChart in app routes.
 *
 * Features:
 * - Responsive container-based width
 * - Theme-aware via CSS variables
 * - Error boundaries
 * - Proper TypeScript types
 *
 * @example
 * ```tsx
 * <VegaChart
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
 */

import { useEffect, useRef, useState } from 'react';
import { VegaEmbed } from 'react-vega';
import type { VisualizationSpec } from 'vega-embed';

export interface VegaChartProps {
  /**
   * The Vega-Lite specification
   */
  spec: VisualizationSpec;

  /**
   * Optional class name for the container
   */
  className?: string;

  /**
   * Show export actions
   * @default false
   */
  showActions?: boolean;

  /**
   * Callback when Vega view is ready (for downloads, etc.)
   */
  onViewReady?: (view: any) => void;
}

export function VegaChart({
  spec,
  className = '',
  showActions = false,
  onViewReady,
}: VegaChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  // Measure container width for responsive charts
  useEffect(() => {
    if (!containerRef.current) return;

    const updateWidth = () => {
      if (containerRef.current) {
        // Use clientWidth to get the content area width (excludes scrollbars)
        const width = containerRef.current.clientWidth;
        console.log('VegaChart container width:', width);
        setContainerWidth(width > 0 ? width : 0);
      }
    };

    // Initial measurement with slight delay to ensure DOM is ready
    const timer = setTimeout(updateWidth, 100);

    // Set up ResizeObserver
    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(containerRef.current);

    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
    };
  }, []);

  // Enhance spec with theme-aware config using CSS variables
  // CSS variables (var(--*)) are now fully supported and automatically adapt to light/dark mode
  const themedSpec: any = {
    ...spec,
    autosize: {
      type: 'fit',
      contains: 'padding',
    },
    config: {
      background: 'transparent',
      view: {
        stroke: 'transparent',
      },
      axis: {
        labelColor: 'var(--muted-foreground)',
        titleColor: 'var(--foreground)',
        gridColor: 'var(--border)',
        domainColor: 'var(--border)',
        tickColor: 'var(--border)',
        labelFontSize: 11,
        titleFontSize: 12,
        labelFont: 'var(--font-sans)',
        titleFont: 'var(--font-sans)',
      },
      legend: {
        labelColor: 'var(--foreground)',
        titleColor: 'var(--foreground)',
        labelFontSize: 11,
        titleFontSize: 12,
        labelFont: 'var(--font-sans)',
        titleFont: 'var(--font-sans)',
      },
      title: {
        color: 'var(--foreground)',
        fontSize: 14,
        font: 'var(--font-sans)',
      },
      ...spec.config,
    },
  };

  // Apply container width if spec uses "container"
  if ('width' in themedSpec && themedSpec.width === 'container' && containerWidth > 0) {
    themedSpec.width = containerWidth;
    console.log('Setting Vega chart width to:', containerWidth);
  }

  if (error) {
    return (
      <div className={`rounded-lg border border-destructive bg-destructive/10 p-4 ${className}`}>
        <div className="flex items-start gap-2">
          <div className="text-destructive">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-destructive">Chart Rendering Error</h3>
            <p className="mt-1 text-sm text-destructive/80">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`vega-container w-full ${className}`}>
      {containerWidth > 0 && (
        <VegaEmbed
          spec={themedSpec as VisualizationSpec}
          options={{
            actions: showActions ? undefined : false,
            renderer: 'svg',
          }}
          onError={(err) => {
            console.error('Vega rendering error:', err);
            setError((err as Error)?.message || 'Failed to render chart');
          }}
          // @ts-ignore - onNewView exists but types are incorrect in @types/react-vega
          onNewView={onViewReady}
        />
      )}
    </div>
  );
}
