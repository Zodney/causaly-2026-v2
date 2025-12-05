"use client";

/**
 * ChartContainer - AI Primitive Component
 *
 * Collapsible container with toolbar for rendering Mermaid diagrams and Vega-Lite charts.
 * Based on UserScript v0.24 UI patterns with enhanced functionality.
 *
 * Features:
 * - Theme-aware styling using CSS variables
 * - Toolbar with "View Code" and "Download" dropdown
 * - Error boundaries with user-friendly messages
 * - Collapsible code view (chart always visible)
 * - Download options: SVG or PNG for both chart types
 *
 * Should NOT be imported directly by app routes - use via MessageContent instead.
 */

import { useState, useRef, useMemo } from 'react';
import { MermaidChart } from '@/components/charts/MermaidChart';
import { VegaChart } from '@/components/charts/VegaChart';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Code, Download, ChevronDown, BarChart3, GitBranch } from 'lucide-react';
import {
  sanitizeMermaidDefinition,
  extractJSON,
  parseVegaSpec,
} from '@/lib/utils/chart-sanitization';
import {
  downloadMermaidAsSVG,
  downloadMermaidAsPNG,
  downloadVegaAsPNG,
  downloadVegaAsSVG,
} from '@/lib/utils/chart-download';
import type { VisualizationSpec } from 'vega-embed';

export interface ChartContainerProps {
  /**
   * Chart type to render
   */
  type: 'mermaid' | 'vega' | 'vega-lite';

  /**
   * Raw chart definition (Mermaid syntax or Vega-Lite JSON)
   */
  definition: string;

  /**
   * Whether chart should be expanded by default
   * @default true
   */
  defaultExpanded?: boolean;

  /**
   * Optional class name for container
   */
  className?: string;
}

export function ChartContainer({
  type,
  definition,
  defaultExpanded = true,
  className = '',
}: ChartContainerProps) {
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [vegaView, setVegaView] = useState<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate unique filename for downloads
  const filename = useMemo(() => {
    const timestamp = Date.now();
    return type === 'mermaid'
      ? `mermaid-diagram-${timestamp}`
      : `vega-chart-${timestamp}`;
  }, [type]);

  // Process chart definition based on type
  const { processedDefinition, parsedSpec, parseError } = useMemo(() => {
    if (type === 'mermaid') {
      const sanitized = sanitizeMermaidDefinition(definition);
      return {
        processedDefinition: sanitized,
        parsedSpec: null,
        parseError: null,
      };
    } else {
      // Vega-Lite processing
      const extracted = extractJSON(definition);
      if (!extracted) {
        return {
          processedDefinition: definition,
          parsedSpec: null,
          parseError: 'Could not extract valid JSON from definition',
        };
      }

      const result = parseVegaSpec(extracted);
      if (!result.valid) {
        return {
          processedDefinition: definition,
          parsedSpec: null,
          parseError: result.error,
        };
      }

      return {
        processedDefinition: definition,
        parsedSpec: result.spec,
        parseError: null,
      };
    }
  }, [type, definition]);

  // Download handlers
  const handleDownload = async (format: 'svg' | 'png') => {
    try {
      if (type === 'mermaid') {
        if (!containerRef.current) {
          throw new Error('Container reference not available');
        }
        if (format === 'svg') {
          await downloadMermaidAsSVG(containerRef.current, filename);
        } else {
          await downloadMermaidAsPNG(containerRef.current, filename);
        }
      } else {
        // Vega-Lite
        if (!vegaView) {
          throw new Error('Chart not fully loaded yet');
        }
        if (format === 'png') {
          await downloadVegaAsPNG(vegaView, filename);
        } else {
          await downloadVegaAsSVG(vegaView, filename);
        }
      }
    } catch (err) {
      console.error('Download failed:', err);
      setError(`Download failed: ${(err as Error).message}`);
    }
  };

  // Chart type metadata
  const chartMeta = useMemo(() => {
    if (type === 'mermaid') {
      return {
        icon: GitBranch,
        title: 'Mermaid Diagram',
      };
    }
    return {
      icon: BarChart3,
      title: 'Vega-Lite Chart',
    };
  }, [type]);

  const ChartIcon = chartMeta.icon;

  return (
    <div
      className={`my-4 w-full overflow-hidden rounded-lg border border-border bg-card ${className}`}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-2">
        {/* Left: Chart type indicator */}
        <div className="flex items-center gap-2">
          <ChartIcon className="size-4 text-muted-foreground" strokeWidth={1.5} />
          <span className="text-sm font-medium text-foreground">
            {chartMeta.title}
          </span>
        </div>

        {/* Right: Action buttons */}
        <div className="flex items-center gap-1">
          {/* View Code button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowCode(!showCode)}
            className="text-xs"
          >
            <Code className="mr-1 size-4" strokeWidth={1.5} />
            View Code
          </Button>

          {/* Download dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-xs">
                <Download className="mr-1 size-4" strokeWidth={1.5} />
                Download
                <ChevronDown className="ml-1 size-3" strokeWidth={1.5} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleDownload('svg')}>
                Download SVG
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDownload('png')}>
                Download PNG
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Chart Content */}
      <div ref={containerRef} className="w-full p-6">
        {parseError ? (
          // Parse error display
          <div className="rounded-lg border border-destructive bg-destructive/10 p-4">
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
                <h3 className="text-sm font-medium text-destructive">
                  Chart Parsing Error
                </h3>
                <p className="mt-1 text-sm text-destructive/80">{parseError}</p>
              </div>
            </div>
          </div>
        ) : type === 'mermaid' ? (
          <MermaidChart definition={processedDefinition} />
        ) : parsedSpec ? (
          <VegaChart
            spec={parsedSpec as VisualizationSpec}
            onViewReady={setVegaView}
          />
        ) : null}
      </div>

      {/* Collapsible Code View */}
      <Collapsible open={showCode} onOpenChange={setShowCode}>
        <CollapsibleContent>
          <div className="border-t border-border bg-muted/50 p-4">
            <pre className="overflow-x-auto rounded-md bg-background p-4 text-xs font-mono text-foreground">
              <code>{definition}</code>
            </pre>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
