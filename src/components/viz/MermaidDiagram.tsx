/**
 * MermaidDiagram - Mermaid Diagram Renderer
 *
 * Renders Mermaid diagrams from DSL strings (flowchart, sequence, etc.).
 * Client-side only to avoid SSR issues.
 * Applies theme colors automatically.
 *
 * Usage:
 *   <MermaidDiagram
 *     chart={`
 *       flowchart TD
 *         A[Start] --> B[Process]
 *         B --> C[End]
 *     `}
 *   />
 */

"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { getCSSVariable, hslToHex } from "@/lib/color-utils";

export interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

export function MermaidDiagram({ chart, className }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Detect dark mode
    const checkDarkMode = () => {
      const isDarkMode =
        document.documentElement.classList.contains("dark") ||
        document.documentElement.getAttribute("data-theme") === "dark";
      setIsDark(isDarkMode);
    };

    checkDarkMode();

    // Watch for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    // Initialize mermaid with theme - use CSS variables for perfect theme parity
    mermaid.initialize({
      startOnLoad: false,
      theme: "base", // Use base theme, override with our CSS variables
      themeVariables: {
        primaryColor: hslToHex(getCSSVariable("--primary")),
        primaryTextColor: hslToHex(getCSSVariable("--primary-foreground")),
        primaryBorderColor: hslToHex(getCSSVariable("--primary")),
        lineColor: hslToHex(getCSSVariable("--muted-foreground")),
        secondaryColor: hslToHex(getCSSVariable("--secondary")),
        tertiaryColor: hslToHex(getCSSVariable("--muted")),
        background: hslToHex(getCSSVariable("--background")),
        mainBkg: hslToHex(getCSSVariable("--card")),
        textColor: hslToHex(getCSSVariable("--foreground")),
        fontSize: "14px",
        fontFamily: "var(--font-geist-sans)",
      },
      flowchart: {
        curve: "basis",
        padding: 20,
      },
      sequence: {
        actorMargin: 50,
        width: 150,
      },
    });

    // Render the diagram
    const renderDiagram = async () => {
      try {
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.render(id, chart);
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch (error) {
        console.error("Mermaid rendering error:", error);
        if (containerRef.current) {
          containerRef.current.innerHTML = `
            <div style="color: hsl(var(--destructive)); padding: 1rem; border: 1px solid hsl(var(--destructive)); border-radius: var(--radius);">
              Error rendering diagram: ${error instanceof Error ? error.message : "Unknown error"}
            </div>
          `;
        }
      }
    };

    renderDiagram();
  }, [chart, mounted, isDark]);

  if (!mounted) {
    return (
      <div
        className={className}
        style={{
          padding: "1rem",
          background: "hsl(var(--muted))",
          borderRadius: "var(--radius)",
          color: "hsl(var(--muted-foreground))",
        }}
      >
        Loading diagram...
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  );
}
