# 🏗️ Compilers & Build Tools

<p align="right"><em>&lt;Last updated: 2026-03-20&gt;</em></p>

Modern JavaScript and TypeScript projects rely on a range of **compiler and build tools** to transform source code into
executable output. These tools handle everything from **type stripping and syntax transpilation** to **module bundling**,
**tree-shaking**, **code splitting**, and **runtime optimization** — bridging the gap between the source you write and
the code that actually runs in Node.js or the browser.

************

[⬆️ **Table of Contents**](../-contents.md)

************


## 📋 Compiler Landscape

```
     (Source Code) ─── TypeScript / Modern JS
           │
┌───────────────────────────────────────────────────────────┐
│  [ Build Pipeline ]                                       │
│          ├─ Transpile → TSC / SWC / Babel                 │
│          │                                                │
│          ├─ Bundle    → Webpack / Rollup / Vite / esbuild │
└──────────┬────────────────────────────────────────────────┘
           │
           ▼
(Executable JavaScript)
           │
    ┌──────┴──────┐
    ▼             ▼
 Node.js        Browser


================ Alternative (no build step) ===============

     (Source Code) ─── TypeScript / Modern JS
           │
           ▼
       Bun / Deno  ─── built-in transpiler + runtime
```

Each tool category serves a distinct role in the build pipeline — they can be used independently or composed together
depending on project requirements.

------------


## 🔄 Transpilers

Tools that transform TypeScript (or modern JavaScript) source code into JavaScript that Node.js or browsers can execute.
They may also perform **type checking**, **path rewriting**, and **declaration file generation**.

<dl>
  <dt>

### 🛡️ [TSC — TypeScript Compiler](tsc.md)

  </dt>
  <dd>

The **official TypeScript compiler** maintained by Microsoft. Transpiles TypeScript to JavaScript while performing
full **static type checking**, generating **declaration files** (`.d.ts`), and resolving **module paths** based on
`tsconfig.json`.

**Use Cases:**
  - Compile a TypeScript project to JavaScript for Node.js or browser targets.
  - Type-check source code without emitting output (e.g., in CI pipelines).
  - Generate declaration files (`.d.ts`) for library distribution.
  - Watch source files and recompile incrementally during development.

  </dd>
</dl>
