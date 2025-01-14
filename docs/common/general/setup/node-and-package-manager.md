# Node and Package Manager

<p align="right"><em>&lt;Last updated: 2025-06-18&gt;</em></p>

- ![nvm](../_assets/icons/nvm-14.png) [NVM](#-node-version-manager-nvm-)
- ![pnpm](../_assets/icons/pnpm-14.png) [PNPM](#-pnpm-performant-npm-)
- ![yarn](../_assets/icons/yarn-14.png) [Yarn](#-yarn-2-yarn-berry-)
- ![corepack](../_assets/icons/corepack-14.png) [Corepack](#-corepack-)

************


## ![nvm](../_assets/icons/nvm-22.png) Node Version Manager (NVM) [🔺](#node-and-package-manager)

**nvm** is a version manager for **Node.js** that lets you easily install, switch, and manage multiple 
**Node.js** versions on the same machine.

### 🌱 Install NVM

**1. Download and run installer:**

```shell
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/<version>/install.sh | bash
# 📗 Example: wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```

📙 `<version>`: the latest version of nvm

**2. Configure environment variables:**

After installation, the following snippet is typically added to your shell profile 
(e.g., `~/.bashrc`, `~/.zshrc`, `~/.profile`). Make sure it’s added to the correct file for your shell:

```sh
# (📍 ~/.bashrc or ~/.zshrc)

# This loads nvm
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" 
```

### ⚡ Install Node.js

**1. Install Node for a specified version:**

```shell
nvm install <node-version>
# 📗 Example: nvm install 20
```

📙 `<node-version>`: version of node you want to install:
  - `node`    — Latest available Node.js version
  - `20`      — Latest minor/patch under major version 20
  - `20.15.1` — A specific version

**2. Set default Node version:**

Set the default version used in every new shell session:

```shell
nvm alias default <node-version>
# 📗 Example: nvm alias default 20
```

You can also create custom aliases:

```shell
nvm alias <alias-name> <node-version>
# 📗 Example: nvm alias project1 18
```

**3. Switch between versions (optional):**

To use another version in the current shell:

```shell
nvm use <node-version/alias-name>
# 📗 Example: nvm use 18
```

Run specific commands with a chosen version:

```shell
# Run node command with desired version
nvm run <node-version/alias-name> <node-command>
# 📗 Example: nvm run 18 --version

# Run any arbitrary command in a subshell with the desired version of node
nvm exec <node-version/alias-name> <arbitrary-command>
# 📗 Example: nvm exec 18 node --version
```

### 🚀 Other Useful Commands

| Command                               | Description                              |
|---------------------------------------|------------------------------------------|
| `nvm ls`                              | List installed versions                  |
| `nvm ls-remote`                       | List all available versions              |
| `nvm which <node-version/alias-name>` | Show the install path for a version      |
| `nvm uninstall <node-version>`        | Uninstall a previously installed version |

------------


## ![pnpm](../_assets/icons/pnpm-22.png) PNPM (Performant NPM) [🔺](#node-and-package-manager)

**PNPM** is a fast, disk-efficient alternative to **NPM**. While **NPM** comes bundled with 
**Node.js**, **PNPM** offers **significant performance improvements (often 2× faster)** thanks to 
its unique symlink-based `node_modules` structure.

🔗 _See [feature comparison with NPM/Yarn](https://pnpm.io/feature-comparison) for more detail._

### 🌱 Install

Before installing **pnpm**, ensure that **corepack** is enabled. (_If not, refer to the 
[Corepack Setup guide](#enable-corepack))_

To enable and install pnpm globally:

```shell
corepack enable pnpm
```

To set a specific version for your project (saved in `package.json`):

```shell
corepack use pnpm@latest-10
```

### 🚀 CLI

| Command                     | Description                                                                  | Alias                            |
|-----------------------------|------------------------------------------------------------------------------|----------------------------------|
| `pnpm i`                    | Install all dependencies (both `dependencies` and `devDependencies`)         | `pnpm install`                   |
| `pnpm i -P`                 | Install only `dependencies` (in **production**)                              |                                  |
| `pnpm add <package>`        | Add a package to `dependencies`                                              |                                  |
| `pnpm add -D <package>`     | Add a package to `devDependencies`                                           |                                  |
| `pnpm add -g <package>`     | Install a package globally                                                   |                                  |
| `pnpm up`                   | Update dependencies based on the version ranges in `package.json`            | `pnpm update`                    |
| `pnpm up --latest`          | Update all dependencies to their latest available versions                   |                                  |
| `pnpm rm <package>`         | Remove a package from the project                                            | `pnpm remove` / `pnpm uninstall` |
| `pnpm rm -g <package>`      | Remove a globally installed package                                          |                                  |
| `pnpm <script-name>`        | Run a script defined in the `scripts` section of `package.json`              | `pnpm run`                       |
| `pnpm exec <shell-command>` | Execute a shell command in scope of the project                              |                                  |
| `pnpx <command>`            | Execute a binary from an external package without installing it persistently | `pnpm dlx`                       |
| `pnpm init`                 | Create a `package.json` file and initiate a **pnpm** project                 |                                  |
| `pnpm create`               | Create a project from a `create-*` or `@foo/create-*` starter kit            |                                  |

🔗 _See full list in [the official PNPM CLI docs](https://pnpm.io/pnpm-cli)_

### ♻️ Lifecycle Scripts (Hooks)

| Script           | When it runs                                            |
|------------------|---------------------------------------------------------|
| `preinstall`     | Before dependency installation begins                   |
| `install`        | During the install process                              |
| `postinstall`    | After all packages are installed                        |
| `prepare`        | After install (for Git) or before publishing            |
| `prepublishOnly` | Right before `pnpm publish` is run                      |
| `devPreinstall`  | Before pnpm install (**only in local**, not CI/publish) |

------------


## ![yarn](../_assets/icons/yarn-22.png) Yarn 2+ (Yarn Berry) [🔺](#node-and-package-manager)

**Yarn** is a modern JavaScript package manager that aims to be **faster, more secure, and more
scalable than npm**.

Version 2+ (known as **Yarn Berry**) is a complete rewrite of original Yarn (v1), introducing 
powerful features tailored for both **standalone projects** and **large-scale monorepos**. These 
features include **workspaces**, **offline caching**, **parallel installs**, and much more.

🔗 _See the full feature list on the [Yarn Berry GitHub](https://github.com/yarnpkg/berry?tab=readme-ov-file)_

### 🌱 Install

Before installing **Yarn**, ensure that **corepack** is enabled. (_If not, refer to the
[Corepack Setup guide](#enable-corepack))_

To enable Yarn in your project (saved in `package.json`) or update it to the latest stable version:

```shell
yarn set version stable
```

### 🚀 CLI

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

🔗 _See full list in [the official Yarn CLI docs](https://yarnpkg.com/cli)_

### ♻️ Lifecycle Scripts (Hooks)

| Script        | When it runs                                                                                             |
|---------------|----------------------------------------------------------------------------------------------------------|
| `postinstall` | After packages are installed — triggered only when the dependency tree changes (added, removed, updated) |
| `install`     | (_legacy compatibility_) Run before `postinstall` script                                                 |
| `preinstall`  | (_legacy compatibility_) Run before `install` script                                                     |
| `prepublish`  | Before the project is packed when running `yarn npm publish`                                             |
| `prepack`     | Before `yarn pack` is run                                                                                |
| `postpack`    | After `yarn pack` is run                                                                                 |

------------


## ![corepack](../_assets/icons/corepack-22.png) Corepack [🔺](#node-and-package-manager)

**Corepack** is a **Node.js** tool that allows you to use package managers like **Yarn**, **pnpm**, and 
**npm** _without installing them manually_. It acts as a proxy that automatically downloads and runs
the appropriate version defined by your project.

### 🌱 Enable Corepack

**Corepack** is bundled with modern versions of **Node.js** (≥16.10), but is **disabled by default**.
To enable it:

```shell
corepack enable
```

To update **Corepack** to the latest version:

```shell
npm install -g corepack@latest
```

### 📦 Use a Package Manager in Local Project

To set a specific package manager and version in your project (assign it to the project's 
`package.json` file and perform installation):

```shell
corepack use <name[@<version>]>
```

📙 `<name[@<version>]>`: name of package manager: 
  - `<name>`     — can be `yarn` or `pnpm`
  - `@<version>` — _optional_, specific version:
    + `@latest` — latest version of the package manager

To install the package manager defined in the current project’s `package.json`:

```shell
corepack install
```

To update the local package manager to the latest version within the same major release:

```shell
corepack up
```

### 🌍 Install a Package Manager in Global

To enable the manager in the system (if not yet enabled):

```shell
corepack enable <name>
```

Or to install a specific version globally:

```shell
corepack install -g <name[@<version>]>
```
