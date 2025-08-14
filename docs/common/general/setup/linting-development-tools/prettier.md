# ![Prettier](../../_assets/icons/prettier-28.png) Prettier

<p align="right"><em>&lt;Last updated: 2025-07-04&gt;</em></p>

**Prettier** is an opinionated code formatter that enforces a **consistent code style** by **automatically reprinting
code** according to its **predefined formatting rules**.

🔗 **Links:** _[NPM](https://www.npmjs.com/package/prettier)_
            - _[Docs](https://prettier.io/docs/)_
            - _[Format Options](https://prettier.io/docs/options)_
            - _[IDE Integration](https://prettier.io/docs/editors)_
            - _[Repository](https://github.com/prettier/prettier)_

> ### 🗂️ Contents
>   - [🌱 Installation](#-installation-)
>   - [🚀 Commands](#-commands-)
>   - [⚙️ Configure Prettier](#-configure-prettier-)
>   - [🗃 Config Files](#-config-files-)

************

[⤴️ Back: **Code Quality & Linting Tools**](-intro.md)

************


## 🌱 Installation [🔺](#-prettier)

Install **Prettier** as a development dependency:

```shell
pnpm add -D prettier
```

------------


## 🚀 Commands [🔺](#-prettier)

### 🔍 Validate Code Format

Check whether your files follow **Prettier** formatting rules:

```shell
prettier --check './**/*.{ts,js,cjs,mjs,json}'
```

> 📙 `--check` — Outputs a list of unformatted files without making any changes.

### 🛠️ Format Code

Automatically format your code based on **Prettier** formatting rules:

```shell
prettier --write './**/*.{ts,js,cjs,mjs,json}
```

> 📙 `--write` — Overwrites unformatted files with **Prettier**-formatted code.

👉 _See more command options in the [Prettier CLI docs](https://prettier.io/docs/cli)_

------------


## ⚙️ Configure Prettier [🔺](#-prettier)

### 🔧 Setting Up Prettier Config

To define your project’s formatting rules, create one of the following config files in the project root:
  - JavaScript config: (_**recommended** for flexibility_) `prettier.config.(m|c)js` or `.prettierrc.(m|c)js`
  - Static config files: `.prettierrc` or `.prettierrc.(json|yaml|toml)`

📗 Example:

```js
// (📍 /prettier.config.mjs)

/**
 * @see https://prettier.io/docs/options
 * @type {import('prettier').Config}
 */
const config = {
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  tabWidth: 2,
};

export default config;
```

👉 Learn more config formats at [Prettier Configuration docs](https://prettier.io/docs/configuration)


### 🎛️️ Format Options

Prettier supports several formatting options to fine-tune how your code is printed. Below are the most common ones:

| Option            | Description                                                                       |              Value              |  Default   |
|-------------------|-----------------------------------------------------------------------------------|:-------------------------------:|:----------:|
| `printWidth`      | The maximum line length before **Prettier** wraps content                         |            `number`             |    `80`    |
| `useTabs`         | Use tabs instead of spaces for indentation                                        |            `boolean`            |  `false`   |
| `tabWidth`        | Number of spaces per indentation level (if `useTabs` is `false`)                  |            `number`             |    `2`     |
| `singleQuote`     | Use single quotes (`'`) instead of double quotes (`"`) for strings                |            `boolean`            |  `false`   |
| `semi`            | Add semicolons (`;`) at the end of statements                                     |            `boolean`            |   `true`   |
| `bracketSpacing`  | Print spaces between brackets in object literals (`{ foo: bar }` vs `{foo: bar}`) |            `boolean`            |   `true`   |
| `trailingComma`   | Add trailing commas (`,`) for multi-line objects, arrays, or parameters           |    `'none'`/`'es5'`/`'all'`     |  `'all'`   |
| `endOfLine`       | Specify the line ending character style                                           | `'lf'`/`'crlf'`/`'cr'`/`'auto'` |   `'lf'`   |
| `arrowParens`     | Include parentheses (`()`) around a sole arrow function parameter                 |      `'always'`/`'avoid'`       | `'always'` |

👉 _See full details in the [Prettier Format Option docs](https://prettier.io/docs/options)_

------------


## 🗃 Config Files [🔺](#-prettier)

Prettier supports configuration through dedicated files to help maintain consistent formatting across your project.

| File                                                        | Description                                         |
|-------------------------------------------------------------|-----------------------------------------------------|
| [`prettier.config.mjs`](../../../../../prettier.config.mjs) | **Prettier** formatting rules (_in **ESM** format_) |
| [`.prettierignore`](../../../../../.prettierignore)         | Ignore Files and Folders for **Prettier**           |


************

[⤴️ Back: **Code Quality & Linting Tools**](-intro.md)
