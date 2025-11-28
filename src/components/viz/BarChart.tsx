/**
 * BarChart - Convenience Bar Chart Component
 *
 * A simple wrapper around VegaChart for categorical bar charts.
 * Automatically constructs a Vega-Lite spec from data.
 *
 * Usage:
 *   <BarChart
 *     data={[{ category: "A", value: 10 }, { category: "B", value: 20 }]}
 *     xField="category"
 *     yField="value"
 *     title="My Bar Chart"
 *   />
 */

"use client";

import { VegaChart } from "./VegaChart";

export interface BarChartProps {
  data: Record<string, any>[];
  xField: string;
  yField: string;
  title?: string;
  color?: string;
  width?: number | "container";
  height?: number;
  className?: string;
}

export function BarChart({
  data,
  xField,
  yField,
  title,
  color,
  width = "container",
  height = 300,
  className,
}: BarChartProps) {
  const spec = {
    $schema: "https://vega.github.io/schema/vega-lite/v6.json",
    description: title || "Bar chart",
    data: { values: data },
    mark: {
      type: "bar",
      tooltip: true,
      ...(color && { color }),
    },
    encoding: {
      x: {
        field: xField,
        type: "nominal",
        axis: {
          labelAngle: 0,
          title: xField.charAt(0).toUpperCase() + xField.slice(1),
        },
      },
      y: {
        field: yField,
        type: "quantitative",
        axis: {
          title: yField.charAt(0).toUpperCase() + yField.slice(1),
        },
      },
      ...(color && {
        color: {
          field: xField,
          type: "nominal",
          legend: null,
        },
      }),
    },
    ...(title && {
      title: {
        text: title,
        anchor: "start",
      },
    }),
  };

  return (
    <VegaChart
      spec={spec}
      width={width}
      height={height}
      className={className}
    />
  );
}
