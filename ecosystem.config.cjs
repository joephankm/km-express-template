// ⚙️ PM2 Configuration. <Last updated: 2026-05-05>
// Docs:  https://pm2.keymetrics.io/docs/usage/application-declaration/  -- PM2 Configuration
// Guide: docs/js-foundation/server/runtime/pm2.md

const appBuilder = createBuilder({
  // Namespace (prefix for all PM2 process names, e.g. `<namespace>:<name>:<env>`)
  namespace: 'km-template',

  // Default dev script from package.json (used when NODE_ENV=development)
  devScript: 'start',

  // Logger level: 'error' | 'warn' | 'info' | 'debug' | 'trace' (default: 'debug')
  logLevel: 'debug',

  // In-project directory for auto-generated log files, set null to use PM2 default directory (e.g. `~/.pm2/logs`)
  logDir: './logs',
});

console.log(__filename.split('/').pop());

module.exports = appBuilder.defineConfig(appBuilder.nodeApp('express-service'));

/* ════════════════════════════════════════════════════════╗
 ║                         HELPERS                         ║
 ╚════════════════════════════════════════════════════════ */

/**
 * Creates a reusable PM2 builder scoped to a shared namespace, log directory, and default options.
 *
 * @param {object} options
 * @param {string} options.namespace - PM2 namespace for grouping processes (e.g. shown in `pm2 list`)
 * @param {string} options.devScript - Default pnpm script used to start the app in non-production
 * @param {string} options.logDir - Directory for auto-generated log files
 * @param {LogLevel} [options.logLevel] - Minimum log level for builder's internal logger
 * @param {string} [options.packageManager] - Package manager name; auto-detected from `package.json` if omitted
 * @param {string} [options.outputPath] - Default STDOUT log file path (overridable per app)
 * @param {string} [options.errorPath] - Default STDERR log file path (overridable per app)
 * @param {string} [options.outputEnv] - Env var name whose value overrides the STDOUT log path
 * @param {string} [options.errorEnv] - Env var name whose value overrides the STDERR log path
 *
 * @see {@link https://github.com/Unitech/pm2/blob/master/types/index.d.ts - PM2 Configuration Types}
 */
function createBuilder({ namespace, logDir, packageManager, logLevel, ...defaultOptions }) {
  /**
   * Applies default values for missing fields.
   *
   * @param {Object} values
   */
  function _fillDefaults(values) {
    let field;
    for (field in values) {
      if (!values[field] && defaultOptions[field]) {
        values[field] = defaultOptions[field];
      }
    }

    return values;
  }

  /**
   * Process common options which will be used in every build methods (purpose is to avoid duplicated code).
   *
   * @param {Object} startOptions - Script config returned by `scriptOptions()` (must contain `script`)
   * @param {string} name - App name before namespace/env decoration
   * @param {Object} [appOptions]
   */
  function _buildOptions(startOptions, name, { outputPath, errorPath, outputEnv, errorEnv, ...restOptions } = {}) {
    /** @see {@link https://github.com/Unitech/pm2/blob/master/types/index.d.ts Configuration Types} -> `StartOptions` */

    // Format process name
    Object.assign(startOptions, nameOptions(name, namespace));

    // Set log file paths
    Object.assign(
      startOptions,
      logOptions(startOptions.name, _fillDefaults({ logDir, outputPath, errorPath, outputEnv, errorEnv }))
    );

    // There are many options from `StartOptions` we cannot handle all, just pass them to the options
    if (Object.keys(restOptions).length > 0) Object.assign(startOptions, restOptions);

    return Object.fromEntries(
      Object.entries(startOptions).map(([key, val]) => [
        key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`),
        val,
      ])
    );
  }

  const logger = createLogger({ name: 'EcoConfig', level: logLevel });

  return {
    /**
     * Wrap one or more app configs into a PM2 ecosystem config and log the resolved configuration.
     *
     * @param {...Object} apps
     * @return {{ apps: Object[] }}
     */
    defineConfig(...apps) {
      const config = { apps };
      logger.debug(
        `Load \`${__filename.split('/').pop()}\` file in '${process.env.APP_ENV || process.env.NODE_ENV}' environment`,
        { data: config }
      );

      return config;
    },

    /**
     * Builds a PM2 config for a Node.js service.
     *
     * Behavior:
     *   - Production  -> runs compiled entry (e.g. `dist/server.js`)
     *   - Development -> runs `devScript
     *
     * @param {string} name - Service name (namespace and env suffix are added automatically)
     * @param {string} [entryFile] - Compiled entry (default: `dist/server.js`)
     * @param {Object} [options]
     * @param {string} [options.devScript] - pnpm script to use in non-production (overrides builder default)
     * @param {...*} [options] - Any additional PM2 `StartOptions`; keys are converted to snake_case automatically
     */
    nodeApp(name, entryFile, { devScript, ...restOptions } = {}) {
      return _buildOptions(scriptOptions('node', entryFile, _fillDefaults({ devScript, logger })), name, restOptions);
    },

    /**
     * Builds a PM2 config for a frontend (SPA) service.
     *
     * Behavior:
     *   - Production  -> serves static build directory
     *   - Development -> runs `devScript`
     *
     * @param {string} name - Service name (namespace and env suffix are added automatically)
     * @param {string} [buildDir] - Build directory (default: `build/`)
     * @param {Object} [options]
     * @param {string} [options.devScript] - pnpm script to use in non-production (overrides builder default)
     * @param {...*} [options] - Any additional PM2 `StartOptions`; keys are converted to snake_case automatically
     */
    frontendApp(name, buildDir, { devScript, ...restOptions } = {}) {
      return _buildOptions(
        scriptOptions('frontend', buildDir, _fillDefaults({ devScript, logger })),
        name,
        restOptions
      );
    },

    /**
     * Builds a PM2 config for a script-based service.
     *
     * Behavior:
     *   - Production → runs specified script
     *   - Development → runs `devScript`
     *
     * @param {string} name - Service name (namespace and env suffix are added automatically)
     * @param {string} [startScript] - Script name (default: `server`)
     * @param {Object} [options]
     * @param {string} [options.devScript] - pnpm script to use in non-production (overrides builder default)
     * @param {...*} [options] - Any additional PM2 `StartOptions`; keys are converted to snake_case automatically
     */
    startScript(name, startScript, { devScript, ...restOptions } = {}) {
      return _buildOptions(
        scriptOptions('script', startScript, _fillDefaults({ devScript, logger })),
        name,
        restOptions
      );
    },
  };
}

/**
 * Generates a standardized PM2 process name.
 *
 * Format:
 *   [namespace]:[name]:[env]
 *
 * Process name will follow practices:
 *   - Prefix with namespace (abbr characters) if provided
 *   - Subfix with environment (getting from APP_ENV or NODE_ENV)
 * Rules:
 *   - Namespace is abbreviated if too long (e.g. `my-project` -> `mp`)
 *   - Environment is derived from `APP_ENV` or `NODE_ENV`
 *   - Production env is uppercased
 *
 * @param {string} name
 * @param {string} [namespace]
 */
function nameOptions(name, namespace) {
  // Prefix with namespace
  if (namespace) {
    // If namespace is too long, abbr it by first letters
    let ns;
    if (namespace.length > 5) {
      ns = namespace
        .split('-')
        .map(w => w[0])
        .join('');
    } else {
      ns = namespace;
    }

    name = `${ns}:${name}`;
  }

  const appEnv = process.env.APP_ENV || process.env.NODE_ENV;

  // Suffix with environment
  if (appEnv) {
    // If environment is too long, make sure it short
    let envName;
    if (appEnv === 'development') {
      envName = 'dev';
    } else if (appEnv.length > 5) {
      envName = appEnv.substring(0, 4);
    } else {
      envName = appEnv;
    }

    if (process.env.NODE_ENV === 'production') {
      envName = envName.toUpperCase();
    }

    name += `:${envName}`;
  }

  return { name, namespace };
}

/**
 * Resolves the runtime script configuration based on app type.
 *
 * Behavior:
 *   - In development -> prefer to run run `devScript` (if provided)
 *   - In production  -> runs based on `appType`
 *
 * Supported types:
 *   - `node`     -> run compiled entry file
 *   - `script`   -> run package manager script
 *   - `frontend` -> serve static build directory
 *
 * @param {'node' | 'script' | 'frontend'} appType
 * @param {string} [entry] - Entry based on type
 * @param {object} [options]
 * @param {string} [options.devScript] - pnpm script name used when in non-production mode
 * @param {string} [options.packageManager] - Package manager name; auto-detected from `package.json` if omitted
 * @param {number} [options.port] - Port for `frontend` type; falls back to `portEnv` env var
 * @param {string} [options.portEnv] - Env var name to read the port from (default: `PORT`)
 * @param {Logger} [options.logger] - Logger instance for startup info messages
 */
function scriptOptions(appType, entry, { port, portEnv = 'PORT', packageManager, devScript = 'start', logger } = {}) {
  const useDevScript = process.env.NODE_ENV === 'development' && devScript;

  // In "development" environment, always delegates to a script.
  if (useDevScript) {
    appType = 'script';
    entry = devScript;
  }

  switch (appType) {
    case 'script': {
      // In 1 project, package manager should always be consistent
      if (!scriptOptions.packageManager) {
        if (packageManager) {
          scriptOptions.packageManager = packageManager;
        }
        // If no "packageManager" input, auto get from "package.json" file.
        else {
          const packageManagerName = require('./package.json').packageManager;

          if (!packageManagerName) {
            throw new Error('Either input "packageManager" option or set "packageManager" in "package.json" file');
          }

          scriptOptions.packageManager = packageManagerName.split('@')[0];
        }
      }

      // Set default start script
      entry ??= 'server';

      logger?.info(
        `${useDevScript ? '🧰' : '⚡️'}️ Start a "${useDevScript ? 'dev' : 'script'}" process: running \`${scriptOptions.packageManager} run ${entry}\``
      );

      return {
        script: scriptOptions.packageManager,
        args: ['run', entry],
      };
    }

    case 'frontend': {
      if (!port) {
        if (process.env[portEnv]) {
          port = process.env[portEnv];
        } else {
          throw new Error('Either input "port" option or use env and input "portEnv" option');
        }
      }

      // Set default build directory
      entry ??= './build';

      logger?.info(`🎨 Start a "frontend" process: serving "${entry}" folder in port ${port}`);

      return {
        script: 'serve',
        env: {
          PM2_SERVE_PATH: entry,
          PM2_SERVE_PORT: port,
          PM2_SERVE_SPA: true,
        },
      };
    }

    default: {
      // Set default entry file
      entry ??= 'dist/servera.js';

      logger?.info(`🚀 Start a "node" process: start server from entry "${entry}"`);

      return {
        script: entry,
      };
    }
  }
}

/**
 * Builds log path config.
 *
 * @param { string } appName
 * @param { object } [options]
 * @param { string } [options.logDir]
 * @param { string } [options.outputPath]
 * @param { string } [options.errorPath]
 * @param { string } [options.outputEnv]
 * @param { string } [options.errorEnv]
 */
function logOptions(appName, { logDir, outputPath, errorPath, outputEnv, errorEnv } = {}) {
  /**
   * Resolves a log file path using the first available source in priority order:
   *   env var -> input path -> auto-generated name under "logDir".
   *
   * @param {string} [path] - Explicit file path or filename (joined with `logDir` if no `/` present)
   * @param {string} [env] - Env var name whose value overrides everything else
   * @param {string} [defaultSuffix] - Suffix appended to the auto-generated filename (e.g. `'output'`, `'error'`)
   */
  function _logPath(path, env, defaultSuffix) {
    if (env && process.env[env]) {
      return process.env[env];
    }

    if (path) {
      return !path.includes('/') && logDir ? `${logDir}/${path}` : path;
    }

    if (logDir) {
      const SEPARATOR = '--';
      let logName = appName;

      // Strips the namespace segment (everything before the first colon)
      if (appName.match(/:/g).length > 1) logName = logName.substring(appName.indexOf(':') + 1);

      logName = logName.replaceAll(':', SEPARATOR);

      if (defaultSuffix) logName += `${SEPARATOR}${defaultSuffix}`;

      return `${logDir}/${logName}.log`;
    }
  }

  const logOptions = {
    logDateFormat: 'YY-MM-DD HH:mm:ss',
  };

  const output = _logPath(outputPath, outputEnv, 'output');
  if (output) logOptions.output = output;

  const error = _logPath(errorPath, errorEnv, 'error');
  if (error) logOptions.error = error;

  return logOptions;
}

/* ════════════════════════════════════════════════════════╗
 ║                          UTILS                          ║
 ╚════════════════════════════════════════════════════════ */

/**
 * In-file logger (easy to copy and customize).
 *
 * Provides 5 log levels (compatible with `console.*`) and supports level-based filtering.
 *
 * @param options
 * @param {string} [options.name]
 * @param {LogLevel} [options.level]
 * @return {Logger}
 */
function createLogger({ name, level = 'info' }) {
  /**
   * Available level
   * @typedef {'error' | 'warn' | 'info' | 'debug' | 'trace'} LogLevel
   */

  /** @type {Record<string, string>} */
  // prettier-ignore
  const COLORS = {
    error: '\x1b[31m', warn: '\x1b[33m', info: '\x1b[34m', debug: '\x1b[35m', trace: '\x1b[37m',
    label: '\x1b[1m', data: '\x1b[3m', reset: '\x1b[0m',
  }

  /** @type {LogLevel[]} */
  const LEVELS = ['error', 'warn', 'info', 'debug', 'trace'];
  /** @type {LogLevel[]} */
  const ERROR_LEVELS = ['error', 'warn'];

  if (!LEVELS.includes(level)) {
    throw new Error(`"level" option must be one of '${LEVELS.join("', '")}' (current: '${level}')`);
  }

  const availableLevels = LEVELS.slice(0, LEVELS.indexOf(level) + 1);

  const labels = {};
  for (const level of availableLevels) {
    labels[level] =
      `${COLORS.label}${name ? `${COLORS[level]}[${name}] ` : ''}${level.toUpperCase()}:${!ERROR_LEVELS.includes(level) ? COLORS.reset : ''}`;
  }

  /**
   * Returns a real log function for the given level.
   *
   * @param {LogLevel} level
   * @return {LogFunc}
   */
  const _createLogFunc = level => {
    if (!availableLevels.includes(level)) return () => {};

    /**
     * Log function
     *
     * Options:
     *   - "data": additionally log "data" as `JSON.stringify()`
     *   - "list": additionally log "list" as `console.table()`
     *
     * @typedef {function} LogFunc
     * @param {string} message
     * @param {Object} [options]
     */
    return (message, options) => {
      // Format: "[name] LEVEL: message"
      console[level](`${labels[level]} ${message}${options ? ':\n' : ''}`);

      // Handle additional logging
      if (options) {
        if (options.data)
          console[level](
            `${COLORS.data}${COLORS[level]}` + JSON.stringify(options.data, null, 2) + `${COLORS.reset}\n`
          );
        if (options.list) console.table(options.list);
      }
    };
  };

  /**
   * @typedef {Object} Logger
   * @property {LogFunc} error
   * @property {LogFunc} warn
   * @property {LogFunc} info
   * @property {LogFunc} debug
   * @property {LogFunc} trace
   */

  return {
    error: _createLogFunc('error'),
    warn: _createLogFunc('warn'),
    info: _createLogFunc('info'),
    debug: _createLogFunc('debug'),
    trace: _createLogFunc('trace'),
  };
}
