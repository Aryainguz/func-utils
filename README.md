# func-utils

`func-utils` is a collection of lightweight and reusable JavaScript utilities for managing and optimizing function executions. This repository includes tools like **debouncing**, **throttling**, **circuit breakers**, **rate limiting**, **logging**, and **Saga patterns** to enhance performance, resiliency, and fault tolerance in microservices and high-traffic applications.

---

## Utilities Included:

### `createDebounce` Utility

A utility that debounces function calls, ensuring they are executed only after a specified delay of inactivity. Ideal for scenarios where you want to trigger a function after the user has stopped interacting, such as search inputs or resize events.

#### Features:

- Simple and reusable.
- Customizable delay.
- Preserves the `this` context.

---

### `createThrottle` Utility

A utility that throttles function calls, ensuring they are executed at most once every specified time interval. This is perfect for scenarios where you want to limit how often a function is called, such as during scroll events or window resizing.

#### Features:

- Simple and reusable.
- Customizable time interval.
- Prevents excessive calls to performance-heavy functions.

---

### `circuitBreaker` Utility

A Circuit Breaker helps prevent cascading failures in microservices by stopping requests to an unresponsive service and retrying after a cooldown period.

#### Features:

- Prevents system-wide failures by handling service unavailability.
- Configurable timeout and error thresholds.
- Supports fallback responses when the service is down.

---

### `rateLimiter` (Redis-Based)

A Redis-backed rate limiter that controls the number of requests a user can make within a time frame, protecting services from abuse and excessive traffic.

#### Features:

- Prevents excessive API requests.
- Uses Redis for distributed rate limiting.
- Supports IP-based or user-specific rate limiting.

---

### `logger` (Winston Logger)

A structured logging utility using Winston, providing log rotation and different log levels.

#### Features:

- Supports console and file logging.
- Log rotation with timestamps.
- Configurable log levels (info, error, debug, etc.).

---

### `sagaPattern` Utility

The Saga Pattern ensures distributed transactions are executed reliably across multiple microservices.

#### Features:

- Manages long-running transactions.
- Supports compensating transactions in case of failures.
- Ensures eventual consistency in distributed systems.

---

### `awaitAllSettledWithTimeout` Utility

A timeout-safe wrapper around parallel promises, ideal for aggregating responses from multiple microservices. Each task is executed with a timeout, and results are returned in an `allSettled`-style format with added support for timed-out states.

#### Features:

- Executes async tasks in parallel with a global timeout per task.
- Returns `fulfilled`, `rejected`, or `timed_out` status for each task.
- Great for fail-soft and resilient service orchestration.

---

### `createFactory` Utility

Implements the Factory Pattern to dynamically create and cache service instances based on custom config. Perfect for multi-tenant apps, pluggable services, and scoped service containers.

#### Features:

- Dynamic service instantiation.
- Reuse instances by key.
- Supports lazy loading.
- Encapsulates configuration logic.

---

### `createTaskScheduler` Utility

A simple task scheduler utility for running tasks at fixed intervals or one-off future executions. Great for background jobs, recurring tasks, and event-based systems.

#### Features:

- Schedule recurring tasks at intervals (e.g., every 5 minutes).
- Run tasks once at a specific time.
- Remove or cancel tasks before they run.
- Easily scalable for managing background jobs or delayed tasks.

---

### `createSingleton` Utility

Implements the Singleton Pattern, ensuring that a class or object is instantiated only once throughout the application's lifecycle. This is useful for managing resources such as database connections or configuration objects.

#### Features:

- Guarantees a single instance.
- Useful for shared resources across the application.
- Can be applied to any class.

---

### `serviceHealthCheck` Utility

A utility for performing health checks on microservices, ensuring they are responsive and available. This is crucial for maintaining system reliability and performance.

#### Features:

- Periodically checks the health of services.
- Configurable health check intervals.
- Supports custom health check logic.

---

### `distributedPriorityQueue` Utility

A utility for managing tasks in a distributed priority queue, ensuring that tasks with higher priorities are processed before those with lower priorities. This is ideal for managing task execution in microservices, where critical tasks need to be processed first.

#### Features:

- Uses Min-Heap to prioritize tasks.
- Redis-backed for distributed task management.
- Asynchronous, non-blocking operations.
- Tasks are stored with a TTL (time-to-live) to ensure timely processing.

---

## Description

These utilities help manage function executions efficiently, improve system resilience, and handle failures gracefully. **Debouncing** waits for a period of inactivity before executing a function, **Throttling** ensures that a function is only executed at regular intervals, **Circuit Breakers** prevent cascading failures, **Rate Limiting** controls request rates, **Logging** helps debug, and **Saga Pattern** ensures reliable distributed transactions.

---

## Installation

To use these utilities in your project, simply clone the repository or install it using npm or yarn:

```bash
# Clone the repository
git clone https://github.com/<your-username>/func-utils.git

# Or install via npm
npm install func-utils

# Or install via yarn
yarn add func-utils
```

---

## Contributing

If you'd like to contribute to `func-utils`, feel free to open a pull request. We welcome improvements, bug fixes, and new utility functions!
