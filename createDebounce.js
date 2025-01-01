/**
 * Creates a debounce function that delays the execution of the given function.
 * @param {Function} fn - The function to debounce.
 * @param {number} delay - The delay in milliseconds.
 * @returns {Function} - The debounced function.
 */


function createDebounce(fn, delay) {
    let timerId;
    return function (...args) {
      clearTimeout(timerId);
      timerId = setTimeout(() => fn.apply(this, args), delay);
    };
  }
  
  // Usage Example:
  const logMessage = (message) => console.log("Logged:", message);
  
  const debouncedLog = createDebounce(logMessage, 500);
  
  debouncedLog("Hello, World!"); // Will execute after 500ms if no other calls.
  debouncedLog("Hi again!");    // Cancels previous call, resets delay.
  debouncedLog("This is the final message!");  