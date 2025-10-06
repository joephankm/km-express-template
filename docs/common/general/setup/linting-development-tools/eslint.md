# ![eslint](../../_assets/icons/eslint-22.png) ESLint

<p align="right"><em>&lt;Last updated: 2025-10-06&gt;</em></p>

**ESLint** is a pluggable and configurable linting tool for **ECMAScript/JavaScript (and TypeScript)** that helps
enforce **consistent code quality** and **catch bugs early** through static analysis. It allows teams to **define and
share coding standards**, ensuring cleaner, more maintainable codebases.

🔗 **Links:** _[NPM](https://www.npmjs.com/package/eslint)_
            - _[Docs](https://eslint.org/docs/latest/)_
            - _[CLI](https://eslint.org/docs/latest/use/command-line-interface)_
            - _[IDE Integration](https://eslint.org/docs/latest/use/integrations#editors)_
            - _[Repository](https://github.com/eslint/eslint)_

> ### 🗂️ Contents
>   - [🌱 Installation](#-installation-)
>   - [🚀 Commands](#-commands-)
>   - [⚙️ Configure ESLint](#-configure-eslint-)
>   - [🔖 Comment Directives](#-comment-directives-)
>   - [🗃 Config Files](#-config-files-)
>
> ### 📚 Related
>
> 📖 **[ESLint – Advanced](eslint-advanced.md)**\
> ┣━ [🔧 How to Configure ESLint](eslint-advanced.md#-how-to-configure-eslint-)\
> ┗━ [📦 Popular Packages](eslint-advanced.md#-popular-packages-)

************

[⤴️ Back: **Code Quality & Linting Tools**](-intro.md)\
[◀️ Previous: **Prettier**](prettier.md)

************


## 🌱 Installation [🔺](#-eslint)

### 💾 Install **ESLint** Core

Add the **ESLint core package** and its **official base config**:

```shell
pnpm add -D eslint@latest @eslint/js@latest
```

Alternatively, use the official interactive CLI wizard to **auto-install and generate your config file**:

```shell
pnpm create @eslint/config@latest
```

### 📦 Install Plugins and Shareable Configs:

Depending on your project stack, you may need additional plugin and shareable config packages:

```shell
pnpm add -D \
  # TypeScript support
  typescript-eslint@latest \
  # Prevent formatting conflicts with Prettier
  eslint-config-prettier@latest
````

🤘 _Explore more packages in the [Popular Packages](eslint-advanced.md#-popular-packages-) section_


### 🤖 Install All-in-One with `create-airbnb-x-config`

Alternative to installing and configuring ESLint and Prettier manually, you can use the [`create-airbnb-x-config`](https://www.npmjs.com/package/create-airbnb-x-config)
package to **set up  ESLint + Prettier + TypeScript in one step**. This package provides an **all-in-one configuration**
based on the **Airbnb Style Guide**, helping you skip manual setup and adopt widely used best practices quickly.

> ### 📕 _Note_
>
> This setup enforces the **[Airbnb ESLint Config](https://github.com/airbnb/javascript?tab=readme-ov-file)** — a widely
> adopted, community-driven style guide for **JavaScript** and **TypeScript**. It’s a strong starting point for many
> projects, but not the only choice. Make sure you and your team are comfortable with **Airbnb’s opinions** on code
> style before adopting it.

Run the following command in your project root:

```shell
pnpx create-airbnb-x-config
````

------------


## 🚀 Commands [🔺](#-eslint)

### 🔍 Run ESLint (Check Only)

Scan your code for rule violations and potential issues using ESLint:

```shell
pnpm [dlx] eslint ./src
```

> ### ⚠️ _TypeScript Limitation_
>
> By default, **ESLint** does not perform type checking. To include TypeScript type checks in ESLint, run **ESLint** and
> **TypeScript** at the same time:
>
> ```shell
> # Run ESLint and TypeScript one by one
> pnpm eslint ./src && tsc --noEmit
>
> # Run ESLint and TypeScript concurrently (requires `concurrently` package)
> pnpm concurrently 'pnpm eslint ./src' 'tsc --noEmit'
> ```
>
> 👉 _See: [Why doesn't ESLint show TypeScript errors?](https://typescript-eslint.io/troubleshooting/faqs/typescript#why-dont-i-see-typescript-errors-in-my-eslint-output)_

### 🔧 Run ESLint with Auto-Fix

Automatically fix auto-fixable issues (e.g., formatting, stylistic problems):

```shell
pnpm [dlx] eslint ./src --fix
```

> ### ⚠️ _Caution_
>
> While `--fix` can help with formatting, it’s **not recommended for all projects**. It may apply unexpected changes or
> conflict with your preferred code style. Use manual review for important rule violations.

------------


## ⚙️ Configure ESLint [🔺](#-eslint)

### ① 📜 Create an ESLint Config File

> ### 📘 About the ESLint Config File
>
> Starting from **ESLint v9**, the recommended format is the **Flat Config** system (replacing the legacy `.eslintrc.*`).\
> Your config file:
>   - Should be named `eslint.config.(c\|m)?js` (`.mjs` is **recommended** when using ES Modules).
>   - Must export **an array of Config Objects**, which define how ESLint applies rules, plugins, and settings.
>   - Use the d`efineConfig()` helper from ESLint for better readability and type safety (**recommended**)
>
> 🤘 _For a deeper understand, see [Use Flat Config](eslint-advanced.md#-use-flat-config-modern-eslint-setup-) and
>   [Define with defineConfig()](eslint-advanced.md#-define-with-defineconfig-)_

To start using ESLint:
  1. Create a file named `eslint.config.mjs` at the root of your project.
  2. Use the `defineConfig()` helper to export **an array of Config Objects**.
  3. Add **ESLint’s recommended rules** for **JavaScript** via:
      - `eslint.configs.recommended` — standard **JavaScript** rules for all projects

```js
// (📍 /eslint.config.mjs)

import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';

export default defineConfig(
  eslint.configs.recommended, // Core ESLint JS rules
);
```


### ② ![TypeScript](../../_assets/icons/typescript-16.png) Integrate with TypeScript (for TypeScript project)

By default, ESLint does not understand TypeScript syntax. To lint `.ts` and `.tsx` files properly, you'll need
[`typescript-eslint`](https://www.npmjs.com/package/typescript-eslint), which **bridges ESLint with the TypeScript
compiler**.

> ### 📘 About the TypeScript Eslint
>
> `typescript-eslint` enables ESLint to **parse and analyze TypeScript code** by providing:
>   - **Type-aware linting** using TypeScript’s type system
>   - **Typed configuration** with IntelliSense and **type-checking** for better DX
>   - Simplified extension of **shared configs** and **plugins**

##### 🅾️ Basic Integration (without Type Checking):

To integrate TypeScript support into ESLint, you need to **extend shared configs** from **both ESLint and TypeScript
Eslint**:
  1. Extend one of the TypeScript ESLint **predefined configs** (**required**):
      - `tseslint.configs.recommended` — **balanced rules**, suitable for most codebases
      - `tseslint.configs.strict` — **stricter rules**, ideal for strongly typed projects and experienced TS developers
  2. (_Optional_) Add stylistic rules for code formatting:
      - `tseslint.configs.stylistic` — **formatting and code style** rules (e.g., spacing, semicolons, quote styles)

```js
// (📍 /eslint.config.mjs)

import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default defineConfig(
  eslint.configs.recommended, // Core ESLint JS rules
  tseslint.configs.recommended, // Recommended TypeScript rules
  tseslint.configs.stylistic, // (optional) Code Style rules
);
```

##### 🅾️ Enable Type-aware TypeScript Linting:

The above setup parses TypeScript but doesn’t use its type information. To catch deeper issues (like type errors),
enable type-aware linting by the following steps:
  1. Use **type-aware predefined configs** from `typescript-eslint` (those ending in `TypeChecked`)
      - Example: `recommendedTypeChecked`, `strictTypeChecked`, etc.
  2. Configure the type-checking engine with `languageOptions.parserOptions`:
      - `projectService: true` — enables TypeScript’s project service to analyze types
      - `tsconfigRootDir` — absolute path to the root of your TypeScript project (usually `import.meta.dirname`)
  3. Disable type-aware linting for JavaScript files (optional but **recommended**):
      - `tseslint.configs.disableTypeChecked` — use this on `.js` files to avoid unnecessary type resolution errors

```js
// (📍 /eslint.config.mjs)

import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default defineConfig(
  eslint.configs.recommended, // Core ESLint JS rules
  tseslint.configs.recommendedTypeChecked, // Recommended TypeScript with TypeAware rules
  tseslint.configs.stylisticTypeChecked, // (optional) Code Style with TypeAware rules
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['**/*.js'],
    extends: [tseslint.configs.disableTypeChecked],
  },
);
```


### ③ ![Prettier](../../_assets/icons/prettier-16.png) Integrate with Prettier (for projects using Prettier)

Prettier and ESLint often **overlap on stylistic rules**, which can lead to conflicts. The recommended approach is to
let **Prettier handle formatting** and let **ESLint handle code quality**.

> ### ⚖️ ESLint vs Prettier
>
> Both [Prettier](prettier.md) and ESLint serve complementary, but they have different purposes:
>   - **Prettier** is a **code formatter**:
>      + Focuses on **code style** and **consistent formatting**
>      + Ensures a **consistent appearance** across your codebase
>      + Safe for **automatic formatting** as it does not change code meaning
>   - **ESLint** is a **code linter**:
>      + Focuses on **code quality**, **correctness**, and **best practices**
>      + Detects **potential bugs** and enforces **coding standards**
>      + Often requires **manual fixes**, especially for **logical issues**
>
> 👉 _See [Formatters vs Linters in TypeScript ESLint](https://typescript-eslint.io/users/what-about-formatting#formatters-vs-linters) for a detailed comparison_

Since Prettier and ESLint both touch formatting, stylistic ESLint rules can conflict with Prettier’s formatting rules.
To avoid this, add the prebuilt [`eslint-config-prettier`](https://www.npmjs.com/package/eslint-plugin-prettier) which
**turns off conflicting ESLint rules**:

```js
// (📍 /eslint.config.mjs)

import { defineConfig } from 'eslint/config';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  prettierConfig, // disables ESLint rules that conflict with Prettier
);
```


### ④ 🧩 Add Plugins

> ### 📘 What Are Plugins?
>
> **ESLint Plugins** extend ESLint’s core functionality, allow you to **add more rules to ESLint**, including:
>   - Rules for **new languages** (e.g., **TypeScript**, **CSS**, **Markdown**, **JSON**)
>   - Rules for **new frameworks** (e.g., **React**, **Vue**, **Angular**, **Node.js**)
>   - Rules for **coding patterns** (e.g., import sorting, file naming conventions)
>
> You can obtain plugins by:
>   - Search [`eslint-plugin-*`](https://www.npmjs.com/search?q=eslint%20plugin) on **npm**
>   - Creating or sharing **custom plugins** across projects via npm or Git repositories
>
> 🤘 _For details on how plugins work internally, see [Register Plugins](eslint-advanced.md#-register-plugins-) guide_

Which plugins you add depends on your project needs. For example:
  - **Node.js** -> use [`eslint-plugin-n`](https://www.npmjs.com/package/eslint-plugin-n)
  - **React** -> use [`eslint-plugin-react`](https://www.npmjs.com/package/eslint-plugin-react) + [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks)
  - **JSON** files -> use [`@eslint/json`](https://www.npmjs.com/package/@eslint/json)

Most plugins provide predefined configs that bundle their **rules, parsers, and settings**. Common config names include:
  - `recommended`  — enables the plugin’s recommended rules
  - `all` — enables all available rules

Always check the plugin’s documentation for the exact config names available. In practice, it’s best to **extend a
predefined config** rather than manually enabling every rule.

📗 Example: _Adding **Node.js** plugins_

```js
// (📍 /eslint.config.mjs)

import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import nodePlugin from 'eslint-plugin-n';

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,

  // Plugin: Node.js best practice
  nodePlugin.configs['flat/recommended-script'],
);
```

> ### 🧠 Good to Know
>
> - `@eslint/js` provides core ESLint rules for **JavaScript**. You almost always want `eslint.configs.recommended`.
> - `typescript-eslint` includes both the plugin (`@typescript-eslint/eslint-plugin`) and parser (`@typescript-eslint/parser`)
>   under the hood, so **TypeScript** linting works as soon as you extend one of its configs (`tseslint.configs`).


### ⑤ 📤 Use Shareable Configs

> ### 📘 What are Shareable Configs?
>
> **Shareable Configs** are reusable **predefined ESLint configs** published as **npm** packages or shared within your
> team. They export one or more **Config Objects**, letting you apply **rules, plugins, and other settings** across
> multiple projects.
>
> Sources:
>   - Search [`eslint-config-*`](https://www.npmjs.com/search?q=eslint-config) on **npm**
>   - Share self-define **ESLint configs** across projects through **npm** or **Git repositories**
>
>> 📕 **_Note:_** Unlike Plugins, Shareable Configs **don’t create new rules**. They group **preferred rules (with
> severity set), references to plugins/configs, and common settings** into a single reusable config.
>
> 🤘 _See [Extend Shared Config](eslint-advanced.md#-extend-shared-configs-) for details on combining configs_

You could build an **ESLint Config** from scratch, but it often takes a lot of time to browse through all available rules,
plugins, and options. **Shareable Configs** let you skip that effort and gain several advantages:
  - Apply **established best practices** from the community (e.g., **Airbnb**, **Google**, **StandardJS**)
  - Ensure **consistent coding conventions** across your team
  - **Reduce setup time** by avoiding repetitive rule definitions
  - Keep your ESLint setup **maintainable** and aligned with widely used standards

Always add shareable configs after **ESLint core** and **TypeScript ESLint** configs in your **Config Object** list.

📗 Example: _Using Airbnb Config_

```js
// (📍 /eslint.config.mjs)

import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import airbnbBase from 'eslint-config-airbnb-base';

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,

  // Shareable config: Airbnb base style guide
  airbnbBase,
);
```

> ### ⚠️ Important
>
> The example above **will not work directly**, because `eslint-config-airbnb-base` is still a **Legacy Config** and has
> not been ported to the new **Flat Config** format. Many popular style guide packages (including **Airbnb**) are still
> in this state.
>
> 👉 _If you want to use legacy configs inside Flat Config, follow the official guide: [Using eslintrc Configs in Flat
> Config](https://eslint.org/docs/latest/use/configure/migration-guide#using-eslintrc-configs-in-flat-config)_
>
> 👉 _For **Airbnb** specifically, consider using `eslint-config-airbnb-extended`, a community-maintained port of the
> **Airbnb** config to **Flat Config**._
>> You have two options:
>>   - **New project** -> Use [`eslint-config-airbnb-extended`](https://www.npmjs.com/package/eslint-config-airbnb-extended)
>>                        to generate a ready-to-use ESLint + Prettier + TypeScript setup. (🤘 _See [Install All-in-One
>>                        guide](#-install-all-in-one-with-create-airbnb-x-config)_)
>>   - **Existing project** -> Manually install `eslint-config-airbnb-extended` and other peer dependencies. (👉 _Refer
>>                        to the [package list](https://eslint-airbnb-extended.nishargshah.dev/config/packages-used) and
>>                        pick what you need_)


### ⑥ 📋 Set Rules

> ### 📘 What are Rules
>
> **Rules** define what coding patterns ESLint checks for and how strictly they are enforced.
>   - Defined as object type inside the `rules` field of a Config Object.
>   - Can be set to `off`, `warn`, or `error`.
>   - Many rules also accept **options** to fine-tune their behavior.
>
> 🤘 _See [Setting Rules](eslint-advanced.md#-setting-rules-) for severity levels and options formats_
>
> ### 📘 How Config Objects Merge
>
> In **Flat Config**, ESLint allows you to define multiple **Config Objects**. When a file matches more than one config:
>   - Objects are **applied in order (top -> bottom)**
>   - Later objects **override** earlier ones if they conflict
>   - Fields like `rules`, `languageOptions`, and `plugins` are **merged deeply**
>   - `files` and `ignores` fields are used to control which files the config applies to
>
> 🤘 _See [Combine "files" and "ignores"](eslint-advanced.md#-combine-files-and-ignores-scoped-configuration-) for details on scoping configs_

You normally don’t need to configure every rule manually. Instead, your ESLint setup will usually combine:
  1. **Core ESLint rules** (and **TypeScript ESLint rules** if using TypeScript) via their recommended configs
  2. One or more **shareable configs** (e.g. Airbnb, Google, StandardJS)
  3. **Predefined configs from plugins** (for frameworks, libraries, or languages)
  4. **Your own overrides** for project-specific needs

After combining recommended and shareable configs, your manual overrides are often minimal. But you’ll still adjust
rules occasionally, for example:
  - Disabling rules that don’t fit your project
  - Changing rule options for flexibility
  - Adding extra rules that weren’t included in shared configs

It's best practice to **centralize project-wide overrides** in one Config Object **at the end of your list**. This will
override any rules defined in previous Config Objects.

```js
// (📍 /eslint.config.mjs)

import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import exampleConfig from 'eslint-config-example';
import examplePlugin from 'eslint-plugin-example';

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  exampleConfig,
  examplePlugin.configs.recommended,

  // -- Centralized overrides --
  {
    rules: {
      // -- Override core + shareable config rules --
      'rule-a': 'error',

      // -- Override plugin rules (format: <plugin-namespace>/<plugin-rule>) --
      'example/rule-b': 'off',
    }
  }
);
```

You can also override rules for **specific files or folders** using `files` and `ignores`:

```js
// (📍 /eslint.config.mjs)

import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import exampleConfig from 'eslint-config-example';
import examplePlugin from 'eslint-plugin-example';

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  exampleConfig,
  examplePlugin.configs.recommended,

  {
    rules: {
      // -- Override in global --
      'rule-a': 'error',
    }
  },

  {
    files: ['src/constants/*'],
    rules: {
      // -- Override for src/constants/* --
      'rule-a': 'off',
      'rule-b': 'error',
    }
  }
);
```

### ⑦ ⚙️ Other Settings

In addition to rules and plugins, ESLint provides other config options you may need depending on your project:

##### ❇️ Global Variables (per environment):

Different environments (Node.js, browser, test frameworks) provide different globals. You can declare them using
`languageOptions.globals` so ESLint knows they are valid.\
🤘 _See [Specify  Global Variables](eslint-advanced.md#-specify-global-variables-) for more detail._

```js
// (📍 /eslint.config.mjs)

import { defineConfig } from 'eslint/config';
import globals from 'globals';

export default defineConfig(
  {
    languageOptions: {
      globals: {
        ...globals.nodeBuiltin,  // Node.js globals
        ...globals.jest,         // Jest test globals
      },
    },
  },
);
```

##### ❇️ Ignored Files and Folders:

To exclude certain files or directories (like `dist/` or `build/`), define global ignores in the **first Config Object**.\
🤘 _See [Global Ignore](eslint-advanced.md#-ignore-files-globally-) for more detail_.

```js
// (📍 /eslint.config.mjs)

import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig(
  globalIgnores(['**/dist/', '**/build/']),
);
```

------------


## 🔖 Comment Directives [🔺](#-eslint)

Besides using config files, ESLint also lets you configure rules and settings **directly inside source files** by using
special comments. This is useful when you need file-specific overrides without changing the global config.

### 📝 Configure ESLint Rules with File-level Comments

> ### 📘 Syntax
>
> ESLint parses special comments that begin with `/* eslint ... */` or `// eslint ...` to configure rules directly
> inside a file.. These comments let you **enable, disable, or adjust rules on a per-file**.
>
> ```js
> /* eslint <rule-name>: <rule-level> [, <rule-name>: <rule-level>, ...] [-- <description>] */
> // 📗 Example:
> /* eslint eqeqeq: "off", curly: "error" -- This file requires strict curly braces */
> ```
>
> 📙 `<rule-name>: <rule-level>` — Rule config.\
> 🤘 _Refer to [Setting Rules](eslint-advanced.md#-setting-rules-) for formats and severity levels._
>
> 📙 `[-- <description>]` — _(optional but **recommended**)_ A short explanation for why the rule is configured this way.

Your primary config should **always be in the config file**. Use file-level comments only when it’s necessary, such as:
  - Disabling a rule that is useful project-wide but not applicable to this file.
  - Overriding rule options for a special case.
  - Enabling an additional rule in a single file (_**not recommended** unless truly needed_).

Place the **rule comment** at the top of the file to apply it to the entire file.

```js
/* eslint no-console: ["error", { allow: ["debug"] }] -- Debug logs required in this file */
/* eslint eqeqeq: "off" -- Disable strict equality */

console.debug(process.env); // -> ✅ Allowed, won’t trigger an ESLint error
console.log('Normal log');  // -> ❌ Still an error

if (value == '1') {         // -> ✅ Allowed, because eqeqeq is turned off
  doSomething();
}
```

> ### 📕 _Notes_
>
> - Rule comments can be placed anywhere in a file. ESLint applies them from the point of declaration **until another
>   override is found**, or **until the end of the file**
> - For clarity, it’s generally better to **keep them at the top of the file** for visibility and consistency.

### 🚫 Disable ESLint Rule in Line-level Comments

> ### 📘 Syntax
>
> ESLint also parses special inline comments (`// eslint-...`) to configure rules directly within code. These comments
> let you **disable or re-enable** rules for a **specific line, the next line, or a block of code**.
>
> ```js
> // eslint-disable-next-line [<rule-name>] [, <rule-name>, ...] [-- <description>]
> // eslint-disable-line [<rule-name>] [, <rule-name>, ...] [-- <description>]
> // eslint-disable [<rule-name>] [, <rule-name>, ...] [-- <description>]
> // eslint-enable [<rule-name>] [, <rule-name>, ...] [-- <description>]
> ```
>
> 📙 `[<rule-name>]` — One or more ESLint rules to disable.
>> - When omitted, all rules will be disabled
>> - For `eslint-enable`, this will re-enable all previously disabled rules.
>> - For security reasons, **avoid disabling all rules** unless absolutely necessary (this may hide real issues).
>
> 📙 `[-- <description>]` — _(optional but **recommended**)_ A short note explaining why the rule is disabled.

There are rare cases where a piece of code, while technically violating an ESLint rule, is intentionally written that
way for a valid reason:
  - A specific optimization.
  - A workaround for a third-party library.
  - A pattern acceptable in a special context.

They can also be useful temporarily during development:
  - Disabling a rule that’s **difficult to fix immediately** (should be revisited later).
  - Integrate **code snippets or libraries from external sources** that do not conform to the project's ESLint rules.

You can disable ESLint rules from config file in a specific location of a file.

##### ❇️ Disable a Single Line:

- `eslint-disable-line` – disables rules on the same line.
- `eslint-disable-next-line` – disables rules for the line immediately below.

```js
console.log(process.env); // eslint-disable-line no-console -- Needed for logging env

// eslint-disable-next-line no-console -- Needed for logging env
console.log(process.env);
```

##### ❇️ Disable Multiple Lines:

Wrap code between `eslint-disable` and `eslint-enable` to disable rules for a block.
- `eslint-disable` – disable rules for code below it
- `eslint-enable` – enable the disabled rules

```js
// eslint-disable no-console -- Enable log for "doSomething"

function doSomething() {
  console.log('Started');
  // ...
  console.log('Ended');
}

// eslint-enable no-console
```

### ⚡ TypeScript Directive Comments

> ### 📘 Syntax
>
> TypeScript provides special **comment directives** that influence how the compiler checks errors in specific lines or
> files.
>
> ```js
> // @ts-ignore[: <description>]
> // @ts-expect-error[: <description>]
> // @ts-check[: <description>]
> // @ts-nocheck[: <description>]
> ```
>
> 📙 `[-- <description>]` — _(optional but **recommended**)_ A short note explaining why the directive is used.

TypeScript already offers excellent type-checking and should be relied on in most cases. The TypeScript directives
should be used only for **exceptional scenarios**, when strict type-checking must be bypassed or adjusted.

##### 🟢 `@ts-expect-error`:

Indicates that you expect the next line to produce a type error and want to **suppress that error** from being reported.
If no error exists, the compiler will **throw an error**, ensuring the directive isn’t misused.

```js
// @ts-expect-error: Expecting a type error when assigning a number to a string
const value: number = 'hello'; // -> ✅ Allowed, since type mismatch error exists

// @ts-expect-error: Expecting a type error when assigning a number to a number
const value2: number = 42;     // -> ❌ Error: no type error here, so directive is invalid
```

- **Use case:**
    + Temporary suppression for known issues (e.g., waiting for a library fix).
    + Acknowledging a type error in the code that another team member is expected to fix soon.
    + Handling rare edge cases or TypeScript limitations where runtime behavior is still valid.
    + Tests that intentionally include invalid inputs.
- ✅ Safer than `@ts-ignore` because it ensures the directive isn’t misused.
- Adding a short description is **recommended** for clarity.

##### 🟢 `@ts-ignore`:

**Skips type-checking** for the next line of code, regardless of whether an error exists.

```js
// @ts-ignore: Known type mismatch
const value: number = 'hello'; // -> ✅ No error, even though type is wrong
```

- **Use case:**
    + Temporary workaround for type errors during development.
- ⚠️ **Risky:** Silently hides errors, which may cause bugs. Prefer `@ts-expect-error` when possible.

##### 🟢 `@ts-nocheck`:

**Disables type-checking** for the entire file.

```js
// (📍 typeScriptFile.ts)

// @ts-nocheck

const x: number = 'hello'; // -> ✅ No errors for this file
```

- **Use case:**
    + Legacy or generated code where type-checking provides little value.
    + Complex integrations with untyped JavaScript libraries.
- ⚠️ **Risk:** Removes all type-safety, so use sparingly.

##### 🟢 `@ts-check`:

**Enables type-checking** for a **JavaScript file** (if not already enabled).

```js
// (📍 javaScriptFile.js)

// @ts-check

let x = 5;
x = 'hello'; // -> ❌ TypeScript will error, even in .js file
```

- **Use case:**
    + Using JSDoc annotations for lightweight typing in .js files.
    + Gradual migration from JavaScript to TypeScript.
    + Improving maintainability and code quality in JavaScript projects.

------------

## 🗃 Config Files [🔺](#-eslint)

| File                                           | Description                               |
|------------------------------------------------|-------------------------------------------|
| [`eslint.config.mjs`](../../eslint.config.mjs) | Config for **Prettier** in **ESM** format |


************

[⤴️ Back: **Code Quality & Linting Tools**](-intro.md)\
[◀️ Previous: **Prettier**](prettier.md)
