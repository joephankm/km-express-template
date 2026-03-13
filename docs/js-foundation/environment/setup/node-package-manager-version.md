# 🧭 Manage Node Runtime & Package Manager Versions

<p align="right"><em>&lt;Last updated: 2026-03-13&gt;</em></p>

Maintaining **consistent runtime and package manager versions** across all development environments is critical for
ensuring reproducible builds, predictable behavior, and stable tooling execution.

This guide outlines multiple strategies to **validate or enforce the versions used in a project**.

> ### 🗂️ Contents
>   - 🚀 [Node.js Version](#-nodejs-version-)
>   - 📦 [Package Manager Version](#-package-manager-version-)

************

[⤴️ Back: **Node Environment**](-intro.md)

************


## 🚀 Node.js Version [🔺](#-manage-node-runtime--package-manager-versions)

Node.js version consistency is essential because many tools, including bundlers, linters, test runners, and package
managers, depend on specific runtime features.


### 📏 Method 1 — Validate with `engines`

The `engines` field in `package.json` allows you to declare the expected Node.js version for the project.

To enable validation, specify the desired version range in the `engines.node` field.

📗 **Example:**

```json5
// (📍 /package.json)

{
  "engines": {
    // -- Allow all Node.js 24.x versions --
    "node": ">=24 <25"
  }
}
```

🤟 _See [Validate Runtime Versions](../node-core/pnpm.md#-validate-runtime-versions) for more version range formats._

When this field is define, package managers may **warn or fail installation** if the runtime version **does not satisfy**
the declared range (_the exact behavior **depends on the package manager** and its strictness settings_).

This method is primarily useful for:
  - Ensuring runtime **compatibility in CI** pipelines.
  - Providing **clear runtime expectations** to contributors.
  - Preventing execution under unsupported Node.js versions.

> ### 🧐 Caution
>
> This mechanism provides version validation only, it **does not install or switch** the Node.js runtime. It should
> therefore be treated as a **compatibility safeguard**, not a runtime management solution.


### 🔧 Method 2 — Enforce with NVM

Using [**Node Version Manager (NVM)**](../node-core/nvm.md) allows the project to **define and enforce** the Node.js
runtime version via a `.nvmrc` file.

① Define the required Node.js version in a `.nvmrc` file at the project root and commit it to the repository.

📗 **Example:**

```shell
# (📍 <project-root>)

echo "24.12.0" > .nvmrc
```

② After cloning the project, install and switch to the specified version:

```shell
# (📍 <project-root>)

nvm install
```

🤟 _See [Specify Node Version](../node-core/nvm.md#-specify-node-version-in-a-project) for more details._

This method is ideal for:
  - **Standardizing** local development environments.
  - Simplifying onboarding for **new contributors**.
  - Managing multiple projects that require **different Node.js versions**.

> ### 🧐 Caution
>
> This method depends on developers or environments having NVM installed. To ensure broader compatibility, it should be
> used alongside [Method 1 — Validate with **engines**](#-method-1--validate-with-engines), which provides runtime
> version validation **even when NVM is not available**.


### ⚙️ Method 3 — Enforce via PNPM Runtime

When using [**pnpm**](../node-core/pnpm.md), runtime enforcement can be configured via the `engines.runtime` field in
`package.json`, allowing pnpm to automatically ensure the required Node.js version is used.

To enable this behavior, configure the required runtime under `engines.runtime`.

📗 **Example:**

```json5
// (📍 /package.json)

{
  "engines": {
    "runtime": {
      "name": "node",
      "version": "^24.12.0",
      "onFail": "download"
    }
  }
}
 ```

When configured:
  - `pnpm install` will verify the runtime version before dependency installation.
  - If the current runtime does not satisfy the declared range, pnpm can **automatically download and use** the required
Node.js version (depending on onFail behavior).
  - All commands executed via pnpm (e.g., pnpm run, pnpm exec) will **use the managed runtime version**, ensuring
consistent execution across environments.

This approach is particularly suitable for:
  - Monorepos requiring **deterministic runtime behavior**.
  - CI pipelines that rely on **tool-managed environments**.
  - Teams standardizing their workflow around **pnpm**.

> ### 🧐 Caution
>
> 1. `engines.runtime` is **pnpm-specific** and does not affect commands executed outside pnpm.
> 2. In containerized CI environments (e.g., Docker), **ensure the base image** runtime version aligns with the declared
>    `engines.runtime` range to avoid unnecessary runtime downloads and longer build times.

------------


## 📦 Package Manager Version [🔺](#-manage-node-runtime--package-manager-versions)

Just like runtime versions, **package manager versions** must be controlled to ensure consistent dependency resolution,
lockfile behavior, and script execution.

Different package manager versions may:
  - Produce different lockfiles.
  - Resolve dependencies differently.
  - Introduce breaking behavioral changes.

### 📏 Method 1 — Validate with `engines`

The `engines` field in `package.json` can also declare the **expected package manager version**. This mechanism provides
**version validation only** and does not install or enforce the package manager.

To enable validation, specify the required version range in the `engines` field.

📗 **Example:**

```json5
// (📍 /package.json)

{
  "engines": {
    // -- Allow pnpm versions >= 11.3 --
    "pnpm": ">=11.3"
  }
}
```

🤟 _See [Validate Runtime Versions](../node-core/pnpm.md#-validate-runtime-versions) for more version range formats._

When defined, package managers may warn or fail installation if the current version does not satisfy the declared range
(_the exact behavior **depends on the package manager** and its strictness settings_).

> ### 🧐 Caution
>
> - This method should be treated as a **compatibility safeguard**, not a version management solution.
> - When the `packageManager` field is used (with Corepack), defining the package manager in engines is generally
>   redundant and **can be omitted**.


### 🔌 Method 2 — Enforce via `packageManager` (with Corepack)

The `packageManager` field in `package.json` allows a project to declare the exact package manager and version to be
used.

When combined with [Corepack](../node-core/corepack.md), this enables deterministic toolchain enforcement across
development and CI environments.

① Define the required package manager and latest version:

📗 **Example:**

```shell
corepack use pnpm@latest-10

# --- OR in `package.json` ---
# "scripts": {
#   "packageManager": "pnpm@11.3.0"
# }
```

② After cloning the project, ensure the correct version is installed:

```shell
# (📍 <project-root>)

corepack install
```

🤟 _See [Install PNPM in a Project](../node-core/pnpm.md#-install-in-project) for more details._

When configured:
  - The specified package manager version is **automatically installed if missing**.
  - All project commands use the **declared version consistently**.
  - Toolchain drift across environments is **eliminated**.

This is the **recommended** modern approach for managing package manager versions.

************

[⤴️ Back: **Node Environment**](-intro.md)
