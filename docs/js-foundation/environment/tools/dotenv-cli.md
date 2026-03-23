# ![Dotenv CLI](../_static/icons/dotenv-28.png) Dotenv CLI

<p align="right"><em>&lt;Last updated: 2026-03-23&gt;</em></p>

**dotenv-cli** is a lightweight command-line utility that **loads environment variables from `.env` files** before
running a command. It allows applications and scripts to access configuration values (such as API keys, database URLs,
or runtime flags) without hard-coding them into source code, making environment-based configuration simpler and more
portable across development, staging, and production setups.

🔗 **Links:** _[NPM](https://www.npmjs.com/package/dotenv-cli)_
            - _[Repository](https://github.com/entropitor/dotenv-cli)_

> ### 🗂️ Contents
>   - 🌱 [Installation](#-installation-)
>   - 🕹 [Usage](#-usage-)
>   - 🗃 [Config Files](#-config-files-)

************

[⤴️ Back: **Environmental Tools**](-intro.md)

************


## 🌱 Installation [🔺](#-dotenv-cli)

Install dotenv-cli as a **development dependency** so it can be used in local scripts and tooling workflows:

```shell
pnpm add -D dotenv-cli
```

After installation, the dotenv command becomes **available in your project context** (e.g., in `package.json` scripts or
via `dotenv`/`pnpm exec dotenv` commands).

You can verify the installation by running:

```shell
dotenv --help
```

------------


## 🕹 Usage [🔺](#-dotenv-cli)

The dotenv CLI allows you to load environment variables from `.env` files and run commands with those variables
available in the process environment.

### Run Command with Environment Variables

> ### 📘 Syntax
>
> ```shell
> dotenv <loading-args> -- <command>
>
> # --- OR in `package.json` ---
> # "scripts": {
> #   "<script>": "dotenv <loading-args> -- <command>"
> # }
> ```
>
> 📙 `-- <command>` — Command executed after environment variables are loaded.
>   - The command can run without `--` if there is no arguments.
>   - `<command>` can be any **executable**, not limited to Node.js.
>
> 📙 `<loading-args>` — Options controlling how environment variables are loaded.
>   - Default: Load `.env` from the project root.

Environment variables can be loaded using **one** or **multiple strategies combined together**.

> ### ‼️ Loading Priority
>
> The order of loading arguments matters:
>   - **Later sources override earlier ones**.
>   - Machine (system) environment variables override all `.env` files by default.
>
> ```
> machine environment (highest priority)
>    │
>    ▼
> 1st dotenv argument
>    │
>    ▼
> 2nd dotenv argument
>   ...
> ```
>
> To override system environment variables (use **cautiously**):
>
> ```shell
> dotenv <loading-args> -o -- <command>
> ```

##### 🟡 <u>Load Multiple Environments (Dotenv Flow)</u>

Load environment variables using the [**dotenv-flow**](https://github.com/kerimdzhanov/dotenv-flow/blob/master/README.md#variables-overwritingpriority) convention:

```shell
dotenv -c [<environment>] -- <command>
```

📙 `<environment>` — Environment name (e.g. `staging`, `test`, `production`, `module-a`).
  - When omitted, only `.env` and `.env.local` are loaded.

This will load env from following order:

```
.env
   │
   ▼
.env.<environment>
   │
   ▼
.env.local
   │
   ▼
.env.<environment>.local
```

📗 **Example:**

```shell
dotenv -c staging -- pnpm run server
# - 📋 This will load environments (high -> low): -
#   .env -> .env.staging -> .env.local -> .env.staging.local
```

##### 🟡 <u>Load from Specific Files</u>

Explicitly specify one or more .env files:

```shell
dotenv -e <file> ... -- <command>
```

This is useful when:
  - Using custom environment naming conventions.
  - `.env` files are located outside the project root.
  - Combining environment sources manually

📗 **Example:**

```shell
# Load .env.build for build command
dotenv -e .env.build -e .env -- pnpm run build

# Load .env files from envs folder
dotenv -e ./envs/.env.production -e ./envs/.env -- pnpm run server
```

This can also be combined with `-c`:

```shell
# Load .env.build for build command
dotenv -e .env.build -c staging -- pnpm run build
# - 📋 This will load environments: -
#   .env -> .env.build.staging -> .env.local -> .env.build.staging.local

# Load .env files from envs folder
dotenv -e ./envs/.env -c -- pnpm run server
# - 📋 This will load environments: -
#   ./envs/.env -> ./envs/.env.local
```

##### 🟡 <u>Set Environment Variables Inline</u>

Define variables directly via CLI:

```shell
dotenv -v <VARIABLE>=<value> ... -- <command>
```

📗 **Example:**

```shell
dotenv -v APP_ENV=staging -v NODE_ENV=production -- pnpm run server
```

This is cross-platform safe, unlike native shell syntax:

📗 **Example:**

```shell
# The below command is equivalent to above, but this command cannot run in Windows platform:
APP_ENV=staging NODE_ENV=production pnpm run server
```


## 🐞 Debug Environment

Print the final resolved value of a specific environment variable:

```shell
dotenv <loading-args> -p <VARIABLE>
```

This shows the variable value **after all loading arguments and overrides are applied**.

📗 **Example:**

```shell
dotenv -c staging -p NODE_ENV
```

You can also inspect **which environment files are loaded and in what order** by using the debug flag:

```shell
dotenv <loading-args> --debug
```

📗 **Example:**

```shell
dotenv -e .env.build -c staging --debug
```

------------


## 🗃 Config Files [🔺](#-dotenv-cli)

`dotenv-cli` does not require a dedicated configuration file. Instead, it relies on standard `.env` files and CLI
arguments to control environment loading behavior.

Following are suggested file by **dotenv-flow**:

| File                                               | Purpose                                                                                                                       |
|----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| [`.env`](../../../../.env)                         | Base environment definition shared across all environments (typically contains **documentation** and **safe default values**) |
| [`.env.development`](../../../../.env.development) | Overrides used during **local development**                                                                                   |
| [`.env.production`](../../../../.env.development)  | Overrides applied in **PRODUCTION runtime** environments                                                                      |
| `.env.local`                                       | Local overrides for **machine-specific configuration** (should **not be committed** to version control)                       |
| `.env.<environment>`                               | Environment-specific overrides for additional stages (e.g. `.env.staging`, `.env.testing`)                                    |
| `.env.<environment>.local`                         | Local overrides for a specific environment (use only when necessary)                                                          |

In some workflows, additional supporting files may be introduced:

| File           | Purpose                                                                                                                   |
|----------------|---------------------------------------------------------------------------------------------------------------------------|
| `.env.example` | Template file describing required environment variables (used when `.env` files must not be committed to version control) |


************

[⤴️ Back: **Environmental Tools**](-intro.md)
