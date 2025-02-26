import { supabase } from './supabase';

export interface LogEntry {
  level: 'info' | 'warn' | 'error';
  message: string;
  metadata?: Record<string, any>;
  timestamp: string;
}

class MonitoringService {
  private static instance: MonitoringService;
  private readonly ALERT_THRESHOLD = 3; // Number of errors before alerting
  private errorCount: Map<string, number> = new Map();

  private constructor() {}

  static getInstance(): MonitoringService {
    if (!MonitoringService.instance) {
      MonitoringService.instance = new MonitoringService();
    }
    return MonitoringService.instance;
  }

  async log(entry: Omit<LogEntry, 'timestamp'>) {
    const timestamp = new Date().toISOString();
    const logEntry = { ...entry, timestamp };

    // Store log in Supabase
    await supabase.from('system_logs').insert([logEntry]);

    // Check for error threshold
    if (entry.level === 'error') {
      const errorKey = entry.message;
      const currentCount = (this.errorCount.get(errorKey) || 0) + 1;
      this.errorCount.set(errorKey, currentCount);

      if (currentCount >= this.ALERT_THRESHOLD) {
        await this.sendAlert(entry.message, currentCount);
        this.errorCount.delete(errorKey); // Reset counter after alert
      }
    }

    // Log to console in development
    if (import.meta.env.DEV) {
      console[entry.level](entry.message, entry.metadata || '');
    }
  }

  private async sendAlert(message: string, count: number) {
    // Send alert to configured endpoint
    const alertEndpoint = import.meta.env.VITE_ALERT_WEBHOOK;
    if (alertEndpoint) {
      try {
        await fetch(alertEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: `Alert: ${message}`,
            count,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (error) {
        console.error('Failed to send alert:', error);
      }
    }
  }

  async collectMetrics() {
    const metrics = {
      timestamp: new Date().toISOString(),
      activeUsers: await this.getActiveUsers(),
      pendingVerifications: await this.getPendingVerifications(),
      systemHealth: await this.checkSystemHealth(),
    };

    await supabase.from('system_metrics').insert([metrics]);
    return metrics;
  }

  private async getActiveUsers() {
    const { count } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .gte('last_activity', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());
    return count || 0;
  }

  private async getPendingVerifications() {
    const { count } = await supabase
      .from('verifications')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');
    return count || 0;
  }

  private async checkSystemHealth() {
    try {
      const [dbHealth, authHealth] = await Promise.all([
        supabase.from('users').select('id', { count: 'exact', head: true }),
        supabase.auth.getSession(),
      ]);
      return { database: true, auth: true };
    } catch (error) {
      return { database: false, auth: false };
    }
  }
}

export const monitoring = MonitoringService.getInstance();