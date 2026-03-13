# ![PNPM](../_static/icons/pnpm-28.png) PNPM (Performant NPM)

<p align="right"><em>&lt;Last updated: 2026-03-13&gt;</em></p>

**PNPM** is a high-performance **Node.js Package Manager** focused on efficient dependency resolution and storage. As an
alternative to the bundled **NPM**, PNPM achieves faster installs — often around **2× faster** — using its symlink-based
`node_modules` architecture.

🔗 **Links:** _[NPM](https://www.npmjs.com/package/pnpm)_
            - _[Docs](https://pnpm.io/motivation)_
            - _[Repository](https://github.com/pnpm/pnpm)_

> ### 🗂️ Contents
>   - 🪐 [Introduction](#-introduction-)
>   - 🌱 [Installation](#-installation-)
>   - 🕹 [Usage](#-usage-)
>   - ⚙️ [Configuration](#-configuration-)
>   - ⚡️ [Command Cheatsheet](#-command-cheatsheet-)
>   - ♻️ [Lifecycle Scripts (Hooks)](#-lifecycle-scripts-hooks-)
>   - 🗃 [Config Files and Folders](#-config-files-and-folders-)

************

[⤴️ Back: **Node Environment**](-intro.md)\
[◀️ Previous: **Corepack**](corepack.md)

************


## 🪐 Introduction [🔺](#-pnpm-performant-npm)

**PNPM** (Performant Node Package Manager) is a fast and efficient package manager for **Node.js** that focuses on
**disk space optimization**, **installation speed**, and **deterministic dependency management**.

Unlike traditional package managers such as **npm** or **Yarn**, PNPM uses a **content-addressable store** and
**symlinks** to avoid duplicating dependencies across projects. This results in:
  - **Faster** and **more reliable installations**.
  - **Reduced disk usage**.
  - Strict and predictable dependency resolution.
  - Strong support for **monorepos** and workspace-based development.

PNPM is fully compatible with the **Node.js ecosystem** and supports modern workflows including **workspaces**,
**lockfile reproducibility**, and **CI/CD optimization**.

### ✨ Feature Highlights

PNPM provides several key capabilities that improve dependency management and development workflows:

- **Content-Addressable Storage**\
  Dependencies are stored once and reused across projects, reducing disk usage and improving installing speed.
- **Deterministic Lockfile**\
  `pnpm-lock.yaml` ensures consistent dependency resolution across environments and CI pipelines.
- [**Workspace and Monorepo Support**](https://pnpm.io/workspaces) \
  Built-in workspace features simplify dependency sharing and coordination across multi-package repositories.
- [**Efficient Installation Model**](https://pnpm.io/symlinked-node-modules-structure) \
  Symlink-based `node_modules` structure improves installation performance compared to traditional layouts.
- **Compatibility with npm Ecosystem**\
  Supports npm-compatible configuration and tooling, enabling seamless integration with existing workflows.

👉 _See the official [Feature Comparison](https://pnpm.io/feature-comparison) for a detailed comparison with other
package managers._

------------


## 🌱 Installation [🔺](#-pnpm-performant-npm)

### 📦 Install in Project

For **reliable and reproducible builds**, PNPM should be configured **per project** by specifying the package manager
version in `package.json`.

> ### 📘 Syntax
>
> ```json5
> // (📍 /package.json)
>
> {
>   "packageManager": "pnpm@<version>"
> }
> ```
>
> 📙 `<version>` — The PNPM version required by the project.
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
> corepack enable pnpm
> ```
>
> 🤘 _Read [Install Corepack](corepack.md#-installation-) for more detailed setup instructions._

##### 🟡 <u>For New Projects</u>

When setting up a new project, **specify the PNPM version** that the project should use:

```shell
corepack use pnpm@latest-<major-version>
# - 📗 Example: -
corepack use pnpm@latest-10
```

This updates the `packageManager` field in `package.json` to ensure consistent tooling across environments.

##### 🟡 <u>For Existing Projects</u>

For an existing project, **install the PNPM version** specified in package.json:

```shell
corepack install
```

Corepack will automatically detect and activate the correct version.

You also can **update PNPM** to the latest compatible version defined by your version range:

```shell
corepack up
```

### 🌍 Install Globally

PNPM can also be installed globally if you prefer system-wide access without project-specific version control or general
usage.

To enable PNPM via **Corepack** globally:

```shell
corepack enable pnpm
```

Alternatively, install PNPM using npm:

```shell
npm install -g pnpm@latest-<major-version>
# - 📗 Example: -
npm install -g pnpm@latest-10
```

👉 _See the official [PNPM Installation Guide](https://pnpm.io/installation) for all supported installation options._

### 📜 Initialize Project Using Global PNPM

If PNPM is installed **globally**, you can initialize a new project directly using PNPM commands.

```shell
pnpm init
```

This command generates a `package.json` file with basic project metadata and automatically sets the **PNPM version** in
the `packageManager` field.

After initialization, install project dependencies:

```shell
pnpm install
```

------------


## 🕹 Usage [🔺](#-pnpm-performant-npm)

### 📥 Install Dependencies

##### 🟡 <u>General Installation</u>

Install all dependencies listed in `package.json`:

```shell
pnpm install
# --- OR ---
pnpm i
```

This will:
  - Install dependencies into `node_modules`.
  - Generate or update the `pnpm-lock.yaml` lockfile.
  - Ensure deterministic installations across environments.

##### 🟡 <u>Production Installation</u>

To install production dependencies only:

```shell
pnpm install --prod
# --- OR ---
pnpm install -P
```

This installs only dependencies under the `dependencies` field, excluding `devDependencies`.

##### 🟡 <u>CI Environments</u>

In CI system, it is recommended to use:

```shell
pnpm install --frozen-lockfile
```

This ensures:
  - The installation strictly follows the `pnpm-lock.yaml`.
  - The lockfile is **not modified** during CI.
  - ❌ Installation fails if dependencies are **out of sync** or lockfile is **missing**.

This helps guarantee **reproducible and reliable builds**.

By default, PNPM automatically behaves as if `--frozen-lockfile` is enabled when **running in CI environments**. PNPM
detects CI environments via common variables such as:
  - `CI`
  - `CONTINUOUS_INTEGRATION`
  - `BUILD_NUMBER`
  - `RUN_ID`

👉 Refer to the official [**--frozen-lockfile** option](https://pnpm.io/cli/install#--frozen-lockfile) for detailed behavior.

### 📦 Manage Dependencies

##### 🟢 <u>Add Dependencies</u>

Add one or more packages as **runtime** dependency:

```shell
pnpm add <package>
```

📙 `<package>` — Multiple packages can be specified, separated by spaces (` `).

Add a package as a **development** dependency:

```shell
pnpm add -D <package>
```

##### 🟢 <u>Update Dependencies</u>

Update a specific dependency:

```shell
pnpm update <package> [--latest]
# --- OR ---
pnpm up <package> [--latest]
```

📙 `--latest` — Updates the package to the **latest available version**, ignoring the version range specified in
`package.json`.

```shell
pnpm update <package> [--latest]
```

Update all dependencies:

```shell
pnpm update [--latest]
```

##### 🟢 <u>Remove Dependencies</u>

Remove a dependency from the project:

```shell
pnpm remove <package>
```

This removes the package from `package.json`, updates the lockfile, and cleans up the dependency graph.


### ▶️ Run Commands

##### 🟢 <u>Run Project Scripts</u>

Run scripts defined in `package.json`:

```shell
pnpm run <script>
# --- OR (shorthand if the script name does not conflict with a pnpm command) ---
pnpm <script>
```

📙 `<script>` — Name of the script defined in `package.json` > `scripts`.

📗 **Example:**

```shell
# Run `build` script
pnpm run build

# Run `lint` script
pnpm run lint

# Shorthand
pnpm build
pnpm lint
```

##### 🟢 <u>Run Installed Package Commands</u>

Run commands provided by installed dependencies:

```shell
pnpm exec <command>
```

> ### 🧠 How It Works
>
> `pnpm exec` executes a shell command within the **project’s dependency context**.
>
> When dependencies are installed, executable shell wrappers are created in [`node_modules/.bin/`](../../../../node_modules/.bin).
> During execution, PNPM temporarily adds this directory to the `PATH`, allowing these commands to be run without
> specifying their path.

📗 **Example:**

```shell
# Run `tsc` command
pnpm exec tsc

# Run `eslint` command (not `lint` script)
pnpm exec eslint .
```

##### 🟢 <u>Run Package Commands without Installation</u>

Execute a package command **without installing** it as a project dependency:

```shell
pnpm dlx <package> [...args]
# --- OR ---
pnpx <package> [...args]
```

These commands download and execute a package **temporarily**, without adding it to `package.json`.

This is useful for:
  - Running **temporary CLI tools**.
  - Executing **one-off scripts**.
  - Creating projects using framework **scaffolding tools** (alias: `pnpm create`).

📗 **Example:**

```shell
# Run `eslint` command without need to install it
pnpx eslint .

# Init a Vite project
pnpx create-vite my-vite-app
# --- EQUIVALENT ---
pnpm create vite my-vite-app
```

------------


## ⚙️ Configuration [🔺](#-pnpm-performant-npm)

PNPM configuration can be defined in multiple files, with `package.json` as the **primary configuration file**.

Because PNPM is compatible with the **npm ecosystem**, it supports most npm configuration conventions (such as `scripts`,
`dependencies`, `version`, etc.).

👉 _Refer to the npm [**package.json** documentation](https://docs.npmjs.com/cli/v11/configuring-npm/package-json) for
full configuration details._

PNPM also provides additional configuration options that can be useful in your project.

### 🔎 Validate Runtime Versions

The `engines` field can be used to declare required versions for runtime tools such as **Node.js** and **PNPM**. When
configured, PNPM may **refuse to run** if the current runtime version does not satisfy the specified range.

> ### 📘 Syntax
>
> ```json5
> // (📍 /package.json)
>
> {
>   "engines": {
>     "node": "<version-pattern>",
>     "pnpm": "<version-pattern>"
>   }
> }
> ```
>
> 📙 `<version-pattern>` — Specifies the acceptable version range.
>   - Can be an exact version, a major version constraint, or a semantic version range.
>   - Could be a fixed version or a range of versions.\
>     📗 **Example:**
>       + `22.16.0` -> exactly **22.16.0**
>       + `~22.16.0` -> compatible with **22.16.x**
>       + `>=20.15.1` -> **20.15.1** or newer
>       + `>20.15.1` -> strictly newer than **20.15.1**
>       + `>=20.15.1 <24` -> between **20.15.1** (inclusive) and **24** (exclusive)

📗 **Example:**

```json5
// (📍 /package.json)

{
  "engines": {
    "node": ">=24.12.0",
    "pnpm": ">=10"
  }
}
 ```

### 🦾 Specify Runtime Node Version (PNPM Only)

PNPM allows you to declare the **required Node.js runtime** for a project. When configured, PNPM can automatically
**download and use the specified Node.js version** if the current runtime does not satisfy the requirement.

> ### 📘 Syntax
>
> ```json5
> // (📍 /package.json)
>
> {
>   "engines": {
>     "runtime": {
>       "name": "node",
>       "version": "<node-version>",
>       "onFail": "download"
>     }
>   }
> }
> ```
>
> 📙 `name` — Runtime identifier.
>   - Typically `node`.
>   - Other runtimes may be supported (e.g., `deno`, `bun`).
>
> 📙 `version` — Required runtime version.
>   - Uses semantic version ranges.\
>     📗 **Example:** `^24.12.0`, `~22.16.0`, `20.15.1`
>
> 📙 `onFail` — Action when the required runtime is unavailable.
>   - `download` – Download node as dependency if not match

This configuration ensures that project commands are executed using the declared runtime version, regardless of the
globally installed Node.js version.

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

------------


## ⚡️ Command Cheatsheet [🔺](#-pnpm-performant-npm)

Here are the most commonly used commands and their aliases:

| Command                     | Description                                                                   | Alias                            |
|-----------------------------|-------------------------------------------------------------------------------|----------------------------------|
| `pnpm i`                    | Install all dependencies (both `dependencies` and `devDependencies`)          | `pnpm install`                   |
| `pnpm i -P`                 | Install only `dependencies` (in **production**)                               | `pnpm install --prod`            |
| `pnpm i --frozen-lockfile`  | Install dependencies strictly using `pnpm-lock.yaml` without modifying it     |                                  |
| `pnpm add <package>`        | Add a package to `dependencies`                                               |                                  |
| `pnpm add -D <package>`     | Add a package to `devDependencies`                                            | `pnpm add --save-dev <package>`  |
| `pnpm add -g <package>`     | Install a package globally                                                    | `pnpm add --global <package>`    |
| `pnpm up`                   | Update dependencies based on the version ranges in `package.json`             | `pnpm update`                    |
| `pnpm up --latest`          | Update all dependencies to their latest available versions                    |                                  |
| `pnpm rm <package>`         | Remove a package from the project                                             | `pnpm remove` / `pnpm uninstall` |
| `pnpm rm -g <package>`      | Remove a globally installed package                                           |                                  |
| `pnpm <script-name>`        | Run a script defined in the `scripts` section of `package.json`               | `pnpm run`                       |
| `pnpm exec <shell-command>` | Execute shell or installed package commands within the project context        |                                  |
| `pnpx <command>`            | Execute a command from an external package without installing it persistently | `pnpm dlx`                       |
| `pnpm init`                 | Create a `package.json` file and initiate a **pnpm** project                  |                                  |
| `pnpm create`               | Create a project from a `create-*` or `@foo/create-*` starter kit             |                                  |

👉 _See full list in the [PNPM CLI docs](https://pnpm.io/pnpm-cli)_

------------


## ♻️ Lifecycle Scripts (Hooks) [🔺](#-pnpm-performant-npm)

The following table lists the most commonly used hooks and when they are triggered:

| Script           | When it runs                                            |
|------------------|---------------------------------------------------------|
| `preinstall`     | Before dependency installation begins                   |
| `install`        | During the install process                              |
| `postinstall`    | After all packages are installed                        |
| `prepare`        | After install (for Git) or before publishing            |
| `prepublishOnly` | Right before `pnpm publish` is run                      |
| `devPreinstall`  | Before pnpm install (**only in local**, not CI/publish) |

------------


## 🗃 Config Files and Folders [🔺](#-pnpm-performant-npm)

PNPM uses several files and directories to manage configuration, dependency resolution, and workspace behavior.

| File / Folder                                           | Description                                                                                  |
|---------------------------------------------------------|----------------------------------------------------------------------------------------------|
| [`package.json`](../../../../package.json)              | Primary project configuration (`dependencies`, `scripts`, `engines`, `packageManager`, etc.) |
| `.npmrc`                                                | PNPM and npm-compatible configuration (**registry**, **install behavior**, **PNPM options**) |
| `pnpm-workspace.yaml`                                   | Workspace configuration for **monorepo** setups                                              |
| `.pnpmfile.cjs`                                         | Hook file to **customize dependency resolution** behavior                                    |
| [`pnpm-lock.yaml`](../../../../pnpm-lock.yaml)          | **Lockfile** ensuring deterministic dependency resolution                                    |
| [`node_modules/`](../../../../node_modules)             | Local dependency installation directory (symlinked structure)                                |
| [`node_modules/.pnpm/`](../../../../node_modules/.pnpm) | PNPM virtual store containing actual package contents                                        |
| PNPM store                                              | **Global** content-addressable dependency store (shared across projects)                     |


************

[⤴️ Back: **Node Environment**](-intro.md)\
[◀️ Previous: **Corepack**](corepack.md)
