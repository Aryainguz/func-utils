import axios from 'axios';

interface HealthCheckOptions {
  url: string;
  timeout: number;
  retries: number;
  alertFn: (serviceName: string, message: string) => void;
}

class ServiceHealthChecker {
  private services: Record<string, HealthCheckOptions>;

  constructor() {
    this.services = {};
  }

  // Register a service with a health check configuration
  public registerService(serviceName: string, options: HealthCheckOptions): void {
    this.services[serviceName] = options;
  }

  // Perform health check on a single service
  private async checkServiceHealth(serviceName: string, options: HealthCheckOptions): Promise<boolean> {
    let attempts = 0;
    while (attempts < options.retries) {
      try {
        const response = await axios.get(options.url, { timeout: options.timeout });
        if (response.status === 200) {
          console.log(`${serviceName} is healthy.`);
          return true;
        }
      } catch (error) {
        attempts++;
        console.log(`Attempt ${attempts} for ${serviceName} failed: ${error.message}`);
        if (attempts >= options.retries) {
          options.alertFn(serviceName, 'Service is down after multiple attempts');
        }
      }
    }
    return false;
  }

  // Check all registered services
  public async checkAllServices(): Promise<void> {
    for (const [serviceName, options] of Object.entries(this.services)) {
      await this.checkServiceHealth(serviceName, options);
    }
  }

  // Start periodic health checks at a specified interval
  public startHealthChecks(interval: number): void {
    setInterval(() => this.checkAllServices(), interval);
  }
}

export default ServiceHealthChecker;


// Example usage

// Create an instance of the health checker
const healthChecker = new ServiceHealthChecker();

// Example alert function
const alertFn = (serviceName: string, message: string) => {
  console.log(`ALERT: ${serviceName} - ${message}`);
  // You could send an email, or trigger a webhook here, e.g., to Slack.
};

// Register a service to be monitored
healthChecker.registerService('UserService', {
  url: 'http://localhost:3000/health', // Health endpoint of the service
  timeout: 5000, // Timeout in ms
  retries: 3, // Retry 3 times before marking as down
  alertFn: alertFn, // Alert function to call when service fails
});

// Register another service
healthChecker.registerService('PaymentService', {
  url: 'http://localhost:4000/health',
  timeout: 5000,
  retries: 2,
  alertFn: alertFn,
});

// Start periodic health checks every 30 seconds
healthChecker.startHealthChecks(30000);
