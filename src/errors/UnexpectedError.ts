import { type IServerAppError, ErrorLevel } from './errorTypes';

export default class UnexpectedError extends Error implements IServerAppError {
  statusCode = 500;

  name = 'UnexpectedError';

  errorLevel = ErrorLevel.Unhandled;

  constructor(error: Error) {
    super(error.message);
  }
}
