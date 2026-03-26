# ⚡️ Server Runtime

<p align="right"><em>&lt;Last updated: 2026-03-26&gt;</em></p>

Running a Node.js server involves different execution strategies depending on the environment. **Development** demands
fast feedback — automatic restarts on file changes and direct TypeScript execution without a build step. **Production**
demands reliability — process supervision, crash recovery, clustering across CPU cores, and runtime observability.

This section covers the tools that manage how your server process is **launched, restarted, and sustained** across both
environments.

************

[⬆️ **Table of Contents**](../-contents.md)

************


## 📋 Runtime Landscape

```
            (TypeScript Source)
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
   Development             Production
        │                       │
     ts-node                   TSC
(execute directly)       (compile first)
```

Choosing the right execution strategy for each environment keeps development fast and production stable.

------------


## 🛠️ Development Execution

<dl>
  <dt>

### ![ts-node](../_static/icons/ts-node-16.png) [ts-node](ts-node.md)

  </dt>
  <dd>

A TypeScript execution engine for Node.js that transpiles and runs `.ts` files directly — eliminating the need for a
separate compile step during development.

**Use Cases:**
  - Run TypeScript files directly without a `tsc` build step.
  - Execute one-off scripts and utilities in TypeScript.
  - Pair with `nodemon` for a hot-reload TypeScript development server.
  - Prototype and test TypeScript code quickly in the REPL.

  </dd>
</dl>
