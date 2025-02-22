import CircuitBreaker from 'opossum';

// Function that makes a request to Service B
const fetchData = async () => {
  const response = await fetch('http://service-b/api/data');
  if (!response.ok) throw new Error("Service B is down!");
  return response.json();
};

// Wrap it with a Circuit Breaker
const breaker = new CircuitBreaker(fetchData, {
  timeout: 5000, // Auto-fail if response takes more than 5s
  errorThresholdPercentage: 50, // Trip if 50% of requests fail
  resetTimeout: 10000 // Wait 10s before retrying
});

// Handle Events
breaker.on('open', () => console.log("Circuit OPEN - Blocking requests 🚨"));
breaker.on('halfOpen', () => console.log("Circuit HALF-OPEN - Testing service... 🤔"));
breaker.on('close', () => console.log("Circuit CLOSED - Service restored ✅"));

// Fallback Response
breaker.fallback(() => ({ error: "Service temporarily unavailable, please try later." }));

// Usage
const data = await breaker.fire();
console.log(data);
