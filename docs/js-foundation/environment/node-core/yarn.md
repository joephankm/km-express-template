## ![Yarn](../_static/icons/yarn-28.png) Yarn 2+ (Yarn Berry)

<p align="right"><em>&lt;Last updated: 2026-03-13&gt;</em></p>

**Yarn 2+** is a **Node.js Package Manager** built to support **advanced dependency management** and **workspace-based
development**.

🔗 **Links:** _[Docs](https://yarnpkg.com/getting-started)_
            - _[CLI](https://yarnpkg.com/cli)_
            - _[Repository](https://github.com/yarnpkg/berry)_

> ### 🗂️ Contents
>   - 🪐 [Introduction](#-introduction-)
>   - 🌱 [Installation](#-installation-)
>   - ⚡️ [Command Cheatsheet](#-command-cheatsheet-)
>   - ♻️ [Lifecycle Scripts (Hooks)](#-lifecycle-scripts-hooks-)

************

[⤴️ Back: **Node Environment**](-intro.md)

************

## 🪐 Introduction [🔺](#-yarn-2-yarn-berry)

**Yarn 2+** (also known as **Yarn Berry**) is a modern package manager for **Node.js** designed to provide **efficient
dependency management** and **improved project tooling workflows**.

Unlike earlier versions of Yarn and traditional package managers such as npm, Yarn 2+ introduces a redesigned
architecture with features such as **Plug’n’Play (PnP)** dependency resolution, enhanced **workspace support,** and
**deterministic installation behavior**.

Key characteristics of Yarn 2+ include:
  - **Plug’n’Play** dependency resolution (no traditional `node_modules` required).
  - Deterministic lockfile (yarn.lock) for **reproducible installations**.
  - Native workspace support for **monorepo** development.
  - Improved performance through optimized installation strategies.

Yarn 2+ is commonly used in modern projects that require structured dependency management, scalable monorepo workflows,
and consistent development environments.

👉 _Refer to the official documentation for more details: https://yarnpkg.com/features_

------------


## 🌱 Installation [🔺](#-yarn-2-yarn-berry)

### 📦 Install in Project

For reproducible environments, Yarn should be configured per project by setting the package manager version in
`package.json`:

> ### 📘 Syntax
>
> ```json5
> // (📍 /package.json)
>
> {
>   "packageManager": "yarn@<version>"
> }
> ```
>
> 📙 `<version>` — The Yarn version required by the project.
>   - **Recommended:** Use the **latest stable version** available at the time of setup.

To simplify version management, **Corepack** can be used to automatically install and activate the required PNPM version
defined in this field.

> ### 🧠 _About Corepack_
>
> [**Corepack**](corepack.md) is a Node.js tool that **manages package manager versions** such as PNPM, Yarn, and npm.
> It ensures the correct version is used based on the `packageManager` field in `package.json`.
>
> Corepack only needs to be enabled **once per environment** before installing dependencies. If it has not been enabled,
> run:
>
> ```shell
> corepack enable yarn
> ```
>
> 🤘 _Read [Install Corepack](corepack.md#-installation-) for more detailed setup instructions._

To enable Yarn in your project or update it to the latest stable version:

```shell
yarn set version stable
```


### 🌍 Install Globally

Global installation is mainly used to bootstrap Yarn usage.

```shell
npm install -g yarn
```

However, global installation is **not recommended** for reproducible setups.

------------


## ⚡️ Command Cheatsheet [🔺](#-yarn-2-yarn-berry)

Here are the most commonly used commands:

| Command                              | Description                                                                               |
|--------------------------------------|-------------------------------------------------------------------------------------------|
| `yarn [install]`                     | Install all dependencies (both `dependencies` and `devDependencies`)                      |
| `yarn workspaces focus --production` | Install only `dependencies` (in **production**)                                           |
| `yarn add <package>`                 | Add a package to `dependencies`                                                           |
| `yarn add -D <package>`              | Add a package to `devDependencies`                                                        |
| `yarn up <package[@<version>]>`      | Update a package in `package.json`, if no `[@<version>]` will update to latest version    |
| `yarn up <package> -C`               | Update a package in `package.json`, and use the `^` semver modifier on the resolved range |
| `yarn remove <package>`              | Remove a package from the project                                                         |
| `yarn [run] <script-name>`           | Run a script defined in the `scripts` section of `package.json`                           |
| `yarn exec <shell-command>`          | Execute a shell command in scope of the project                                           |
| `yarn dlx <command>`                 | Execute a binary from an external package without installing it persistently              |
| `yarn init`                          | Create a `package.json` file and initiate a **Yarn** project                              |

👉 _See full list in the [Yarn CLI docs](https://yarnpkg.com/cli)_

------------


## ♻️ Lifecycle Scripts (Hooks) [🔺](#-yarn-2-yarn-berry)

The following table lists the most commonly used hooks and when they are triggered:

| Script        | When it runs                                                                                             |
|---------------|----------------------------------------------------------------------------------------------------------|
| `postinstall` | After packages are installed — triggered only when the dependency tree changes (added, removed, updated) |
| `install`     | (_legacy compatibility_) Run before `postinstall` script                                                 |
| `preinstall`  | (_legacy compatibility_) Run before `install` script                                                     |
| `prepublish`  | Before the project is packed when running `yarn npm publish`                                             |
| `prepack`     | Before `yarn pack` is run                                                                                |
| `postpack`    | After `yarn pack` is run                                                                                 |

************

[⤴️ Back: **Node Environment**](-intro.md)
