import { monitoring } from './monitoring';

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 400,
    public metadata?: Record<string, any>
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const errorHandler = {
  async handle(error: any) {
    if (error instanceof AppError) {
      await monitoring.log({
        level: 'error',
        message: error.message,
        metadata: {
          code: error.code,
          statusCode: error.statusCode,
          ...error.metadata
        }
      });
      return error;
    }

    // Handle Supabase errors
    if (error.code?.startsWith('PGRST')) {
      const appError = new AppError(
        'Database operation failed',
        'DB_ERROR',
        500,
        { originalError: error }
      );
      await monitoring.log({
        level: 'error',
        message: appError.message,
        metadata: { code: appError.code, originalError: error }
      });
      return appError;
    }

    // Handle Web3 errors
    if (error.code?.startsWith('UNPREDICTABLE_GAS_LIMIT') || error.code?.startsWith('CALL_EXCEPTION')) {
      const appError = new AppError(
        'Blockchain operation failed',
        'BLOCKCHAIN_ERROR',
        500,
        { originalError: error }
      );
      await monitoring.log({
        level: 'error',
        message: appError.message,
        metadata: { code: appError.code, originalError: error }
      });
      return appError;
    }

    // Generic error
    const appError = new AppError(
      'An unexpected error occurred',
      'INTERNAL_ERROR',
      500,
      { originalError: error }
    );
    await monitoring.log({
      level: 'error',
      message: appError.message,
      metadata: { code: appError.code, originalError: error }
    });
    return appError;
  }
};