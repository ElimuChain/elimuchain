import { ethers } from 'ethers';

export class ValidationService {
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }
    return true;
  }

  static validateEthereumAddress(address: string): boolean {
    try {
      const checksumAddress = ethers.getAddress(address);
      return true;
    } catch {
      throw new Error('Invalid Ethereum address');
    }
  }

  static validateCredentialTitle(title: string): boolean {
    if (!title || title.trim().length < 3 || title.trim().length > 100) {
      throw new Error('Credential title must be between 3 and 100 characters');
    }
    return true;
  }

  static validateCredentialDescription(description: string): boolean {
    if (description && description.trim().length > 500) {
      throw new Error('Credential description must not exceed 500 characters');
    }
    return true;
  }

  static sanitizeInput(input: string): string {
    return input
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .trim();
  }

  static validateUserType(type: string): boolean {
    const validTypes = ['student', 'institution', 'employer'];
    if (!validTypes.includes(type)) {
      throw new Error('Invalid user type');
    }
    return true;
  }
}

export const validation = ValidationService;