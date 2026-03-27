# ![TS-Node](../_static/icons/ts-node-28.png) TS-Node

<p align="right"><em>&lt;Last updated: 2026-03-26&gt;</em></p>

**TS-Node** is a runtime utility that allows you to **execute TypeScript files directly in Node.js** without a separate
build step. It integrates the TypeScript compiler into the Node execution pipeline, enabling **rapid development
workflows, scripting, and tooling** where on-the-fly compilation is preferred over precompiled output.

🔗 **Links:** _[NPM](https://www.npmjs.com/package/ts-node)_
            - _[Docs](https://typestrong.org/ts-node/docs/)_
            - _[Run Option](https://typestrong.org/ts-node/docs/options)_
            - _[Repository](https://github.com/TypeStrong/ts-node)_

> ### 🗂️ Contents
>   - 🌱 [Installation](#-installation-)
>   - 🕹 [Usage](#-usage-)
>   - ⚙️ [Configuration](#-configuration-)
>   - ⚡️ [Command Cheatsheet](#-command-cheatsheet-)
>   - 🗃 [Config Files](#-config-files-)

************

[⤴️ Back: **Node Runtimes**](-intro.md)\
                                                          [Next: **Nodemon** ▶️](nodemon.md)

************

## 🌱 Installation [🔺](#-ts-node)

Install **TS-Node** as a **development dependency** in your project:

```shell
pnpm add -D ts-node
```

Since **TS-Node** relies on the [TypeScript Compiler](../compilers/tsc.md), ensure TypeScript is also installed.

------------


## 🕹 Usage [🔺](#-ts-node)

`ts-node` provides several execution modes depending on how TypeScript should be **transpiled**, **loaded**, or
**validated** at runtime.

👉 _See all available options in th [official TS-Node Option docs](https://typestrong.org/ts-node/docs/options)._

Below are the most common usage patterns:


### ▶️ Run a TypeScript Application

Use `ts-node` to start a TypeScript entry file directly **without building the project first**.

```shell
ts-node <entry-file>

# --- OR in `package.json` ---
# "scripts": {
#   "start": "ts-node <entry-file>"
# }
```

📙 `<entry-file>` — Application entry point (e.g., `src/app.ts`, `src/server.ts`, `src/index.ts`).

📗 **Example:**

```shell
ts-node src/app.ts
```

This will:
  - Transpile TypeScript -> **JavaScript in memory**.
  - Start the Node.js process immediately.
  - Use compiler options from the nearest `tsconfig.json`.

🎯 This is typically used for:
  - Local development servers.
  - CLI tools written in TypeScript.
  - Lightweight backend services.


### 🚀 Run TypeScript with ESM Support

When the project uses **ES Modules**, the Node runtime must be configured to use the **ts-node ESM loader**.

```shell
node --loader ts-node/esm <entry-file>

# --- EQUIVALENT ---
ts-node --esm <entry-file>

# --- OR configure in `tsconfig.json` ---
# "ts-node": {
#   "esm": true
# }
```

📗 **Example:**

```shell
node --loader ts-node/esm src/server.ts
```

Required when:
  - `package.json` has `"type": "module"`.
  - Using `import` / `export` syntax in **Node runtime**.
  - `tsconfig.json` uses `"module": "ESNext"`.

⚠️ Without ESM configuration, runtime errors may occur such as:

```shell
> Unknown file extension ".ts"
> Cannot use import statement outside a module
```

👉 _Learn more: [CommonJS vs native ESM in ts-node](https://typestrong.org/ts-node/docs/imports/#native-ecmascript-modules)._


### 📜 Run TypeScript Scripts

Execute project scripts **written in TypeScript** directly using `ts-node`:

```shell
ts-node [--transpile-only] <script-file>

# --- OR in `package.json` ---
# "scripts": {
#   "<script>": "ts-node [--transpile-only] <script-file>"
# }
```

📙 `<script-file>` — Path to a TypeScript script (e.g., `scripts/migrate.ts`, `scripts/seed.ts`).

📙 `--transpile-only` — _(optional but **recommended**)_ Run scripts **without type checking**.
  - Improve execution speed.
  - Skip TypeScript compile-time validation.

🎯 When to use `ts-node` instead of `node`:
  - The script is written in **TypeScript** and not compiled to JavaScript.
  - The script depends on **project TypeScript configuration** (e.g., path aliases, shared types).
  - You want to reuse **TypeScript utilities**, **constants**, or **environment definitions**.

> ### 🧠 About `--transpile-only`
>
> The `--transpile-only` flag **skips the TypeScript type-checking phase**, allowing code to run faster by only
> transforming TypeScript into JavaScript at runtime. This improves execution speed but **removes compile-time safety
> guarantees**.
>
> In some production scenarios, teams may choose this approach to **avoid a separate build step** and **run TypeScript
> directly**. If used, ensure that type checking is performed earlier in the workflow (e.g., during CI or build
> validation).

------------


## ⚙️ Configuration [🔺](#-ts-node)

**TS-Node** behavior is primarily controlled through [`tsconfig.json`](../../../../tsconfig.json):

1. **TS-Node** reads compiler options from the nearest `tsconfig.json` to ensure:
   - Module resolution matches project build settings.
   - Path aliases and baseUrl work correctly.
   - Runtime behavior aligns with compiled output.
2. **TS-Node** supports its own configuration namespace (`ts-node`) inside `tsconfig.json`:
   - Any CLI option supported by `ts-node` can be defined here instead of passing flags at runtime.

📗 **Example:**

```json5
// (📍 /tsconfig.json)

{
  // -- ts-node will load configs of tsc --
  "compilerOptions": {
    "baseUrl": "./src",
  },
  // -- ts-node specific configs --
  "ts-node": {
    "esm": true,
    "files": true
  }
}
```

If your project uses multiple configs, specify one explicitly:

```shell
ts-node (-P|--project) <tsconfig-path> <entry-file>
```

📙 `-P`, `--project` — Path to a specific TypeScript configuration file.

📗 **Example:**

```shell
ts-node -P tsconfig.build.json src/server.ts
```

------------


## ⚡️ Command Cheatsheet [🔺](#-ts-node)

Here are the most commonly used `ts-node` CLI commands:

| Command                                 | Description                                           | Alias                              | 📗 Example                            |
|-----------------------------------------|-------------------------------------------------------|------------------------------------|---------------------------------------|
| `ts-node <file>`                        | Execute a TypeScript file with **full type checking** |                                    | `ts-node src/server.ts`               |
| `ts-node --esm <file>`                  | Execute with **native ESM** module support            | `node --loader ts-node/esm <file>` | `ts-node --esm src/server.ts`         |
| `ts-node --eval "<expression>"`         | Evaluate a TypeScript **expression inline**           | `ts-node -e "<expression>"`        | `ts-node --eval "console.log(1 + 1)"` |
| `ts-node --print --eval "<expression>"` | Evaluate and **print** the result inline              | `ts-node -p -e "<expression>"`     | `ts-node --print --eval "1 + 1"`      |

Common CLI options supported across `ts-node` commands:

| Option             | Description                                         | Short Form | 📗 Example                                            |
|--------------------|-----------------------------------------------------|------------|-------------------------------------------------------|
| `--project <path>` | Use a **specific tsconfig** file                    | `-P`       | `ts-node --project tsconfig.build.json src/server.ts` |
| `--transpile-only` | Skip **type checking** for faster startup           | `-T`       | `ts-node --transpile-only src/server.ts`              |
| `--cwd <dir>`      | Set the **working directory** for module resolution |            | `ts-node --cwd ./packages/app src/server.ts`          |

👉 _See full list in the [TS-Node Options docs](https://typestrong.org/ts-node/docs/options)_

------------


## 🗃 Config Files [🔺](#-ts-node)

`ts-node` does not use a dedicated standalone configuration file. Its behavior is configured through TypeScript project
configuration.

| File                                         | Purpose                                                                        |
|----------------------------------------------|--------------------------------------------------------------------------------|
| [`tsconfig.json`](../../../../tsconfig.json) | Main configuration file for both **TypeScript Compiler (tsc)** and **TS-Node** |

************

[⤴️ Back: **Node Runtimes**](-intro.md)\
                                                          [Next: **Nodemon** ▶️](nodemon.md)
