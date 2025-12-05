/**
 * Chart Download Utilities
 *
 * Export charts as SVG or PNG with user choice for both Mermaid and Vega-Lite.
 * Based on UserScript v0.24 implementation for PNG conversion.
 *
 * Functions:
 * - downloadMermaidAsSVG: Export Mermaid diagram as SVG (native)
 * - downloadMermaidAsPNG: Export Mermaid diagram as PNG (canvas conversion)
 * - downloadVegaAsPNG: Export Vega-Lite chart as PNG (native)
 * - downloadVegaAsSVG: Export Vega-Lite chart as SVG (native)
 */

/**
 * Export Mermaid diagram as SVG
 *
 * Serializes the SVG element and downloads it as a file.
 * Ensures xmlns attribute is present for standalone SVG viewing.
 *
 * @param containerRef - Container element with SVG chart
 * @param filename - Filename without extension (e.g., "mermaid-chart")
 */
export async function downloadMermaidAsSVG(
  containerRef: HTMLDivElement,
  filename: string
): Promise<void> {
  const svgElement = containerRef.querySelector('svg');
  if (!svgElement) {
    throw new Error('No SVG element found in container');
  }

  const serializer = new XMLSerializer();
  let source = serializer.serializeToString(svgElement);

  // Ensure xmlns attribute for standalone SVG
  if (!source.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
    source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
  }

  const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.svg`;
  link.click();

  URL.revokeObjectURL(url);
}

/**
 * Export Mermaid diagram as PNG
 *
 * Converts SVG to PNG using canvas with high DPI scaling (2x).
 * Based on UserScript v0.24 implementation (lines 233-251).
 *
 * @param containerRef - Container element with SVG chart
 * @param filename - Filename without extension (e.g., "mermaid-chart")
 */
export async function downloadMermaidAsPNG(
  containerRef: HTMLDivElement,
  filename: string
): Promise<void> {
  const svgElement = containerRef.querySelector('svg');
  if (!svgElement) {
    throw new Error('No SVG element found in container');
  }

  const serializer = new XMLSerializer();
  let source = serializer.serializeToString(svgElement);

  // Ensure xmlns attribute
  if (!source.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
    source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source);

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const scale = 2; // High DPI for quality
        const rect = svgElement.getBoundingClientRect();
        const w = rect.width || parseInt(svgElement.getAttribute('width') || '800');
        const h = rect.height || parseInt(svgElement.getAttribute('height') || '600');

        canvas.width = w * scale;
        canvas.height = h * scale;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return reject(new Error('Failed to get canvas context'));
        }

        // White background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0);

        // Download
        canvas.toBlob((blob) => {
          if (!blob) {
            return reject(new Error('Failed to create blob from canvas'));
          }

          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = `${filename}.png`;
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);
          resolve();
        });
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => reject(new Error('Failed to load SVG as image'));
  });
}

/**
 * Export Vega-Lite chart as PNG
 *
 * Uses Vega's native toImageURL method with 2x scaling for quality.
 *
 * @param vegaView - Vega View instance from vegaEmbed result
 * @param filename - Filename without extension (e.g., "vega-chart")
 */
export async function downloadVegaAsPNG(
  vegaView: any,
  filename: string
): Promise<void> {
  try {
    const url = await vegaView.toImageURL('png', 2); // 2x scale for quality
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.png`;
    link.click();
  } catch (error) {
    throw new Error(`Failed to export PNG: ${(error as Error).message}`);
  }
}

/**
 * Export Vega-Lite chart as SVG
 *
 * Uses Vega's native toImageURL method for SVG export.
 *
 * @param vegaView - Vega View instance from vegaEmbed result
 * @param filename - Filename without extension (e.g., "vega-chart")
 */
export async function downloadVegaAsSVG(
  vegaView: any,
  filename: string
): Promise<void> {
  try {
    const url = await vegaView.toImageURL('svg');
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.svg`;
    link.click();
  } catch (error) {
    throw new Error(`Failed to export SVG: ${(error as Error).message}`);
  }
}
