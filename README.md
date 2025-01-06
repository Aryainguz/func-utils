### `createDebounce` Utility

A lightweight JavaScript utility to debounce function calls, ensuring they are executed only after a specified delay of inactivity. Ideal for optimizing search inputs, resize events, and other performance-critical tasks.

**Features**:
- Simple and reusable.
- Customizable delay.
- Preserves the `this` context.

**Usage**:
```javascript
const debouncedFn = createDebounce(() => console.log("Executed!"), 500);
debouncedFn(); // Executes after 500ms if no other call interrupts.
```
