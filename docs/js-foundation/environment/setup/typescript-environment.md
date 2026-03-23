# ![TypeScript](../_static/icons/typescript-28.png) Configure TypeScript Environment

<p align="right"><em>&lt;Last updated: 2026-03-20&gt;</em></p>

TypeScript projects rely on configuration to **control compilation behavior**, **module resolution**, and **runtime
compatibility**. This section explains how environment-level settings are defined and structured to support consistent
development and build processes.

This configuration is centered around the **TypeScript Compiler (`tsc`)**, which uses the `tsconfig.json` file as the
primary source of compilation settings. Through this configuration, projects define how **TypeScript code is
transformed**, how **modules are resolved**, and how **output is prepared** for the target runtime environment.

> ### 🗂️ Contents
>   - 🧩 [Extend Configuration](#-extend-configuration-)

************

[⤴️ Back: **Node Environment**](-intro.md)\
[◀️ Previous: **Manage Node & Package Manager Versions**](node-package-manager-version.md)                                          \
                                             [Next: **Setup Environment in JavaScript Application** ▶️](typescript-environment.md)

************


## 🧩 Extend Configuration [🔺](#-configure-typescript-environment)

### 📦 Extend from Base Config

TypeScript allows a project to **inherit compiler settings from a predefined base configuration** using the `extends`
field. This is the **recommended** way to quickly align your project with a specific **runtime environment** or
**platform preset** without manually configuring each compiler option.

Base configs are maintained by the community in the [TSConfig Bases Recommendations](https://github.com/tsconfig/bases).

**① Choose a Base Config**

Select a base config that matches your **runtime or framework environment**.

Common selection strategies:

- **Node.js applications** -> Choose based on runtime version
  📗 Example:
  + Running on Node.js 24 -> [`@tsconfig/node24`](https://www.npmjs.com/package/@tsconfig/node24)

- **Framework-based projects** -> Choose framework preset
  📗 Examples:
  + Create React App -> [`@tsconfig/create-react-app`](https://www.npmjs.com/package/@tsconfig/create-react-app)
  + Vite + React -> [`@tsconfig/vite-react`](https://www.npmjs.com/package/@tsconfig/vite-react)

- **Alternative runtimes** -> Choose runtime preset
  📗 Examples:
  + Bun -> [`@tsconfig/bun`](https://www.npmjs.com/package/@tsconfig/bun)
  + Deno -> [`@tsconfig/deno`](https://www.npmjs.com/package/@tsconfig/deno)

If no exact match exists, choose the **closest preset** and override options locally.

**② Install the Base Config**

Add the selected base config as a **development dependency**:

📗 **Examples:** _For Node.js 24_

```shell
pnpm add -D @tsconfig/node24
```

**③ Extend the Base Config**

> ### 📘 Syntax
>
> ```
> // (📍 /tsconfig.json)
>
> {
>   "extends": "<base-config-file>/tsconfig.json"
> }
> ```
>
> 📙 `<base-config>` — Published TypeScript configuration package.
>   - You can extend multiple base configs by setting an array of configs.

This automatically applies recommended compiler settings for:
- Node.js runtime compatibility
- Modern ECMAScript targets
- Module resolution defaults
- Strictness presets

📗 **Examples:** _For Node.js 24_

```json5
// (📍 /tsconfig.json)

{
  "extends": "@tsconfig/node24/tsconfig.json"
}
```

To view the fully resolved configuration after inheritance:

```shell
tsc --showConfig
```

### 🧩 Extend from Other Configs (Local Config Inheritance)

In addition to extending community base configs, TypeScript allows a project to **inherit settings from another local
configuration file**. This is commonly used to **share common compiler settings across multiple packages or build
targets**.

Local config inheritance helps:
- Avoid duplication of compiler options
- Standardize settings across a monorepo
- Separate configs for different purposes (e.g., build, test, tooling)

> ### 📘 Syntax
>
> ```json
> {
>   "extends": "<relative-or-absolute-path>"
> }
> ```
>
> 📙 `<relative-or-absolute-path>` — Path to another tsconfig file.
>	  - Usually a relative path (e.g. ./tsconfig.base.json, ../tsconfig.shared.json)
>	  - Must resolve to a valid JSON config file

📗 **Example:** _Shared Base Config_

```json lines
// (📍 tsconfig.base.json)

{
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "moduleResolution": "NodeNext"
  }
}


// (📍 tsconfig.json)

{
  "extends": "./tsconfig.base.json", // 🟩 Extend from base config
  "compilerOptions": {
    "outDir": "dist"
  }
}
```

************

[⤴️ Back: **Node Environment**](-intro.md)\
[◀️ Previous: **Manage Node & Package Manager Versions**](node-package-manager-version.md)                                          \
                                             [Next: **Setup Environment in JavaScript Application** ▶️](typescript-environment.md)
