# ![eslint](../_static/icons/eslint-28.png) ESLint – Advanced

<p align="right"><em>&lt;Last updated: 2025-10-06&gt;</em></p>

This is an advanced companion guide to the main [ESLint](eslint.md) document.

> ### 🗂️ Contents
>   - 🛠️ [Config File](#-config-file-)
>   - 🧭 [Scope and Ignore Settings](#-scope-and-ignore-settings-)
>   - 🔬 [Parsers](#-parsers-)
>   - 🔌 [Plugins](#-plugins-)
>   - 📤 [Shared Configs](#-shared-configs-)
>   - 📦 [Popular Packages](#-popular-packages-)

************

[⤴️ Back: **ESLint**](eslint.md)

************


## 🛠️ Config File [🔺](#-eslint--advanced)

### 🚀 Use Flat Config (Modern ESLint Setup)

**Flat Config** is the modern, file-based configuration format recommended starting from **ESLint v9+**. It replaces the
legacy `.eslintrc` system with a **JavaScript-only, fully declarative structure,** offering more flexibility and better
performance for large or complex projects.

> ### ⚖️ _Flat Config vs. Legacy Config_
>
> | Feature                    | ✅ Flat Config<br>(`eslint.config.(c\|m)?js`) | ❌ Legacy Config<br>(`.eslintrc*`)             |
> |----------------------------|----------------------------------------------|-----------------------------------------------|
> | **File Format**            | JavaScript only                              | Supports JSON, YAML, JS or in `package.json`  |
> | **Scoped files & ignores** | Built-in per-config scoping                  | Requires separate `.eslintignore`             |
> | **Programmatic Logic**     | Full JS logic (functions, variables)         | Limited (only in `.eslintrc.js`)              |
> | **Rule Extension**         | Use `extends` via imported configs           | Use string names (e.g., `eslint:recommended`) |
> | **Plugin registration**    | Manual via `plugins` + `rules`               | Automatic via plugin name resolution          |
>
> 👉 _For more different format detail, see [Key Differences between Formats](https://eslint.org/docs/latest/use/configure/migration-guide#key-differences-between-configuration-formats)._

In Flat Config, everything revolves around a Config Object, which controls:
  - What files to lint.
  - What language options to use (e.g., ECMAScript version, globals).
  - Which plugins and rules to apply.
  - How to structure configs per scope or project area.

👉 _Read more about the motivation in [The New Config System](https://eslint.org/blog/2022/08/new-config-system-part-2/)._

You can define **multiple scoped config blocks within an array**, enabling **flexible, modular configurations** tailored
to different parts of your codebase — whether it’s separating test files, framework-specific logic, or file types.

```js
// (📍 /eslint.config.mjs)

import exampleConfigObject from 'eslint-config-example-object';

export default [
  // -- Import from a shared config --
  exampleConfigObject,

  // -- Inline config --
  {
    rules: {
      exampleRule: 'error'
    }
  }
];
```

👉 _See all supported properties in the [ESLint Configuration Objects docs](https://eslint.org/docs/latest/use/configure/configuration-files#configuration-objects)._


### 🧱 Define with `defineConfig()`

ESLint provides a helper called `defineConfig()` to structure config files. It’s part of the new **Flat Config** system
and is the **recommended** way to write config — it improves type-safety, readability, and consistency. You can pass:
  - One or more Config Objects as individual arguments.
  - A single array of Config Objects.

```js
// (📍 /eslint.config.mjs)

import { defineConfig } from 'eslint/config';
import exampleConfigObject from 'eslint-config-example-object';
import exampleConfigArray from 'eslint-config-example-array';

// -- Pass configs directly as arguments --
export default defineConfig(
  exampleConfigObject,
  exampleConfigArray,
);

// --- OR ---

// -- Pass configs as an array --
export default defineConfig([
  exampleConfigObject,
  exampleConfigArray,
]);

// --- EQUIVALENT ---

// -- Without config helper --
export default [
  exampleConfigObject,
  ...exampleConfigArray,
];
```


### 📏 Setting Rules

**Rules** in ESLint define **what patterns are checked** during linting and **how strictly they are applied**. Each rule
must be configured in your config file to determine whether it’s **active** or **ignored**, with **optional settings**
to fine-tune behavior.

> ### 📘 Key Fields
>
> 🔹 `rules` — An object that maps rule names to their configuration.
>   - Keys are `<rule-name>` (e.g., `no-console`, `@typescript-eslint/no-unused-vars`).
>   - Values define the rule’s severity and optional settings.\
>     (🤘 _See [Lint Rules](eslint.md#-lint-rules-) for rule severity levels and configuration formats._)

📗 **Example:**

```js
// (📍 /eslint.config.mjs)

export default defineConfig(
  {
    rules: {
      // -- Disable rule --
      'no-console': 'off',

      // -- Warn when unused variables exist --
      // -- Format: `<rule-name>: <severity-level>` --
      'no-unused-vars': 'warn',

      // -- Require semicolons at the end of statements --
      // -- Format: `<rule-name>: [<severity-level>, '<string-option>']` --
      'semi': ['error', 'always'],

      // -- Enforce single quotes, allow template literals --
      // -- Format: `<rule-name>: [<severity-level>, '<string-option>', { <object-option> }]` --
      'quotes': ['error', 'single', { allowTemplateLiterals: true }]
    },
  },
);
```


### 🌐 Change Language Options

By default, ESLint is configured to parse the **latest ECMAScript syntax** and assume that your project uses **ES
modules**. These defaults (`ecmaVersion: 'latest', sourceType: 'module'`) work well for most modern JavaScript projects,
so you typically **don’t need to change them**.

However, in some cases you may want to override these settings using the `languageOptions` property in a **Config
Object** — for example, when working with **legacy code** or **non-module environments**.

> ### 📘 Key Fields
>
> 🔹 `languageOptions`.`ecmaVersion` — Defines **ECMAScript version** ESLint should understand.
>   - **Values:**
>     + `latest`         – the most recent supported version.
>     + A year           – i.e. `2016`, `2020`.
>     + A version number – i.e. `5` (ES5), `6` (ES2015).
>   - **Default:** `latest`
>
> ---
>
> 🔹 `languageOptions`.`sourceType` — Determines how ESLint interprets your **module system**.
>   - **Values:**
>     + `module`   – **ECMAScript Modules** (_`import`/`export` syntax, the modern default_).
>     + `commonjs` – **CommonJS** (_`require`/`module.exports` syntax, **Node.js** classic_).
>     + `script`   – **Standalone scripts** (_no module system, e.g., inline browser scripts_).
>   - **Default:** `module`

📗 **Example:** _Override **ECMAScript Version** and **Module Type**_

```js
// (📍 /eslint.config.mjs)

export default defineConfig(
  {
    languageOptions: {
      // EcmaScript version
      ecmaVersion: 5,

      // Module system type
      sourceType: 'script',
    },
  },
);
```


### 🌍 Specify Global Variables

**Global variables** are values that can be accessed anywhere in your **JavaScript** code without being explicitly
declared inside a function or block scope. They are properties of the [globalThis](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis)
object — for example, `window` in the **browser** or `global` in **Node.js**.

Different runtimes (**browser**, **Node.js**, **test frameworks**, etc.) provide their own sets of `globals`. Because of
this, **ESLint** needs to know **which globals are available** in your project. Otherwise, ESLint might raise `no-undef`
errors when it sees a variable that is actually valid in your runtime.

> ### 📘 _Key Fields_
>
> 🔹 `languageOptions`.`globals` — Defines which **global variables** are available during linting and how they can be
> used in your code.
>   - **Values:**
>     + `writable` – the **global variable** can be reassigned/overwritten.
>     + `readonly` – the **global variable** exists but cannot be reassigned.
>     + `off`      – disable or remove the **global variable** (ESLint will treat it as `undefined`).

To simplify this, you can use the [`globals`](https://www.npmjs.com/package/globals) package, which provides ready-made
sets of globals for common environments.

📗 **Example:** _Define and Customize **Global Variables**_

```js
// (📍 /eslint.config.mjs)

import globals from 'globals';

export default defineConfig(
  {
    languageOptions: {
      globals: {
        // Node.js built-in globals
        ...globals.nodeBuiltin,

        // Jest testing environment globals
        ...globals.jest,

        // Add custom globals
        foo: 'writable',
        bar: 'readonly',

        // Disable existing global
        Promise: 'off',
      },
    }
  },
);
````

------------


## 🧭 Scope and Ignore Settings [🔺](#-eslint--advanced)

### 🎯 Control Config Scope

In Flat Config, you can define multiple Config Objects inside the same ESLint config file. Each object **can be scoped
to specific files and folders** using the `files` and `ignores` properties.

When multiple **Config Objects** match a file, ESLint **merges them, with later objects overriding earlier ones** for
any conflicting settings. This allows you to precisely c**ontrol which rules, plugins, or parser options apply to
different areas** of your codebase.

> ### 📘 Key Fields
>
> 🔹 `files` — Defines which files the current Config Object should apply to.
>   - **Syntax:**
>     + Accepts an array of glob patterns (e.g., `src/**/*.ts`, `**/*.test.js`).
>     + To target files without extensions, use `!(*.*)`.
>   - If omitted, the config applies to all files.
>
> ---
>
> 🔹 `ignores` — Excludes specific files or directories even if they match files.
>   - **Syntax:**
>     + Also accepts glob patterns (e.g., `**/generated/**`).
>
> ---
>
> 🔹 `basePath` — Specifies the root directory to resolve `files` and `ignores` from.
>   - Defaults to the ESLint working directory.
>   - Useful for monorepos or custom folder structures.

Using `files` and `ignores` together lets you **fine-tune configuration behavior**, targeting specific parts of your
project without affecting global settings.

```js
// (📍 /eslint.config.mjs)

import eslint from '@eslint/js';

export default defineConfig(
  {
    rules: {
      // ... common rules applied to all files
    },
  },
  {
    files: ['src/some-path/**'],
    ignores: ['src/some-path/ignore-path/**'],
    languageOptions: {
      // ... custom parser, globals, or settings for this folder
    },
    rules: {
      // ... override or extend rules for this path
    },
  },
);
```


### 🚫 Ignore Files Globally

When `ignores` is used without any other keys (except `name`), the patterns are applied to all config objects. The
default global ignore patterns are `**/node_modules/` and `.git/`. To add more global ignore patterns, add **Config
Object with single `ignores`**:

```js
// (📍 /eslint.config.mjs)

export default defineConfig(
  {
    ignores: ['**/dist/', '**/build/'],
  },
);

// --- OR ---

import { globalIgnores } from 'eslint/config';

export default defineConfig(
  globalIgnores(['**/dist/', '**/build/'], 'Ignore globally'), // -> helper to avoid confution
);
```

You can also use your `.gitignore` file (or any other file with gitignore-style patterns) as global ignore patterns.
This way you don’t need to duplicate the same ignore rules in both `.gitignore` and ESLint config:

```js
// (📍 /eslint.config.mjs)

import { includeIgnoreFile } from 'eslint/config';
import { fileURLToPath } from 'node:url';

const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url));

export default defineConfig([
  includeIgnoreFile(gitignorePath, {
    gitignoreResolution: true,
    name: 'Imported .gitignore patterns',
  }),
]);
```

------------


## 🔬 Parsers [🔺](#-eslint--advanced)

A **Parser** is responsible for converting source code into an **Abstract Syntax Tree (AST)**, which ESLint uses to
analyze structure and detect rule violations.

By default, ESLint uses a parser designed for **JavaScript**, but you can configure additional parsers to support other
languages and syntaxes such as **TypeScript**, **JSX**, or even **CSS-in-JS**.


### ⚙️ Configure Parsers

Parsers are configured under `languageOptions` in a **Config Object**.

> ### 📘 Key Fields
>
> 🔹 `languageOptions`.`parser` — Specifies which **Parser** to use.
>   - **Optional** – If not set, ESLint uses its default **JavaScript parser** (Espree).
>
> ---
>
> 🔹 `languageOptions`.`parserOptions` — Additional options passed to the parser.
>   - Available options depend on the **selected parser**.\
>     (_Refer to its official documentation for supported configuration._)


### 🧩 JavaScript (Default) / TypeScript Parsers

By default, ESLint uses [Espree](https://github.com/eslint/js/tree/main/packages/espree), a parser built on
**Acorn** that powers ESLint out of the box. **Espree** is designed specifically for modern **JavaScript**, and you
can customize its behavior through [JavaScript Parser Options](https://github.com/eslint/js/tree/main/packages/espree#options).

If you’re working with **TypeScript**, the parser is automatically provided by [@typescript-eslint/parser](https://typescript-eslint.io/packages/parser)
whenever you use `typescript-eslint`. This integration happens under the hood, so you usually don’t need to install or
configure the parser manually. Just like **Espree**, it offers its own set of [TypeScript Parser Options](https://typescript-eslint.io/packages/parser#configuration),
some of which overlap with **JavaScript** while others are **TypeScript**-specific.

📗 **Example:** _Enable Extra **Parser** Features_

```js
// (📍 /eslint.config.mjs)

export default defineConfig(
  {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          // Enable global strict mode automatically
          impliedStrict: true,

          // Enable parsing of JSX syntax
          jsx: true,
        },
      },
    },
  },
);
```


### 🔍 Other Parsers

For **other languages or syntaxes**, you may need a dedicated Parser, or **usually provided by a Plugin**. On **npm**,
you’ll typically find these under:
- [`eslint-plugin-*`](https://www.npmjs.com/search?q=eslint%20plugin) –> **preferred**, since plugins usually configure
  their parser automatically.
- [`eslint-parser-*`](https://www.npmjs.com/search?q=eslint%20parser) –> used directly only if required.

```js
// (📍 /eslint.config.mjs)

import babelParser from '@babel/eslint-parser';

export default defineConfig(
  {
    languageOptions: {
      parser: babelParser,
    },
  },
);
```

> ### 📕 Note
>
> When using a Plugin, you usually **don’t need to configure the Parser explicitly** — the Plugin takes care of it. Only
> override the Parser when you require **custom behavior** or **need to support non-standard syntax**.

------------


## 🔌 Plugins [🔺](#-eslint--advanced)

**Plugins** are the primary way to extend ESLint’s functionality by **adding new rules**, **support for new languages**,
and enabling the linter to **enforce standards for specific frameworks** like _React_, _TypeScript_, or _Angular_ that
are not covered by ESLint's core features.

A plugin can provide:
  - **Additional rules** (e.g., React, Vue, Jest).
  - **Custom parsers** (_for handling new syntaxes_).
  - **Processors** (_to lint non-JavaScript files like **Markdown** or **GraphQL**_).
  - **Predefined configs** (_predefined sets of **rules** + **settings**_).


### ⚙️ Configure Plugins

Plugins are configured within a **Config Object**.

> ### 📘 Key Fields
>
> 🔹 `plugins` — Registers ESLint plugins.
>   - **Syntax:** defined as an object mapping `{ <namespace>: <PluginObject> }`.\
>     📗 **Example:** `{ react: reactPlugin }`
>   - `<namespace>` can be the same as the package name or a custom alias.
>   - Once registered, plugin rules are referenced as `<namespace>/<rule-name>`, e.g., `react/jsx-uses-react`.
>
> ---
>
> 🔹 `processor` — Applies a plugin’s **processor** to matching files.
>   - **Syntax:** `<namespace>/<processor-name>` string **after** registering the plugin, **or** pass the **processor
>             function/object** directly.\
>     📗 **Example:** `markdown.processors.markdown`
>   - Use when linting **non-JS code** or **embedded code blocks** (e.g., **Markdown**, **GraphQL**, **MDX**).
>   - Processors tell **ESLint** how to extract JavaScript from other file types, allowing to lint that extracted code.
>
> ---
>
> 🔹 `language` — Use a plugin-provided language (parsing + traversal).
>   - **Syntax:** `<namespace>/<language-name>` **after** registering the plugin.\
>     📗 **Example:** `json/jsonc`
>   - Use for linting **alternative syntaxes** (e.g., **JSON**, **TOML**, **Markdown**).
>   - When `language` is set, `languageOptions` apply specifically to that `language`, so you’ll need to check the
>     plugin’s documentation for supported options.

📗 **Example:** _Use `plugins` + `processor` + `language` Together_

```js
// (📍 /eslint.config.mjs)

import markdown from '@eslint/markdown';
import json from '@eslint/json';

export default defineConfig(
  // Register Markdown plugin and aplly to .md files
  {
    files: ['**/*.md'],
    plugins: {
      markdown,
    },
    // -- Use a processor to lint JS inside Markdown fences --
    processor: 'markdown/markdown',
  },

  // Register JSON plugin and apply to .json files
  {
    files: ['**/*.json'],
    plugins: {
      json,
    },
    language: 'json/jsonc',
  },
);
```

👉 _For full details on plugin configuration, refer to the [Configure Plugins guide](https://eslint.org/docs/latest/use/configure/plugins)._

> ### 💡 Tip
>
> Most plugins already ship with **predefined configs** that includes the **necessary settings for plugins** (fields
> described above), along with **recommended rules**. Because of this, it’s usually better to extend the **predefined
> config** rather than registering the plugin manually.
>
> Registering the plugin manually only if:
>   - The plugin does not provide predefined configs.
>   - You want full control and prefer not to use the plugin’s recommended rules.
>
> 🤘 _To use predefined configs, you can [apply them directly](#-uapply-a-shared-config-directlyu) or [override them](#-uoverriding-settings-from-shared-configs-via-extendsu)._


### 🗂️ Plugin Types

Plugins are available in several forms:

##### 🟡 <u>ESLint Plugin Packages</u>

Most ESLint **plugins** are published as **npm** packages and can be installed into your project.

- **Purpose:** Add linting rules for specific **frameworks**, **languages**, or **code patterns**.
- **How to Use:**
  1. Search for packages named [`eslint-plugin-*`](https://www.npmjs.com/search?q=eslint%20plugin) on **npm**.
  2. Install them as `devDependencies`.
  3. Register them in your ESLint config (either via the `plugins` field or by one of its **predefined configs**).
- 📗 **Examples:** `eslint-plugin-react`, `eslint-plugin-import`, `@typescript-eslint/eslint-plugin`.

##### 🟡 <u>Creating Own Plugin</u>

You can also create your own plugins when your team or company needs to make **custom linting rules** or adopt
**company-wide standards** that existing community plugins do not cover.

- **Purpose:** Define custom linting rules or conventions unique to your codebase.
- **How to Use:**
  1. Create a **plugin module** that exports a **plugin object** (usually containing `{ meta, configs, rules, processors }`).
  2. The **plugin** can be:
     - Local only – specific for current project.
     - Published – push it to **npm** (`eslint-plugin-<name>` or `@<scope>/eslint-plugin-<name>`) or to a **Git
       repo** (e.g., GitHub).
  3. Register it in your ESLint config.

👉 _See the [Create Plugins guide](https://eslint.org/docs/latest/extend/plugins) for full instructions_

------------


## 📤 Shared Configs [🔺](#-eslint--advanced)

ESLint lets you extend existing configs, so you don’t need to redefine every rule from scratch. Instead of setting all
rules and options manually, you can **reuse and combine existing configs** to **maintain consistency**, **reduce
duplication**, and adopt **community standards** or **team-specific conventions**.

Unlike [Plugins](#-plugins-), Shared Configs **do not introduce new rules or functionality**. Instead, they bundle
together:
  - A set of **predefined rules** with severity levels (e.g., `error`, `warn`, `off`) already configured
  - References to **existing plugins** and their **recommended rules**
  - Additional **language** or **parser options**
  - Other settings (e.g., `linterOptions`)

Shared configs are simply reusable ESLint configuration objects.


### ⚙️ Configure Shared Configs

Shared configs are applied through ESLint’s configuration system.

> ### 📘 _Key Fields_
>
> 🔹 `extends` — An array of configurations to extend from.
>   - A string – the name of a predefined config in a plugin (e.g., `eslint:recommended`, `prettier`).
>   - A config object – an inline config defined directly in your file.
>   - A config array – another array of configs to merge.
>
> ---
>
> 🔹 Direct usage (without `extends`) — (_**preferred**_) You can also pass a configuration object directly to
> `defineConfig()`.
>   - The config is applied **globally**.
>   - Best for full-project adoption.
>   - Not intended for **inline overrides** or **file-specific** settings.

In practice, there are three ways to apply a shared config:

##### 🟢 <u>Apply a Shared Config (directly)</u>

In most cases, a **shared config** is ready to use. You can simply pass its **config object** directly into
`defineConfig()`. When applied this way, the config becomes **global** for your project.

If you need to customize it  — for example, to **target specific files** or **override certain rules** — you can add
another **config object** below.

📗 **Example:**

```js
// (📍 /eslint.config.mjs)

import exampleConfig from 'eslint-config-example';

export default defineConfig(
  // -- Config object applied directly, apply globally --
  exampleConfig,

  // -- Customize path and rules --
  {
    files: ['src/**/*.ts'],
    rules: {
      'example-config-rule-a': 'warn',
    },
  },
);
```

##### 🟢 <u>Overriding Settings from Shared Configs (via `extends`)</u>

Use the `extends` field when you want to **start from one or more shared configs** and then **override or narrow it**
— for example, to tweak rules, set file globs, or change parser options for certain paths.

How it works:
  - `extends` accepts an array of configs to inherit from.
  - Your current **config object** can then add/override `rules`, `plugins`, `languageOptions`, etc.
  - Later **configs** (and the keys you define locally) override earlier ones.

📗 **Example:**

```js
// (📍 /eslint.config.mjs)

import exampleConfig from 'eslint-config-example';
import examplePlugin from 'eslint-plugin-example';

export default defineConfig(
  {
    // Apply this config only to TypeScript files
    files: ['src/**/*.ts'],

    // Extend from shared configs
    extends: [
      examplePlugin.configs.recommended,
      exampleConfig,
    ],

    // Modify rules for shared configs
    rules: {
      'example-plugin-rule-a': 'off',
      'example-config-rule-b': 'warn',
    },
  },
);
```

##### 🟢 <u>Extending Configs from Plugins (via `extends`)</u>

When you register a plugin through the `plugins` field, you can also use the **predefined configs** bundled inside that
plugin. These configs are designed by the plugin authors to provide **recommended** or **framework-specific** rulesets.

📗 **Example:**

```js
// (📍 /eslint.config.mjs)

import examplePlugin from 'eslint-config-example';

export default defineConfig(
  {
    // Apply this config only to TypeScript files
    files: ['src/**/*.ts'],

    // Register the plugin under a namespace
    plugins: {
      example: examplePlugin,
    },

    // Extend from shared configs
    extends: [
      'example/recommended', // the config name, following the pattern "<namespace>/<config-name>"
      // examplePlugin.configs.recommended, // OR use the exported config object
    ],

    // Override or add rules on top of the extended config
    rules: {
      // Rules are referenced via "<namespace>/<rule-name>"
      'example/rule-a': 'off',
    },
  },
);
```


### 🗂️ Shared Config Types

Shared configs can come from different sources:

##### 🟡 <u>Shareable Config Packages</u>

A **Shareable Config** is an ESLint config published as a **npm** package that you can install and reuse across
projects.
- **Purpose:** Simplify adopting **popular style guides** (e.g., Airbnb, Google, StandardJS).
- **Content:** Often focused on **recommended or standard rules**, but may also include related settings.
- **How to Use:**
  1. Search for packages named [`eslint-config-*`](https://www.npmjs.com/search?q=eslint-config) on **npm**.
  2. Install them as `devDependencies`.
  3. Import them inside your `eslint.config.mjs`.

##### 🟡 <u>Predefined Configs from Plugins</u>

Many **ESLint plugins** (e.g., React, TypeScript, Vue) ship with **predefined configs** that can be extended directly.
They automatically **activate the plugin** and **apply its rules**, so you don’t need to explicitly declare the plugin
in your config.
- **Purpose:** Make setup easier by activating both the _plugin_ and its **recommended rules** in one step.
- **Content:** Bundles the **plugin** itself, its **recommended rules**, and often extra settings such as **parser**,
  **language options**, or **processors**.
- **How to Use:**
  1. Check the plugin’s documentation for **available predefined configs**.
  2. Extend the desired config in your `eslint.config.mjs`.

##### 🟡 <u>Create Own Shareable Configs</u>

Teams or companies can create their own **internal shareable configs** to enforce **consistency standard** across
multiple projects.
- **Purpose:** Standardize ESLint usage across teams and repositories.
- **Content:** Can vary depending on team needs:
  + A set of **preferred rules** – unify team coding conventions
  + Common settings – share reusable configs across projects
  + A full setup (**rules**, **plugins**, **shareable configs**, **languages**, etc.) – an all-in-one solution
- **How to Use:**
  1. Create a shareable config package (named `eslint-config-<name>` or `@<scope>/eslint-config-<name>`).
  2. Publish to your private **npm** or host it in a **Git repository** (e.g., **GitHub**).
  3. Extend it in your `eslint.config.mjs`.

👉 _See the official guide: [Creating a Shareable Config](https://eslint.org/docs/latest/extend/shareable-configs)_

------------


## 📦 Popular Packages [🔺](#-eslint--advanced)

> - ❌: Deprecated
> - ⚠️: No Flat Config Support

### 🛠 Core & TypeScript

| Package             | Purpose                                                           | Type            | Links                                                                                                                                                        |
|---------------------|-------------------------------------------------------------------|-----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `@eslint/js`        | Core **JavaScript** rules from ESLint                             | Core config     | [Rules](https://eslint.org/docs/latest/rules/) - [Configs](https://eslint.org/docs/latest/use/configure/configuration-files#using-predefined-configurations) |
| `typescript-eslint` | Add **TypeScript** support for ESLint                             | Plugin + Parser | [Rules](https://typescript-eslint.io/rules/) - [Configs](https://typescript-eslint.io/users/configs)                                                         |
| `globals`           | Provides sets of **global variables** (Node, browser, Jest, etc.) | Core utility    | [Globals object](https://github.com/sindresorhus/globals/blob/main/globals.json)                                                                             |


### ⚛️ Frameworks & Libraries

| Package                         | Purpose                                                                    | Type   | Links                                                                                                                                                                                                                                  |
|---------------------------------|----------------------------------------------------------------------------|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `eslint-plugin-n`               | **Node.js** best practices and API rules                                   | Plugin | [Rules](https://github.com/eslint-community/eslint-plugin-n?tab=readme-ov-file#-rules) - [Configs](https://github.com/eslint-community/eslint-plugin-n?tab=readme-ov-file#-configs)                                                    |
| `eslint-plugin-react`           | **React**-specific linting rules                                           | Plugin | [Rules](https://github.com/jsx-eslint/eslint-plugin-react?tab=readme-ov-file#list-of-supported-rules) - [Configs](https://github.com/jsx-eslint/eslint-plugin-react?tab=readme-ov-file#shareable-configs)                              |
| `eslint-plugin-react-hooks`     | Enforce **React Hooks** rules                                              | Plugin | [Rules](https://react.dev/reference/eslint-plugin-react-hooks)                                                                                                                                                                         |
| `@eslint-react/eslint-plugin`   | Modern **React** plugin (includes core, hooks, DOM, and performance rules) | Plugin | [Rules](https://eslint-react.xyz/docs/rules/overview) - [Configs](https://eslint-react.xyz/docs/presets)                                                                                                                               |
| `@angular-eslint/eslint-plugin` | Official **Angular (2+)** linting rules                                    | Plugin | [Rules](https://github.com/angular-eslint/angular-eslint/tree/main/packages/eslint-plugin#rules)                                                                                                                                       |
| `eslint-plugin-vue`             | **Vue.js** linting rules                                                   | Plugin | [Rules](https://eslint.vuejs.org/rules/) - [Configs](https://eslint.vuejs.org/user-guide/#bundle-configurations-eslint-config-js)                                                                                                      |
| `eslint-plugin-jest`            | Linting rules for **Jest** test framework                                  | Plugin | [Rules](https://github.com/jest-community/eslint-plugin-jest?tab=readme-ov-file#rules) - [Configs](https://github.com/jest-community/eslint-plugin-jest?tab=readme-ov-file#shareable-configurations)                                   |
| `eslint-plugin-jest-dom`        | Enforce best practices for `jest-dom` assertions                           | Plugin | [Rules](https://github.com/testing-library/eslint-plugin-jest-dom?tab=readme-ov-file#supported-rules) - [Configs](https://github.com/testing-library/eslint-plugin-jest-dom?tab=readme-ov-file#recommended-configuration)              |
| `eslint-plugin-testing-library` | Best practices for **Testing Library** (React, DOM, Angular, etc.)         | Plugin | [Rules](https://github.com/testing-library/eslint-plugin-testing-library?tab=readme-ov-file#supported-rules) - [Configs](https://github.com/testing-library/eslint-plugin-testing-library?tab=readme-ov-file#shareable-configurations) |


### 📂 File Types

| Package                      | Purpose                                                                  | Type          | Links                                                                                                                                                            |
|------------------------------|--------------------------------------------------------------------------|---------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `@eslint/json`               | Lint **JSON** (`.json`) files                                            | Plugin        | [Rules](https://github.com/eslint/json?tab=readme-ov-file#rules) - [Configs](https://github.com/eslint/json?tab=readme-ov-file#recommended-configuration)        |
| `eslint-plugin-yml`          | Lint **YAML** (`.yml`, `.yaml`) files                                    | Plugin        | [Rules](https://ota-meshi.github.io/eslint-plugin-yml/rules/) - [Configs](https://ota-meshi.github.io/eslint-plugin-yml/user-guide/#new-config-eslint-config-js) |
| `@eslint/markdown`           | Lint **Markdown** (`.md`) and code blocks inside Markdown                | Plugin        | [Rules](https://github.com/eslint/markdown?tab=readme-ov-file#rules) - [Configs](https://github.com/eslint/markdown?tab=readme-ov-file#configurations)           |
| `@html-eslint/eslint-plugin` | Lint **HTML** files and HTML code inside JS Template Literals            | Plugin        | [Rules](https://html-eslint.org/docs/rules)                                                                                                                      |
| `@eslint/css`                | Lint **CSS** (`.css`, `.scss`, `.less`) files                            | Plugin        | [Rules](https://github.com/eslint/css?tab=readme-ov-file#rules) - [Configs](https://github.com/eslint/css?tab=readme-ov-file#configurations)                     |
| `eslint-plugin-css`          | Lint **CSS-in-JS** style object definitions                              | Plugin        | [Rules](https://ota-meshi.github.io/eslint-plugin-css/rules/) - [Configs](https://ota-meshi.github.io/eslint-plugin-css/user-guide/#usage)                       |
| `stylelint `                 | Separate linter for **CSS/SCSS/LESS** with in-depth style-specific rules | External tool | [Rules](https://stylelint.io/user-guide/rules) - [Setup Guide](https://stylelint.io/user-guide/get-started)                                                      |


### 🎨 Style Guides (Shareable Configs)

| Package                                                             | Purpose                                | Type     | Links                                                                                                                                                        |
|---------------------------------------------------------------------|----------------------------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `eslint-config-airbnb` ⚠️                                           | Airbnb JavaScript + React style guide  | Config   | [Styles](https://github.com/airbnb/javascript) + [React Styles](https://github.com/airbnb/javascript/tree/master/react)                                      |
| `eslint-config-airbnb-base` ⚠️                                      | Airbnb rules without React             | Config   | [Styles](https://github.com/airbnb/javascript)                                                                                                               |
| `eslint-config-airbnb-typescript` ❌                                 | Airbnb + TypeScript support            | Config   |                                                                                                                                                              |
| `eslint-config-airbnb-extended` <br/>(via `create-airbnb-x-config`) | Airbnb rules ported for Flat Config    | Config   | [Extended Features](https://eslint-airbnb-extended.nishargshah.dev/config/extended-config) - [CLI](https://eslint-airbnb-extended.nishargshah.dev/cli/guide) |
| `eslint-config-google`                                              | Google’s JavaScript style guide        | Config   | [Styles](https://google.github.io/styleguide/jsguide.html)                                                                                                   |
| `eslint-config-standard`                                            | JavaScript Standard Style              | Config   | [Styles](https://standardjs.com/rules)                                                                                                                       |


### 🚀 Advanced / Utility

| Package                                           | Purpose                                                        | Type   | Links                                                                                                                                                                                        |
|---------------------------------------------------|----------------------------------------------------------------|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `eslint-plugin-unicorn`                           | Enforce modern best practices and catch common mistakes        | Plugin | [Rules](https://github.com/sindresorhus/eslint-plugin-unicorn?tab=readme-ov-file#rules) - [Configs](https://github.com/sindresorhus/eslint-plugin-unicorn?tab=readme-ov-file#preset-configs) |
| `eslint-plugin-sonarjs`                           | Detect code smells and maintainability issues                  | Plugin | [Rules](https://github.com/SonarSource/SonarJS/blob/master/packages/jsts/src/rules/README.md#rules)                                                                                          |
| `eslint-plugin-perfectionist`                     | Enforce strict **sorting & ordering** (imports, objects, etc.) | Plugin | [Rules](https://perfectionist.dev/rules) - [Configs](https://perfectionist.dev/configs)                                                                                                      |
| `eslint-plugin-promise`                           | Rules for working safely with JavaScript **Promises**          | Plugin | [Rules](https://github.com/eslint-community/eslint-plugin-promise?tab=readme-ov-file#rules)                                                                                                  |
| `eslint-plugin-import`                            | Linting for ES Modules **imports/exports**                     | Plugin | [Rules](https://github.com/import-js/eslint-plugin-import?tab=readme-ov-file#rules)                                                                                                          |
| `eslint-plugin-import-x`                          | Alternative lightweight **import/exports** plugin              | Plugin | [Rules](https://github.com/un-ts/eslint-plugin-import-x?tab=readme-ov-file#rules)                                                                                                            |
| `eslint-plugin-jsdoc`                             | Enforce valid and consistent **JSDoc** comments                | Plugin | [Rules](https://github.com/gajus/eslint-plugin-jsdoc?tab=readme-ov-file#rules) - [Configs](https://github.com/gajus/eslint-plugin-jsdoc?tab=readme-ov-file#flat-config-declarative)          |
| `eslint-plugin-regexp`                            | Lint and optimize **Regular Expressions**                      | Plugin | [Rules](https://ota-meshi.github.io/eslint-plugin-regexp/rules/) - [Configs](https://ota-meshi.github.io/eslint-plugin-regexp/user-guide/#usage)                                             |
| `@eslint-community/eslint-plugin-eslint-comments` | Enforce best practices for ESLint **directive comments**       | Plugin | [Rules](https://eslint-community.github.io/eslint-plugin-eslint-comments/rules/)                                                                                                             |
| `eslint-plugin-compat`                            | Lint for **browser API compatibility** using Browserslist      | Plugin | [Setup Guide](https://github.com/amilajack/eslint-plugin-compat#setup)                                                                                                                       |


************

[⤴️ Back: **ESLint**](eslint.md)
