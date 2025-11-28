/**
 * Color Utilities
 *
 * Centralized color conversion and CSS variable extraction for visualization components.
 * Used by both VegaChart and MermaidDiagram for consistent theme integration.
 */

/**
 * Get CSS variable value from the document root
 * @param name - CSS variable name (with or without -- prefix)
 * @returns The CSS variable value, or empty string if not found or on server
 */
export function getCSSVariable(name: string): string {
  if (typeof window === "undefined") return "";

  // Ensure the variable name starts with --
  const varName = name.startsWith("--") ? name : `--${name}`;

  return getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
}

/**
 * Convert HSL color string to hex format
 * @param hsl - HSL string in format "221 83% 53%" (from CSS variable)
 * @returns Hex color string like "#3b82f6"
 */
export function hslToHex(hsl: string): string {
  if (!hsl || hsl === "") return "#000000"; // Fallback color

  try {
    // Parse "221 83% 53%" format
    const parts = hsl.split(/\s+/);
    if (parts.length < 3) return "#000000";

    const h = parseFloat(parts[0]) / 360; // Normalize to 0-1
    const s = parseFloat(parts[1]) / 100; // Remove % and normalize
    const l = parseFloat(parts[2]) / 100; // Remove % and normalize

    // Convert HSL to RGB
    let r: number, g: number, b: number;

    if (s === 0) {
      r = g = b = l; // Achromatic
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    // Convert to 0-255 range and then to hex
    const toHex = (x: number) => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  } catch (error) {
    console.error("Error converting HSL to hex:", error);
    return "#000000"; // Fallback color
  }
}

/**
 * Get the chart color palette from CSS variables
 * @returns Array of HSL color strings for multi-series charts
 */
export function getChartPalette(): string[] {
  return Array.from({ length: 9 }, (_, i) => {
    const hsl = getCSSVariable(`--chart-${i + 1}`);
    return hsl ? `hsl(${hsl})` : `hsl(221 83% ${53 - i * 5}%)`; // Fallback gradient
  });
}

/**
 * Get the sequential color scale from CSS variables
 * @returns Array of HSL color strings for heatmaps and gradients
 */
export function getSequentialScale(): string[] {
  return Array.from({ length: 6 }, (_, i) => {
    const hsl = getCSSVariable(`--seq-${i + 1}`);
    return hsl ? `hsl(${hsl})` : `hsl(221 83% ${95 - i * 15}%)`; // Fallback gradient
  });
}
