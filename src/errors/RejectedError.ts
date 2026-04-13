import { type IServerAppError, ErrorLevel } from './errorTypes';

export default class RejectedError extends Error implements IServerAppError {
  statusCode = 409;

  name = 'RejectedError';

  errorLevel = ErrorLevel.Rejected;

  constructor(message = 'Request could not be processed') {
    super(message);
  }
}
