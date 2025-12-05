# Class Diagram Reference

## Class Definition

```
class Animal
class Dog {
    +String name
    +int age
    +bark()
    -sleep()
}
```

## Visibility

- `+` Public
- `-` Private
- `#` Protected
- `~` Package

## Method Classifiers

- `*` Abstract (e.g., `move()*`)
- `$` Static (e.g., `count()$`)

## Relationships

```
A <|-- B        %% Inheritance
A *-- B         %% Composition
A o-- B         %% Aggregation
A --> B         %% Association
A -- B          %% Link
A ..> B         %% Dependency
A ..|> B        %% Realization
A .. B          %% Dashed link
```

## Relationship Labels

```
A -->|uses| B
A "1" --> "*" B
```

## Cardinality

```
Customer "1" --> "*" Order
Order "1..*" --> "1" Product
```

## Annotations

```
class IShape <<interface>>
class BaseClass <<abstract>>
class Color <<enumeration>>
class MyService <<service>>
```

## Generics

```
class List~T~ {
    +add(T item)
    +get(int index) T
}
```

## Namespaces

```
namespace Domain {
    class User
    class Order
}
namespace Service {
    class UserService
}
```

## Common Patterns

### Inheritance Hierarchy
```
classDiagram
    Animal <|-- Dog
    Animal <|-- Cat
    Animal : +String name
    Animal : +eat()
    Dog : +bark()
    Cat : +meow()
```

### Composition
```
classDiagram
    Car *-- Engine
    Car *-- Wheel
    Car : +start()
    Engine : +ignite()
    Wheel : +rotate()
```

### Design Pattern (Strategy)
```
classDiagram
    class Context {
        -Strategy strategy
        +setStrategy(Strategy)
        +execute()
    }
    class Strategy {
        <<interface>>
        +algorithm()*
    }
    class ConcreteA {
        +algorithm()
    }
    class ConcreteB {
        +algorithm()
    }
    Context --> Strategy
    Strategy <|.. ConcreteA
    Strategy <|.. ConcreteB
```

### Repository Pattern
```
classDiagram
    class IRepository~T~ {
        <<interface>>
        +find(id) T
        +save(T entity)
        +delete(id)
    }
    class UserRepository {
        +find(id) User
        +save(User entity)
        +delete(id)
    }
    class User {
        +String id
        +String name
        +String email
    }
    IRepository <|.. UserRepository
    UserRepository --> User
```
