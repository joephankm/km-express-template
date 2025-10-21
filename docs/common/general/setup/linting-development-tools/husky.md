# 🐶 ![Prettier](../../_assets/icons/prettier-28.png) ![Prettier](../../_assets/icons/yarn-22.png) Husky

<p align="right"><em>&lt;Last updated: 2025-10-20&gt;</em></p>

**Husky** lets you automate and manage **Git hooks** directly from your project, so you can run scripts like linters,
type checks, or test runners **before a commit or push happens**. It’s widely used to improve code quality and enforce
team conventions automatically.

🔗 **Links:** _[NPM](https://www.npmjs.com/package/husky)_
            - _[Docs](https://typicode.github.io/husky/)_
            - _[Repository](https://github.com/typicode/husky)_

> ### 🗂️ Contents
>   - [🧠 Common Use Cases](#-common-use-cases-)
>   - [🌱 Installation](#-installation-)
>   - [⚙️ Configure Git Hooks with Husky](#-configure-git-hooks-with-husky-)
>   - [🗃 Config Files and Folders](#-config-files-and-folders-)

************

[⤴️ Back: **Code Quality & Linting Tools**](-intro.md)\
[◀️ Previous: **ESLint**](eslint.md)

************

## 🧠 Common Use Cases [🔺](#-husky)

It’s commonly used to enforce tasks before committing or pushing code, such as:
  - Running ESLint or Prettier checks automatically
  - Preventing bad commits
  - Running tests before push
  - Validating commit messages (e.g., with `commitlint`)
  - Installing dependencies after pull
  - Running project setup or maintenance scripts (e.g., database migrations, cleanup tasks, i18n generation)

------------


## 🌱 Installation [🔺](#-husky)

### 📦 Install Husky Package

Add **Husky** as a development dependency:

```shell
pnpm add -D husky
```

Then initialize **Husky** to set up **Git hooks** and create a default `pre-commit` hook:

```shell
pnpm exec husky init
```

> 📙 This command:
>   - Sets up Git hook support by configuring `core.hooksPath`
>   - Creates a `.husky/` folder with a sample `pre-commit` hook
>   - Adds a `prepare` script to your `package.json`

### 🔁 Enable Husky Automatically

By default, **Husky** only installs locally when you run `husky init`. To ensure that **every developer** on your team
installs hooks automatically:

① Create a custom install script in `.husky` folder:

```js
// (📍 /.husky/install.mjs)

// Skip Husky install in production and CI
if (process.env.NODE_ENV === 'production' || process.env.CI === 'true') {
  process.exit(0)
}

const husky = (await import('husky')).default
console.log(husky())
```

② Add a `prepare` npm hook to `package.json`:

```json5
// (📍 /package.json)

{
  "scripts": {
    "prepare": "node .husky/install.mjs",
  }
}
```

> ### 📕 _Notes_
>
> - After installation, **Husky** creates an internal folder `_` inside `.husky/` that contains bootstrap scripts used
>   by all Git hooks. If this folder is missing, Husky is likely not correctly installed — you may need to manually run:
>
> ```shell
> pnpm prepare
> ```
>
> - If your package manager doesn’t support `prepare` (e.g., **Yarn 2+** without nodeLinker=node-modules), use the
>  `postinstall` script instead:
>
> ```json
> {
>   "scripts": {
>     "postinstall": "node .husky/install.mjs"
>   }
> }
> ```

------------


## ⚙️ Configure Git Hooks with Husky [🔺](#-husky)

### 🔧 Basic Hook Setup

Each Git hook in Husky is defined by a **shell script** placed in the `.husky/` folder. The file name must **match the
Git hook name** (e.g., `pre-commit`, `pre-push`, etc.).

Hook files can contain:
  - Commands defined in `package.json > scripts` (e.g. `pnpm lint`, `pnpm build`, `pnpm test`)
  - Package manager commands (e.g. `pnpm install`, `pnpm exec`, `pnpx`)
  - Installed package CLI (e.g. `tsc`, `eslint`, `jest`)
  - Standard shell commands (e.g., `git`, `node`, `echo`)

📗 Example: _Hook Files_

```sh
# (📍 /.husky/pre-commit)
pnpm lint
pnpm format


# (📍 /.husky/pre-push)
pnpm test
```


### 🚀 Run NodeJS Scripts in Hooks

To run JavaScript or TypeScript logic inside your hook:

① Create a script file in `scripts/`:

```js
// (📍 /scripts/<script-file>.(mjs|ts))

// -- Put your NodeJS code here --
// ... 🧑‍💻
```

② Call it in your hook:

```sh
# (📍 /.husky/<hook-file>)

# -- For .mjs or .js --
node /scripts/<script-file>.mjs

# -- For .ts (requires `node-ts` or ts-node setup) --
node-ts /scripts/<script-file>.ts
```

Alternatively, add it to `package.json` and use pnpm for cleaner commands:

```json5
// (📍 /package.json)
```

Then in your hook:

```sh
# (📍 /.husky/<hook-file>)

pnpm <script>
```


### 🐚 Use Bash Scripts for Complex Logic

Hook scripts must be **POSIX-compliant** to ensure they work across all platforms, especially for **teammates on
Windows**, where **bash may not be available** by default.

If your hook logic includes logic like `if/else`, `for/in`, or other Bash-specific syntax, it’s better to offload logic
to a **bash script**. This improves compatibility (e.g. for Windows users) and keeps hooks readable.

① Create a bash script file:

```sh
# (📍 /.husky/scripts/<script-file>.sh)
#!/usr/bin/env bash

# -- Put your bash script here --
# ... 🧑‍💻
```

② Call it from your hook file:

```sh
# (📍 /.husky/<hook-file>)

bash .husky/scripts/<script-file>.sh
```

**Alternatively**, if your team doesn’t need to support Windows, you can embed Bash scripts directly:

```sh
# (📍 /.husky/post-merge)

bash << EOF
# -- Put your bash script here --
# ... 🧑‍💻
EOF
```

------------


## 🗃 Config Files and Folders [🔺](#-husky)

### 🗄 File Structure

When you initialize **Husky**, it typically creates the following structure:

| File / Folder                                             | Description                                                                                         |
|-----------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| [`.husky/`](../../../../../.husky)                        | Root folder containing all Git hook scripts                                                         |
| [`.husky/<git-hook>`](../../../../../.husky/pre-commit)   | Individual **Git hook files** that run specific commands                                            |
| [`.husky/install.mjs`](../../../../../.husky/install.mjs) | **Re-installs Husky hooks** after dependencies are installed (used in `prepare` script or CI setup) |
| [`.husky/_/`](../../../../../.husky/_)                    | Auto-generated internal folder                                                                      |


### ♻️ Common Hook Files

| Hook File                   | When                                                       | Usage Example                                                   |
|-----------------------------|------------------------------------------------------------|-----------------------------------------------------------------|
| `.husky/pre-commit`         | Run **before committing code** (`git commit`)              | Lint code, check types, format files, or run tests              |
| `.husky/pre-push`           | Run **before pushing to remote** (`git push`)              | Run tests, validate build output, or check for incomplete TODOs |
| `.husky/commit-msg`         | Run **after commit message is created**                    | Validate message format (`commitlint`)                          |
| `.husky/prepare-commit-msg` | Run **before the commit message editor opens**             | Auto-generate or prepend commit messages (e.g., issue ID)       |
| `.husky/post-merge`         | Run **after a successful merge** (`git merge`, `git pull`) | Reinstall dependencies, run migrations, or refresh builds       |
| `.husky/post-checkout`      | Run **after checking out a branch or commit**              | Rebuild environment, regenerate files, or clear caches          |
| `.husky/post-commit`        | Run **after a commit is completed**                        | Send notifications, log activity, or trigger CI tasks           |

👉 _Check more hooks in [Git Hook List](https://git-scm.com/docs/githooks#_hooks) and [Client-Side Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks#_client_side_hooks)_

************

[⤴️ Back: **Code Quality & Linting Tools**](-intro.md)\
[◀️ Previous: **ESLint**](eslint.md)
