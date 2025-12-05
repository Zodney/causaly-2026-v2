/**
 * Chart Sanitization and Validation Utilities
 *
 * Based on UserScript v0.24 patterns for handling Mermaid and Vega-Lite chart definitions.
 *
 * Functions:
 * - sanitizeMermaidDefinition: Remove parentheses from bracket content to prevent syntax errors
 * - extractJSON: Extract JSON from text with comments and whitespace handling
 * - parseVegaSpec: Validate and parse Vega-Lite specifications
 */

import type { VisualizationSpec } from 'vega-embed';

/**
 * Sanitize Mermaid definition by removing parentheses inside brackets
 *
 * Mermaid syntax doesn't support parentheses inside square brackets.
 * Example: [Start (now)] -> [Start now]
 *
 * Based on UserScript v0.24 lines 274-279
 *
 * @param definition - Raw Mermaid diagram definition
 * @returns Sanitized definition safe for rendering
 */
export function sanitizeMermaidDefinition(definition: string): string {
  // Remove parentheses from bracket content: [text (invalid)] -> [text invalid]
  const sanitized = definition.replace(/\[(.*?)\]/g, (match, content) => {
    const cleanContent = content.replace(/[()]/g, ' ');
    return `[${cleanContent}]`;
  });

  return sanitized.trim();
}

/**
 * Extract JSON from text, handling comments and whitespace
 *
 * Finds the first '{' and last '}' to extract JSON content,
 * then removes JavaScript-style comments (// and /* *\/)
 *
 * Based on UserScript v0.24 lines 263-268
 *
 * @param text - Raw text potentially containing JSON
 * @returns Extracted and sanitized JSON string, or null if not found
 */
export function extractJSON(text: string): string | null {
  const firstOpen = text.indexOf('{');
  const lastClose = text.lastIndexOf('}');

  if (firstOpen === -1 || lastClose === -1 || lastClose < firstOpen) {
    return null;
  }

  const extracted = text.substring(firstOpen, lastClose + 1);

  // Remove comments (line and block) while preserving quoted strings
  return extracted.replace(
    /\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g,
    (m, g1) => (g1 ? '' : m)
  );
}

/**
 * Parse and validate Vega-Lite specification
 *
 * Validates that the spec contains required properties and has valid data structure.
 * Returns detailed error messages for common issues.
 *
 * Based on UserScript v0.24 lines 37-57
 *
 * @param jsonString - JSON string to parse
 * @returns Validation result with spec if valid, or error message if invalid
 */
export function parseVegaSpec(
  jsonString: string
): { valid: boolean; error: string | null; spec: VisualizationSpec | null } {
  let spec: any;

  // Parse JSON
  try {
    spec = JSON.parse(jsonString);
  } catch (e) {
    return {
      valid: false,
      error: `Invalid JSON Syntax: ${(e as Error).message}`,
      spec: null,
    };
  }

  // Validate structure
  if (!spec || typeof spec !== 'object') {
    return {
      valid: false,
      error: 'Invalid JSON structure: Expected an object',
      spec: null,
    };
  }

  // Check for required Vega-Lite properties
  if (
    !spec.mark &&
    !spec.layer &&
    !spec.concat &&
    !spec.hconcat &&
    !spec.vconcat
  ) {
    return {
      valid: false,
      error: "Missing required Vega-Lite properties: 'mark', 'layer', or composition (concat/hconcat/vconcat)",
      spec: spec,
    };
  }

  // Validate data structure if present
  if (spec.data) {
    if (Array.isArray(spec.data.values) && spec.data.values.length === 0) {
      return {
        valid: false,
        error: "Data 'values' array is empty",
        spec: spec,
      };
    }
    if ('values' in spec.data && !spec.data.values) {
      return {
        valid: false,
        error: "Data 'values' is defined but null or undefined",
        spec: spec,
      };
    }
  }

  return { valid: true, error: null, spec: spec as VisualizationSpec };
}
