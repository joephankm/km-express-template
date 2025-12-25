# ![Lint-Staged](../_static/icons/lint-staged-28.png) Lint-Staged

**Lint-Staged** is a tool that allows you to run scripts (like **linters** or **formatters**) on files that are **staged
in Git**, just before a commit. It ensures that only the files you’re about to commit are checked and fixed, which
**improves performance** and **keeps commits clean**.

🔗 **Links:** _[NPM](https://www.npmjs.com/package/lint-staged)_
            - _[Repository](https://github.com/lint-staged/lint-staged)_

> ### 🗂️ Contents
>   - 🌱 [Installation](#-installation-)
>   - 🕹 [Usage](#-usage-)
>   - ⚙️ [Configuration](#-configuration-)
>   - 🧱 [Config Format](#-config-format-)
>   - ⚡️ [Command Cheatsheet](#-command-cheatsheet-)
>   - 🗃 [Config Files](#-config-files-)

************

[⤴️ Back: **Code Quality & Linting Tools**](-intro.md)\

************


## 🌱 Installation [🔺](#-lint-staged)

Install `lint-staged` as a development dependency:

```shell
pnpm add -D lint-staged
```

------------


## 🕹 Usage [🔺](#-lint-staged)

`lint-staged` is typically executed automatically via Git hooks. The following command is used in the **Git hook file**
to run **lint-staged tasks**:

```shell
pnpx lint-staged [-v|--verbose]

# --- OR in `package.json` ---
# "scripts": {
#   "lint:staged": "lint-staged [--verbose]"
# }
```

📙 `-v`, `--verbose` — Display task output for both **succeeded** and **failed** tasks.
  - By default, output is shown only for **failed** tasks.

For troubleshooting, you can also execute the same command manually in the terminal:

```shell
pnpx lint-staged [-d|--debug]
```

📙 `-d`, `--verdebugbose` — Enable debug mode to inspect **task resolution**, **file matching**, and **execution flow**.

------------


## ⚙️ Configuration [🔺](#-lint-staged)

To use `lint-staged`, follow the steps below:

### ①. 🛠️ Configure Lint-Staged

> ### 📋 Prerequisites
>
> **Lint-Staged** is designed to run **formatting** and **linting** tasks on staged files only. Therefore, before
> setting up it, ensure you’ve already installed and configured the following tools:
>   - Linter (e.g., `eslint`, `stylelint`) -> if not, refer to [ESLint guide](eslint.md).
>   - Formatter (e.g., `prettier`) -> if not, refer to [Prettier guide](prettier.md).

Define your `lint-staged` config in following ways:
  - JavaScript config: `lint-staged.config.(m|c)js` or `.lintstagedrc.(m|c)js`.
  - Static config files: `.lintstagedrc` or `.lintstagedrc.(json|yaml|toml)`.
  - In `package.json` field `lint-staged`.

📗 **Example:**

```js
// (📍 /lint-staged.config.mjs)

/**
 * @type {import('lint-staged').Configuration}
 */
const config =  {
  '*': 'prettier --write',
}

export default config;
```

### ②. 🔗 Add to Git Hook

> ### 🧠 How it Runs
>
> **Lint-Staged** should NOT be executed manually in normal workflows. It is intended to run automatically during the
> **Pre-Commit phase** to verify staged changes before they are committed.
>
> In most setups, it is integrated with **Husky** and triggered by the `pre-commit` Git hook.

Add `lint-staged` command to your `pre-commit` hook:

```sh
# (📍 /.husky/pre-commit)

pnpx lint-staged
```

------------


## 🧱 Config Format [🔺](#-lint-staged)

### 💠 Basic Structure

A `lint-staged `configuration maps **file patterns** to one or more **commands**.

> ### 📘 Syntax
>
> ```
> {
>   "<file-pattern>": "<command>" | ["<command1>", "<command2>", ...]
> }
> ```
>
> 📙 `<file-pattern>` — Specifies which files the commands should run on.
>   - Patterns use **glob syntax** (e.g., `*.ts`, `**/*.js`).
>   - To match **all files across the repository** that follow a naming pattern, use patterns **without a slash (`/`)**.
>     + 📗 **Example:**
>        * `*.ts` -> match all TS files in all folders.
>        * `*test.ts` -> match all files ending with `test.ts` (e.g., `user.test.ts`, `auth-test.ts`).
>   - To **exclude files**, use the **(`!`) prefix**.
>     + 📗 **Example:**
>        * `!(*test).ts` -> match all TS files **except** those ending with `test.ts`.
>        * `!(*.json)` -> match all files **except** JSON files.
>
> 📙 `<command>` — Defines what runs for each matched file.
>   - Use a **string** to run a **single command**.
>   - Use an **array** to run **multiple commands** sequentially.
>   - Commands can be:
>      + CLI tools (e.g., `eslint --fix`, `prettier --write`).
>      + Package scripts (e.g., `pnpm lint`).
>      + Any executable available in your environment (e.g., `mkdir temp`).
>   - ⚠️ **Do not include file paths in the command**, as matched files are automatically appended as arguments.\
>     📗 **Example:**
>
> ```
> // - 🎯 Configuration -
> "*.ts": "prettier --write"
>
> // - 📋 Executed internally as -
> prettier --write file1.ts file2.ts ...
> ```

📗 **Example:** _Common Configuration_

```js
// (📍 /lint-staged.config.mjs)

/**
 * @type {import('lint-staged').Configuration}
 */
const config =  {
  '*.ts?(x)': ['eslint', 'prettier --write'],
  '*.{js,mjs}': ['eslint', 'prettier --write'],
  '*.json': 'prettier --write',
}

export default config;
```

> ### ⚠️ Important Notes
>
> `lint-staged` runs tasks concurrently, so **overlapping patterns** may try to modify the same file at the same time —
> causing **race conditions** or **conflicts**. We should avoid **overlapping glob patterns**.


### 🔄 Dynamic Configuration (JavaScript Only)

For advanced use cases, you can define commands dynamically using a function.

> ### 📘 Syntax
>
> ```
> {
>   "<file-pattern>": (stagedFiles) => "<command>" | ["<command1>", "<command2>", ...]
> }
> ```
>
> 📙 `stagedFiles` — An array of matched staged file paths.\
> 📙 `<command>` — Represents the final command to execute.

This allows you to:
  - Inspect the list of staged files.
  - Conditionally run commands.
  - Build dynamic CLI arguments.

📗 **Example:**

```js
// (📍 /lint-staged.config.mjs)

/**
 * @type {import('lint-staged').Configuration}
 */
const config =  {
  '*.ts': (stagedFiles) => {
    const files = stagedFiles.join(' ');
    return `prettier --write ${files}`;
  },
}

export default config;
```

👉 _See more examples in the official docs: https://github.com/lint-staged/lint-staged#using-js-configuration-files._

------------


## ⚡️ Command Cheatsheet [🔺](#-lint-staged)

Here are the most commonly used `lint-staged` CLI commands:

| Command                         | Description                                                         | 📗 Example                  |
|---------------------------------|---------------------------------------------------------------------|-----------------------------|
| `lint-staged`                   | Run lint-staged tasks on **staged files**                           |                             |
| `lint-staged --diff <revision>` | Run against files changed since a **specific git revision**         | `lint-staged --diff HEAD~1` |

Common CLI options supported across `lint-staged` commands:

| Option               | Description                                                              | Short Form | 📗 Example                                    |
|----------------------|--------------------------------------------------------------------------|------------|-----------------------------------------------|
| `--config <path>`    | Use a **specific config file** instead of the auto-detected one          | `-c`       | `lint-staged --config lint-staged.config.mjs` |
| `--cwd <path>`       | Set the **working directory** to run lint-staged from                    |            | `lint-staged --cwd ./packages/app`            |
| `--no-stash`         | Disable **stashing** of unstaged changes before running tasks            |            |                                               |
| `--concurrent <n>`   | Set the **number of tasks** to run concurrently (`false` to disable)     | `-p`       | `lint-staged --concurrent 2`                  |
| `--quiet`            | Suppress **all** output except errors                                    | `-q`       |                                               |
| `--verbose`          | Show output for both **succeeded** and **failed** tasks                  | `-v`       |                                               |
| `--debug`            | Enable **debug** mode to inspect task resolution and file matching       | `-d`       |                                               |

👉 _See the full list in the [lint-staged CLI docs](https://github.com/lint-staged/lint-staged#command-line-flags)._

------------


## 🗃 Config Files [🔺](#-lint-staged)

`lint-staged` configuration is defined in a single config file in the project root.

| File                                                           | Description                   |
|----------------------------------------------------------------|-------------------------------|
| [`lint-staged.config.mjs`](../../../../lint-staged.config.mjs) | Config file for `lint-staged` |


************

[⤴️ Back: **Code Quality & Linting Tools**](-intro.md)\
