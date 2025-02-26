import { supabase } from './supabase';
import { monitoring } from './monitoring';
import { ethers } from 'ethers';

export class SecurityService {
  private static instance: SecurityService;
  private readonly MAX_LOGIN_ATTEMPTS = 5;
  private readonly LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes
  private readonly WALLET_VALIDATION_TIMEOUT = 30000; // 30 seconds
  private loginAttempts: Map<string, { count: number; timestamp: number }> = new Map();
  private walletValidations: Map<string, number> = new Map();

  private constructor() {}

  static getInstance(): SecurityService {
    if (!SecurityService.instance) {
      SecurityService.instance = new SecurityService();
    }
    return SecurityService.instance;
  }

  async validateLoginAttempt(email: string): Promise<boolean> {
    const attempt = this.loginAttempts.get(email);
    const now = Date.now();

    if (attempt) {
      if (now - attempt.timestamp < this.LOCKOUT_DURATION && attempt.count >= this.MAX_LOGIN_ATTEMPTS) {
        await monitoring.log({
          level: 'warn',
          message: 'Account locked due to multiple failed login attempts',
          metadata: { email }
        });
        throw new Error('Account temporarily locked. Please try again later.');
      }

      if (now - attempt.timestamp >= this.LOCKOUT_DURATION) {
        this.loginAttempts.delete(email);
      }
    }

    return true;
  }

  async validateWalletConnection(address: string): Promise<boolean> {
    const now = Date.now();
    const lastValidation = this.walletValidations.get(address);

    if (lastValidation && now - lastValidation < this.WALLET_VALIDATION_TIMEOUT) {
      throw new Error('Please wait before attempting to reconnect');
    }

    // Validate address format
    try {
      ethers.getAddress(address); // Will throw if invalid
    } catch {
      throw new Error('Invalid wallet address format');
    }

    // Check if address is already associated with another user
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('wallet_address', address)
      .single();

    if (existingUser) {
      // Verify the user has proper permissions
      const { data: userType } = await supabase
        .from('users')
        .select('user_type')
        .eq('id', existingUser.id)
        .single();

      if (!userType) {
        throw new Error('User type not found');
      }
    }

    this.walletValidations.set(address, now);
    return true;
  }

  async recordFailedLogin(email: string): Promise<void> {
    const attempt = this.loginAttempts.get(email) || { count: 0, timestamp: Date.now() };
    attempt.count++;
    attempt.timestamp = Date.now();
    this.loginAttempts.set(email, attempt);

    await monitoring.log({
      level: 'warn',
      message: 'Failed login attempt',
      metadata: { email, attemptCount: attempt.count }
    });
  }

  async validateCredentialOperation(userId: string, operation: 'issue' | 'verify'): Promise<boolean> {
    const { data: user } = await supabase
      .from('users')
      .select('user_type, wallet_address')
      .eq('id', userId)
      .single();

    if (!user) {
      throw new Error('User not found');
    }

    if (operation === 'issue' && user.user_type !== 'institution') {
      throw new Error('Only institutions can issue credentials');
    }

    if (operation === 'verify' && user.user_type !== 'employer') {
      throw new Error('Only employers can verify credentials');
    }

    if (user.user_type === 'institution' && !user.wallet_address) {
      throw new Error('Institution must connect wallet before issuing credentials');
    }

    return true;
  }

  async validatePasswordStrength(password: string): Promise<boolean> {
    const minLength = 12; // Increased from 8
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNoCommonPatterns = !/(123|password|admin|qwerty)/i.test(password);

    if (
      password.length < minLength ||
      !hasUpperCase ||
      !hasLowerCase ||
      !hasNumbers ||
      !hasSpecialChar ||
      !hasNoCommonPatterns
    ) {
      throw new Error(
        'Password must be at least 12 characters long and contain uppercase, lowercase, numbers, and special characters. Common patterns are not allowed.'
      );
    }

    return true;
  }

  async validateTransactionRequest(
    userId: string,
    operation: string,
    metadata: Record<string, any>
  ): Promise<boolean> {
    // Validate user permissions
    const { data: user } = await supabase
      .from('users')
      .select('user_type, wallet_address')
      .eq('id', userId)
      .single();

    if (!user) {
      throw new Error('User not found');
    }

    // Operation-specific validations
    switch (operation) {
      case 'issue_credential':
        if (user.user_type !== 'institution') {
          throw new Error('Only institutions can issue credentials');
        }
        if (!metadata.recipientId || !metadata.credentialType) {
          throw new Error('Invalid credential parameters');
        }
        break;

      case 'verify_credential':
        if (user.user_type !== 'employer') {
          throw new Error('Only employers can verify credentials');
        }
        if (!metadata.credentialId) {
          throw new Error('Invalid verification parameters');
        }
        break;

      default:
        throw new Error('Invalid operation type');
    }

    return true;
  }
}

export const security = SecurityService.getInstance();