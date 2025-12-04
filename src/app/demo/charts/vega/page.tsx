/**
 * Vega-Lite Charts Demo Page
 *
 * Playground for experimenting with Vega-Lite chart styling.
 * Replicates the chat container environment (800px max-width, scrollable panel).
 *
 * Navigate to: http://localhost:3000/demo/charts/vega
 */

"use client";

import Link from "next/link";
import { AppVegaChart } from "@/components/app/AppVegaChart";
import { SAMPLE_VEGA_SPECS } from "@/lib/mock-data/sample-vega-specs";

export default function VegaDemoPage() {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-5 py-4">
        <div className="mx-auto w-full max-w-[800px]">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Vega-Lite Charts Demo</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Playground for experimenting with Vega-Lite chart styling
              </p>
            </div>
            <Link
              href="/demo/charts/mermaid"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              View Mermaid Demo
            </Link>
          </div>
        </div>
      </div>

      {/* Scrollable Content - Matches chat container exactly */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="mx-auto w-full max-w-[800px] px-5">
          <div className="space-y-8 py-8">
            {/* Environment Info */}
            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <h2 className="text-sm font-medium text-foreground">Environment Specs</h2>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>• Max Width: 800px (same as chat container)</li>
                <li>• Padding: 20px horizontal (px-5)</li>
                <li>• Spacing: 32px between charts (space-y-8)</li>
                <li>• Scrollable: Vertical overflow with auto scroll</li>
                <li>• Theme: Automatic light/dark mode switching</li>
                <li>• Colors: Using --chart-1 through --chart-5 CSS variables</li>
              </ul>
            </div>

            {/* Chart Examples */}
            {SAMPLE_VEGA_SPECS.map((chart) => (
              <AppVegaChart
                key={chart.id}
                spec={chart.spec}
                title={chart.title}
                description={chart.description}
              />
            ))}

            {/* Footer note */}
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> This page replicates the exact chat container environment
                for accurate styling experiments. All charts use CSS variables from globals.css
                and automatically adapt to light/dark mode. Chart colors reference --chart-1 through
                --chart-5 for consistent theming.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
