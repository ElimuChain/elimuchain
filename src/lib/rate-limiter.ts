class RateLimiter {
  private static instance: RateLimiter;
  private limits: Map<string, { count: number; timestamp: number }> = new Map();
  
  private readonly WINDOW_MS = 60000; // 1 minute
  private readonly LIMITS = {
    'credential:issue': 10,    // 10 requests per minute
    'credential:verify': 20,   // 20 requests per minute
    'user:update': 5,         // 5 requests per minute
    'api:default': 30         // 30 requests per minute
  };

  private constructor() {}

  static getInstance(): RateLimiter {
    if (!RateLimiter.instance) {
      RateLimiter.instance = new RateLimiter();
    }
    return RateLimiter.instance;
  }

  async checkLimit(key: string, action: string): Promise<boolean> {
    const limit = this.LIMITS[action as keyof typeof this.LIMITS] || this.LIMITS['api:default'];
    const now = Date.now();
    const windowKey = `${key}:${action}`;
    const current = this.limits.get(windowKey);

    if (!current || now - current.timestamp >= this.WINDOW_MS) {
      this.limits.set(windowKey, { count: 1, timestamp: now });
      return true;
    }

    if (current.count >= limit) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    current.count++;
    return true;
  }

  async resetLimit(key: string, action: string): Promise<void> {
    const windowKey = `${key}:${action}`;
    this.limits.delete(windowKey);
  }
}

export const rateLimiter = RateLimiter.getInstance();