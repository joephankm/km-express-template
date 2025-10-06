# ![Prettier](../_static/icons/prettier-28.png) Prettier

<p align="right"><em>&lt;Last updated: 2025-07-04&gt;</em></p>

**Prettier** is an opinionated code formatter that enforces a **consistent code style** by **automatically reprinting
code** according to its **predefined formatting rules**.

🔗 **Links:** _[NPM](https://www.npmjs.com/package/prettier)_
            - _[Docs](https://prettier.io/docs/)_
            - _[Format Options](https://prettier.io/docs/options)_
            - _[IDE Integration](https://prettier.io/docs/editors)_
            - _[Repository](https://github.com/prettier/prettier)_

> ### 🗂️ Contents
>   - 🌱 [Installation](#-installation-)
>   - 🕹 [Usage](#-usage-)
>   - ⚙️ [Configuration](#-configuration-)
>   - 🧱 [Format Options](#-format-options-)
>   - 📝 [Comment Directives](#-comment-directives-)
>   - ⚡️ [Command Cheatsheet](#-command-cheatsheet-)
>   - 🗃 [Config Files](#-config-files-)

************

[⤴️ Back: **Code Quality & Linting Tools**](-intro.md)\
                                                            [Next: **ESLint** ▶️](eslint.md)

************


## 🌱 Installation [🔺](#-prettier)

Install **Prettier** as a development dependency:

```shell
pnpm add -D prettier
```

------------


## 🕹 Usage [🔺](#-prettier)

### 🔍 Validate Code Format

Check whether your files follow Prettier formatting rules:

```shell
pnpx prettier --check './**/*.{ts,js,cjs,mjs,json}'

# --- OR in `package.json` ---
# "scripts": {
#   "format:check": "prettier --check './**/*.{ts,js,cjs,mjs,json}'"
# }
```

📙 `--check` — Outputs a list of unformatted files without making any changes.


### 🛠️ Format Code

Automatically format your code based on Prettier formatting rules:

```shell
pnpx prettier --write './**/*.{ts,js,cjs,mjs,json}'

# --- OR in `package.json` ---
# "scripts": {
#   "format": "prettier --write './**/*.{ts,js,cjs,mjs,json}'"
# }
```

📙 `--write` — Overwrites unformatted files with **Prettier**-formatted code.

👉 _See more command options in the [Prettier CLI docs](https://prettier.io/docs/cli)._

------------


## ⚙️ Configuration [🔺](#-prettier)

**Prettier** can be configured at the project level to control how code is formatted and what should be excluded from
formatting.


### 🛠️ Configure Rules

To define your project’s formatting rules, create one of the following config files in the project root:
  - JavaScript config: (_**recommended** for flexibility_) `prettier.config.(m|c)js` or `.prettierrc.(m|c)js`.
  - Static config files: `.prettierrc` or `.prettierrc.(json|yaml|toml)`.

📗 **Example:**

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

👉 _Learn more config formats at [Prettier Configuration docs](https://prettier.io/docs/configuration)._


### 🚫 Ignore Files

Use `.prettierignore` to **exclude entire files or directories** from Prettier formatting. Prettier uses the **same
ignore pattern rules as `.gitignore`** and, by default, already ignores **version control files** (e.g., `.git`) and
**dependency folders** (e.g., `node_modules/`).

Common use cases include:
  - Generated or compiled files.
  - Lock files and build artifacts.
  - Binary or non-text assets.
  - Files with intentionally manual formatting.

📗 **Example:**

```gitignore
# Build output
dist/
build/
coverage/

# Files with manual formatting
**/*.html
*.md
```

👉 _See the official [Prettier Ignore docs](https://prettier.io/docs/ignore.html) for more details._

------------


## 🧱 Format Options [🔺](#-prettier)

### 💠 Common Options

Prettier supports several formatting options to fine-tune how your code is printed. Below are the most common ones:

| Option            | Description                                                                           |              Value              |  Default   |
|-------------------|---------------------------------------------------------------------------------------|:-------------------------------:|:----------:|
| `printWidth`      | The **maximum line length** before Prettier wraps content                             |            `number`             |    `80`    |
| `useTabs`         | Use **tabs** instead of spaces for indentation                                        |            `boolean`            |  `false`   |
| `tabWidth`        | **Number of spaces** per indentation level (if `useTabs` is `false`)                  |            `number`             |    `2`     |
| `singleQuote`     | **Use single quotes (`'`)** instead of double quotes (`"`) for strings                |            `boolean`            |  `false`   |
| `semi`            | **Add semicolons (`;`)** at the end of statements                                     |            `boolean`            |   `true`   |
| `bracketSpacing`  | Print **spaces between brackets** in object literals (`{ foo: bar }` vs `{foo: bar}`) |            `boolean`            |   `true`   |
| `trailingComma`   | **Add trailing commas (`,`)** for multi-line objects, arrays, or parameters           |    `'none'`/`'es5'`/`'all'`     |  `'all'`   |
| `endOfLine`       | Specify the **line ending character** style                                           | `'lf'`/`'crlf'`/`'cr'`/`'auto'` |   `'lf'`   |
| `arrowParens`     | **Include parentheses (`()`)** around a sole arrow function parameter                 |      `'always'`/`'avoid'`       | `'always'` |


### 🎨 FrontEnd Options

Prettier also provides **frontend-specific** options that affect how JSX, HTML, and other UI-related code is formatted:

| Option                       | Description                                                                                                                                      |           Value               | Default  |
|------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|:-----------------------------:|:--------:|
| `jsxSingleQuote`             | **Use single quotes (`'`)** instead of double quotes (`"`) in JSX attributes                                                                     |           `boolean`           | `false`  |
| `bracketSameLine`            | **Put the closing `>`** of a multiline HTML/JSX element on the last prop                                                                         |           `boolean`           | `false`  |
| `singleAttributePerLine`     | Force **each HTML/JSX attribute** onto its own line                                                                                              |           `boolean`           | `false`  |
| `htmlWhitespaceSensitivity`  | Control how Prettier **preserves or normalizes whitespace** in HTML content                                                                      | `'css'`/`'strict'`/`'ignore'` | `'css'`  |
| `embeddedLanguageFormatting` | **Format embedded code** inside HTML tags (e.g., `<style>`, `<script>`) and suported tagged template literal (e.g., CSS in **styled-component**) |      `'auto'` / `'off'`       | `'auto'` |

👉 _See full details in the [Prettier Format Option docs](https://prettier.io/docs/options)._

------------


## 📝 Comment Directives [🔺](#-prettier)

In addition to ignoring entire files, Prettier supports **inline comment directives** to skip formatting for **specific
lines or blocks**. Use the `// prettier-ignore` comment to tell Prettier to skip formatting the **next syntax node** in
the **abstract syntax tree (AST)**.

📗 **Example:** _JavaScript_

```js
// prettier-ignore
const array = [
  1, 2, 3
];
```

📗 **Example:** _JSX_

```jsx
<div>
  {/* prettier-ignore */}
  <button
    type="button"   disabled={false} />
</div>
```

📗 **Example:** _HTML (HTML, Vue, Angular, Liquid, etc.)_

```html
<!-- prettier-ignore -->
<div class="card"
  data-role="primary">
  Sample content</div>


<!-- prettier-ignore-attribute -->
<div class="card"
  data-role="primary">Sample content</div>

<!-- prettier-ignore-attribute style -->
<div
  style="color:     red;    padding:   8px;"
  data-state="active"
>Sample content</div>
```

📗 **Example:** _CSS_

```css
/* prettier-ignore */
.container
  {

  }
```

📗 **Example:** _MarkDown (`.md`)_

```md
<!-- prettier-ignore -->
Keep   this    spacing   exactly   as   written
```

------------


## ⚡️ Command Cheatsheet [🔺](#-prettier)

Here are the most commonly used Prettier CLI commands:

| Command                                 | Description                                                               | Alias                     | 📗 Example                                 |
|-----------------------------------------|---------------------------------------------------------------------------|---------------------------|--------------------------------------------|
| `prettier --check '<pattern>'`          | Check files for formatting issues **without modifying** them              |                           | `prettier --check './**/*.{ts,js,json}'`   |
| `prettier --write '<pattern>'`          | **Format and overwrite** matching files in place                          |                           | `prettier --write './**/*.{ts,js,json}'`   |
| `prettier --list-different '<pattern>'` | Print filenames of files that **differ** from Prettier formatting         | `prettier -l '<pattern>'` | `prettier --list-different './**/*.ts'`    |
| `prettier --find-config-path <file>`    | Display the path of the **config file** resolved for the given input file |                           | `prettier --find-config-path src/index.ts` |

Common CLI options supported across `prettier` commands:

| Option                  | Description                                                     | 📗 Example                                                 |
|-------------------------|-----------------------------------------------------------------|------------------------------------------------------------|
| `--config <path>`       | Use a **specific config file** instead of the auto-detected one | `prettier --write '**/*.ts' --config prettier.config.mjs`  |
| `--no-config`           | **Skip** config file lookup and use Prettier defaults           |                                                            |
| `--ignore-path <file>`  | Use a **custom ignore file** instead of `.prettierignore`       | `prettier --write '**/*.ts' --ignore-path .prettierignore` |
| `--log-level <level>`   | Set **logging verbosity** (`silent`, `error`, `warn`, `log`)    | `prettier --check '**/*.ts' --log-level warn`              |

👉 _See the full list in the [Prettier CLI docs](https://prettier.io/docs/cli)._

------------


## 🗃 Config Files [🔺](#-prettier)

Prettier supports configuration through dedicated files to help maintain consistent formatting across your project.

| File                                                     | Description                                         |
|----------------------------------------------------------|-----------------------------------------------------|
| [`prettier.config.mjs`](../../../../prettier.config.mjs) | **Prettier** formatting rules (_in **ESM** format_) |
| [`.prettierignore`](../../../../.prettierignore)         | Ignore Files and Folders for **Prettier**           |


************

[⤴️ Back: **Code Quality & Linting Tools**](-intro.md)
                                                            [Next: **ESLint** ▶️](eslint.md)
