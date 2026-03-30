# ![PM2](../_static/icons/pm2-28.png) PM2

<p align="right"><em>&lt;Last updated: 2026-03-30&gt;</em></p>

PM2 is a production-ready **process manager** for **Node.js applications** that helps you run, monitor, and manage
applications reliably. It provides features such as **automatic restarts**, **process clustering**, **log management**,
and **zero-downtime reloads**, making it a common choice for running Node.js services in production environments.

🔗 **Links:** _[NPM](https://www.npmjs.com/package/pm2)_
- _[Docs](https://pm2.keymetrics.io/docs/usage/quick-start/)_
- _[Repository](https://github.com/Unitech/pm2)_

> ### 🗂️ Contents
>   - 🌱 [Installation](#-installation-)
>   - 🕹 [Usage](#-usage-)
>   - ⚙️ [Configuration](#-configuration-)
>   - ⚡️ [Command Cheatsheet](#-command-cheatsheet-)
>   - 🗃 [Config Files](#-config-files-)

************

[⤴️ Back: **Node Runtimes**](-intro.md)\
[◀️ Previous: **Nodemon**](nodemon.md)

************

## 🌱 Installation [🔺](#-pm2)

**PM2** is designed to manage application processes at the **system level**, not within a single project. Therefore, it
is recommended to install PM2 **globally**:

```shell
pnpm add -g pm2@latest
# --- OR ---
npm install pm2@latest -g
```

> ### 🧠 _Why PM2 Should Be Installed Globally_
>
> - Manage multiple applications across different projects from a **single tool**.
> - Keep process management **independent from project dependencies**.
> - **Ensure PM2 remains available** even if project dependencies are removed or changed.
> - Align with typical production setups where PM2 runs as a system-level service

------------


## 🕹 Usage [🔺](#-pm2)

PM2 supports multiple ways to start an application, including using an **entry file**, a **custom command**, or a
**configuration file**. Among these, **using a configuration file is the recommended** approach for better
maintainability and scalability, especially in production environments.


### 🛠️ Using Config File (Ecosystem File)

Use a config file, called **Ecosystem File** (`ecosystem.config.js`), to define and manage application processes in a
structured way. This approach is recommended as it:
- Centralizes configuration **in a single file**.
- Supports running **multiple processes**.
- Simplifies environment and scaling management.
- Improves maintainability for production setups.

##### ① <u>Create an Ecosystem File</u>

Generate an Ecosystem File using:

```shell
# Generate a simple Ecosystem File
pm2 init simple

# Generate a more complete Ecosystem template
pm2 ecosystem
```

This will:
- Generate an `ecosystem.config.js` file.
- Include sample configurations (depending on the command used).

🤟 _For more detail how to config, read [PM2 Configuration](#-configuration-)._

##### ② <u>Start Apps from the Ecosystem File</u>

You can start or restart applications defined in the Ecosystem File:

```shell
# Start new precesses from Ecosystem File
pm2 start <ecosystem-file> [--env <environment>]

# Restart existing precesses from Ecosystem File
pm2 restart <ecosystem-file> [--env <environment>]

# --- OR in `package.json` ---
# "scripts": {
#   "pm2:start": "pm2 start <ecosystem-file> [--env <environment>]",
#   "pm2:restart": "pm2 restart <ecosystem-file> [--env <environment>]"
# }
```

📙 `<environment>` — Environment name defined in the Ecosystem File (e.g., `staging`, `production`).

> ### 📕 Notes
>
> When using `pm2 restart` with an Ecosystem File, PM2 will:
>   - Restart the process if it already exists.
>   - Start a new process if it does not exist.
>
> Because of this behavior, you can simplify your workflow by **using only restart**:
>
> ```json5
> // (📍 /package.json)
>
> {
>   "scripts": {
>     "pm2": "pm2 restart <ecosystem-file> [--env <environment>]"
>   }
> }
> ```

📗 **Example:**

```json5
// (📍 /package.json)

{
  "scripts": {
    "pm2:prod": "pm2 restart ecosystem.config.js --env production",
    "pm2:stage": "pm2 restart ecosystem.config.js --env staging"
  }
}
```


### ⚡️ Quick Start an Application

Besides using an Ecosystem File, PM2 also provides simpler ways to quickly start an application. These methods are
commonly used for **quick setups**, **development workflows**, or when you **prefer a simple command** over a config
file.

You can start an application under PM2 using one of the following approaches:

##### 🟢 <u>Using Entry File</u>

```shell
pm2 start <entry-file> [--name <app-name>]
```

📙 `<entry-file>` — Application entry point (e.g., `dist/server.js`).\
📙 `<app-name>` — _(optional but **recommended**)_ Custom process name.

📗 **Example:**

```shell
pm2 start ./dist/server.js --name api:production
```

##### 🟢 <u>Using a Command</u>

```shell
pm2 start "<start-command>" [--name <app-name>]
```

📙 `<start-command>` — Full command to run the application.

📗 **Example:**

```shell
pm2 start "pnpm server" --name api:production
```

This approach is **not limited to Node.js or JavaScript**. PM2 can run **any executable command**, including scripts or
applications written in other languages.

📗 **Example:**

```shell
pm2 start "python app.py" --name py-app
pm2 start "go run main.go" --name go-app
```

##### 🟢 <u>Serve Static Files (FrontEnd App)</u>

```shell
pm2 serve <path> <port> [--name <app-name>]
```

📙 `<path>` — Directory to serve.\
📙 `<port>` — Port number.

📗 **Example:**

```shell
pm2 serve ./build 3000 --name frontend:production
```

### 📋 List Processes

View all running processes:

```shell
pm2 [list|ls|l|status]
```

The output typically includes:
- `id`      — Internal PM2 process id (auto-increasing from 0).
- `name`    — Process name (when start with `--name`).
- `version` — Application version (from `package.json`, if available).
- `mode`    — Execution mode (`fork` or `cluster`).
- `pid`     — System process id.
- `status`  — Current status (e.g., `online`, `stopped`).
- `uptime`  — Time since the process started.
- `↺`       — Number of restarts.
- `cpu`     — CPU usage.
- `mem`     — Memory usage.

📗 **Example:**

```shell
pm2 ls
```

To view detailed information about a specific process:

```shell
pm2 show <id|name>
```

📗 **Example:**

```shell
pm2 show 0
pm2 show api:production
```


### 🔁 Restart / Reload

Restart or reload existing processes to apply code changes:

```shell
pm2 restart <id|name|ecosystem-file|'all'>
pm2 reload <id|name|ecosystem-file|'all'>
```

📙 `restart` — Fully restarts the process (stop -> start).\
📙 `reload` — Reloads the process with **zero downtime** (for cluster mode).

> ### ⚠️ Warning
>
> By default, PM2 **does not update environment variables or runtime options** when restarting a process.
>
> To apply updated configuration (e.g., **`.env` changes** or **ecosystem updates**), you can use `--update-env` flag:
>
> ```shell
> pm2 restart <id|name|ecosystem-file> --update-env
>
> # --- EQUIVALENT ---
>
> pm2 delete <id|name|ecosystem-file>
> pm2 start <file|command|ecosystem-file>
> ```


### 💾 Save and Restore

##### ① <u>Save Current Processes</u>

Once you have **started all desired applications**, you can save the current process list:

```shell
pm2 save
```

This stores the current running processes so they can be restored later. PM2 maintains **only one saved snapshot**, each
new save will override the previous one

##### ② <u>Restore Saved Processes</u>

After saving, you can restore the **latest saved** processes. To manually restore them:

```shell
pm2 resurrect
```

This will:
- Restart all processes from the **last saved state** (via `pm2 save`).
- Reapply their configurations.

##### ③ <u>Set Auto Restore on Startup (One-Time Setup)</u>

You can configure PM2 to automatically restore saved processes when the system boots:

```shell
pm2 startup
```

This will generate a startup script similar to:

```shell
> [PM2] To setup the Startup Script, copy/paste the following command:
>       sudo env PATH=$PATH:<node-path>/bin <pm2-path>/pm2 startup <distribution> -u <user> --hp <home-path>
```

Copy and run the generated command in your terminal. After that, PM2 will automatically restore saved processes on
system boot.

If you upgrade your Node.js version, you should regenerate the startup script:

```shell
# ① Generate disable existing startup script
pm2 unstartup

# ② Copy and parse in terminal
sudo env PATH=$PATH:<node-path>/bin <pm2-path>/pm2 unstartup <distribution> -u <user> --hp <home-path>

# ③ Generate enable startup script again
pm2 startup

# ④ Copy and parse in terminal
sudo env PATH=$PATH:<node-path>/bin <pm2-path>/pm2 startup <distribution> -u <user> --hp <home-path>
```


### 📜 View Logs

While processes are running, all their **STDOUT** and **STDERR** outputs are captured and managed by PM2.

To view or stream logs:

```shell
pm2 logs <id|name> [--lines <number>] [--nostream] [--out|--err]
```

📙 `--lines <number>` — _(optional)_ Show the last N lines before streaming instead _(default: `15`)_.\
📙 `--nostream` — _(optional)_ Show logs once without streaming.\
📙 `--out` OR `--err` — _(optional)_ Show only STDOUT or STDERR logs _(default: **both**)_.

👉 _See [PM2 Application Logs](https://pm2.keymetrics.io/docs/usage/log-management/) for more options and details._

📗 **Example:**

```shell
# Stream logs for "api:production" process
pm2 logs api:production

# Stream logs with the last 100 lines
pm2 logs api:production --lines 100
```

You can also attach logs directly when starting or restarting a process:

```shell
pm2 start <file|command|ecosystem-file> --attach
pm2 restart <id|name|ecosystem-file> --attach
```

📗 **Example:**

```shell
# Start server and attach log stream
pm2 start dist/server.js --attach
```

> ### 🧠 _Log Files & Location_
>
> PM2 stores application logs on disk at: `$HOME/.pm2/logs`
>
> Logs are separated into **STDOUT** and **STDERR** files with the following naming pattern:
>   - `<app-name>-out.log` – Standard output logs.
>   - `<app-name>-error.log` — Error logs.
>
> 📗 **Example:** _"api:production" Logs_
>
> ```
> ~/.pm2/logs/api-production-out.log
> ~/.pm2/logs/api-production-error.log
> ```
>
> To inspect logs from previous runs, open them directly:
>
> ```shell
> # View logs with colors preserved
> less -R ~/.pm2/logs/<log-name>.log
>
> # View logs in raw format
> vi ~/.pm2/logs/<log-name>.log
> ```
>
> [**less**](https://www.greenwoodsoftware.com/less/faq.html) is a powerful text viewer that supports **colored output**
> and advanced navigation. It may not be installed by default on some systems, while **vi** is typically available on
> most Linux/macOS environments but does not render colors.
>
> If **less** is not installed, you can install it depending on your OS (e.g., via package manager). Search with
> keywords like:
>
> ```
> install less text viewer in <your-os>
> ```


### 📊 Monitor Processes

PM2 provides a **built-in dashboard** to monitor application performance and runtime metrics in real time. To open it:

```shell
pm2 monit
```

This dashboard displays real-time information for each process, including:
- CPU usage
- Memory usage
- Process status
- Restart count
- Live logs

You can navigate between processes and inspect metrics directly within the terminal.


### 🛑 Stop / Remove

Stop or remove processes:

````shell
pm2 delete <id|name|ecosystem-file|'all'>
pm2 stop <id|name|ecosystem-file|'all'>
````

📙 `delete` — Stops and removes the process from PM2 completely.\
📙 `stop` — Stops the process but keeps it in PM2 (can be started again).

------------


## ⚙️ Configuration [🔺](#-pm2)

PM2 configuration is typically centralized in an **Ecosystem File**, allowing you to define and manage application
processes in a structured and maintainable way.

By convention, this file is named `ecosystem.config.js`, though you can use a different name as long as it follows the
pattern `*.config.js`.

> ### ⚠️ Warning
>
> The Ecosystem File must use **CommonJS (CJS)** format to be compatible with PM2.
>
> If your project uses **ESM** (`"type": "module"` in `package.json`), rename the file to use the `.cjs` extension.
>
> 📗 **Example:**
>
> ```shell
> ecosystem.config.cjs
> ```


### 🚀 Define Start Script

> ### 📘 Syntax
>
> ```js
> // (📍 /ecosystem.config.js)
>
> module.exports = {
>   apps: [
>     {
>       name: "<app-name>",
>       script: "<start-script>",
>       args: "<start-script-arguments>",
>       // ... other options
>     },
>     // ... apps
>   ]
> };
> ```
>
> 📙 `apps` — An array of application configurations.
>   - You can define **a single app or multiple apps** in the same file.
>   - Each item represents **one process**.
>
> 📙 `script` — Defines how the application is executed.
>   - Can be a **JavaScript entry file**, a **command**, or `serve` for static files.
>   - Works together with `args` (if provided) to form the full execution command.

PM2 supports multiple ways to define how an application runs:

##### 🟡 <u>Run by JavaScript Entry File (for Node App)</u>

Use `script` to point to the compiled JavaScript entry file:

```
{
  name: '<app-name>',
  script: '<entry-file>.js'
}
```

📗 **Example:**

```js
// (📍 /ecosystem.config.js)

module.exports = {
  apps: [
    {
      name: 'node-app',
      script: 'dist/server.js'
    }
  ]
};
```

##### 🟡 <u>Serve Static Files (for FrontEnd App)</u>

Serve a frontend build directory:

```
{
  script: 'serve',
  env: {
    PM2_SERVE_PATH: '<build-path>',
    PM2_SERVE_PORT: <port>
  }
}
```

📗 **Example:**

```js
// (📍 /ecosystem.config.js)

module.exports = {
  apps: [
    {
      name: 'ui-app',
      script: 'serve',
      env: {
        PM2_SERVE_PATH: './build',
        PM2_SERVE_PORT: 8000,
        PM2_SERVE_SPA: true,
      }
    }
  ]
};
```

##### 🟡 <u>Run by Command (Generic)</u>

Run a custom command (e.g., TypeScript, scripts, or other runtimes):

```
{
  name: '<app-name>',
  script: '<command>',
  args: '<arguments>'
}
```

📗 **Example:** _Script in `package.json` (via PNPM)_

```js
// (📍 /ecosystem.config.js)

module.exports = {
  apps: [
    {
      name: 'pnpm-app',
      script: 'pnpm',
      args: 'run server:prod'
    }
  ]
};
```

📗 **Example:** _Next.js App_

```js
// (📍 /ecosystem.config.js)

module.exports = {
  apps: [
    {
      name: 'next-app',
      script: 'next',
      args: 'start'
    }
  ]
};
```

📗 **Example:** _TypeScript App (without build step)_

```js
// (📍 /ecosystem.config.js)

module.exports = {
  apps: [
    {
      name: 'ts-app',
      script: 'ts-node',
      args: '--transpile-only src/server.ts'
    }
  ]
};
```

📗 **Example:** _Python App_

```js
// (📍 /ecosystem.config.js)

module.exports = {
  apps: [
    {
      name: 'py-app',
      script: 'python',
      args: 'app.py'
    }
  ]
};
```

> ### 💡 Dynamic Start Script for Development
>
> You can use a single `ecosystem.config.js` for both **development** and **production** by dynamically switching the
> start script based on the environment.
>
> In development, it is common to run:
>   - `ts-node src/server.ts` -> faster iteration, no build step
>   - OR pnpm run start -> reuse existing dev scripts (e.g., with **nodemon**)
>
> In production, you should run the compiled file:
>   - `dist/server.js` -> stable and optimized runtime
>
> 📗 Example:
>
> ```js
> // (📍 /ecosystem.config.js)
>
> const isDev = process.env.NODE_ENV === 'development';
>
> module.exports = {
>   apps: [
>     {
>       name: 'app-api',
>       script: isDev ? 'pnpm' : 'dist/server.js',
>       args: isDev ? 'run start' : undefined
>     }
>   ]
> };
> ```



### 🏷️ Determine App Names

PM2 manages multiple processes across different applications. Each app must define a name, which is used to identify
and manage processes in PM2.

PM2 does not enforce a strict naming convention, but following consistent naming practices will greatly improve
maintainability and observability.

General recommendations:
  - Use a **unique name** for each application.
  - Be descriptive, clearly identify the service or purpose.
  - Maintain **consistent naming conventions** across your team or project.
  - Include **environment suffixes** (_optional but **useful**_) when running multiple environments.
  - Avoid generic names such as `api`, `server`, `app`, or `development`.

This helps:
  - Distinguish multiple services on the same machine.
  - Avoid naming conflicts.
  - Improve clarity when managing processes (`pm2 list`, logs, monitoring).

There are some recommended practices:

##### 🟢 <u>Should Prefix with Project Name</u>

Include a project or domain identifier at the beginning of the name:
  - Can be:
    + Project name
    + Owner company
    + Project key from management tools (e.g., Jira, Redmine)
  - Acts as a **grouping prefix** for related services when running `pm2 list`.
  - Recommended to use **short or abbreviated forms**.

📗 **Example:**

```
// Human Resource Management project
hrm:*

// "Awesome" Company
aws:*

// LTS prefix in Jira
lts:*
```

##### 🟢 <u>Must Describe Service Purpose</u>

The app name should clearly describe the **purpose or responsibility of the service**:
  - Reflects the **domain, feature, or business capability** the service handles.
  - Use **meaningful, domain-driven names** (e.g., `account`, `payment`, `notification`).
  - Make it easier to identify **what each process is responsible for** and **reduce confusion** when multiple services
    are running on the same machine.

📗 **Example:**

```
// Account service in HRM project
hrm:account-*

// Recruitment management in HRM project
hrm:recruitment-*

// Core system service
hrm:main-*

// Single-service system
hrm:human-resource-*
```

##### 🟢 <u>Must Include App Type</u>

Include the application type to clarify its **role and runtime behavior**.

Suggested naming by **app type**:
  - BackEnd (Express, Nest, APIs, etc.): `-service`, `-api`, `-server`, `-be`.
  - FrontEnd (React, Angular, web UI apps, etc.): `-web`, `-ui`, `-fe`.
  - Mobile (React Native, mobile UI apps, etc.): `-mobile`, `-native`.
  - Service-Side Rendering (Next.js, Gatsby, SSR web apps, etc.): `-web`, `-rrs`, `-next`.

Suggested naming by **functionality**:
  - Backend services: `-service`, `-api`.
  - Workers (jobs, crawlers, queues): `-worker`, `-crawler`.
  - Admin/management UI: `-admin`, `-management`.
  - End-user UI: `-front`, `-home`.
  - Landing pages: `-landing`

📗 **Example:**

```
// HRM project: backend + frontend apps
hrm:account-service
hrm:recruitment-service
hrm:admin-web
hrm:front-web
```

##### 🟢 <u>Should Suffix with Environment</u>

Include the environment in the app name to clearly indicate where the application is running:
  - Can represent:
    + Runtime environments (e.g., `production`, `testing`, `development`).
    + Deployment targets or servers (e.g., `demo`, `staging`).
  - Especially useful when running **multiple environments** on the same server.
  - Helps **avoid managing the wrong environment** and **reduces risk during deployment and debugging**.

📗 **Example:**

```
// Production environemnt
hrm:account-service:production

// Demo server
hrm:account-service:demo
```

> ### 💡 Tip
>
> You can dynamically include the environment name using `APP_ENV` or `NODE_ENV` (defined in `.env` files):
>
> 📗 **Example:**
>
> ```js
> name: `hrm:account-service:${process.env.APP_ENV || process.env.NODE_ENV}`
> ```
>
> This ensures the app name always reflects the current runtime environment.


### 🌱 Configure Environment Variables

PM2 supports two types of environment variable configuration:
  - **Static Environment** — Define variables directly inside `ecosystem.config.js`.
  - **Dynamic Environment** — Load variables dynamically from `.env` files.

You can combine both approaches:
  - Use `.env` files for dynamic values based on environment (e.g., `production`, `staging`, `development`).
  - Use `env` in `ecosystem.config.js` for static or override values (e.g., log config, concurrency, feature flags).

##### 🟡 <u>Static Environment (PM2 Native)</u>

Define environment variables directly inside `ecosystem.config.js` using the `env` and `env_<environment>` fields:

```js
// (📍 /ecosystem.config.js)

module.exports = {
  apps: [
    {
      // ... other properties

      env: {
        // ... environment variables
      },
      'env_<environment>': {
        // ... environment variables
      }
    }
  ]
};
```

📙 `env` — Default environment variables.\
📙 `env_<environment>` — Environment-specific overrides.

Run with a specific environment:

```shell
pm2 start ecosystem.config.js --env <environment>
```

##### 🟡 <u>Dynamic Environment (from `.env` files)</u>

Use tools like [**dotenv-cli**](../../environment/tools/dotenv-cli.md) to load environment variables before running PM2:

```shell
dotenv -c <environment> -- pm2 start ecosystem.config.js
```

📗 **Example:**

```shell
dotenv -c production -- pm2 start ecosystem.config.js
```

This approach:
  - Reuses existing environment configuration.
  - Works seamlessly with **dotenv-flow** structure.
  - Keeps environment management **separate from PM2 configuration**.

### 🪵 Customize Logging

PM2 allows you to customize how logs are written, formatted, and managed. This is useful for organizing logs, improving
readability, and preventing log files from growing indefinitely.

##### 🟢 <u>Customize Log File Paths</u>

By default, PM2 stores logs in `$HOME/.pm2/logs`. You can override this behavior using:
  - `output` — Path to **STDOUT** logs _(default: `$HOME/.pm2/logs/<app-name>-error-<pid>.log`)_.
  - `error` — Path to **STDERR** logs _(default: `$HOME/.pm2/logs/<app-name>-out-<pid>.log`)_.
  - `log` — Combined log file (both **STDOUT** & **STDERR**).

💡 Tips:
  - Should use a dedicated `logs/` directory inside your project for easier checking log.
  - Avoid committing log files to version control (add to `.gitignore`).
  - Avoid using `log` unless you explicitly need combined logs.

📗 **Example:**

```js
// (📍 /ecosystem.config.js)

module.exports = {
  apps: [
    {
      name: 'app-api',
      script: 'dist/server.js',

      out_file: './logs/api-out.log',
      error_file: './logs/api-error.log',
    }
  ]
};
```

##### 🟢 <u>Customize Time Format</u>

Control how timestamps appear in logs using one of the following options (**do not use both together**):
  - `time` — _(boolean)_ Adds a timestamp before each log line (format: `YYYY-MM-DD[T]HH:mm:ss`).
  - `log_date_format` — Customize timestamp format (based on **moment.js** format).

💡 Tips:
  - Use this when your application logger does not include timestamps.
  - `log_date_format` is preferred for full control over formatting.

📗 **Example:**

```js
// (📍 /ecosystem.config.js)

module.exports = {
  apps: [
    {
      name: 'app-api',
      script: 'dist/server.js',

      log_date_format: 'YY-MM-DD HH:mm:ss',
    }
  ]
};
```

📗 **Example output:**

```shell
> 26-04-02 14:32:10: INFO Server started
```

##### 🟢 <u>Configure Log Rotation</u>

Log files can grow very large over time, making them difficult to inspect or manage. PM2 provides a built-in module to
**automatically rotate logs into smaller files**.

This helps to:
  - Prevent disk space issues.
  - Keep logs manageable.
  - Improve long-term monitoring and debugging.


① Install Log Rotate Module

```shell
pm2 install pm2-logrotate
```

② Configure Log Rotation

Common settings:
  - `max_size` — Rotate when file exceeds size _(e.g., `10G`, `10M`, `10K`, default: `10M`)_.
  - `retain` — Number of old log files to keep _(default: `30`)_.
  - `compress` — Compress rotated logs (true / false).
  - `rotateInterval` — Time-based rotation (cron syntax).

👉 _See more options in [pm2-logrotate configuration](https://github.com/keymetrics/pm2-logrotate#configure)._

📗 **Example:**

```shell
# Max file size before rotation
pm2 set pm2-logrotate:max_size 50M

# Keep number of rotated files
pm2 set pm2-logrotate:retain 14

# Compress rotated logs
pm2 set pm2-logrotate:compress true

# Rotation interval (cron format)
pm2 set pm2-logrotate:rotateInterval '0 0 * * *'
```

------------


## ⚡️ Command Cheatsheet [🔺](#-pm2)

Here are the most commonly used `pm2` CLI commands:

| Command                                    | Description                                                     | Alias                             | 📗 Example                           |
|--------------------------------------------|-----------------------------------------------------------------|-----------------------------------|--------------------------------------|
| `pm2 start <file\|cmd\|ecosystem>`         | **Start** a new process from a file, command, or Ecosystem File |                                   | `pm2 start ecosystem.config.js`      |
| `pm2 restart <id\|name\|ecosystem\|'all'>` | **Restart** a process (starts it if not yet running)            |                                   | `pm2 restart api:prod`               |
| `pm2 reload <id\|name\|ecosystem\|'all'>`  | **Zero-downtime reload** (cluster mode only)                    |                                   | `pm2 reload api:prod`                |
| `pm2 stop <id\|name\|ecosystem\|'all'>`    | **Stop** a process (keeps it in PM2 list)                       |                                   | `pm2 stop api:prod`                  |
| `pm2 delete <id\|name\|ecosystem\|'all'>`  | **Stop and remove** a process from PM2 completely               |                                   | `pm2 delete api:prod`                |
| `pm2 list`                                 | **List** all processes with status, CPU, and memory             | `pm2 ls` / `pm2 l` / `pm2 status` |                                      |
| `pm2 show <id\|name>`                      | Show **detailed info** about a specific process                 |                                   | `pm2 show api:prod`                  |
| `pm2 logs <id\|name>`                      | **View and stream** application logs                            |                                   | `pm2 logs api:prod`                  |
| `pm2 monit`                                | Open **real-time dashboard** with CPU, memory, and logs         |                                   |                                      |
| `pm2 save`                                 | **Save** the current process list for later restoration         |                                   |                                      |
| `pm2 resurrect`                            | **Restore** the last saved process list                         |                                   |                                      |
| `pm2 startup`                              | Generate a script to **auto-restore** processes on system boot  |                                   |                                      |
| `pm2 unstartup`                            | **Remove** the auto-start startup script                        |                                   |                                      |
| `pm2 init simple`                          | Generate a **minimal** Ecosystem File (`ecosystem.config.js`)   |                                   |                                      |
| `pm2 ecosystem`                            | Generate a **full** Ecosystem File template                     |                                   |                                      |
| `pm2 install <module>`                     | **Install** a PM2 module                                        |                                   | `pm2 install pm2-logrotate`          |
| `pm2 set <module>:<key> <value>`           | **Configure** a PM2 module setting                              |                                   | `pm2 set pm2-logrotate:max_size 50M` |

Common options and they apply to:

| Option                | Commands            | Description                                               | 📗 Example                                       |
|-----------------------|---------------------|-----------------------------------------------------------|--------------------------------------------------|
| `--name <name>`       | `start`, `serve`    | Set a custom **process name**                             | `pm2 start dist/server.js --name api:prod`       |
| `--env <environment>` | `start`, `restart`  | Load **environment** config block from the Ecosystem File | `pm2 start ecosystem.config.js --env production` |
| `--update-env`        | `restart`, `reload` | **Update environment** variables when restarting          | `pm2 restart api:prod --update-env`              |
| `--attach`            | `start`, `restart`  | **Attach** log output to the terminal                     | `pm2 start dist/server.js --attach`              |
| `--lines <n>`         | `logs`              | Show last N **log lines** before streaming                | `pm2 logs api:prod --lines 100`                  |

👉 _See full list in the [PM2 CLI docs](https://pm2.keymetrics.io/docs/usage/quick-start/)_

------------


## 🗃 Config Files [🔺](#-pm2)

PM2 uses a single primary configuration file to define and manage application processes.

| File                                                      | Purpose                                                                                                                                          |
|-----------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| [`ecosystem.config.js`](../../../../ecosystem.config.js)￼ | Main configuration file for PM2. Defines applications (apps), start scripts, environment variables, logging, scaling, and other runtime options. |

************

[⤴️ Back: **Node Runtimes**](-intro.md)\
[◀️ Previous: **Nodemon**](nodemon.md)
