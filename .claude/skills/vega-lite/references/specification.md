# Vega-Lite Specification Reference

Complete reference for creating Vega-Lite visualizations.

## Specification Structure

All Vega-Lite specifications are JSON objects with the following top-level properties:

```json
{
  "$schema": "https://vega.github.io/schema/vega-lite/v6.json",
  "background": "white",
  "padding": 5,
  "autosize": "pad",
  "name": "my-chart",
  "description": "Chart description",
  "title": "Chart Title",
  "data": {...},
  "transform": [...],
  "params": [...],
  "mark": "...",
  "encoding": {...},
  "config": {...}
}
```

### Top-Level Properties

- **$schema**: URL to JSON schema for validation (recommended)
- **background**: Canvas background color (default: "white")
- **padding**: Edge spacing in pixels (number or {left, right, top, bottom})
- **autosize**: Sizing behavior - "pad", "fit", or "none"
- **name**: Unique identifier for the visualization
- **description**: Documentation text
- **title**: Plot title (string or title object)
- **usermeta**: Custom metadata passed to Vega

## Data Sources

### Inline Data
```json
{
  "data": {
    "values": [
      {"category": "A", "value": 28},
      {"category": "B", "value": 55}
    ]
  }
}
```

### URL Data
```json
{
  "data": {
    "url": "data/cars.json",
    "format": {"type": "json"}
  }
}
```

### Named Data
```json
{
  "data": {"name": "mydata"}
}
```

### Format Types
- `json` - JSON files
- `csv` - Comma-separated values
- `tsv` - Tab-separated values
- `dsv` - Custom delimiter
- `topojson` - TopoJSON geographic data

## Transforms

Apply transformations to data before visualization:

### Aggregate
```json
{
  "transform": [{
    "aggregate": [
      {"op": "sum", "field": "value", "as": "total"},
      {"op": "mean", "field": "price", "as": "avg_price"}
    ],
    "groupby": ["category"]
  }]
}
```

**Operations**: count, sum, mean, median, min, max, distinct, variance, stdev, q1, q3, argmin, argmax

### Bin
```json
{
  "transform": [{
    "bin": true,
    "field": "age",
    "as": "age_group"
  }]
}
```

**Bin options**: maxbins, extent, step, nice

### Calculate
```json
{
  "transform": [{
    "calculate": "datum.value * 2",
    "as": "doubled"
  }]
}
```

### Filter
```json
{
  "transform": [{
    "filter": "datum.value > 100"
  }]
}
```

**Filter types**: Expression string, field predicate, selection

### Fold
```json
{
  "transform": [{
    "fold": ["col1", "col2", "col3"],
    "as": ["key", "value"]
  }]
}
```

### Lookup
```json
{
  "transform": [{
    "lookup": "id",
    "from": {
      "data": {"url": "data/lookup.csv"},
      "key": "id",
      "fields": ["name", "description"]
    }
  }]
}
```

### Other Transforms
- **Density**: Estimate probability density
- **Extent**: Calculate min/max
- **Flatten**: Expand array fields
- **Impute**: Fill missing values
- **Loess**: Local regression smoothing
- **Pivot**: Reshape data
- **Quantile**: Calculate quantiles
- **Regression**: Fit regression models
- **Sample**: Random sampling
- **Stack**: Stack values
- **TimeUnit**: Extract temporal components
- **Window**: Window calculations

## Marks

Visual elements representing data:

### Basic Marks
- **bar**: Rectangular bars
- **line**: Connected line segments
- **point**: Scatter plot points
- **area**: Filled area under line
- **circle**: Circle points
- **square**: Square points
- **tick**: Short line segments
- **text**: Text labels
- **rect**: Rectangles

### Composite Marks
- **arc**: Arcs for pie/donut charts
- **boxplot**: Box and whisker plots
- **errorbar**: Error bars
- **errorband**: Error bands
- **geoshape**: Geographic shapes

### Mark Properties
```json
{
  "mark": {
    "type": "bar",
    "color": "#4C78A8",
    "opacity": 0.8,
    "filled": true,
    "tooltip": true,
    "interpolate": "monotone",
    "orient": "vertical",
    "cornerRadius": 4
  }
}
```

## Encoding Channels

Map data fields to visual properties:

### Position Channels
- **x, y**: Primary position
- **x2, y2**: Secondary position (for ranges)
- **xError, yError**: Error ranges
- **xOffset, yOffset**: Position offsets

### Polar Channels
- **theta, radius**: Arc position
- **theta2, radius2**: Arc ranges

### Geographic Channels
- **longitude, latitude**: Geographic coordinates
- **longitude2, latitude2**: Geographic ranges

### Mark Property Channels
- **color**: Fill or stroke color
- **fill**: Fill color (override)
- **stroke**: Stroke color (override)
- **opacity**: Overall opacity
- **fillOpacity**: Fill opacity
- **strokeOpacity**: Stroke opacity
- **size**: Point size or line thickness
- **angle**: Rotation angle
- **shape**: Point shape
- **strokeWidth**: Stroke width
- **strokeDash**: Dash pattern

### Text Channels
- **text**: Text content
- **tooltip**: Tooltip content

### Other Channels
- **href**: Hyperlinks
- **description**: ARIA labels
- **detail**: Grouping without encoding
- **key**: Object constancy
- **order**: Stacking order
- **facet**: Faceting field
- **row**: Facet rows
- **column**: Facet columns

### Field Definition
```json
{
  "encoding": {
    "x": {
      "field": "date",
      "type": "temporal",
      "timeUnit": "year",
      "aggregate": "mean",
      "bin": false,
      "scale": {...},
      "axis": {...},
      "sort": "ascending",
      "stack": null,
      "title": "Year"
    }
  }
}
```

### Data Types
- **quantitative**: Numeric continuous (arithmetic operations)
- **temporal**: Date/time values
- **ordinal**: Ordered categories
- **nominal**: Unordered categories
- **geojson**: Geographic data

### Aggregation
- count, sum, mean, median, min, max
- q1, q3, variance, stdev
- distinct, argmin, argmax

### Time Units
- **Timepoint**: year, quarter, month, date, day, hours, minutes, seconds, milliseconds
- **Interval**: yearquarter, yearquartermonth, yearmonth, yearmonthdate, yearmonthdatehoursminutes, etc.

### Stacking
- **"zero"** (true): Stack from zero baseline
- **"normalize"**: Normalize to 100%
- **"center"**: Center around zero
- **null** (false): No stacking

## Scales

Transform data domain to visual range:

### Scale Types

**Quantitative**:
- `linear` - Linear mapping (default)
- `log` - Logarithmic scale
- `pow` - Power scale
- `sqrt` - Square root scale
- `symlog` - Symmetric log

**Temporal**:
- `time` - Local time
- `utc` - UTC time

**Discrete**:
- `ordinal` - Ordinal scale
- `point` - Point scale
- `band` - Band scale

**Discretizing**:
- `quantile` - Quantile scale
- `quantize` - Quantize scale
- `threshold` - Threshold scale
- `bin-ordinal` - Binned ordinal

### Scale Properties
```json
{
  "encoding": {
    "x": {
      "field": "value",
      "type": "quantitative",
      "scale": {
        "type": "linear",
        "domain": [0, 100],
        "range": [0, 500],
        "nice": true,
        "zero": true,
        "padding": 0.1,
        "clamp": false,
        "reverse": false
      }
    },
    "color": {
      "field": "category",
      "type": "nominal",
      "scale": {
        "scheme": "category10",
        "domain": ["A", "B", "C"],
        "range": ["#e41a1c", "#377eb8", "#4daf4a"]
      }
    }
  }
}
```

### Color Schemes

**Categorical**: category10, category20, accent, dark2, paired, pastel1, pastel2, set1, set2, set3, tableau10, tableau20

**Sequential**: blues, greens, greys, oranges, purples, reds, viridis, inferno, magma, plasma, etc.

**Diverging**: blueorange, brownbluegreen, purplegreen, pinkyellowgreen, purpleorange, redblue, redgrey, spectral

## Axes

Customize axis appearance:

```json
{
  "encoding": {
    "x": {
      "field": "value",
      "type": "quantitative",
      "axis": {
        "title": "Value",
        "titleColor": "#333",
        "titleFont": "sans-serif",
        "titleFontSize": 14,
        "titleFontWeight": "bold",
        "labelAngle": -45,
        "labelColor": "#666",
        "labelFont": "sans-serif",
        "labelFontSize": 12,
        "labelLimit": 100,
        "grid": true,
        "gridColor": "#ddd",
        "gridDash": [2, 2],
        "ticks": true,
        "tickColor": "#888",
        "tickSize": 5,
        "domain": true,
        "domainColor": "#000",
        "domainWidth": 1,
        "orient": "bottom",
        "offset": 0,
        "position": 0,
        "format": ".2f",
        "formatType": "number"
      }
    }
  }
}
```

## Legends

Customize legend appearance:

```json
{
  "encoding": {
    "color": {
      "field": "category",
      "type": "nominal",
      "legend": {
        "title": "Category",
        "orient": "right",
        "direction": "vertical",
        "labelColor": "#333",
        "labelFont": "sans-serif",
        "labelFontSize": 12,
        "titleColor": "#000",
        "titleFont": "sans-serif",
        "titleFontSize": 14,
        "symbolType": "circle",
        "symbolSize": 100,
        "gradientLength": 200,
        "offset": 10
      }
    }
  }
}
```

## View Composition

Combine multiple views:

### Layer
Overlay multiple marks:
```json
{
  "layer": [
    {
      "mark": "line",
      "encoding": {
        "x": {"field": "date", "type": "temporal"},
        "y": {"field": "value", "type": "quantitative"}
      }
    },
    {
      "mark": {"type": "point", "filled": true},
      "encoding": {
        "x": {"field": "date", "type": "temporal"},
        "y": {"field": "value", "type": "quantitative"}
      }
    }
  ]
}
```

### Facet
Create small multiples:
```json
{
  "facet": {
    "field": "category",
    "type": "nominal",
    "columns": 3
  },
  "spec": {
    "mark": "bar",
    "encoding": {
      "x": {"field": "month", "type": "ordinal"},
      "y": {"field": "value", "type": "quantitative"}
    }
  }
}
```

### Horizontal Concatenation
```json
{
  "hconcat": [
    {
      "mark": "bar",
      "encoding": {...}
    },
    {
      "mark": "line",
      "encoding": {...}
    }
  ]
}
```

### Vertical Concatenation
```json
{
  "vconcat": [
    {
      "mark": "bar",
      "encoding": {...}
    },
    {
      "mark": "line",
      "encoding": {...}
    }
  ]
}
```

### Repeat
Generate views with repeated encodings:
```json
{
  "repeat": {
    "row": ["Horsepower", "Acceleration"],
    "column": ["Miles_per_Gallon", "Displacement"]
  },
  "spec": {
    "mark": "point",
    "encoding": {
      "x": {"field": {"repeat": "column"}, "type": "quantitative"},
      "y": {"field": {"repeat": "row"}, "type": "quantitative"}
    }
  }
}
```

## Parameters and Selections

Create interactive visualizations:

### Selection Parameters
```json
{
  "params": [{
    "name": "brush",
    "select": {
      "type": "interval",
      "encodings": ["x"]
    }
  }]
}
```

**Selection types**: point, interval

### Variable Parameters
```json
{
  "params": [{
    "name": "minValue",
    "value": 0,
    "bind": {
      "input": "range",
      "min": 0,
      "max": 100,
      "step": 1
    }
  }]
}
```

### Conditional Encoding
```json
{
  "encoding": {
    "color": {
      "condition": {
        "param": "brush",
        "field": "category",
        "type": "nominal"
      },
      "value": "grey"
    }
  }
}
```

## Configuration

Global defaults for styling:

```json
{
  "config": {
    "view": {
      "continuousWidth": 400,
      "continuousHeight": 300,
      "stroke": "transparent"
    },
    "axis": {
      "labelFontSize": 12,
      "titleFontSize": 14,
      "gridColor": "#ddd"
    },
    "legend": {
      "labelFontSize": 12,
      "titleFontSize": 14
    },
    "mark": {
      "color": "#4C78A8",
      "tooltip": true
    },
    "bar": {
      "binSpacing": 1,
      "continuousBandSize": 5
    },
    "line": {
      "strokeWidth": 2,
      "interpolate": "linear"
    },
    "point": {
      "size": 50
    },
    "title": {
      "fontSize": 16,
      "fontWeight": 600,
      "anchor": "start",
      "offset": 20
    }
  }
}
```

## Projections

For geographic visualizations:

```json
{
  "projection": {
    "type": "mercator",
    "scale": 1000,
    "center": [0, 0],
    "translate": [400, 300],
    "rotate": [0, 0, 0],
    "clipExtent": [[0, 0], [800, 600]]
  }
}
```

**Projection types**: albers, albersUsa, azimuthalEqualArea, azimuthalEquidistant, conicConformal, conicEqualArea, conicEquidistant, equalEarth, equirectangular, gnomonic, mercator, naturalEarth1, orthographic, stereographic, transverseMercator

## Advanced Examples

### Stacked Area Chart
```json
{
  "$schema": "https://vega.github.io/schema/vega-lite/v6.json",
  "data": {"url": "data/unemployment.csv"},
  "mark": "area",
  "encoding": {
    "x": {
      "field": "date",
      "type": "temporal",
      "timeUnit": "yearmonth"
    },
    "y": {
      "field": "count",
      "type": "quantitative",
      "aggregate": "sum"
    },
    "color": {
      "field": "series",
      "type": "nominal",
      "scale": {"scheme": "category20b"}
    }
  }
}
```

### Interactive Scatter Plot
```json
{
  "$schema": "https://vega.github.io/schema/vega-lite/v6.json",
  "data": {"url": "data/cars.json"},
  "params": [{
    "name": "brush",
    "select": "interval"
  }],
  "mark": "point",
  "encoding": {
    "x": {"field": "Horsepower", "type": "quantitative"},
    "y": {"field": "Miles_per_Gallon", "type": "quantitative"},
    "color": {
      "condition": {
        "param": "brush",
        "field": "Origin",
        "type": "nominal"
      },
      "value": "grey"
    },
    "size": {"field": "Acceleration", "type": "quantitative"}
  }
}
```

### Layered Chart with Rule
```json
{
  "$schema": "https://vega.github.io/schema/vega-lite/v6.json",
  "data": {"url": "data/stocks.csv"},
  "layer": [
    {
      "mark": "line",
      "encoding": {
        "x": {"field": "date", "type": "temporal"},
        "y": {"field": "price", "type": "quantitative"}
      }
    },
    {
      "mark": "rule",
      "encoding": {
        "y": {
          "aggregate": "mean",
          "field": "price",
          "type": "quantitative"
        },
        "color": {"value": "red"},
        "strokeDash": {"value": [4, 4]}
      }
    }
  ]
}
```

### Faceted Histogram
```json
{
  "$schema": "https://vega.github.io/schema/vega-lite/v6.json",
  "data": {"url": "data/cars.json"},
  "facet": {
    "field": "Origin",
    "type": "nominal",
    "columns": 3
  },
  "spec": {
    "mark": "bar",
    "encoding": {
      "x": {
        "field": "Horsepower",
        "type": "quantitative",
        "bin": {"maxbins": 15}
      },
      "y": {
        "aggregate": "count",
        "type": "quantitative"
      }
    }
  }
}
```

## Resources

- [Vega-Lite Documentation](https://vega.github.io/vega-lite/docs/)
- [Vega-Lite Examples Gallery](https://vega.github.io/vega-lite/examples/)
- [Vega Expression Language](https://vega.github.io/vega/docs/expressions/)
- [Vega-Lite Schema](https://vega.github.io/schema/vega-lite/v6.json)
