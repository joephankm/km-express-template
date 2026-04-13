import { type IServerAppError, ErrorLevel } from './errorTypes';

export default class UnauthenticatedError extends Error implements IServerAppError {
  statusCode = 401;

  name = 'UnauthenticatedError';

  errorLevel = ErrorLevel.Validation;

  constructor(message = 'Authentication required') {
    super(message);
  }
}
