# Sequence Diagram Reference

## Participants

```
participant Alice
participant Bob
actor Charlie
participant D as Database
```

## Messages

```
Alice->>Bob: Solid arrow
Alice-->>Bob: Dotted arrow
Alice-)Bob: Async arrow
Alice-->Bob: Line without arrow
Alice-x Bob: Cross end
Alice--x Bob: Dotted cross
```

## Activation

```
Alice->>+Bob: Activate
Bob-->>-Alice: Deactivate

%% Or inline
activate Bob
deactivate Bob
```

## Control Structures

### Loop
```
loop Every minute
    Alice->>Bob: Heartbeat
end
```

### Alt/Else
```
alt Success
    Alice->>Bob: Data
else Failure
    Alice->>Bob: Error
end
```

### Optional
```
opt Extra action
    Alice->>Bob: Optional
end
```

### Parallel
```
par Action 1
    Alice->>Bob: Message
and Action 2
    Alice->>Charlie: Message
end
```

### Critical
```
critical Transaction
    Alice->>Bob: Commit
option Rollback
    Alice->>Bob: Cancel
end
```

### Break
```
break Error
    Alice->>Bob: Abort
end
```

## Notes

```
Note left of Alice: Left note
Note right of Bob: Right note
Note over Alice,Bob: Spanning note
```

## Background Highlighting

```
rect rgb(200, 150, 255)
    Alice->>Bob: Highlighted
end

rect rgba(0, 255, 0, 0.1)
    Bob->>Alice: Green tint
end
```

## Common Patterns

### Authentication Flow
```
sequenceDiagram
    actor User
    participant App
    participant Auth
    participant DB

    User->>+App: Login
    App->>+Auth: Validate
    Auth->>+DB: Check credentials
    DB-->>-Auth: User found
    Auth-->>-App: Token
    App-->>-User: Success
```

### API Request
```
sequenceDiagram
    participant Client
    participant API
    participant Service
    participant Cache
    participant DB

    Client->>+API: GET /data
    API->>+Cache: Check cache
    alt Cache hit
        Cache-->>API: Cached data
    else Cache miss
        Cache-->>API: Not found
        API->>+Service: Fetch
        Service->>+DB: Query
        DB-->>-Service: Results
        Service-->>-API: Data
        API->>Cache: Store
    end
    API-->>-Client: Response
```
