# ![Corepack](../_static/icons/corepack-28.png) Corepack

<p align="right"><em>&lt;Last updated: 2026-03-13&gt;</em></p>

Corepack is a Node.js tool that **manages and provisions package manager versions** (such as PNPM and Yarn) per project,
ensuring consistent dependency tooling without requiring global installations.

🔗 **Links:** _[NPM](https://www.npmjs.com/package/corepack)_
            - _[Repository](https://github.com/nodejs/corepack)_

> ### 🗂️ Contents
>   - 🪐 [Introduction](#-introduction-)
>   - 🌱 [Installation](#-installation-)
>   - 🕹 [Usage](#-usage-)
>   - ⚡️ [Command Cheatsheet](#-command-cheatsheet-)

************

[⤴️ Back: **Node Environment**](-intro.md)\
[◀️ Previous: **NVM**](nvm.md)                                          [Next: **PNPM** ▶️](pnpm.md)

************


## 🪐 Introduction [🔺](#-corepack)

**Corepack** is a Node.js tool that **manages package manager versions** such as **pnpm**, **Yarn**, and **npm**. It
enables projects to define the **required package manager and version** directly in `package.json`, helping ensure
consistent tooling across different environments.

Corepack acts as a **version shim**, automatically downloading and activating the correct package manager version when
running project commands. This removes the need for global installations and simplifies dependency management workflows.

Key characteristics of Corepack include:
  - **Managing package manager versions** per project.
  - Automatic **installation** and **activation** of required versions.
  - Integration with the `packageManager` field in `package.json`.
  - Compatibility with modern Node.js development workflows.

------------


## 🌱 Installation [🔺](#-corepack)

**Corepack** is bundled with modern versions of **Node.js** (available from `v16.10` and removed starting from `v25`).
If your Node.js version **does not include Corepack**, or if you want to **update it to the latest release**, install it
globally:

```shell
npm install -g corepack@latest
```

Since **Corepack** is an experimental feature, it must be **enabled before use**:

```shell
# Enable for a specific package manager (pnpm, Yarn)
corepack enable <package-manager>

# OR enable for all supported package managers
corepack enable
```

> ### ⚠️ Warning
>
> If **pnpm** or **Yarn** is already installed globally, it is recommended to **uninstall the global installation**
> before enabling Corepack. Global installations may **override** Corepack-managed versions and lead to inconsistent
> behavior.
>
> ```shell
> npm uninstall -g yarn pnpm
> ```

------------


## 🕹 Usage [🔺](#-corepack)

> ### 📘 Package Manager Identifier
>
> ```
> <package-manager[@<version>]>
> ```
>
> 📙 `<package-manager>` — Package manager name.
>   - **Values:** `pnpm`, `yarn` or `npm`.
>
> 📙 `@<version>` — _(optional)_ Version of package manager.
>   - If omitted, the **latest available version** will be used.
>   - **Values:** `latest` or a version.\
>     📗 **Examples:**
>       + `@latest`     – latest available version.
>       + `@latest-11`  – latest version within major `11`.
>       + `@11.3.0`     – specific version.


### 📦 Use in Project

##### ① <u>Define the Package Manager</u>

Set a specific package manager and version in your project (assign it to the project's `package.json` file and perform
installation):

```shell
corepack use <package-manager[@<version>]>
```

##### ② <u>Install the Defined Package Manager</u>

Install and activate the package manager defined in the current project’s `package.json`:

```shell
corepack install
```

##### ③ <u>Update the Package Manager</u>

Update the package manager to the latest compatible version within the same major range:

```shell
corepack up
```


### 🌍 Install a Package Manager in Global

Install a specific package manager version for global usage:

```shell
corepack install -g <package-manager[@<version>]>
```

------------


## ⚡️ Command Cheatsheet [🔺](#-corepack)

Commonly used Corepack commands:

| Command                                             | Scope   | Description                                                         |
|-----------------------------------------------------|---------|---------------------------------------------------------------------|
| `corepack enable`                                   | Global  | Enable Corepack shims for all supported package managers            |
| `corepack enable <package-manager>`                 | Global  | Enable Corepack shim for a specific package manager                 |
| `corepack use <package-manager[@<version>]>`        | Project | Set and prepare the package manager version for the current project |
| `corepack up`                                       | Project | Update the local package manager to the latest compatible version   |
| `corepack install`                                  | Project | Install and activate the package manager defined in package.json    |
| `corepack install -g <package-manager[@<version>]>` | Global  | Install a package manager version globally                          |
| `corepack disable <package-manager>`                | Global  | Disable Corepack shim for a specific package manager                |

👉 _See all available commands in the [Corepack Utility Commands](https://github.com/nodejs/corepack?tab=readme-ov-file#utility-commands)._


************

[⤴️ Back: **Node Environment**](-intro.md)\
[◀️ Previous: **NVM**](nvm.md)                                          [Next: **PNPM** ▶️](pnpm.md)
