import { type IServerAppError, ErrorLevel } from './errorTypes';

export default class NotFoundError extends Error implements IServerAppError {
  statusCode = 404;

  name = 'NotFoundError';

  errorLevel = ErrorLevel.Validation;

  constructor(resource = 'Resource') {
    super(`${resource} not found`);
  }
}
