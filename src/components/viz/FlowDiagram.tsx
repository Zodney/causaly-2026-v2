/**
 * FlowDiagram - Flowchart from JS Objects
 *
 * Constructs a Mermaid flowchart from a JavaScript object graph.
 * Simplifies creating flowcharts without writing Mermaid DSL.
 *
 * Usage:
 *   <FlowDiagram
 *     nodes={[
 *       { id: "A", label: "Start", shape: "round" },
 *       { id: "B", label: "Process" }
 *     ]}
 *     edges={[
 *       { from: "A", to: "B", label: "Next" }
 *     ]}
 *   />
 */

"use client";

import { MermaidDiagram } from "./MermaidDiagram";

export interface FlowNode {
  id: string;
  label: string;
  shape?: "rectangle" | "round" | "stadium" | "circle" | "diamond" | "hexagon";
}

export interface FlowEdge {
  from: string;
  to: string;
  label?: string;
  style?: "solid" | "dotted" | "thick";
}

export interface FlowDiagramProps {
  nodes: FlowNode[];
  edges: FlowEdge[];
  direction?: "TD" | "TB" | "BT" | "RL" | "LR";
  className?: string;
}

/**
 * Convert node shape to Mermaid syntax
 */
function getNodeSyntax(node: FlowNode): string {
  const { id, label, shape = "rectangle" } = node;

  switch (shape) {
    case "round":
      return `${id}(${label})`;
    case "stadium":
      return `${id}([${label}])`;
    case "circle":
      return `${id}((${label}))`;
    case "diamond":
      return `${id}{${label}}`;
    case "hexagon":
      return `${id}{{${label}}}`;
    case "rectangle":
    default:
      return `${id}[${label}]`;
  }
}

/**
 * Convert edge style to Mermaid syntax
 */
function getEdgeSyntax(edge: FlowEdge): string {
  const { from, to, label, style = "solid" } = edge;

  let connector: string;
  switch (style) {
    case "dotted":
      connector = label ? `-.${label}.->` : "-.->";
      break;
    case "thick":
      connector = label ? `=${label}==>` : "==>";
      break;
    case "solid":
    default:
      connector = label ? `-- ${label} -->` : "-->";
      break;
  }

  return `${from} ${connector} ${to}`;
}

/**
 * Build Mermaid flowchart DSL from nodes and edges
 */
function buildMermaidChart(
  nodes: FlowNode[],
  edges: FlowEdge[],
  direction: string
): string {
  const lines = [`flowchart ${direction}`];

  // Add all nodes
  nodes.forEach((node) => {
    lines.push(`  ${getNodeSyntax(node)}`);
  });

  // Add all edges
  edges.forEach((edge) => {
    lines.push(`  ${getEdgeSyntax(edge)}`);
  });

  return lines.join("\n");
}

export function FlowDiagram({
  nodes,
  edges,
  direction = "TD",
  className,
}: FlowDiagramProps) {
  const chart = buildMermaidChart(nodes, edges, direction);

  return <MermaidDiagram chart={chart} className={className} />;
}
