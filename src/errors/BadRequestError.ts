import { type IServerAppError, ErrorLevel } from './errorTypes';

export default class BadRequestError extends Error implements IServerAppError {
  statusCode = 400;

  // errorStatus = 'ERROR_BAD_REQUEST' as const;

  name = 'BadRequestError';

  errorLevel = ErrorLevel.Validation;
}
