# 🐶 Husky

<p align="right"><em>&lt;Last updated: 2026-03-06&gt;</em></p>

**Husky** lets you automate and manage **Git hooks** directly from your project, so you can run scripts like linters,
type checks, or test runners **before a commit or push happens**. It’s widely used to improve code quality and enforce
team conventions automatically.

🔗 **Links:** _[NPM](https://www.npmjs.com/package/husky)_
            - _[Docs](https://typicode.github.io/husky/)_
            - _[Repository](https://github.com/typicode/husky)_

> ### 🗂️ Contents
>   - 🌱 [Installation](#-installation-)
>   - ⚙️ [Configuration](#-configuration-)
>   - 🛠️ [Manage Git Hooks](#-manage-git-hooks-)
>   - 🌊 [Typical Workflow](#-typical-workflow-)
>   - 🧱 [Hook Scripts](#-hook-scripts-)
>   - ♻️ [Common Hooks](#-common-hooks-)
>   - 🗃 [Config Files and Folders](#-config-files-and-folders-)

************

[⤴️ Back: **Code Quality & Linting Tools**](../quality-tools/-intro.md)\
                                                         [Next: **Lint-Staged** ▶️](lint-staged.md)

************


## 🌱 Installation [🔺](#-husky)

Add **Husky** as a development dependency:

```shell
pnpm add -D husky
```

------------


### ⚙️ Configuration [🔺](#-husky)

① Initialize **Husky** to set up **Git hooks** and create a default `pre-commit` hook:

```shell
pnpm exec husky init
```

> ### 🧠 _What `husky init` Do?_
>
>  - Sets up Git hook support by configuring `core.hooksPath`.
>  - Creates a `.husky/` folder with a sample `pre-commit` hook.
>  - Adds a `prepare` script to your `package.json`.

By default, **Husky** only installs locally when you run `husky init`. To ensure that **every developer** on your team
installs hooks automatically:

② Create a custom `install` script in `.husky/` folder:

```js
// (📍 /.husky/install.mjs)

// Skip Husky install in production and CI
if (process.env.NODE_ENV === 'production' || process.env.CI === 'true') {
  process.exit(0)
}

const husky = (await import('husky')).default
console.log(husky())
```

③ Add a `prepare` npm hook to `package.json`:

```json5
// (📍 /package.json)

{
  "scripts": {
    "prepare": "node .husky/install.mjs",
  }
}
```

> ### 🧐 Caution
>
> 1. After installation, **Husky** creates an internal folder `_` inside `.husky/` that contains bootstrap scripts used
>    by all Git hooks. If this folder is missing, Husky is likely not correctly installed — you may need to manually run:
>
> ```shell
> pnpm prepare
> ```
>
> 2. If your package manager doesn’t support `prepare` (e.g., **Yarn 2+** without nodeLinker=node-modules), use the
>    `postinstall` script instead:
>
> ```json
> {
>   "scripts": {
>     "postinstall": "node .husky/install.mjs"
>   }
> }
> ```

------------


## 🛠️ Manage Git Hooks [🔺](#-husky)

### 🔧️ Add a Hook

Each Git hook in Husky is defined by a **shell script** placed in the `.husky/` folder. The file name must **match the
Git hook name** (e.g., `pre-commit`, `pre-push`).

When the corresponding Git event occurs, Husky executes the commands defined in that hook file.

👉 _See [Hook Scripts](#-hook-scripts) for supported script types and advanced usage._

📗 **Example:** _Hook Files_

```shell
# (📍 /.husky/pre-commit)
pnpm lint
pnpm format


# (📍 /.husky/pre-push)
pnpm test
```


### 🚫 Skip Git Hooks

In certain situations (e.g., emergency fixes, CI pipelines, or debugging), you may need to temporarily bypass Husky
hooks.

> ### 🧐 Caution
>
> Skipping hooks **bypasses automated checks** such as linting, formatting, and commit validation. Use this only when
> necessary.

Below are common ways to skip hook execution:

##### 🟢 <u>Skip Hooks in Git Command</u>

You can bypass Git hooks by using the **ignore verification flag** when running Git commands.

> ### 📘 Syntax
>
> ```shell
> git <command> -n
> ```
>
> 📙 `-n`/`--no-verify` — Skip Git hooks for the current command.

📗 **Example:**

```shell
git commit -m "hotfix: quick patch" -n
```

##### 🟢 <u>Skip Hooks via Environment Variable</u>

Husky can be disabled by setting the `HUSKY=0` environment variable.

> ### 📘 Syntax
>
> ```shell
> # Disable hooks for a single command
> HUSKY=0 git <command>
>
> # Disable hooks for multiple commands
> export HUSKY=0  # Disables all Git hooks
> git <command>
> git <command>
> unset HUSKY     # Re-enables hooks
> ```

📗 **Example:**

```shell
# Skip hook for a single command
HUSKY=0 git commit -m "skip hooks"

# Skip hooks for multiple commands
export HUSKY=0
git commit -m "skip hooks"
git push
unset HUSKY
```

##### 🟢 <u>Disable Husky Globally</u>

You can also disable Husky globally by setting the environment variable in your **shell configuration** or **Husky
initialization** file. Common configuration files include:
  - `~/.config/husky/init.sh`
  - `~/.bashrc`
  - `~/.zshrc`

📗 **Example:** _Global Configuration_

```shell
# (🖥️ ~/.config/husky/init.sh)

export HUSKY=0
```

This disables Husky hooks globally for your user environment.

##### 🟢 <u>Disable Husky in CI Environments</u>

In many CI systems, Husky hooks are unnecessary because validation tasks are already handled by the CI pipeline.

You can disable Husky by setting the environment variable in your CI configuration.

📗 **Example:** _Direct CI Command_

```shell
HUSKY=0 pnpm install
```

Or configure the environment variable directly in the CI settings.

📗 **Example:** _In GitHub Actions_

```yaml
# (📍 github-action.yaml)
env:
  HUSKY: 0
```

------------


## 🌊 Typical Workflow [🔺](#-husky)

Husky integrates with **Git hooks** to automate tasks during the development workflow. Below are several common
scenarios where Husky helps enforce standards and streamline team workflows.

> ### 💼 Common Use Cases
>
> Husky is commonly used to automate checks and tasks during Git operations. Typical use cases include:
>   - Code quality checks — run linters and formatters before committing code (e.g., `eslint`, `prettier`, `stylelint`).
>   - Run tasks on staged files only — integrate with `lint-staged` to improve performance.
>   - Validate commit messages — enforce commit conventions using `commitlint`.
>   - Run tests before pushing code — **prevent broken builds** from entering the repository.
>   - Install dependencies after pull updates — **ensure new dependencies are installed** automatically when changes are
>     pulled from the repository.
>   - Running project setup or maintenance scripts — execute tasks such as database migrations, cleanup scripts, or i18n
>     generation.


### 🔍 Validations

Commit validation runs automatically as part of the Git commit workflow.

Typical flow:

① Stage changes:

```shell
git add .
```

② Create a commit:

```shell
git commit -m "your message"
```

③ Husky triggers the configured **commit hooks** (i.e. `pre-commit`, `prepare-commit-msg`, `commit-msg`).
  - Depending on your setup, these hooks may run tasks such as:
    + **Linting** and **formatting** staged files (via `lint-staged`).
    + **Validating commit messages** (via `commitlint`).
    + Running additional project checks.
  - ❌ If any validation fails, the commit process will stop until the issue is resolved.

④ Push the commit to the remote repository:

```shell
git push
```

⑤ Husky triggers the configured **push hooks** (i.e. `pre-push`).
  - Some projects configure `pre-push` hooks to run additional checks, such as:
    + **Running tests** (e.g. unit tests, integration tests, e2e tests).
    + **Validating builds**.
  - ❌ If any validation fails, the push process will stop until the issue is resolved.

> ### 🧪 Test Hooks
>
> To verify that a hook is working correctly, you can temporarily add `exit 1` inside the hook file to **abort** the Git
> command.
>
> 📗 **Example:** _Test pre-commit Hook_
>
> ```shell
> # (📍 /.husky/pre-commit)
>
> echo "Testing pre-commit hook"
> exit 1
> ```
>
> Then run a Git command that triggers the hook:
>
> ```shell
> git commit -m "test hook"
> # - 📋 Result: (no commit created) -
> > Testing pre-commit hook
> > husky - pre-commit script failed (code 1)
> ```


### 🦾 Automation Tasks

Husky can also automate project setup or maintenance tasks during common Git operations.
This helps ensure the development environment stays consistent across the team.

Typical automation scenarios include:

##### 🟡 <u>After Pulling Updates</u>

When pulling changes from the repository, Husky can trigger hooks such as `post-merge` or `post-checkout` to run setup
tasks automatically.

Typical flow:

① Pull code from repo:

```shell
git pull
```

② Husky triggers `post-merge` / `post-checkout` hooks.
  - 📗 **Example tasks:**
    + Install newly added dependencies.
    + Run database migrations.
    + Synchronize generated files.
    + Update project assets.

##### 🟡 <u>Before / After Commit</u>

Automation tasks can also run before or after committing code to maintain project resources.

Typical workflow:

① Create a commit:

```shell
git commit -m "update feature"
```

② Husky triggers configured commit hooks (e.g. `pre-commit`, `post-commit`) and runs automation scripts.
  - 📗 **Example tasks:**
    + Generate or update i18n translation files
    + Regenerate API clients or schemas
    + Run project cleanup scripts
    + Update code indexes or metadata

------------


## 🧱 Hook Scripts [🔺](#-husky)

### 💠 Basic Hook Scripts

A hook file contains the commands that Husky executes when the corresponding Git event is triggered. In most cases, a
hook simply runs one or more commands to validate code, run checks, or automate tasks.

```shell
# (📍 /.husky/<hook-file>)

# -- Put your NodeJS code here --
# ... 🧑‍💻
```

Hook scripts can run:
  - **Project scripts** defined in `package.json` > `scripts`.\
    (_e.g., `pnpm lint`, `pnpm build`, `pnpm test`_)
  - **Package manager commands**.\
    (_e.g., `pnpm install`, `pnpm exec`, `pnpx`_)
  - **CLI tools** from installed dependencies.\
    (_e.g., `tsc`, `eslint`, `jest`_)
  - Standard **shell commands**.\
    (e.g., `git`, `node`, `echo`)


### 🚀 Run NodeJS Scripts in Hooks

To run JavaScript or TypeScript logic inside your hook:

① Create a script file in `scripts/`:

```js
// (📍 /scripts/<script-file>.(mjs|ts))

// -- Put your NodeJS code here --
// ... 🧑‍💻
```

② Call it in your hook:

```shell
# (📍 /.husky/<hook-file>)

# -- For .mjs or .js --
node scripts/<script-file>.mjs

# -- For .ts (requires `node-ts` or ts-node setup) --
node-ts scripts/<script-file>.ts
```

Alternatively, add it to `package.json` and use pnpm for cleaner commands:

```json5
// (📍 /package.json)

{
  "scripts": {
    // -- For .mjs or .js --
    "<js-script>": "node scripts/<script-file>.mjs",

    // -- For .ts (requires `node-ts` or ts-node setup) --
    "<ts-script>": "node scripts/<script-file>.ts",
  }
}
```

Then in your hook:

```shell
# (📍 /.husky/<hook-file>)

pnpm <script>
```


### 🖥️ Use Bash Scripts for Complex Logic

Hook scripts must be **POSIX-compliant** to ensure they work across all platforms, especially for **teammates on
Windows**, where **bash may not be available** by default.

If your hook logic includes logic like `if/else`, `for/in`, or other Bash-specific syntax, it’s better to offload logic
to a **bash script**. This improves compatibility (e.g. for Windows users) and keeps hooks readable.

① Create a bash script file:

```shell
# (📍 /.husky/scripts/<script-file>.sh)
#!/usr/bin/env bash

# -- Put your bash script here --
# ... 🧑‍💻
```

② Call it from your hook file:

```shell
# (📍 /.husky/<hook-file>)

bash .husky/scripts/<script-file>.sh
```

**Alternatively**, if your team doesn’t need to support Windows, you can embed Bash scripts directly:

```shell
# (📍 /.husky/post-merge)

bash << EOF
# -- Put your bash script here --
# ... 🧑‍💻
EOF
```

------------


## ♻️ Common Hooks [🔺](#-husky)

Git provides many hooks that can run at different stages of the development workflow. Below are some of the most
commonly used hooks in Husky.

| Hook                 | When                                           | Triggered By Command    | Usage Example                                                               |
|----------------------|------------------------------------------------|-------------------------|-----------------------------------------------------------------------------|
| `pre-commit`         | Run **before committing code**                 | `git commit`            | Lint code, check types, format files, or run tests or auto-generation tasks |
| `prepare-commit-msg` | Run **before the commit message editor opens** | `git commit`            | Auto-generate or prepend commit messages (e.g., issue ID)                   |
| `commit-msg`         | Run **after commit message is created**        | `git commit`            | Validate message format (`commitlint`)                                      |
| `pre-push`           | Run **before pushing to remote**               | `git push`              | Run tests, validate build output, or check for incomplete TODOs             |
| `post-merge`         | Run **after a successful merge**               | `git merge`, `git pull` | Reinstall dependencies, run migrations, or refresh builds                   |
| `post-checkout`      | Run **after checking out a branch or commit**  | `git checkout`          | Rebuild environment, regenerate files, or clear caches                      |
| `post-commit`        | Run **after a commit is completed**            | `git commit`            | Run cleanup scripts, log activity, or trigger CI tasks                      |

👉 _Check more hooks in [Git Hook List](https://git-scm.com/docs/githooks#_hooks) and [Client-Side Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks#_client_side_hooks)._

------------


## 🗃 Config Files and Folders [🔺](#-husky)

When you initialize **Husky**, it typically creates the following structure:

| File / Folder                                             | Description                                                                                         |
|-----------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| [`.husky/`](../../../../../.husky)                        | Root folder containing all Git hook scripts                                                         |
| [`.husky/<git-hook>`](../../../../../.husky/pre-commit)   | Individual **Git hook files** that run specific commands                                            |
| [`.husky/install.mjs`](../../../../../.husky/install.mjs) | **Re-installs Husky hooks** after dependencies are installed (used in `prepare` script or CI setup) |
| [`.husky/_/`](../../../../../.husky/_)                    | Auto-generated internal folder                                                                      |

************

[⤴️ Back: **Code Quality & Linting Tools**](../quality-tools/-intro.md)\
                                                         [Next: **Lint-Staged** ▶️](lint-staged.md)
