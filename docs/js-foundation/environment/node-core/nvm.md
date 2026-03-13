# ![NVM](../_static/icons/nvm-28.png) Node Version Manager (NVM)

<p align="right"><em>&lt;Last updated: 2026-03-13&gt;</em></p>

**nvm** is a version manager for **Node.js** that lets you easily install, switch, and manage multiple **Node.js**
versions on the same machine.

🔗 **Links:** _[Docs](https://www.nvmnode.com/guide/)_
            - _[Repository](https://github.com/nvm-sh/nvm)_

> ### 🗂️ Contents
>   - 🪐 [Introduction](#-introduction-)
>   - 🌱 [Installation](#-installation-)
>   - 🕹 [Usage](#-usage-)
>   - ⚡️ [Command Cheatsheet](#-command-cheatsheet-)
>   - 🗃 [Config Files and Folders](#-config-files-and-folders-)

************

[⤴️ Back: **Node Environment**](-intro.md)\
                                                         [Next: **Corepack** ▶️](corepack.md)


************


## 🪐 Introduction [🔺](#-node-version-manager-nvm)

**NVM (Node Version Manager)** is a command-line tool used to install, manage, and switch between **multiple versions**
of **Node.js** on a single machine.

It enables developers to **work with different Node.js versions** across projects, ensuring compatibility with varying
runtime requirements. This is especially useful when maintaining legacy applications, testing across Node.js versions,
or aligning with project-specific version constraints.

Key capabilities of NVM include:
  - Installing and managing **multiple Node.js versions**.
  - **Switching Node.js versions** per shell session or project.
  - Supporting `.nvmrc` files for **project-specific version selection**.
  - Simplifying environment setup for development and CI workflows.

NVM is widely used in local development environments to maintain consistent Node.js runtimes across projects.

------------


## 🌱 Installation [🔺](#-node-version-manager-nvm)

① Download and run installer:

```shell
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/<nvm-latest-version>/install.sh | bash
# - 📗 Example: -
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```

② After installation, the following snippet is typically added to your shell profile (e.g., `~/.bashrc`, `~/.zshrc`,
`~/.profile`). Make sure it’s added to the correct file for your shell:

```sh
# (🖥️ ~/.bashrc or ~/.zshrc)

# This loads nvm
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

👉 _Refer to the [Official NVM Download docs](https://www.nvmnode.com/guide/download.html) for more installation methods._

------------


## 🕹 Usage [🔺](#-node-version-manager-nvm)

### 🌍 Install Node.js in Global

##### 🟢 <u>Install Node for a Specified Version</u>

```shell
nvm install <node-version>
# - 📗 Example -
nvm install 20
```

📙 `<node-version>` — Version of node you want to install.
  - `node`    – latest available Node.js version
  - `20`      – latest minor/patch under major version 20
  - `20.15.1` – a specific version
  - `--lts`   – latest LTS version

##### 🟢 <u>Set Default Node Version</u>

Set the default version used in every new shell session:

```shell
nvm alias default <node-version>
# - 📗 Example: -
nvm alias default 20
```

You can also create custom aliases:

```shell
nvm alias <alias-name> <node-version>
# - 📗 Example: -
nvm alias project-a 18
```

##### 🟢 <u>Switch Between Versions</u>

To use another version in the current shell:

```shell
nvm use <node-version/alias-name>
# - 📗 Example: -
nvm use 18
```

Run node command with desired version:

```shell
nvm run <node-version/alias-name> <node-command>
# - 📗 Example: -
nvm run 18 --version
```

Run any arbitrary command in a subshell with the desired version of node:

```shell
nvm exec <node-version/alias-name> <arbitrary-command>
# - 📗 Example:-
nvm exec 18 node --version
```


### 📦 Specify Node Version in a Project

##### ① <u>Define the Node.js Version</u>

Create an `.nvmrc` file in your project root to specify which **Node.js** version should be used:

```shell
# (📍 <project-root>)

# Set the desired Node.js version
echo "<node-version>" > .nvmrc

# (Optional) Validate the .nvmrc file
npx nvmrc
```

##### ② <u>Use the Defined Version</u>

To switch your shell to the version specified in `.nvmrc`:

```shell
# (📍 <project-root>)
nvm use
```

Or run a command using that version (useful when working across multiple projects):

```shell
# (📍 <project-root>)
nvm run <node-command>
# - 📗 Example:-
nvm run --version
```

> ### 📕 _Notes_
>
> All nvm commands — `use`, `install`, `exec`, `run`, `which` — will respect the version defined in `.nvmrc`.

👉 _See the [Configuring **nvmrc**](https://www.nvmnode.com/extend/nvmrc.html) for more details._

------------


## ⚡️ Command Cheatsheet [🔺](#-node-version-manager-nvm)

Here are the most commonly used commands:

| Command                                  | Scope   | Description                                                   |
|------------------------------------------|---------|---------------------------------------------------------------|
| `nvm install <version>`                  | Global  | Install a specific Node.js version                            |
| `nvm install node`                       | Global  | Install the latest available Node.js version                  |
| `nvm install --lts`                      | Global  | Install the latest LTS version                                |
| `nvm alias default <version>`            | Global  | Set the default Node.js version for new shell sessions        |
| `nvm alias <alias-name> <version>`       | Global  | Create an alias for a specific Node.js version                |
| `nvm use <version>`                      | Session | Switch to a specific Node.js version in the current shell     |
| `nvm use`                                | Project | Use the Node.js version defined in `.nvmrc` (if present)      |
| `nvm ls`                                 | Info    | List installed versions                                       |
| `nvm ls-remote`                          | Info    | List all available versions                                   |
| `nvm which <node-version/alias-name>`    | Info    | Show the install path for a version                           |
| `nvm run <version/alias> <node-command>` | Session | Run a Node.js command using a specific version                |
| `nvm exec <version/alias> <command>`     | Session | Execute an arbitrary command using a specific Node.js version |
| `nvm uninstall <version>`                | Global  | Remove an installed Node.js version                           |

👉 _See the full list of usage examples in the [NVM GitHub](https://github.com/nvm-sh/nvm?tab=readme-ov-file#usage)_

------------


## 🗃 Config Files and Folders [🔺](#-node-version-manager-nvm)

NVM uses a small number of files to control Node.js version selection and environment behavior.

| File / Folder                  | Description                                                |
|--------------------------------|------------------------------------------------------------|
| [`.nvmrc`](../../../../.nvmrc) | Specifies the Node.js version to use for a project         |
| `$NVM_DIR/`                    | Root directory where NVM stores installed Node.js versions |
| `$NVM_DIR/alias/`              | Stores version aliases (e.g., default, custom aliases)     |
| `$NVM_DIR/versions/`           | Contains installed Node.js runtime versions                |


************

[⤴️ Back: **Node Environment**](-intro.md)\
                                                         [Next: **Corepack** ▶️](corepack.md)
