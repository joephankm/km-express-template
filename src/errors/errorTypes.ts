/**
 * Application error levels based on impact and handling strategy.
 */
export enum ErrorLevel {
  /**
   * Errors caused by invalid client input or request format.
   *
   * Use cases:
   *   - Invalid request path, body, query, or params
   *   - Input validation failure
   *   - Unauthenticated access
   *
   * Expected behavior:
   *   - Do not log or log at low level (noise)
   *   - Notice client so they can fix the input
   */
  Validation = 'validation',

  /**
   * Request is valid but cannot be processed due to application rules or state.
   *
   * Use cases:
   *   - Business rule violation (e.g. duplicate, limit exceeded)
   *   - Invalid state transition
   *   - Action not allowed under current conditions
   *
   * Expected behavior:
   *   - Log for tracking
   *   - Return meaningful error to the client
   */
  Rejected = 'rejected',

  /**
   * High-impact error that may affect system behavior or data integrity.
   *
   * Use cases:
   *   - Failure in critical flow
   *   - Inconsistent or corrupted state detected
   *   - Important operation failed (migration, external integration)
   *
   * Expected behavior:
   *   - Log at fatal error level
   *   - Investigate promptly and fix as soon as possible
   *   - Should alert admin
   */
  Critical = 'critical',

  /**
   * Unexpected error due to missing or incorrect handling in code.
   *
   * Use cases:
   *   - Unhandled edge case
   *   - Logic branch not covered
   *   - Runtime error that should have been anticipated
   *
   * Expected behavior:
   *   - Log with full context (stack trace, location, input)
   *   - Fix in code to prevent recurrence (by developers)
   */
  Unhandled = 'unhandled',

  /**
   * System-level or external failure outside application control.
   *
   * Use cases:
   *   - Database connection failure
   *   - Network timeout / DNS issue
   *   - Third-party service unavailable
   *
   * Expected behavior:
   *   - Log at fatal level
   *   - Trigger alerting
   *   - Apply retry / fallback if possible
   */
  System = 'system',
}

export interface IServerAppError extends Error {
  /**
   * HTTP status code 4xx - 5xx
   */
  statusCode: number;

  /**
   * Detail error status which always start with "ERROR_"
   */
  // errorStatus: `ERROR_${string}`;

  /**
   * Some error has multiple detail errors. ONLY define when the error has multiple detail.
   * For example, validation has multiple error fields.
   */
  errors?: unknown[];

  /**
   * The level of error
   *
   * @see ErrorLevel
   */
  errorLevel: ErrorLevel;
}
