type Constructor<T extends object> = new (...args: any[]) => T;

export function createSingleton<T extends object>(BaseClass: Constructor<T>): () => T {
  let instance: T | null = null;

  return () => {
    if (!instance) {
      instance = new BaseClass(); // Create the instance using the constructor
    }
    return instance;
  };
}

// Usage example

class Config {
  constructor(private value: string) {} // Changed to public constructor
  getConfig() {
    return this.value;
  }
}

// Singleton instance creation using the constructor
const SingletonConfig = createSingleton(Config);

const config1 = SingletonConfig();
const config2 = SingletonConfig();

console.log(config1 === config2); // true
