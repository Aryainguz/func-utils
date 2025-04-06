type Factory<TConfig, TService> = (config: TConfig) => TService;

export function createServiceFactory<TConfig, TService>() {
  const registry = new Map<string, TService>();

  return {
    create: (key: string, config: TConfig, factoryFn: Factory<TConfig, TService>): TService => {
      if (registry.has(key)) return registry.get(key)!;
      const instance = factoryFn(config);
      registry.set(key, instance);
      return instance;
    },
    get: (key: string): TService | undefined => {
      return registry.get(key);
    },
    has: (key: string) => registry.has(key),
    clear: () => registry.clear(),
  };
}

// Example usage:
// This is a simple example of how to use the createServiceFactory function
// Say you have a Mailer service
class Mailer {
    constructor(private config: { apiKey: string }) {}
    send(to: string, message: string) {
      console.log(`Sending to ${to} via ${this.config.apiKey}: ${message}`);
    }
  }
  
  // Create a factory for it
  const mailerFactory = createServiceFactory<{ apiKey: string }, Mailer>();
  
  // Instantiate or retrieve existing
  const mailer = mailerFactory.create("main", { apiKey: "SENDGRID_KEY" }, (cfg) => new Mailer(cfg));
  
  mailer.send("hello@example.com", "Welcome to the club");
  
  // Reuse existing one later
  const reusedMailer = mailerFactory.get("main");
  reusedMailer?.send("hi@again.com", "Still here 👋");
  