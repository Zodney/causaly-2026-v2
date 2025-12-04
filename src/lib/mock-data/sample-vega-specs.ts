/**
 * Mock Vega-Lite Specification Data
 *
 * Pre-defined Vega-Lite chart specifications for testing and demo purposes.
 * Each spec includes complete Vega-Lite JSON with mock data and theme configuration.
 */

import type { VisualizationSpec } from 'vega-embed';

export interface VegaExample {
  id: string;
  title: string;
  description: string;
  type: 'bar' | 'line' | 'scatter' | 'area' | 'heatmap' | 'multi-view';
  spec: VisualizationSpec;
}

export const SAMPLE_VEGA_SPECS: VegaExample[] = [
  {
    id: 'bar-1',
    title: 'Category Sales Comparison',
    description: 'Bar chart comparing sales across different product categories',
    type: 'bar',
    spec: {
      "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
      "width": "container",
      "height": 300,
      "data": {
        "values": [
          {"category": "Electronics", "sales": 28500, "region": "North"},
          {"category": "Clothing", "sales": 15200, "region": "North"},
          {"category": "Food", "sales": 12800, "region": "North"},
          {"category": "Books", "sales": 8900, "region": "North"},
          {"category": "Home", "sales": 19300, "region": "North"}
        ]
      },
      "mark": {"type": "bar", "cornerRadiusEnd": 4},
      "encoding": {
        "x": {
          "field": "category",
          "type": "nominal",
          "axis": {"labelAngle": 0, "title": "Product Category"}
        },
        "y": {
          "field": "sales",
          "type": "quantitative",
          "axis": {"title": "Sales ($)", "format": "$,.0f"}
        },
        "color": {
          "field": "category",
          "type": "nominal",
          "scale": {
            "range": ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"]
          },
          "legend": null
        },
        "tooltip": [
          {"field": "category", "type": "nominal", "title": "Category"},
          {"field": "sales", "type": "quantitative", "title": "Sales", "format": "$,.0f"}
        ]
      }
    }
  },
  {
    id: 'line-1',
    title: 'Monthly Revenue Trend',
    description: 'Line chart showing revenue trends over time with multiple series',
    type: 'line',
    spec: {
      "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
      "width": "container",
      "height": 300,
      "data": {
        "values": [
          {"month": "Jan", "revenue": 45000, "expenses": 32000},
          {"month": "Feb", "revenue": 52000, "expenses": 35000},
          {"month": "Mar", "revenue": 48000, "expenses": 33000},
          {"month": "Apr", "revenue": 61000, "expenses": 38000},
          {"month": "May", "revenue": 58000, "expenses": 36000},
          {"month": "Jun", "revenue": 67000, "expenses": 40000},
          {"month": "Jul", "revenue": 72000, "expenses": 42000},
          {"month": "Aug", "revenue": 68000, "expenses": 41000},
          {"month": "Sep", "revenue": 74000, "expenses": 43000},
          {"month": "Oct", "revenue": 79000, "expenses": 45000},
          {"month": "Nov", "revenue": 82000, "expenses": 46000},
          {"month": "Dec", "revenue": 88000, "expenses": 48000}
        ]
      },
      "transform": [
        {"fold": ["revenue", "expenses"], "as": ["type", "amount"]}
      ],
      "mark": {"type": "line", "point": true, "strokeWidth": 2},
      "encoding": {
        "x": {
          "field": "month",
          "type": "ordinal",
          "axis": {"title": "Month", "labelAngle": 0}
        },
        "y": {
          "field": "amount",
          "type": "quantitative",
          "axis": {"title": "Amount ($)", "format": "$,.0f"}
        },
        "color": {
          "field": "type",
          "type": "nominal",
          "scale": {
            "domain": ["revenue", "expenses"],
            "range": ["var(--chart-1)", "var(--chart-3)"]
          },
          "legend": {"title": "Type"}
        },
        "tooltip": [
          {"field": "month", "type": "ordinal", "title": "Month"},
          {"field": "type", "type": "nominal", "title": "Type"},
          {"field": "amount", "type": "quantitative", "title": "Amount", "format": "$,.0f"}
        ]
      }
    }
  },
  {
    id: 'scatter-1',
    title: 'Customer Satisfaction vs Spend',
    description: 'Scatter plot showing correlation between customer satisfaction and spending',
    type: 'scatter',
    spec: {
      "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
      "width": "container",
      "height": 300,
      "data": {
        "values": [
          {"satisfaction": 7.2, "spend": 450, "segment": "Premium"},
          {"satisfaction": 8.1, "spend": 780, "segment": "Premium"},
          {"satisfaction": 6.5, "spend": 320, "segment": "Standard"},
          {"satisfaction": 7.8, "spend": 650, "segment": "Premium"},
          {"satisfaction": 5.9, "spend": 280, "segment": "Standard"},
          {"satisfaction": 8.5, "spend": 920, "segment": "Premium"},
          {"satisfaction": 6.2, "spend": 310, "segment": "Standard"},
          {"satisfaction": 7.5, "spend": 580, "segment": "Premium"},
          {"satisfaction": 6.8, "spend": 420, "segment": "Standard"},
          {"satisfaction": 8.9, "spend": 1050, "segment": "Premium"},
          {"satisfaction": 5.5, "spend": 250, "segment": "Standard"},
          {"satisfaction": 7.1, "spend": 490, "segment": "Standard"},
          {"satisfaction": 8.3, "spend": 850, "segment": "Premium"},
          {"satisfaction": 6.4, "spend": 380, "segment": "Standard"},
          {"satisfaction": 7.9, "spend": 720, "segment": "Premium"}
        ]
      },
      "mark": {"type": "point", "filled": true, "size": 100},
      "encoding": {
        "x": {
          "field": "satisfaction",
          "type": "quantitative",
          "axis": {"title": "Satisfaction Score (1-10)"},
          "scale": {"domain": [5, 9.5]}
        },
        "y": {
          "field": "spend",
          "type": "quantitative",
          "axis": {"title": "Annual Spend ($)", "format": "$,.0f"}
        },
        "color": {
          "field": "segment",
          "type": "nominal",
          "scale": {
            "domain": ["Standard", "Premium"],
            "range": ["var(--chart-2)", "var(--chart-1)"]
          },
          "legend": {"title": "Customer Segment"}
        },
        "tooltip": [
          {"field": "satisfaction", "type": "quantitative", "title": "Satisfaction", "format": ".1f"},
          {"field": "spend", "type": "quantitative", "title": "Annual Spend", "format": "$,.0f"},
          {"field": "segment", "type": "nominal", "title": "Segment"}
        ]
      }
    }
  },
  {
    id: 'area-1',
    title: 'User Growth Over Time',
    description: 'Stacked area chart showing cumulative user growth by acquisition channel',
    type: 'area',
    spec: {
      "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
      "width": "container",
      "height": 300,
      "data": {
        "values": [
          {"date": "2024-01", "organic": 1200, "paid": 800, "referral": 400},
          {"date": "2024-02", "organic": 1500, "paid": 950, "referral": 500},
          {"date": "2024-03", "organic": 1800, "paid": 1100, "referral": 650},
          {"date": "2024-04", "organic": 2200, "paid": 1300, "referral": 750},
          {"date": "2024-05", "organic": 2600, "paid": 1450, "referral": 900},
          {"date": "2024-06", "organic": 3100, "paid": 1600, "referral": 1050}
        ]
      },
      "transform": [
        {"fold": ["organic", "paid", "referral"], "as": ["channel", "users"]}
      ],
      "mark": "area",
      "encoding": {
        "x": {
          "field": "date",
          "type": "temporal",
          "timeUnit": "yearmonth",
          "axis": {"title": "Month", "format": "%b"}
        },
        "y": {
          "field": "users",
          "type": "quantitative",
          "axis": {"title": "New Users"}
        },
        "color": {
          "field": "channel",
          "type": "nominal",
          "scale": {
            "domain": ["organic", "paid", "referral"],
            "range": ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)"]
          },
          "legend": {"title": "Acquisition Channel"}
        },
        "tooltip": [
          {"field": "date", "type": "temporal", "title": "Month", "format": "%B %Y"},
          {"field": "channel", "type": "nominal", "title": "Channel"},
          {"field": "users", "type": "quantitative", "title": "New Users", "format": ","}
        ]
      }
    }
  },
  {
    id: 'heatmap-1',
    title: 'Hourly Activity Heatmap',
    description: 'Heatmap showing user activity patterns by day of week and hour',
    type: 'heatmap',
    spec: {
      "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
      "width": "container",
      "height": 300,
      "data": {
        "values": [
          {"day": "Monday", "hour": 0, "activity": 12},
          {"day": "Monday", "hour": 6, "activity": 45},
          {"day": "Monday", "hour": 12, "activity": 89},
          {"day": "Monday", "hour": 18, "activity": 67},
          {"day": "Tuesday", "hour": 0, "activity": 15},
          {"day": "Tuesday", "hour": 6, "activity": 48},
          {"day": "Tuesday", "hour": 12, "activity": 92},
          {"day": "Tuesday", "hour": 18, "activity": 71},
          {"day": "Wednesday", "hour": 0, "activity": 18},
          {"day": "Wednesday", "hour": 6, "activity": 52},
          {"day": "Wednesday", "hour": 12, "activity": 95},
          {"day": "Wednesday", "hour": 18, "activity": 74},
          {"day": "Thursday", "hour": 0, "activity": 14},
          {"day": "Thursday", "hour": 6, "activity": 46},
          {"day": "Thursday", "hour": 12, "activity": 88},
          {"day": "Thursday", "hour": 18, "activity": 69},
          {"day": "Friday", "hour": 0, "activity": 20},
          {"day": "Friday", "hour": 6, "activity": 55},
          {"day": "Friday", "hour": 12, "activity": 98},
          {"day": "Friday", "hour": 18, "activity": 82},
          {"day": "Saturday", "hour": 0, "activity": 28},
          {"day": "Saturday", "hour": 6, "activity": 35},
          {"day": "Saturday", "hour": 12, "activity": 76},
          {"day": "Saturday", "hour": 18, "activity": 61},
          {"day": "Sunday", "hour": 0, "activity": 25},
          {"day": "Sunday", "hour": 6, "activity": 32},
          {"day": "Sunday", "hour": 12, "activity": 72},
          {"day": "Sunday", "hour": 18, "activity": 58}
        ]
      },
      "mark": "rect",
      "encoding": {
        "x": {
          "field": "hour",
          "type": "ordinal",
          "axis": {"title": "Hour of Day", "labelAngle": 0}
        },
        "y": {
          "field": "day",
          "type": "ordinal",
          "axis": {"title": "Day of Week"},
          "sort": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        },
        "color": {
          "field": "activity",
          "type": "quantitative",
          "scale": {
            "scheme": "blues"
          },
          "legend": {"title": "Activity Level"}
        },
        "tooltip": [
          {"field": "day", "type": "ordinal", "title": "Day"},
          {"field": "hour", "type": "ordinal", "title": "Hour"},
          {"field": "activity", "type": "quantitative", "title": "Activity"}
        ]
      }
    }
  },
  {
    id: 'multi-1',
    title: 'Sales Dashboard',
    description: 'Multi-view dashboard with linked visualizations showing sales data',
    type: 'multi-view',
    spec: {
      "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
      "width": "container",
      "data": {
        "values": [
          {"product": "Laptop", "category": "Electronics", "sales": 850, "profit": 180},
          {"product": "Phone", "category": "Electronics", "sales": 1200, "profit": 240},
          {"product": "Tablet", "category": "Electronics", "sales": 650, "profit": 130},
          {"product": "Shirt", "category": "Clothing", "sales": 420, "profit": 120},
          {"product": "Jeans", "category": "Clothing", "sales": 580, "profit": 150},
          {"product": "Shoes", "category": "Clothing", "sales": 720, "profit": 180}
        ]
      },
      "vconcat": [
        {
          "height": 150,
          "mark": {"type": "bar", "cornerRadiusEnd": 4},
          "encoding": {
            "x": {
              "field": "product",
              "type": "nominal",
              "axis": {"labelAngle": -45, "title": "Product"}
            },
            "y": {
              "field": "sales",
              "type": "quantitative",
              "axis": {"title": "Sales ($)", "format": "$,.0f"}
            },
            "color": {
              "field": "category",
              "type": "nominal",
              "scale": {
                "domain": ["Electronics", "Clothing"],
                "range": ["var(--chart-1)", "var(--chart-2)"]
              },
              "legend": {"title": "Category"}
            },
            "tooltip": [
              {"field": "product", "type": "nominal", "title": "Product"},
              {"field": "sales", "type": "quantitative", "title": "Sales", "format": "$,.0f"}
            ]
          }
        },
        {
          "height": 150,
          "mark": {"type": "point", "filled": true, "size": 100},
          "encoding": {
            "x": {
              "field": "sales",
              "type": "quantitative",
              "axis": {"title": "Sales ($)", "format": "$,.0f"}
            },
            "y": {
              "field": "profit",
              "type": "quantitative",
              "axis": {"title": "Profit ($)", "format": "$,.0f"}
            },
            "color": {
              "field": "category",
              "type": "nominal",
              "scale": {
                "domain": ["Electronics", "Clothing"],
                "range": ["var(--chart-1)", "var(--chart-2)"]
              },
              "legend": null
            },
            "tooltip": [
              {"field": "product", "type": "nominal", "title": "Product"},
              {"field": "sales", "type": "quantitative", "title": "Sales", "format": "$,.0f"},
              {"field": "profit", "type": "quantitative", "title": "Profit", "format": "$,.0f"}
            ]
          }
        }
      ]
    }
  }
];
