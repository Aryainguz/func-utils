# func-utils

`func-utils` is a collection of lightweight and reusable JavaScript utilities for managing and optimizing function executions. This repository includes tools like **debouncing** and **throttling** to enhance performance in scenarios with rapid or repetitive function calls, such as user input events, window resizing, and scrolling.

## Utilities Included:

### `createDebounce` Utility

A utility that debounces function calls, ensuring they are executed only after a specified delay of inactivity. Ideal for scenarios where you want to trigger a function after the user has stopped interacting, such as search inputs or resize events.

#### Features:

- Simple and reusable.
- Customizable delay.
- Preserves the `this` context.

#### Usage:

```javascript
const debouncedFn = createDebounce(() => console.log("Executed!"), 500);
debouncedFn(); // Executes after 500ms if no other call interrupts.
```

---

### `createThrottle` Utility

A utility that throttles function calls, ensuring they are executed at most once every specified time interval. This is perfect for scenarios where you want to limit how often a function is called, such as during scroll events or window resizing.

#### Features:

- Simple and reusable.
- Customizable time interval.
- Prevents excessive calls to performance-heavy functions.

#### Usage:

```javascript
const throttledFn = createThrottle(() => console.log("Executed!"), 200);
throttledFn(); // Executes at most once every 200ms.
```

---

## Description

These utilities help manage function executions efficiently by reducing unnecessary calls and improving performance. **Debouncing** waits for a period of inactivity before executing a function, while **Throttling** ensures that a function is only executed at regular intervals.

---

### Installation

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

### Contributing

If you'd like to contribute to `func-utils`, feel free to open a pull request. We welcome improvements, bug fixes, and new utility functions!
