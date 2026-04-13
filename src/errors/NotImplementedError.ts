import { type IServerAppError, ErrorLevel } from './errorTypes';

export default class NotImplementedError extends Error implements IServerAppError {
  statusCode = 501;

  name = 'NotImplementedError';

  errorLevel = ErrorLevel.Unhandled;

  constructor(message = 'Not implemented') {
    super(message);
  }
}
