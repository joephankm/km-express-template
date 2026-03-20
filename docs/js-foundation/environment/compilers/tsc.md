# 🛡️ TSC (TypeScript Compiler)

<p align="right"><em>&lt;Last updated: 2026-03-20&gt;</em></p>

**TSC (TypeScript Compiler)** is the official tool for **transpiling TypeScript into JavaScript** and performing static
type checking. It enables developers to use modern TypeScript features while ensuring code compatibility with target
runtimes such as **Node.js** or **browsers**, helping maintain correctness, consistency, and build reliability across
projects.

> ### 🗂️ Contents
>   - 🌱 [Installation](#-installation-)
>   - 🕹 [Usage](#-usage-)
>   - 🗃 [Config Files](#-config-files-)

************

[⤴️ Back: **Compilers**](-intro.md)

************


## 🌱 Installation [🔺](#tsc-typescript-compiler)

The TypeScript Compiler (`tsc`) is distributed as the [**typescript** npm package](https://www.npmjs.com/package/typescript).
Install it as a **development dependency** in your project:

```bash
pnpm add -D typescript
```

After installation, the tsc command is available in the project context. Verify the installed version by:

```shell
tsc --version
```

------------

## 🕹 Usage [🔺](#tsc-typescript-compiler)

### ⚒️ Compile TypeScript

Compile the entire project using the nearest `tsconfig.json`:

```shell
tsc [<source-path>]

# --- OR in `package.json` ---
# "scripts": {
#   "build": "tsc [<source-path>]"
# }
```

📙 `<source-path>` — _(optional)_ Path to a source file or directory to compile.
  - If omitted, use the project configuration (`tsconfig.json`) in the nearest directory.

This will:
  - Type-check all included source files.
  - Emit compiled JavaScript to the configured output directory (`outDir`).
  - Use the nearest `tsconfig.json` unless specified otherwise.
  - Continue emitting files even if **type errors exist** (unless `noEmitOnError` is enabled).

> ### 🧠 What is “Emit” in TypeScript?
>
> In TypeScript, **emit** refers to the process where the compiler **transforms TypeScript source code into JavaScript
> output files** during compilation.
>
> During this process, all TypeScript-specific syntax (**types**, **interfaces**, **type annotations**, etc.) is
> **removed**, since JavaScript runtimes cannot understand type information.
>
> The emitted outputs may include:
>   - JavaScript files (`.js`) — Executable code that runs in **Node.js** or **browsers**.
>   - Type declaration files (`.d.ts`) — Provide **type information** for other TypeScript projects (commonly used when
>     publishing libraries).
>   - Source maps (`.map`) — Enable **debugging of original TypeScript source** while executing compiled JavaScript.


### 🔍 Type-Check Only (No Emit)

To validate types without generating output files:

```shell
tsc --noEmit

# --- OR in `package.json` ---
# "scripts": {
#   "typecheck": "tsc --noEmit"
# }
```

Useful for:
- Linting workflows
- Pre-commit checks
- CI validation


### ⚙️ Compile with a Specific Config (`--project`)

By default, tsc uses the nearest `tsconfig.json`. To compile using a different configuration, use the `--project` (or
`-p`) flag:

```shell
tsc {-p|--project} <project-path>
```

📙 <project-path> — Path to a `tsconfig.json` or directory containing one.

Common use cases:
  - Separate configs for **build**, **tests**, or **tools**.
  - Monorepos with multiple TypeScript configs.
  - Custom or environment-specific build pipelines.

📗 **Example:**

```shell
tsc -p tsconfig.build.json
```


### 🧩 Build Mode (`--build`)

Use the `--build` (or `-b`) flag to compile **composite TypeScript projects**. This mode is optimized for
**multi-project setups**, such as monorepos or layered architectures.

```shell
tsc {-b|--build} [<project-path>]
```

📙 <project-path> — Path to a `tsconfig.json` or directory containing one.
  - If omitted, TypeScript uses the nearest project configuration.

Build mode is commonly used for:
  - Monorepos
  - Library + app separation
  - Large-scale TypeScript systems
  - Incremental CI builds

📗 **Examples:**

```shell
# Build current project
tsc -b

# Build specific config
tsc -b tsconfig.build.json

# Build multiple projects
tsc -b packages/*

# Clean build outputs
tsc -b --clean
```

👉 _Read [Compiler Options](https://www.typescriptlang.org/docs/handbook/compiler-options.html) for full TSC options._

------------


## 🗃 Config Files [🔺](#tsc-typescript-compiler)

The table below lists the TypeScript configuration files.

| File                                         | Purpose                                               |
|----------------------------------------------|-------------------------------------------------------|
| [`tsconfig.json`](../../../../tsconfig.json) | Base compiler configuration shared across the project |


************

[⤴️ Back: **Compilers**](-intro.md)
