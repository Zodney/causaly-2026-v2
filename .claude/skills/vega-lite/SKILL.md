---
name: vega-lite
description: Create interactive data visualizations using Vega-Lite's declarative JSON grammar. Use when creating charts, graphs, or data visualizations including bar charts, line graphs, scatter plots, area charts, pie charts, maps, and multi-view compositions. Supports data transformations, aggregations, filtering, and interactive features.
---

# Vega-Lite

## Overview

Vega-Lite provides a concise JSON syntax for rapidly creating interactive visualizations. It automatically generates scales, axes, and legends from declarative specifications.

## Quick Start

Basic specification structure:

```json
{
  "$schema": "https://vega.github.io/schema/vega-lite/v6.json",
  "data": {"values": [...]},
  "mark": "bar",
  "encoding": {
    "x": {"field": "category", "type": "nominal"},
    "y": {"field": "value", "type": "quantitative"}
  }
}
```

## Core Components

### Marks

Visual elements representing data:
- `bar` - Bar charts
- `line` - Line graphs
- `point` - Scatter plots
- `area` - Area charts
- `arc` - Pie/donut charts
- `circle` - Bubble charts
- `text` - Text labels
- `boxplot` - Box plots
- `errorbar` / `errorband` - Error visualizations

### Encodings

Map data fields to visual properties:
- **Position**: `x`, `y` - Horizontal/vertical position
- **Color**: `color` - Fill/stroke color
- **Size**: `size` - Point/bar size
- **Opacity**: `opacity` - Transparency
- **Shape**: `shape` - Point shapes
- **Detail**: `detail` - Grouping without visual distinction
- **Tooltip**: `tooltip` - Hover information

### Data Types

Specify field types for proper encoding:
- `quantitative` - Numeric continuous data
- `ordinal` - Ordered categories
- `nominal` - Unordered categories
- `temporal` - Date/time data

## Common Chart Patterns

### Bar Chart
```json
{
  "mark": "bar",
  "encoding": {
    "x": {"field": "category", "type": "nominal"},
    "y": {"field": "amount", "type": "quantitative"}
  }
}
```

### Line Chart
```json
{
  "mark": "line",
  "encoding": {
    "x": {"field": "date", "type": "temporal"},
    "y": {"field": "value", "type": "quantitative"}
  }
}
```

### Scatter Plot
```json
{
  "mark": "point",
  "encoding": {
    "x": {"field": "xval", "type": "quantitative"},
    "y": {"field": "yval", "type": "quantitative"},
    "color": {"field": "category", "type": "nominal"}
  }
}
```

## Transformations

Apply data transformations before visualization:

- **Aggregate**: `{"aggregate": [{"op": "sum", "field": "value", "as": "total"}], "groupby": ["category"]}`
- **Filter**: `{"filter": "datum.value > 100"}`
- **Calculate**: `{"calculate": "datum.value * 2", "as": "doubled"}`
- **Bin**: `{"bin": true, "field": "age", "as": "age_binned"}`

## Multi-View Compositions

### Layer
Overlay multiple marks:
```json
{
  "layer": [
    {"mark": "line", "encoding": {...}},
    {"mark": "point", "encoding": {...}}
  ]
}
```

### Facet
Create small multiples:
```json
{
  "facet": {"field": "category", "type": "nominal"},
  "spec": {"mark": "bar", "encoding": {...}}
}
```

### Concat
Place views side-by-side:
```json
{
  "hconcat": [{"mark": "bar", ...}, {"mark": "line", ...}]
}
```

## Configuration

Customize appearance:
```json
{
  "config": {
    "view": {"stroke": null},
    "axis": {"labelFontSize": 12},
    "mark": {"color": "#4C78A8"}
  }
}
```

## References

For detailed specification reference including advanced features, see [references/specification.md](references/specification.md).
