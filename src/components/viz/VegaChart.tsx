/**
 * VegaChart - Generic Vega-Lite Chart Component
 *
 * A themed wrapper around Vega-Lite that applies our design tokens.
 * Automatically injects theme colors, fonts, and styling into Vega specs.
 *
 * Usage:
 *   <VegaChart spec={myVegaLiteSpec} data={myData} />
 */

"use client";

import { useEffect, useState, useRef } from "react";
import { getChartPalette, getSequentialScale } from "@/lib/color-utils";

export interface VegaChartProps {
  spec: any; // Using any to avoid importing VisualizationSpec at module level
  className?: string;
  width?: number | "container";
  height?: number;
}

/**
 * Get CSS variable value from the document
 */
function getCSSVariable(variable: string): string {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim();
}

/**
 * Apply theme defaults to a Vega-Lite spec
 */
function applyThemeToSpec(
  spec: any,
  width?: number,
  height?: number
): any {
  // Get theme colors from CSS variables
  const background = `hsl(${getCSSVariable("--background")})`;
  const foreground = `hsl(${getCSSVariable("--foreground")})`;
  const primary = `hsl(${getCSSVariable("--primary")})`;
  const muted = `hsl(${getCSSVariable("--muted-foreground")})`;

  // Get color palettes for multi-series and sequential visualizations
  const chartPalette = getChartPalette();
  const sequentialScale = getSequentialScale();

  return {
    ...spec,
    background,
    width: width ?? spec.width,
    height: height ?? spec.height,
    config: {
      ...spec.config,
      axis: {
        labelColor: foreground,
        titleColor: foreground,
        gridColor: muted,
        tickColor: muted,
        domainColor: muted,
        labelFont: "var(--font-geist-sans)",
        titleFont: "var(--font-geist-sans)",
        ...spec.config?.axis,
      },
      legend: {
        labelColor: foreground,
        titleColor: foreground,
        labelFont: "var(--font-geist-sans)",
        titleFont: "var(--font-geist-sans)",
        ...spec.config?.legend,
      },
      title: {
        color: foreground,
        font: "var(--font-geist-sans)",
        fontSize: 16,
        fontWeight: 600,
        ...spec.config?.title,
      },
      mark: {
        color: primary,
        ...spec.config?.mark,
      },
      range: {
        category: chartPalette,    // For categorical multi-series
        ordinal: chartPalette,      // For ordinal scales
        ramp: sequentialScale,      // For continuous gradients
        heatmap: sequentialScale,   // For heatmaps
        ...spec.config?.range,      // User overrides still work
      },
    },
  };
}

export function VegaChart({
  spec,
  className,
  width,
  height,
}: VegaChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    // Get actual container width when width="container"
    const actualWidth = width === "container"
      ? containerRef.current.clientWidth
      : width;

    const themedSpec = applyThemeToSpec(spec, actualWidth, height);

    // Clear the container first
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    // Dynamically import vega-embed to avoid SSR issues
    import('vega-embed').then((module) => {
      const embed = module.default;
      if (containerRef.current) {
        embed(containerRef.current, themedSpec, {
          actions: false,
          renderer: 'svg',
        }).catch((error) => {
          console.error('Vega chart rendering error:', error);
          console.error('Failed spec:', JSON.stringify(themedSpec, null, 2));
        });
      }
    });
  }, [spec, width, height, mounted]);

  // Don't render on server to avoid hydration issues
  if (!mounted) {
    return (
      <div
        className={className}
        style={{
          width: typeof width === "number" ? `${width}px` : "100%",
          minHeight: height || 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "hsl(var(--muted))",
          borderRadius: "var(--radius)",
        }}
      >
        <span style={{ color: "hsl(var(--muted-foreground))" }}>
          Loading chart...
        </span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: typeof width === "number" ? `${width}px` : "100%",
        minHeight: height || 300,
      }}
    />
  );
}
