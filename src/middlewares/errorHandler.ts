import type { ErrorRequestHandler } from 'express';
import { type IServerAppError, UnexpectedError } from '#errors';

const isAppError = (error: Error): error is IServerAppError => {
  return 'statusCode' in error;
};

export default (): ErrorRequestHandler => (err: Error, _req, res, _next) => {
  // --- CASE: Error is thrown by app ------------------------
  if (isAppError(err)) {
    res.status(err.statusCode).send({
      statusCode: genStatusCode(err.name),
      message: err.message,
      errors: err.errors,
    });

    // Emit error event to be logged by `pino-http` (without this, pino-http will treat it as a success)
    res.emit('error', err);

    return;
  }

  // --- CASE: Unexpected error ------------------------------
  res.status(500).send({
    statusCode: genStatusCode(err.name),
    message:
      process.env.NODE_ENV === 'production'
        ? 'Internal Server Error'
        : 'message' in err
          ? err.message
          : 'Internal Server Error',
  });

  // Emit error event to be logged by `pino-http`
  res.emit('error', new UnexpectedError(err));
};

function genStatusCode(name: string) {
  return (
    'ERROR' +
    name
      .slice(0, -5)
      .replace(/[A-Z]/g, letter => `_${letter}`)
      .toUpperCase()
  );
}
