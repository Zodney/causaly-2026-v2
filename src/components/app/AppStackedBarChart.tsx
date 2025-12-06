"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export interface StackedBarChartData {
  [key: string]: string | number;
}

export interface AppStackedBarChartProps {
  data: StackedBarChartData[];
  title?: string;
  xAxisKey: string;
  bars: {
    dataKey: string;
    label: string;
    color?: string;
  }[];
  showLegend?: boolean;
  showGrid?: boolean;
  className?: string;
}

export function AppStackedBarChart({
  data,
  title,
  xAxisKey,
  bars,
  showLegend = true,
  showGrid = true,
  className,
}: AppStackedBarChartProps) {
  // Build chart config from bars prop
  const chartConfig: ChartConfig = bars.reduce((acc, bar, index) => {
    acc[bar.dataKey] = {
      label: bar.label,
      color: bar.color || `hsl(var(--chart-${index + 1}))`,
    };
    return acc;
  }, {} as ChartConfig);

  const content = (
    <ChartContainer config={chartConfig} className={className}>
      <BarChart data={data} accessibilityLayer>
        {showGrid && <CartesianGrid vertical={false} strokeDasharray="3 3" />}
        <XAxis
          dataKey={xAxisKey}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent />} />
        {showLegend && (
          <ChartLegend content={<ChartLegendContent />} />
        )}
        {bars.map((bar) => (
          <Bar
            key={bar.dataKey}
            dataKey={bar.dataKey}
            stackId="stack"
            fill={`var(--color-${bar.dataKey})`}
            radius={[0, 0, 0, 0]}
          />
        ))}
      </BarChart>
    </ChartContainer>
  );

  if (title) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>{content}</CardContent>
      </Card>
    );
  }

  return content;
}
