# 🧰 Environment Tools

<p align="right"><em>&lt;Last updated: 2026-03-23&gt;</em></p>

Beyond compilers and package managers, a modern TypeScript project relies on a set of **focused development
utilities** that handle the practical concerns of day-to-day work — loading the right environment configuration,
and **orchestrating multiple scripts and processes** in a single command to keep the development workflow smooth.

************

[⬆️ **Table of Contents**](../-contents.md)

************


## 📋 Tools Overview

```
    (Start App)
         │
         ▼
[Environment Loading]
         └─ (dotenv, dotenv-cli)
         │
         ▼
   [Task Running]
         └─ (concurrently, cross-env, npm-run-all)
         │
         ▼
<Application Process>
```

These utilities are typically invoked inside `package.json` scripts or at the command line during development and CI.

------------


## 🌍 Environment Utilities

Tools that manage how **environment variables** are loaded and passed to application processes.

<dl>
  <dt>

### ![Dotenv CLI](../_static/icons/dotenv-16.png) [Dotenv CLI](dotenv-cli.md)

  </dt>
  <dd>

A lightweight command-line utility that loads environment variables from `.env` files and injects them into a
command before execution — without any changes to application code.

**Use Cases:**
  - Load environment-specific variables before running dev, build, or server commands.
  - Switch between `.env` file layers (development, staging, production) per script.
  - Cascade multiple `.env` files with override priority using the `-c` flag.
  - Inject secrets locally without committing them to version control.

  </dd>
</dl>
