# 🌳 Environment Setup Guides

<p align="right"><em>&lt;Last updated: 2026-03-20&gt;</em></p>

A **well-configured JavaScript/TypeScript project** depends on aligned runtime versions, consistent compiler behavior,
and predictable environment loading. This guide walks through the **step-by-step setup of a Node.js project from
scratch**, covering **toolchain version control**, **TypeScript compiler configuration**, and **runtime environment
setup** for real-world applications.

************

[⬆️ **Table of Contents**](../-contents.md)

************


## 📋 Setup Overview

```
## Project Setup ##
     │
     ├─ Runtime Versions        → Lock Node & package manager
     │
     ├─ TypeScript Environment  → Configure compiler & module resolution
     │
     ▼
<Ready-to-Run>
```

Together, these steps establish a reproducible foundation for any modern Node.js project.

------------

## ⚡️ Runtime Setup

<dl>
  <dt>

### 🧭 [Manage Node Runtime & Package Manager Versions](node-package-manager-version.md)

  </dt>
  <dd>

Strategies for declaring, validating, and enforcing the **Node.js runtime** and **package manager version** used
across local machines, CI pipelines, and deployment environments.

**Covers:**
  - Declaring expected runtime and package manager versions via `engines` in `package.json`.
  - Enforcing the Node.js version through **NVM** (`.nvmrc`) or **pnpm** (`engines.runtime`).
  - Locking the package manager version through **Corepack** (`packageManager` field).
  - Multiple strategies ranked from lightweight validation to full enforcement.

  </dd>
  <dt>

### ![TypeScript](../_static/icons/typescript-16.png) [Configure TypeScript Environment](typescript-environment.md)

  </dt>
  <dd>

Set up the **TypeScript compiler (`tsc`)** using `tsconfig.json` to align compilation behavior, module resolution,
and output structure with the target runtime or framework.

**Covers:**
  - Extending the compiler from community **base configs** (e.g., `@tsconfig/node24`).
  - Choosing the right preset for the **target runtime** (Node.js, Bun, Deno, etc.).
  - Sharing compiler options across packages via **local config inheritance**.
  - Structuring `tsconfig.json` for consistent compilation and module resolution.

  </dd>
</dl>
