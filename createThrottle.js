function createThrottle(func, delay) {
  let lastExecuted = 0;
  let timeoutId;

  const throttled = (...args) => {
    const now = Date.now();
    if (now - lastExecuted >= delay) {
      func(...args);
      lastExecuted = now;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecuted = Date.now();
      }, delay - (now - lastExecuted));
    }
  };

  return throttled;
}

module.exports = createThrottle;
