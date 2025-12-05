# Flowchart Reference

## Orientation

```
flowchart TD  %% Top Down
flowchart LR  %% Left Right
flowchart BT  %% Bottom Top
flowchart RL  %% Right Left
```

## Node Shapes

```
A[Rectangle]
B(Rounded edges)
C([Stadium])
D{Diamond}
E{{Hexagon}}
F(((Circle)))
G[(Database)]
H>Flag]
I[[Subroutine]]
J[/Parallelogram/]
K[\Parallelogram alt\]
L[/Trapezoid\]
M[\Trapezoid alt/]
N((Double circle))
```

## Arrows & Links

```
A --> B          %% Arrow
A --- B          %% Line
A -.-> B         %% Dotted arrow
A -.- B          %% Dotted line
A ==> B          %% Thick arrow
A === B          %% Thick line
A -->|text| B    %% Labeled arrow
A -- text --> B  %% Labeled arrow alt
A o--o B         %% Circle ends
A x--x B         %% Cross ends
A <--> B         %% Bidirectional
```

## Subgraphs

```
subgraph title
  A --> B
end

subgraph id [Title]
  C --> D
end
```

## Styling

```
style A fill:#f9f,stroke:#333,stroke-width:4px
classDef className fill:#ff0,stroke:#000
class A,B className
A:::className
```

## Common Patterns

### Decision Tree
```
flowchart TD
    Start[Start] --> Decision{Is it?}
    Decision -->|Yes| ActionA[Do A]
    Decision -->|No| ActionB[Do B]
    ActionA --> End[End]
    ActionB --> End
```

### Process Flow
```
flowchart LR
    Input[/Input/] --> Process[Process]
    Process --> Decision{Valid?}
    Decision -->|Yes| Output[/Output/]
    Decision -->|No| Error[Error]
    Error --> Input
```

### System Architecture
```
flowchart TB
    subgraph Frontend
        UI[UI Layer]
    end
    subgraph Backend
        API[API Gateway]
        Service[Service Layer]
        DB[(Database)]
    end
    UI --> API
    API --> Service
    Service --> DB
```
