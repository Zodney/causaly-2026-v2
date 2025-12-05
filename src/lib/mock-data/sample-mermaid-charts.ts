/**
 * Sample Mermaid chart definitions for demo purposes
 *
 * These examples showcase various Mermaid diagram types with theme-aware styling.
 * All charts use CSS variables (var(--chart-*)) for automatic light/dark mode support.
 */

export interface MermaidExample {
  id: string;
  title: string;
  description: string;
  type: 'flowchart' | 'sequence' | 'class' | 'state' | 'er' | 'gantt' | 'pie' | 'git';
  definition: string;
}

export const SAMPLE_MERMAID_CHARTS: MermaidExample[] = [
  {
    id: 'flowchart-api',
    title: 'API Request Flow',
    description: 'Flowchart showing API request handling with authentication and error scenarios',
    type: 'flowchart',
    definition: `flowchart TD
    Start([Client Request]) --> Auth{Authenticated?}
    Auth -->|Yes| Validate[Validate Input]
    Auth -->|No| Error401[Return 401 Unauthorized]
    Validate --> ValidCheck{Valid?}
    ValidCheck -->|Yes| Process[Process Request]
    ValidCheck -->|No| Error400[Return 400 Bad Request]
    Process --> DB[(Database Query)]
    DB -->|Success| Transform[Transform Data]
    DB -->|Error| Error500[Return 500 Server Error]
    Transform --> Cache[Update Cache]
    Cache --> Response[Return 200 Success]
    Error401 --> End([End])
    Error400 --> End
    Error500 --> End
    Response --> End`,
  },
  {
    id: 'sequence-auth',
    title: 'OAuth 2.0 Authentication Flow',
    description: 'Sequence diagram illustrating user authentication with OAuth 2.0 protocol',
    type: 'sequence',
    definition: `sequenceDiagram
    actor User
    participant App as Client App
    participant Auth as Auth Server
    participant API as Resource API
    participant DB as Database

    User->>+App: Click "Login"
    App->>+Auth: Redirect to authorize
    Auth->>User: Show login page
    User->>Auth: Enter credentials
    Auth->>+DB: Verify credentials
    DB-->>-Auth: User validated
    Auth->>Auth: Generate auth code
    Auth-->>-App: Redirect with code
    App->>+Auth: Exchange code for token
    Auth->>Auth: Validate code
    Auth-->>-App: Return access token
    App->>App: Store token
    App->>+API: Request with token
    API->>API: Validate token
    API->>+DB: Fetch user data
    DB-->>-API: Return data
    API-->>-App: Return response
    App-->>-User: Show dashboard

    Note over User,DB: OAuth 2.0 Authorization Code Flow
    Note right of Auth: Token expires in 1 hour
    Note right of API: All requests require valid token`,
  },
  {
    id: 'class-ecommerce',
    title: 'E-Commerce Domain Model',
    description: 'Class diagram representing an e-commerce system with users, products, and orders',
    type: 'class',
    definition: `classDiagram
    class User {
        +String id
        +String email
        +String name
        +Date createdAt
        +login()
        +logout()
        +updateProfile()
    }

    class Product {
        +String id
        +String name
        +String description
        +Number price
        +Number stock
        +updateStock()
        +setPrice()
    }

    class Order {
        +String id
        +Date orderDate
        +String status
        +Number total
        +calculateTotal()
        +updateStatus()
        +cancel()
    }

    class OrderItem {
        +String id
        +Number quantity
        +Number price
        +getSubtotal()
    }

    class Payment {
        +String id
        +String method
        +Number amount
        +String status
        +process()
        +refund()
    }

    class Address {
        +String street
        +String city
        +String state
        +String zipCode
        +validate()
    }

    User "1" --> "*" Order : places
    Order "1" --> "*" OrderItem : contains
    OrderItem "*" --> "1" Product : references
    Order "1" --> "1" Payment : has
    User "1" --> "*" Address : has
    Order "1" --> "1" Address : ships to`,
  },
  {
    id: 'state-order',
    title: 'Order Processing Lifecycle',
    description: 'State diagram showing the complete lifecycle of an order from creation to delivery',
    type: 'state',
    definition: `stateDiagram-v2
    [*] --> Created : Customer places order

    Created --> PaymentPending : Initialize payment
    PaymentPending --> PaymentFailed : Payment declined
    PaymentPending --> Confirmed : Payment successful

    PaymentFailed --> Cancelled : Auto-cancel
    PaymentFailed --> PaymentPending : Retry payment

    Confirmed --> Processing : Start fulfillment
    Processing --> Shipped : Package dispatched
    Shipped --> InTransit : Out for delivery
    InTransit --> Delivered : Customer receives

    Confirmed --> Cancelled : Customer cancels
    Processing --> Cancelled : Stock unavailable

    Delivered --> Returned : Customer returns
    Returned --> Refunded : Process refund

    Cancelled --> [*]
    Delivered --> [*]
    Refunded --> [*]

    state Processing {
        [*] --> PickingItems
        PickingItems --> Packaging
        Packaging --> QualityCheck
        QualityCheck --> ReadyToShip
        ReadyToShip --> [*]
    }

    note right of PaymentPending
        Payment timeout: 15 minutes
    end note

    note right of Delivered
        Customer has 30 days to return
    end note`,
  },
  {
    id: 'er-users',
    title: 'User Management System Schema',
    description: 'Entity-relationship diagram for a user management system with roles and permissions',
    type: 'er',
    definition: `erDiagram
    USER ||--o{ USER_ROLE : has
    ROLE ||--o{ USER_ROLE : assigned_to
    ROLE ||--o{ ROLE_PERMISSION : has
    PERMISSION ||--o{ ROLE_PERMISSION : granted_to
    USER ||--o{ SESSION : creates
    USER ||--o{ AUDIT_LOG : generates
    USER ||--o{ NOTIFICATION : receives

    USER {
        uuid id PK
        string email UK
        string password_hash
        string first_name
        string last_name
        timestamp created_at
        timestamp updated_at
        timestamp last_login
        boolean is_active
        boolean is_verified
    }

    ROLE {
        uuid id PK
        string name UK
        string description
        timestamp created_at
    }

    USER_ROLE {
        uuid id PK
        uuid user_id FK
        uuid role_id FK
        timestamp assigned_at
    }

    PERMISSION {
        uuid id PK
        string resource UK
        string action UK
        string description
    }

    ROLE_PERMISSION {
        uuid id PK
        uuid role_id FK
        uuid permission_id FK
        timestamp granted_at
    }

    SESSION {
        uuid id PK
        uuid user_id FK
        string token UK
        timestamp created_at
        timestamp expires_at
        string ip_address
        string user_agent
    }

    AUDIT_LOG {
        uuid id PK
        uuid user_id FK
        string action
        string resource
        json metadata
        timestamp created_at
    }

    NOTIFICATION {
        uuid id PK
        uuid user_id FK
        string title
        string message
        string type
        boolean is_read
        timestamp created_at
    }`,
  },
  {
    id: 'gantt-sprint',
    title: 'Software Development Sprint',
    description: 'Gantt chart showing a 2-week sprint timeline with tasks, dependencies, and milestones',
    type: 'gantt',
    definition: `gantt
    title Sprint 24 - User Dashboard Feature
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section Planning
    Sprint Planning       :done, plan1, 2024-01-15, 1d
    Story Refinement      :done, plan2, 2024-01-15, 1d

    section Design
    UI/UX Design          :done, design1, 2024-01-16, 2d
    Design Review         :done, design2, 2024-01-18, 1d

    section Development
    Setup Components      :done, dev1, 2024-01-17, 2d
    API Integration       :active, dev2, 2024-01-19, 3d
    Data Visualization    :dev3, 2024-01-22, 2d
    User Settings         :dev4, 2024-01-22, 2d
    Responsive Design     :dev5, 2024-01-24, 2d

    section Testing
    Unit Tests            :dev6, 2024-01-23, 2d
    Integration Tests     :dev7, 2024-01-25, 2d
    E2E Tests             :dev8, 2024-01-26, 1d

    section Review
    Code Review           :crit, review1, 2024-01-26, 1d
    QA Testing            :crit, review2, 2024-01-27, 2d

    section Deployment
    Staging Deploy        :milestone, m1, 2024-01-28, 0d
    Production Deploy     :milestone, m2, 2024-01-29, 0d
    Sprint Review         :milestone, m3, 2024-01-29, 0d`,
  },
  {
    id: 'pie-budget',
    title: 'Department Budget Allocation',
    description: 'Pie chart showing the distribution of budget across different departments',
    type: 'pie',
    definition: `pie title Annual Budget Distribution 2024
    "Engineering" : 385
    "Sales & Marketing" : 285
    "Operations" : 180
    "Human Resources" : 95
    "Finance" : 55`,
  },
  {
    id: 'git-workflow',
    title: 'Feature Branch Workflow',
    description: 'Git graph showing a feature development workflow with branching and merging',
    type: 'git',
    definition: `gitGraph
    commit id: "Initial setup"
    commit id: "Add authentication"
    branch develop
    checkout develop
    commit id: "Setup dev environment"
    branch feature/user-dashboard
    checkout feature/user-dashboard
    commit id: "Create dashboard component"
    commit id: "Add data fetching"
    commit id: "Implement charts"
    checkout develop
    branch feature/api-optimization
    checkout feature/api-optimization
    commit id: "Optimize queries"
    commit id: "Add caching"
    checkout develop
    merge feature/api-optimization tag: "v1.1.0"
    checkout feature/user-dashboard
    commit id: "Add user preferences"
    checkout develop
    merge feature/user-dashboard tag: "v1.2.0"
    checkout main
    merge develop tag: "v1.2.0-release"
    commit id: "Hotfix: Auth bug"`,
  },
];
