# Other Diagram Types Reference

## State Diagram

```
stateDiagram-v2
    [*] --> Idle
    Idle --> Processing : start
    Processing --> Success : complete
    Processing --> Error : fail
    Error --> Idle : retry
    Success --> [*]
```

### Composite States
```
stateDiagram-v2
    [*] --> Active
    state Active {
        [*] --> Running
        Running --> Paused
        Paused --> Running
    }
    Active --> [*]
```

## Entity Relationship Diagram

```
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses
```

### Relationships
- `||--||` One to one
- `||--o{` One to many
- `}o--o{` Many to many
- `||..||` One to one (identifying)

### Attributes
```
erDiagram
    CUSTOMER {
        string id PK
        string name
        string email UK
    }
    ORDER {
        int id PK
        string customer_id FK
        date order_date
    }
```

## Gantt Chart

```
gantt
    title Project Timeline
    dateFormat YYYY-MM-DD
    section Phase 1
    Design           :a1, 2024-01-01, 30d
    Development      :a2, after a1, 45d
    section Phase 2
    Testing          :a3, after a2, 20d
    Deployment       :a4, after a3, 10d
```

### Task States
```
gantt
    title Task Status
    dateFormat YYYY-MM-DD
    section Work
    Completed   :done, task1, 2024-01-01, 10d
    In Progress :active, task2, 2024-01-11, 15d
    Critical    :crit, task3, 2024-01-26, 20d
    Milestone   :milestone, m1, 2024-02-15, 0d
```

## Pie Chart

```
pie title Distribution
    "Category A" : 45
    "Category B" : 30
    "Category C" : 25
```

## Git Graph

```
gitGraph
    commit
    branch develop
    checkout develop
    commit
    checkout main
    merge develop
    commit
```

## Mindmap

```
mindmap
  root((Project))
    Planning
      Requirements
      Design
    Development
      Frontend
      Backend
      Database
    Testing
      Unit Tests
      Integration
```

## Timeline

```
timeline
    title Project History
    2023 : Founded
         : First product
    2024 : Series A
         : Team expansion
         : Market launch
```

## Quadrant Chart

```
quadrantChart
    title Prioritization Matrix
    x-axis Low Effort --> High Effort
    y-axis Low Impact --> High Impact
    quadrant-1 Quick Wins
    quadrant-2 Major Projects
    quadrant-3 Fill Ins
    quadrant-4 Thankless Tasks
    Feature A: [0.3, 0.8]
    Feature B: [0.7, 0.7]
    Feature C: [0.2, 0.3]
```

## XY Chart

```
xychart-beta
    title "Sales Trend"
    x-axis [Jan, Feb, Mar, Apr, May]
    y-axis "Revenue" 0 --> 100
    line [10, 30, 50, 70, 90]
    bar [5, 25, 45, 65, 85]
```

## Block Diagram

```
block-beta
    columns 3
    Frontend Backend Database
    Frontend --> Backend
    Backend --> Database
```

## Sankey Diagram

```
sankey-beta
    A,B,10
    A,C,20
    B,D,15
    C,D,25
```
