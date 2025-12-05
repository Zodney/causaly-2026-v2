"use client";

/**
 * Chart Auto-Detection Demo
 *
 * Demonstrates automatic Mermaid and Vega-Lite chart detection from markdown.
 * Shows how the MessageContent component automatically renders charts from code blocks.
 */

import { useState } from "react";
import { MessageContent } from "@/components/ai/MessageContent";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AutoDetectionDemoPage() {
  // Example messages with charts
  const mermaidExample = `Here's a flowchart showing the user authentication process:

\`\`\`mermaid
flowchart TD
    A[User Opens App] --> B{Already Logged In?}
    B -->|Yes| C[Show Dashboard]
    B -->|No| D[Show Login Screen]
    D --> E[User Enters Credentials]
    E --> F{Valid Credentials?}
    F -->|Yes| C
    F -->|No| G[Show Error Message]
    G --> D
\`\`\`

This flow ensures secure authentication.`;

  const vegaExample = `Here's a bar chart showing quarterly sales data:

\`\`\`vega-lite
{
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": "container",
  "height": 300,
  "data": {
    "values": [
      {"quarter": "Q1", "sales": 45000},
      {"quarter": "Q2", "sales": 62000},
      {"quarter": "Q3", "sales": 58000},
      {"quarter": "Q4", "sales": 71000}
    ]
  },
  "mark": {
    "type": "bar",
    "cornerRadiusEnd": 4
  },
  "encoding": {
    "x": {
      "field": "quarter",
      "type": "ordinal",
      "axis": {"labelAngle": 0, "title": "Quarter"}
    },
    "y": {
      "field": "sales",
      "type": "quantitative",
      "axis": {"title": "Sales ($)", "format": "$,.0f"}
    },
    "color": {
      "value": "var(--chart-1)"
    },
    "tooltip": [
      {"field": "quarter", "type": "ordinal", "title": "Quarter"},
      {"field": "sales", "type": "quantitative", "title": "Sales", "format": "$,.0f"}
    ]
  }
}
\`\`\`

Sales increased by 58% from Q1 to Q4.`;

  const mixedExample = `# Project Analysis

Here's a comprehensive analysis of the system architecture:

## System Flow

\`\`\`mermaid
graph LR
    A[Client] --> B[API Gateway]
    B --> C[Auth Service]
    B --> D[Data Service]
    D --> E[(Database)]
    C --> E
\`\`\`

## Performance Metrics

\`\`\`vega-lite
{
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": "container",
  "height": 250,
  "data": {
    "values": [
      {"metric": "Response Time", "value": 120},
      {"metric": "Throughput", "value": 450},
      {"metric": "Error Rate", "value": 2},
      {"metric": "CPU Usage", "value": 65}
    ]
  },
  "mark": "bar",
  "encoding": {
    "x": {"field": "metric", "type": "nominal"},
    "y": {"field": "value", "type": "quantitative"},
    "color": {"value": "var(--chart-2)"}
  }
}
\`\`\`

The system shows excellent performance with minimal errors.

**Key Highlights:**
- Response time under 150ms
- High throughput capacity
- Low error rate (< 3%)
- Optimal CPU usage
`;

  const plainTextExample = `This is a regular message without any charts.

It supports **bold text**, *italic text*, and [links](https://example.com).

You can also have:
- Bullet points
- Multiple lines
- Regular code: \`const x = 10;\`

And code blocks without charts:

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

Everything renders normally!`;

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-5xl px-8 py-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">
              Chart Auto-Detection Demo
            </h1>
            <p className="text-lg text-muted-foreground">
              Automatic Mermaid and Vega-Lite chart rendering from markdown code blocks
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="mx-auto max-w-5xl space-y-8 overflow-y-auto p-8" style={{ height: 'calc(100vh - 120px)' }}>

        {/* Feature Overview */}
        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
            <CardDescription>
              The MessageContent component automatically detects and renders charts from markdown code blocks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              1. Write a code block with <code className="rounded bg-muted px-1 py-0.5 font-mono">```mermaid</code> or <code className="rounded bg-muted px-1 py-0.5 font-mono">```vega-lite</code>
            </p>
            <p>
              2. The chart is automatically detected and rendered with a toolbar
            </p>
            <p>
              3. Use the toolbar to view the raw code or download as SVG/PNG
            </p>
            <p>
              4. Charts adapt to light/dark theme automatically
            </p>
          </CardContent>
        </Card>

        {/* Examples */}
        <Tabs defaultValue="mermaid" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="mermaid">Mermaid</TabsTrigger>
            <TabsTrigger value="vega">Vega-Lite</TabsTrigger>
            <TabsTrigger value="mixed">Mixed</TabsTrigger>
            <TabsTrigger value="plain">Plain Text</TabsTrigger>
          </TabsList>

          <TabsContent value="mermaid" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Mermaid Flowchart Example</CardTitle>
                <CardDescription>
                  Automatic detection of Mermaid diagrams from code blocks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MessageContent content={mermaidExample} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vega" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Vega-Lite Chart Example</CardTitle>
                <CardDescription>
                  Automatic detection of Vega-Lite visualizations from JSON code blocks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MessageContent content={vegaExample} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mixed" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Mixed Content Example</CardTitle>
                <CardDescription>
                  Multiple charts and markdown content in one message
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MessageContent content={mixedExample} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plain" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Plain Text Example</CardTitle>
                <CardDescription>
                  Regular markdown content without charts renders normally
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MessageContent content={plainTextExample} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Try It Yourself</CardTitle>
            <CardDescription>
              Go to the AI Demo page to test with real AI responses
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Navigate to <strong>/demo/ai</strong> and ask the AI to create a chart:
            </p>
            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <p className="text-sm font-mono">
                "Create a mermaid flowchart showing the steps of a user registration process"
              </p>
            </div>
            <p className="text-sm text-muted-foreground">or</p>
            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <p className="text-sm font-mono">
                "Create a vega-lite bar chart showing monthly revenue: Jan $50k, Feb $65k, Mar $58k"
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
