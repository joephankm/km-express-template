# ⚡️ Server Runtime

<p align="right"><em>&lt;Last updated: 2026-03-30&gt;</em></p>

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
        │                       │
     nodemon                   PM2
(watch & restart)       (manage process)
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
  <dt>

### ![nodemon](../_static/icons/nodemon-16.png) [Nodemon](nodemon.md)

  </dt>
  <dd>

A development utility that monitors source files for changes and automatically restarts the Node.js process — providing
a tight feedback loop without manual restarts.

**Use Cases:**
  - Auto-restart the server on any source file change during development.
  - Watch specific file extensions (`.ts`, `.json`, `.env`) for targeted restarts.
  - Pair with `ts-node` for a zero-build TypeScript development server.
  - Configure restart delay and ignore patterns for noisy directories.

  </dd>
</dl>

------------


## 🚀 Production Execution

<dl>
  <dt>

### ![PM2](../_static/icons/pm2-16.png) [PM2](pm2.md)

  </dt>
  <dd>

A production-grade process manager for Node.js applications. Keeps processes alive after crashes, manages logs,
enables clustering across CPU cores, and integrates with system startup services.

**Use Cases:**
  - Keep the server running after crashes with automatic restart.
  - Scale across multiple CPU cores using cluster mode.
  - Manage application lifecycle (start, stop, reload, delete) via CLI.
  - Tail and persist logs across process restarts.

  </dd>
</dl>
