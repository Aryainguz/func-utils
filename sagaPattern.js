const EventEmitter = require('events');

class SagaOrchestrator extends EventEmitter {}
const saga = new SagaOrchestrator();

// Order Service: Handles order creation and cancellation
class OrderService {
  constructor() {
    this.orders = {};
    saga.on('orderCreated', (order) => {
      console.log(`OrderService: Order ${order.id} created.`);
      // Proceed to process payment
      saga.emit('startPayment', order);
    });

    saga.on('paymentFailed', (order) => {
      console.log(`OrderService: Payment failed for order ${order.id}. Cancelling order.`);
      // Compensating action: cancel the order
      delete this.orders[order.id];
      saga.emit('orderCancelled', order);
    });

    saga.on('paymentSucceeded', (order) => {
      console.log(`OrderService: Payment succeeded for order ${order.id}. Order complete.`);
      // Order is now finalized
    });
  }

  createOrder(order) {
    this.orders[order.id] = order;
    saga.emit('orderCreated', order);
  }
}

// Payment Service: Processes payment for the order
class PaymentService {
  constructor() {
    saga.on('startPayment', (order) => {
      console.log(`PaymentService: Processing payment for order ${order.id}...`);
      // Simulate payment processing (random success/failure)
      const paymentSuccess = Math.random() > 0.5;
      if (paymentSuccess) {
        console.log(`PaymentService: Payment succeeded for order ${order.id}.`);
        saga.emit('paymentSucceeded', order);
      } else {
        console.log(`PaymentService: Payment failed for order ${order.id}.`);
        saga.emit('paymentFailed', order);
      }
    });
  }
}

// Instantiate services
const orderService = new OrderService();
const paymentService = new PaymentService();

// Simulate creating an order
orderService.createOrder({ id: 1, amount: 100 });
