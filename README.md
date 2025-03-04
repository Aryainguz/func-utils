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