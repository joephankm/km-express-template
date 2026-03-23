# 🌳 Setup Environment in JavaScript Application

<p align="right"><em>&lt;Last updated: 2026-03-23&gt;</em></p>

> ### 🗂️ Contents
>   - 🌍 [Load Environment](#-load-environment-)
>   - 🚧 [Ignore Blocking Errors During Development](#-ignore-blocking-errors-during-development-)

************

[⤴️ Back: **Node Environment**](-intro.md)\
[◀️ Previous: **Configure TypeScript Environment**](typescript-environment.md)

************

## 🌍 Load Environment [🔺](#-setup-environment-in-javascript-application)

Modern JavaScript projects often rely on environment variables to control runtime behavior such as configuration,
secrets, feature flags, and deployment settings.

To manage environment variables in a predictable and scalable way, it is recommended to follow the [**dotenv-flow**](https://github.com/kerimdzhanov/dotenv-flow/blob/master/README.md#variables-overwritingpriority)
convention, which organizes environment files based on execution context (e.g., `development`, `staging`, `production`).

Typical loading hierarchy:

```
.env.<environment>.local <- (highest priority)
          │
          ▼
      .env.local
          │
          ▼
   .env.<environment>
          │
          ▼
        .env             <- (lowest priority)
```

### 📄 Add `.env` Files

To follow a predictable **dotenv-flow** structure, environment files should be created in layers based on scope and
override priority.

##### ① <u>Create Base `.env` File</u>

The base .env file defines common default values shared across all environments.

Guidelines:
  - Store **all shared configuration** used in every runtime context.
  - Prefer **PRODUCTION-safe defaults** when values are common across environments (e.g., `NODE_ENV=production`).
  - Add inline documentation comments describing:
    + Purpose of the variable
    + Expected value type
    + Example values or constraints

📗 **Example:**

```dotenv
# (📍 /.env)

# Application runtime mode (string: development | production | test)
NODE_ENV=production

# Server listening port (number)
PORT=3000

# Enable feature flag X (boolean)
FEATURE_X_ENABLED=false
```

##### ② <u>Create Minimum Environment Files</u>

At minimum, create environment-specific overrides for development and production:
  - `.env.development` – used by the development team during local development.
  - `.env.production`  – used in the PRODUCTION runtime environment.

These files should override only values that differ from the base `.env`.

```dotenv
# (📍 /.env.development)

NODE_ENV=development
FEATURE_X_ENABLED=true


# (📍 /.env.production)

PORT=443
```

##### ③ <u>Add Additional Environment Files (When Needed)</u>

Depending on deployment or operational requirements, additional environment files may be introduced.

Common examples:
  - `.env.staging`\
    Used for staging servers, typically identical to production configuration but using separate data sources
    (e.g., staging database, staging APIs).
  - `.env.test`\
    Used for automated testing, CI pipelines, or local test runs.
  - `.env.<client>` or `.env.<tenant>`\
    Used when the same application is deployed for multiple clients / tenants, each requiring different configuration
    such as database names, service endpoints, or feature flags.

##### ④ <u>Add Local Override Files to `.gitignore`</u>

Local override files (`.env.local`, `.env.*.local`) allow developers or operators to **define machine-specific
configuration** without affecting version-controlled environment settings.

Typical usage:
  - Store **secrets** or **credentials** that must not be committed (e.g., `DATABASE_URL`, `API_KEYS`,
    `AWS_SECRET_ACCESS_KEY`).
  - Override environment values for **debugging**, **testing**, or **temporary adjustments**.
  - Support **machine-specific configuration** in both **development** and **operational** environments.

To prevent accidental exposure of sensitive data, these files should **always be excluded from version control**:

```gitignore
# (📍 /.gitignore)

# Local environment overrides
.env.local
.env.*.local
```

This ensures:
  - Sensitive values are never committed to the repository.
  - Shared environment configurations remain consistent across the team.
  - Local flexibility is preserved without introducing configuration conflicts.


### Load Dotenv in Commands

We can use **dotenv-cli** to load environment variables before executing runtime or build commands.

🤟 _See [dotenv-cli](../tools/dotenv-cli.md) for detailed installation and usages._

Environment loading is commonly configured inside the `scripts` section of `package.json`, ensuring that each command
runs with the correct environment context.

##### 🟡 <u>Direct Usage per Script</u>

Use the cascading flag `-c` to load environment variables based on a **specific execution environment**.

> ### Syntax
>
> ```json5
> // (📍 /package.json)
>
> {
>   "scripts": {
>     "<script-name>": "dotenv -c <environment> -- <command>"
>   }
> }
> ```

📗 **Example:**

```json5
// (📍 /package.json)

{
  "scripts": {
    "start": "dotenv -c development -- node-ts src/app",
    "server": "dotenv -c production -- node dist/app",
    "server:staging": "dotenv -c staging -- node dist/app"
  }
}
```

##### 🟡 <u>Reusable Environment Loader Script</u>

For more complex setups — especially when multiple scripts share similar environment-loading logic — you can define a
**reusable base command**. This helps reduce duplication and minimizes the risk of inconsistencies.

📗 **Example:**

```json5
// (📍 /package.json)

{
  "scripts": {
    "_env": "dotenv -e .env.${CLIENT:-\"client-1\"} -c ${ENV:-\"development\"}",

    "start": "pnpm _env -- node-ts src/app",
    "server": "ENV=production pnpm _env -- node dist/app",

    "start:client-1": "pnpm run start",
    "start:client-2": "CLIENT=client-2 pnpm run start",

    "server:client-1": "pnpm run server",
    "server:client-2": "CLIENT=client-2 pnpm run server"
  }
}
```

📙 `${ENV:-"development"}` — Uses development as the default environment when ENV is not provided.\
📙 `${CLIENT:-"client-1"}` — Allows switching configuration for multi-tenant or multi-client deployments.

This pattern provides:
  - Consistent environment loading logic across scripts.
  - Default environment fallbacks.
  - Flexible environment and client switching.
  - Cleaner and more maintainable script definitions.
  - Predictable runtime behavior across environments.

------------


## 🚧 Ignore Blocking Errors During Development [🔺](#-setup-environment-in-javascript-application)

In modern JavaScript projects, tools such as **TypeScript**, **linters**, and **bundlers** perform continuous validation.
By default, many of these tools treat certain errors as **fatal**, meaning the application or dev server will **stop
running immediately when an error occurs**.

While strict validation is important for maintaining code quality, blocking execution during development can **slow
down iteration** and **reduce productivity**.

Some tools provide environment variables to **prevent runtime termination** while still reporting errors.\
(⚠️ _These should be used only in **development** environments._)

| Tool            | Variable               | Effect                                                             |
|-----------------|------------------------|--------------------------------------------------------------------|
| **ts-node**     | `TS_NODE_LOG_ERROR`    | Logs errors to stderr instead of throwing exceptions               |
| **React (CRA)** | `ESLINT_NO_DEV_ERRORS` | Show ESLint errors as warnings and don't show in the error overlay |
| **React (CRA)** | `TSC_COMPILE_ON_ERROR` | Allow app to run even with TS compile errors                       |
| **Next.js**     | `NEXT_DISABLE_ESLINT`  | Skip ESLint blocking during dev                                    |

📗 **Example:** _Non-Blocking Development Mode in Node Project_

```dotenv
// (📍 /.env)

# Logs errors to stderr instead of throwing exceptions (boolean)
TS_NODE_LOG_ERROR=false


// (📍 /.env.development)
TS_NODE_LOG_ERROR=true
```

************

[⤴️ Back: **Node Environment**](-intro.md)\
[◀️ Previous: **Configure TypeScript Environment**](typescript-environment.md)
