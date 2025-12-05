"use client";

/**
 * MermaidChart - Raw Mermaid diagram renderer
 *
 * Renders Mermaid diagrams with theme integration and error handling.
 * This is a low-level component - prefer using AppMermaidChart in app routes.
 *
 * Features:
 * - Client-side rendering (Mermaid requires browser environment)
 * - Theme-aware via CSS variables
 * - Error boundaries
 * - Unique ID generation for multiple charts
 *
 * @example
 * ```tsx
 * <MermaidChart
 *   definition={`flowchart TD
 *     A[Start] --> B[End]
 *   `}
 * />
 * ```
 */

import { useEffect, useState, useMemo, useRef } from 'react';
import { useTheme } from 'next-themes';

export interface MermaidChartProps {
  /**
   * The Mermaid diagram definition
   */
  definition: string;

  /**
   * Optional class name for the container
   */
  className?: string;
}

export function MermaidChart({
  definition,
  className = '',
}: MermaidChartProps) {
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate unique ID for this chart instance
  const chartId = useMemo(
    () => `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    [definition]
  );

  // Detect client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize and render Mermaid
  useEffect(() => {
    if (!isClient || !definition) return;

    const renderChart = async () => {
      try {
        // Dynamic import of mermaid (client-side only)
        const mermaid = (await import('mermaid')).default;

        // Get current theme
        const currentTheme = resolvedTheme || theme || 'light';
        const isDark = currentTheme === 'dark';

        // Mermaid-specific color palette (hex values for compatibility)
        // These are optimized for readability in Mermaid diagrams
        const colors = isDark ? {
          // Dark mode colors
          background: '#1e293b',
          foreground: '#e2e8f0',
          card: '#1e293b',
          muted: '#1e293b',
          border: '#4b5563',
          chart1: '#818cf8',
          chart2: '#6366f1',
          chart3: '#4f46e5',
          chart4: '#4338ca',
          chart5: '#3730a3',
          labelBackground: '#4338ca', // Label background for dark mode
        } : {
          // Light mode colors
          background: '#ffffff',
          foreground: '#101f33',
          card: '#ffffff',
          muted: '#fafbfc',
          border: '#9a9daaff',
          chart1: '#6366f1',
          chart2: '#4f46e5',
          chart3: '#4338ca',
          chart4: '#3730a3',
          chart5: '#312e81',
          labelBackground: '#c7d2fe', // Lighter purple for light mode
        };

        // Initialize Mermaid with theme-aware configuration
        mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          themeVariables: {
            // Primary colors
            primaryColor: colors.chart1,
            primaryTextColor: colors.foreground,
            primaryBorderColor: colors.border,

            // Secondary colors
            secondaryColor: colors.chart2,
            tertiaryColor: colors.chart3,

            // Text
            textColor: colors.foreground,
            labelTextColor: colors.foreground,
            nodeTextColor: colors.foreground,

            // Background
            background: colors.card,
            mainBkg: colors.card,
            secondaryBkg: colors.muted,
            labelBkg: colors.labelBackground,
            edgeLabelBackground: colors.labelBackground,

            // Lines and borders
            lineColor: colors.border,
            border1: colors.border,
            border2: colors.border,

            // Node/class colors
            nodeBorder: colors.border,
            clusterBkg: colors.muted,
            clusterBorder: colors.border,

            // Git graph colors
            git0: colors.chart1,
            git1: colors.chart2,
            git2: colors.chart3,
            git3: colors.chart4,
            git4: colors.chart5,
          },
          fontFamily: 'Roboto, sans-serif',
          fontSize: 14,
          securityLevel: 'loose',
        });

        // Render the chart
        const { svg: renderedSvg } = await mermaid.render(chartId, definition);
        setSvg(renderedSvg);
        setError(null);
      } catch (err) {
        console.error('Mermaid rendering error:', err);
        const errorMessage = (err as Error)?.message || 'Failed to render diagram';
        setError(errorMessage);
        setSvg('');
      }
    };

    renderChart();
  }, [definition, chartId, theme, resolvedTheme, isClient]);

  // Error state
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
            <h3 className="text-sm font-medium text-destructive">Diagram Rendering Error</h3>
            <p className="mt-1 text-sm text-destructive/80">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Loading state (while initializing client-side)
  if (!isClient || !svg) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <div className="text-sm text-muted-foreground">Loading diagram...</div>
      </div>
    );
  }

  // Rendered chart
  return (
    <div
      ref={containerRef}
      className={`mermaid-container w-full flex items-center justify-center ${className}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
