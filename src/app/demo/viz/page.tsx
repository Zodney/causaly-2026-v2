/**
 * Visualization Demo Page
 *
 * Demonstrates the visualization layer with Vega-Lite and Mermaid components.
 * Shows example usage of BarChart and FlowDiagram components.
 */

"use client";

import { BarChart } from "@/components/viz/BarChart";
import { VegaChart } from "@/components/viz/VegaChart";
import { FlowDiagram } from "@/components/viz/FlowDiagram";
import type { FlowNode, FlowEdge } from "@/components/viz/FlowDiagram";

export default function VizDemoPage() {
  // Example data for bar chart using brand colors
  const chartData = [
    { category: "January", value: 65 },
    { category: "February", value: 78 },
    { category: "March", value: 92 },
    { category: "April", value: 85 },
    { category: "May", value: 95 },
    { category: "June", value: 88 },
  ];

  // Multi-series data for chart palette demo
  const multiSeriesData = [
    { month: "Jan", productA: 30, productB: 45, productC: 60 },
    { month: "Feb", productA: 35, productB: 50, productC: 55 },
    { month: "Mar", productA: 40, productB: 48, productC: 65 },
    { month: "Apr", productA: 38, productB: 52, productC: 70 },
  ];

  // Vega spec for multi-series chart
  const multiSeriesSpec = {
    mark: "bar",
    data: { values: multiSeriesData },
    transform: [
      { fold: ["productA", "productB", "productC"], as: ["product", "value"] }
    ],
    encoding: {
      x: { field: "month", type: "nominal", title: "Month" },
      y: { field: "value", type: "quantitative", title: "Sales" },
      color: { field: "product", type: "nominal", title: "Product" },
      xOffset: { field: "product" }
    }
  };

  // Heatmap data for sequential scale demo
  const heatmapData = Array.from({ length: 7 }, (_, day) =>
    Array.from({ length: 24 }, (_, hour) => ({
      day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][day],
      hour,
      value: Math.random() * 100
    }))
  ).flat();

  // Vega spec for heatmap
  const heatmapSpec = {
    mark: "rect",
    data: { values: heatmapData },
    encoding: {
      x: { field: "hour", type: "ordinal", title: "Hour" },
      y: { field: "day", type: "ordinal", title: "Day" },
      color: {
        field: "value",
        type: "quantitative",
        title: "Activity"
        // No explicit scheme - uses 'ramp' range from VegaChart theme config
      }
    }
  };

  // AI agent pipeline nodes
  const aiNodes: FlowNode[] = [
    { id: "user", label: "User", shape: "round" },
    { id: "llm", label: "LLM", shape: "hexagon" },
    { id: "tool", label: "Tool", shape: "rectangle" },
    { id: "database", label: "Database", shape: "diamond" },
  ];

  // AI agent pipeline edges
  const aiEdges: FlowEdge[] = [
    { from: "user", to: "llm", label: "Query" },
    { from: "llm", to: "tool", label: "ToolCall" },
    { from: "tool", to: "database", label: "Fetch", style: "dotted" },
    { from: "database", to: "tool", label: "Result", style: "dotted" },
    { from: "tool", to: "llm", label: "Response" },
    { from: "llm", to: "user", label: "Answer" },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">
            Visualization Demo
          </h1>
          <p className="text-lg text-muted-foreground">
            Demonstrating Vega-Lite charts and Mermaid diagrams with theme integration
          </p>
        </div>

        {/* Vega-Lite Bar Chart Section */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold text-foreground">
              Bar Chart (Vega-Lite)
            </h2>
            <p className="text-sm text-muted-foreground">
              Monthly sales data rendered with BarChart component using brand primary color
            </p>
          </div>
          <div className="bg-card border border-border rounded-radius p-6">
            <BarChart
              data={chartData}
              xField="category"
              yField="value"
              title="Monthly Sales Performance"
              color="hsl(var(--primary))"
              width="container"
              height={400}
            />
          </div>
        </section>

        {/* Multi-Series Chart Section */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold text-foreground">
              Multi-Series Chart (Vega-Lite)
            </h2>
            <p className="text-sm text-muted-foreground">
              Grouped bar chart demonstrating automatic use of the --chart-* color palette
            </p>
          </div>
          <div className="bg-card border border-border rounded-radius p-6">
            <VegaChart
              spec={multiSeriesSpec}
              width="container"
              height={400}
            />
          </div>
        </section>

        {/* Heatmap Section */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold text-foreground">
              Heatmap (Vega-Lite)
            </h2>
            <p className="text-sm text-muted-foreground">
              Activity heatmap demonstrating automatic use of the --seq-* sequential color scale
            </p>
          </div>
          <div className="bg-card border border-border rounded-radius p-6">
            <VegaChart
              spec={heatmapSpec}
              width="container"
              height={300}
            />
          </div>
        </section>

        {/* Mermaid Flowchart Section */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold text-foreground">
              Flow Diagram (Mermaid)
            </h2>
            <p className="text-sm text-muted-foreground">
              AI agent pipeline showing the interaction flow between User, LLM, Tool, and Database
            </p>
          </div>
          <div className="bg-card border border-border rounded-radius p-6">
            <FlowDiagram
              nodes={aiNodes}
              edges={aiEdges}
              direction="TD"
            />
          </div>
        </section>

        {/* Info Section */}
        <section className="bg-muted/50 border border-border rounded-radius p-6 space-y-4">
          <h3 className="text-xl font-semibold text-foreground">
            About This Demo
          </h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">Single-Series Charts:</strong> The BarChart component uses VegaChart with theme-aware colors.
              Charts automatically adapt to light/dark mode using CSS variables like --primary and --foreground.
            </p>
            <p>
              <strong className="text-foreground">Multi-Series Charts:</strong> VegaChart automatically applies the --chart-*
              color palette (9 colors) for categorical data with multiple series, ensuring consistent brand colors across visualizations.
            </p>
            <p>
              <strong className="text-foreground">Sequential Scales:</strong> Heatmaps and gradient visualizations automatically use
              the --seq-* sequential scale (6 colors) for better data representation with smooth color transitions.
            </p>
            <p>
              <strong className="text-foreground">Mermaid Diagrams:</strong> The FlowDiagram component converts JavaScript objects
              (nodes and edges) into Mermaid flowchart syntax. MermaidDiagram now reads CSS variables dynamically for perfect theme parity.
            </p>
            <p>
              <strong className="text-foreground">Theme Integration:</strong> All visualization components read design tokens
              from CSS variables at runtime, ensuring perfect consistency with the application theme in both light and dark modes.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
