import { type IServerAppError, ErrorLevel } from './errorTypes';

export default class ValidationError extends Error implements IServerAppError {
  statusCode = 422;

  name = 'ValidationError';

  errorLevel = ErrorLevel.Validation;

  errors?: unknown[];

  constructor(message = 'Validation failed', errors?: unknown[]) {
    super(message);
    this.errors = errors;
  }
}
