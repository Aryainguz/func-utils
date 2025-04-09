type EventHandler = (...args: any[]) => void;

class EventEmitterWithThrottle {
  private events: Map<string, EventHandler[]> = new Map();
  private lastEmittedTime: Map<string, number> = new Map();
  private throttleDuration: number;

  constructor(throttleDuration: number = 1000) {
    this.throttleDuration = throttleDuration; // Default throttle duration in ms
  }

  // Register an event listener for a given event type
  public on(eventType: string, handler: EventHandler): void {
    if (!this.events.has(eventType)) {
      this.events.set(eventType, []);
    }
    this.events.get(eventType)?.push(handler);
  }

  // Emit event and throttle the event processing
  public emit(eventType: string, ...args: any[]): void {
    const currentTime = Date.now();
    const lastTime = this.lastEmittedTime.get(eventType) || 0;

    // If the throttle time has not passed, do not emit the event
    if (currentTime - lastTime < this.throttleDuration) {
      console.log(`Event ${eventType} throttled. Try again later.`);
      return;
    }

    // Trigger event handlers if the event is not throttled
    const handlers = this.events.get(eventType);
    if (handlers) {
      handlers.forEach((handler) => handler(...args));
    }

    // Update the last emitted time to throttle future events
    this.lastEmittedTime.set(eventType, currentTime);
    console.log(`Event ${eventType} emitted successfully`);
  }
}

// Example Usage:
const emitter = new EventEmitterWithThrottle(2000); // Throttle duration of 2 seconds

// Register event listeners
emitter.on("orderPlaced", (orderId: string) => {
  console.log(`Handling order placed event for Order ID: ${orderId}`);
});
emitter.on("orderShipped", (orderId: string) => {
  console.log(`Handling order shipped event for Order ID: ${orderId}`);
});

// Emit events
emitter.emit("orderPlaced", "123");
emitter.emit("orderPlaced", "124"); // Throttled event, will not be emitted immediately
setTimeout(() => emitter.emit("orderPlaced", "125"), 2500); // This will work after 2 seconds
emitter.emit("orderShipped", "123");


// why this code is useful
// This code is useful for scenarios where you want to limit the frequency of event emissions.
// For example, in a chat application, you might want to throttle the sending of messages to avoid overwhelming the server.