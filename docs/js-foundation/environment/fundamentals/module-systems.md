# 🧩 JavaScript Module Systems

<p align="right"><em>&lt;Last updated: 2026-03-20&gt;</em></p>

JavaScript applications rely on different **module systems** to organize, share, and execute code across environments.
This page introduces the primary module formats used in the ecosystem, helping you understand their **evolution, usage
contexts, and practical implications** when configuring runtimes, tooling, or project structure.

> ### 🗂️ Contents
>   - 🕒 [Modules vs Scripts](#-modules-vs-scripts-)
>   - 🗂️ [Module Types](#-module-types-)
>   - 🔎 [Module Format Detection](#-module-format-detection-)

************

[⤴️ Back: **Fundamentals**](-intro.md)

************


## 🕒 Modules vs Scripts [🔺](#-javascript-module-systems)

Before module systems were introduced, JavaScript programs were typically written as **scripts — standalone files
executed in a shared global scope**. This often led to naming conflicts, implicit dependencies, and difficulty maintaining
large codebases.

**Modules** were introduced to address these limitations by enabling code to be **split into self-contained units with
explicit imports and exports**.

### 📜 Script (Traditional JavaScript)

A **script** is a standalone file executed in a shared global scope.

- Executes in the **global scope**.
- Shares variables and functions with other scripts.
- Has **no built-in dependency** system.
- Loads in the order defined by the runtime or HTML document.
- Is suitable for small or simple use cases.

📗 **Example:** _Browser Script_

```html
<script src="utils.js"></script>
<script src="app.js"></script>
```

### 🧩 Module (Modern JavaScript)

A **module** is a self-contained unit of code that can be **imported** and **exported**.

- Executes in its **own scope**.
- Uses explicit `import` / `export` syntax.
- Supports **dependency graphs**.
- Enables better tooling support (**bundlers**, **static analysis**, **tree-shaking**).
- Improves maintainability in medium-to-large applications.

📗 **Example:** _ES Module_

```js
// (📍 utils.js)

export function doSomething(a, b) {
  // ... 🧑‍💻
}


// (📍 app.js)

import { doSomething } from './utils.js';
```

> ### ⚖️ Key Differences
>
> | Aspect                    | 📜 Script         | 🧩 Module           |
> |---------------------------|-------------------|---------------------|
> | **Scope**                 | Global            | Local (file-scoped) |
> | **Dependency management** | Manual / implicit | Explicit via import |
> | **Load order**            | Order-dependent   | Dependency-driven   |
> | **Reusability**           | Limited           | High                |
> | **Tooling support**       | Minimal           | Extensive           |

------------


## 🗂️ Module Types [🔺](#-javascript-module-systems)

Early JavaScript applications were written entirely as **scripts**, executing in a **shared global scope**. As projects
grew in size and complexity, developers introduced various **module systems** to better organize code and manage
dependencies.

Over time, multiple module formats emerged to support different runtimes and distribution needs. Understanding their
historical context and typical usage helps developers **choose appropriate approaches** for modern projects while
recognizing legacy patterns.

👉 _Explore the detailed evolution in [The Evolution of JavaScript Modularity](https://github.com/myshov/history-of-javascript/tree/master/4_evolution_of_js_modularity)
   for additional historical context._

Each module type defines how code is **imported**, **exported**, and **executed**.

### 📦 CommonJS (CJS)

**CommonJS** was introduced to provide a structured module system for JavaScript **outside the browser**, before the
standardized **ES Modules** were available. It became the **default module** format in early versions of **Node.js** and
is still widely used in many existing libraries and applications.

**Introduced:** ~2009 (Node.js ecosystem).\
**Primary environment:** Node.js (server-side).

**Key characteristics:**
  - Uses `require()` for importing and `module.exports` for exporting modules.
  - Loads modules synchronously.
  - Designed for **filesystem-based environments** (e.g., servers).
  - ❌ Cannot be used in **the browser**.

**Files are treated as CommonJS:**
  - The file extension is `.cjs`.
  - OR the file extension is `.js` and `package.json` does not specify `"type": "module"`.

**When to use:**
  - Maintaining legacy Node.js applications.
  - Working with older packages that do not support ES Modules.
  - Scripts that rely on dynamic module loading.

📗 **Example:**

```js
// (📍 utils.js)

function sum(a, b) {
  return a + b;
}

module.exports = { sum };


// (📍 app.js)

const sum = require('./utils').sum;
console.log(sum(1, 2));
```


### 🚀 ES Module (ESM)

**ES Modules** are the **standardized module system** defined by [TC39](https://github.com/tc39) and introduced as part
of the **ECMAScript 2015 (ES6)** specification. They were designed to provide a consistent, statically analyzable module
format that works **across both browsers and server environments**, enabling modern tooling optimizations and long-term
ecosystem convergence.

**Introduced:** 2015 (ECMAScript 6 standard).\
**Primary environment:** Modern browsers & modern Node.js.

**Key characteristics:**
  - Uses `import` / `export` for module interaction.
  - Enables **static dependency analysis** and **optimizations** (e.g., **tree-shaking**).
  - Supports asynchronous loading in browsers.
  - Provides a unified module standard across JavaScript runtimes.
  - ✅ Preferred module format for **modern JavaScript development**.

**Files are treated as ES Modules:**
  - The file extension is `.mjs`.
  - OR the file extension is `.js` and `package.json` specifies `"type": "module"`.
  - OR the file is loaded via ESM-aware tooling or bundlers.

**When to use:**
  - New applications (frontend or backend).
  - Libraries targeting modern runtimes.
  - Projects using **bundlers** or **modern Node.js**.
  - Codebases that benefit from **static analysis and optimized builds**.

📗 **Example:**

```js
// (📍 utils.js)

export function sum(a, b) {
  return a + b;
}


// (📍 app.js)

import { sum } from './utils';
console.log(sum(1, 2));
```


### ⏳ Asynchronous Module Definition (AMD)

**AMD** was created to solve **dependency loading in browsers** before native module support was available. It enabled
JavaScript modules to be **loaded asynchronously**, helping improve performance in large **client-side applications**.

**Introduced:** ~2011 (browser module loaders).\
**Primary environment:** Browsers (pre-ESM era).

**Key characteristics:**
  - Uses `define()` to declare modules.
  - Supports **asynchronous dependency loading**.
  - Typically used with loaders like **RequireJS**.
  - Designed specifically for **browser-based** module execution.
  - 🚫 Mostly considered legacy and **rarely used** in modern development.

**How to recognize AMD modules:**
  - The file uses the `define()` function to declare a module.
  - The code checks for AMD support (e.g. `typeof define === 'function' && define.amd`).
  - The file is located in a folder named `amd/` or filename contains `amd` (e.g., `library.amd.js` ) in distributed
    library builds (e.g., `dist/`, `lib/`).

**When to use:**
  - Maintaining **legacy browser-based** applications.
  - Working with older frontend libraries that depend on AMD loaders.

📗 **Example:**

```js
// (📍 utils.js)

define(function () {
  function sum(a, b) {
    return a + b;
  }

  return { sum };
});


// (📍 app.js)

define(['./utils'], function(utils) {
  console.log(utils.sum(1, 2));
});
```

### 🌍 Universal Module Definition (UMD)

**UMD** was introduced as a **compatibility wrapper** that allows a single library build to **run across multiple module
systems**, including **server-side** (e.g., CommonJS) and **client-side** (e.g., AMD, browser globals). It became
popular during the era when the JavaScript ecosystem lacked a unified standard module format.

**Introduced:** ~2011–2014 (library distribution era).\
**Primary environment:** Cross-environment (Node.js + browsers).

**Key characteristics:**
  - Detects the runtime environment and adapts automatically.
  - Supports **CommonJS**, **AMD**, and **global variable fallback**.
  - Widely used in **distributed library bundles**.
  - Adds runtime detection logic, increasing bundle complexity.
  - 🚫 Largely **replaced by ES Modules** in modern ecosystems.

**How to recognize UMD modules:**
  - A wrapper checking for multiple module systems:
```js
if (typeof define === 'function' && define.amd) {
  // ...
} else if (typeof module === 'object' && module.exports) {
  // ...
} else {
  // ...
}
```
  - The library assigns itself to a **global variable fallback** (e.g. `global`).
  - The file is located in a folder named `amd/` or filename contains `umd` (e.g., `library.umd.js` ) in distributed
    library builds (e.g., `dist/`, `lib/`).

**When to use:**
  - Maintaining **legacy libraries** that must support multiple module systems.
  - Publishing packages targeting older browsers or runtimes.
  - Supporting environments without native ESM support.

📗 **Example:**

```js
// (📍 utils.js)

(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS
    module.exports = factory();
  } else {
    // Browser global
    global.utils = factory();
  }
}(this, function () {
  function sum(a, b) {
    return a + b;
  }

  return { sum };
}));
```


## 🔎 Module Format Detection [🔺](#-javascript-module-systems)

Node.js supports both **ES Modules (ESM)** and **CommonJS (CJS)**, but each file must be interpreted using a **single
module format**. The format is determined by a combination of **file extension** and **project configuration**.

> ### 🚧 Wrong Module Syntax
>
> A file **cannot be executed as both module formats** at the same time. For example, using CommonJS syntax (`require`,
> `module.exports`) inside an ES Module file — or vice versa — will **result in runtime errors**.
>
> If a file uses syntax that does not match its module format, you must resolve the mismatch by choosing one of the
> following approaches:
>
> ❇️ **Option 1** — _Convert the syntax to match the module format_
>
> Below are common **equivalent patterns** between
> **CommonJS** and **ES Modules**:
>
> ```js
> // -- Import default --
> const x = require('x');     // <- 📦 CommonJS
> import x from 'x';          // <- 🚀 ES Module
>
> // -- Import named export --
> const a = require('x').a;   // <- 📦 CommonJS
> import { a } from 'x';      // <- 🚀 ES Module
>
> // -- Import namespace --
> const lib = require('x');   // <- 📦 CommonJS
> import * as lib from 'x';   // <- 🚀 ES Module
>
> // -- Export default --
> module.exports = value;     // <- 📦 CommonJS
> export default value;       // <- 🚀 ES Module
>
> // -- Export named value --
> exports.a = a;              // <- 📦 CommonJS
> export const a = a;         // <- 🚀 ES Module
>
> // -- Export multiple values --
> module.exports = { a, b };  // <- 📦 CommonJS
> export { a, b };            // <- 🚀 ES Module
> ```
>
> ❇️ **Option 2** — _Change the module format_
>
> Align the file with the intended module system by updating:
>   - The file extension (`.mjs` for ESM, `.cjs` for CommonJS)
>   - OR the `type` field in `package.json`

### 📁 File Extension

Node.js determines the module format directly from the file extension:

| Extension | TypeScript Equivalent | Module Type               |
|-----------|-----------------------|---------------------------|
| `.mjs`    | `.mts`                | ES Module                 |
| `.cjs`    | `.cts`                | CommonJS                  |
| `.js`     | `.ts`                 | Depends on `package.json` |

- `.mjs` (`.mts`) is always treated as **ES Module** and `.cjs` (`.cts`) is always treated as **CommonJS**, regardless
  of project configuration.
- Using `.mjs` is the **safest way** to explicitly ensure a file runs as an ES Module.

### ⚙️ Project Configuration (`package.json`)

For `.js` (`.ts`) files, Node.js uses the `type` field in `package.json` to decide the module format:

```json5
// (📍 /package.json)

{
  "type": "module"
}
```

| `type` Value           | `.js` Behavior    |
|------------------------|-------------------|
| `"module"`             | ES Module         |
| Not set / `"commonjs"` | CommonJS          |

- The type setting applies per package boundary.
- Node.js resolves the module type by locating the nearest parent package.json.
- If no package.json is found, the default behavior is CommonJS.

************

[⤴️ Back: **Fundamentals**](-intro.md)
