# ![Nodemon](../_static/icons/nodemon-28.png) Nodemon

<p align="right"><em>&lt;Last updated: 2026-03-27&gt;</em></p>

**nodemon** is a development utility that **automatically restarts a Node.js application when file changes are detected**.
It monitors source files and triggers a reload on updates, eliminating the need to manually restart the server and
significantly improving the development workflow.

🔗 **Links:** _[NPM](https://www.npmjs.com/package/nodemon)_
            - _[Docs](https://github.com/remy/nodemon#nodemon)_
            - _[Repository](https://github.com/remy/nodemon)_

> ### 🗂️ Contents
>   - 🌱 [Installation](#-installation-)
>   - 🕹 [Usage](#-usage-)
>   - ⚙️ [Configuration](#-configuration-)
>   - ⚡️ [Command Cheatsheet](#-command-cheatsheet-)
>   - 🗃 [Config Files](#-config-files-)

************

[⤴️ Back: **Node Runtimes**](-intro.md)\
[◀️ Previous: **TS-Node**](ts-node.md)

************

## 🌱 Installation [🔺](#-nodemon)

Install **nodemon** as a **development dependency**:

```shell
pnpm add -D nodemon
```

------------

## 🕹 Usage [🔺](#-nodemon)

### ▶️ Run an Application with Auto-Reload

Start an application and watch for changes:

```shell
nodemon <entry-file>

# --- OR in `package.json` ---
# "scripts": {
#   "start": "nodemon <entry-file>"
# }
```

📙 `<entry-file>` — Application entry point (e.g., `dist/server.js`, `src/server.ts`).

📗 **Example:**

```shell
nodemon dist/server.js
```

This will:
  - Start the application (default runtime: `node`).
  - Watch for file changes (default: `.js`, `.json`, `.mjs`).
  - Restart the process automatically when changes are detected.

You can also pass arguments to the runtime:

```shell
nodemon [--<arg> ...] <entry-file>
```

📗 **Example:** _Enable Node.js debugger on port 9229_

```shell
nodemon --inspect dist/server.js
```


### 🧩 Execute with Custom Command

By default, **nodemon** uses the `node` runtime to execute JavaScript files (`.js`, `.mjs`, `.cjs`). You can override this
behavior using `--exec` to run with a custom runtime (e.g., TypeScript):

```shell
nodemon --exec "<command>" <entry-file>
```

📙 `<command>` — Execution command, including **runtime** and optional arguments.

📗 **Example:** _Run a TypeScript application_

```shell
nodemon --exec "ts-node" src/app.ts
nodemon --exec "node --loader ts-node/esm" src/app.ts
```

**nodemon** is not limited to Node.js, it can also run **non-Node scripts**.

📗 **Example:** _Run a Go worker_

```shell
nodemon --exec "go run" worker.go
```


### 🔁 Restart / Rerun

When your application exits, nodemon **continues watching for file changes** and will **automatically restart it when
changes are detected**, no manual restart is required.

If you need to restart the application manually while it is running, press:

```shell
rs [Enter]
```

------------


## ⚙️ Configuration [🔺](#-nodemon)

**nodemon** can be configured via a dedicated configuration file [`nodemon.json`](../../../../nodemon.json) or the
`nodemonConfig` field in `package.json` to control file watching behavior.

### 👀 File Watching & Ignoring

Control which files trigger a restart and which should be excluded.

> ### 📘 Key Fields
>
> 🔹 `watch` — List of files or directories to monitor.
>   - **Values:** An array of glob patterns.
>
> ```json5
> // (📍 /nodemon.json)
>
> {
>   "watch": ["<watch-path>", "..."],
> }
> ```
>
> ---
>
> 🔹 `ext` — List of files extensions to watch.
>   - **Values:** A comma-separated string (e.g., `js,ts,json`).
>
> ```json5
> // (📍 /nodemon.json)
>
> {
>   "ext": "<extension>,<extension>,..."
> }
> ```
>
> ---
>
> 🔹 `ignore` — Patterns to exclude from triggering restarts
>   - **Values:** An array of glob patterns.
>   - Should be within the **watched paths** (not separate paths).
>
> ```json5
> // (📍 /nodemon.json)
>
> {
>   "ignore": ["<ignore-path>", "..."],
> }
> ```

📗 **Example:**

```json5
// (📍 /nodemon.json)

{
  "watch": ["src"],
  "ignore": ["**/*.test.ts", "src/types/**", "*.log"],
  "ext": "ts,js,json"
}
```


### 🧩 Execution Command

Customize how the application is executed instead of using the default node runtime.

> ### 📘 Key Fields
>
> 🔹 `execMap` — _(**recommended**)_ Map file extensions to execution commands.
>   - Each command includes the **runtime** and **optional arguments.**
>   - Automatically applied when running `nodemon <file>.<ext>`.
>   - Execution is determined based on the **file extension**.
>
> ```json5
> // (📍 /nodemon.json)
>
> {
>   "execMap": {
>     "<fileExtension>": "<command>",
>     // ...
>   }
> }
> ```
>
> ---
>
> 🔹 `exec` —  Command used to run the application.
>   - Alternative to `execMap` (🚫 do not use both together).
>   - Suitable when using a single runtime for your main entry file.
>
> ```json5
> // (📍 /nodemon.json)
>
> {
>   "exec": "<command>",
> }
> ```

📗 **Example:**

```json5
// (📍 /nodemon.json)

{
  "execMap": {
    // -- Used to run `nodemon <file>.ts` --
    "ts": "ts-node --esm",
    // -- Used to run `nodemon <file>.js` --
    "js": "node"
  }
}
```

As a result, the corresponding runtime will be used:

📗 **Example:**

```shell
nodemon src/server.ts
# - 📋 Will run as -
#   ts-node --esm src/server.ts

nodemon src/server.js
# - 📋 Will run as -
#   node src/server.js
```

------------


## ⚡️ Command Cheatsheet [🔺](#-nodemon)

Here are the most commonly used `nodemon` CLI commands:

| Command                         | Description                                                                 | 📗 Example                                     |
|---------------------------------|-----------------------------------------------------------------------------|------------------------------------------------|
| `nodemon <file>`                | Start application with **auto-reload** on file changes                      | `nodemon dist/server.js`                       |
| `nodemon --exec "<cmd>" <file>` | Start application using a **custom runtime** command                        | `nodemon --exec "ts-node --esm" src/server.ts` |
| `rs`                            | **Manually restart** the running application (type in the nodemon terminal) |                                                |

Common CLI options supported across `nodemon` commands:

| Option                 | Description                                                          | Short Form | 📗 Example                                      |
|------------------------|----------------------------------------------------------------------|------------|-------------------------------------------------|
| `--config <file>`      | Use a **specific config file**                                       |            | `nodemon --config nodemon.json dist/server.js`  |
| `--watch <path>`       | Watch a **specific file or directory** for changes                   |            | `nodemon --watch src dist/server.js`            |
| `--ext "<exts>"`       | Watch only files with the **specified extensions** (comma-separated) | `-e`       | `nodemon --ext "ts,js,json" dist/server.js`     |
| `--ignore "<pattern>"` | **Exclude** files or directories from triggering restarts            | `-i`       | `nodemon --ignore "src/types/*" dist/server.js` |
| `--delay <ms>`         | Wait before **restarting** after a change is detected (milliseconds) | `-d`       | `nodemon --delay 10 dist/server.js`             |

👉 _See full list in the [nodemon docs](https://github.com/remy/nodemon#nodemon)_

------------


## 🗃 Config Files [🔺](#-nodemon)

**nodemon** supports configuration via a dedicated file or directly inside` package.json`.

| File                                       | Purpose                                                 |
|--------------------------------------------|---------------------------------------------------------|
| [`nodemon.json`](../../../../nodemon.json) | Primary configuration file for **nodemon**              |
| [`package.json`](../../../../package.json) | Alternative configuration via the `nodemonConfig` field |

************

[⤴️ Back: **Node Runtimes**](-intro.md)\
[◀️ Previous: **TS-Node**](ts-node.md)
