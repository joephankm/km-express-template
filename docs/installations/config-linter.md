# Config Linter

--------

## Prettier

Prettier is an opinionated code formatter.

### Install

```
# (TERMINAL)

# Install Prettier
yarn add -D prettier
```

### Config Files

| File                                               | Description                           |
|----------------------------------------------------|---------------------------------------|
| [`prettier.config.mjs`](../../prettier.config.mjs) | Config for Prettier in ESM format     |
| [`.prettierignore`](../../.prettierignore)         | Ignore Files and Folders for Prettier |

### Commands

#### a) Check Prettier:

Verify if the code is formatted correctly with Prettier rules.

```
prettier --check 'src/**/*.{ts,js}' './*.mjs' './**/*.json'
```

#### b) Fix Prettier:

Format the code with Prettier rules.

```
prettier --write 'src/**/*.{ts,js}' './*.mjs' './**/*.json'
```

--------

## ESLint

ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making
code more consistent and avoiding bugs.

### Install

```
# (TERMINAL)

# Install ESLint with installation wizard
yarn create @eslint/config

# Or install manually
yarn add -D eslint
```

### Config Files

| File                                           | Description                           |
|------------------------------------------------|---------------------------------------|
| [`eslint.config.mjs`](../../eslint.config.mjs) | Config for Prettier in ESM format     |

### Integration with Prettier

Use Prettier for code formatting concerns, and linters for code-quality concerns. However, most stylistic rules are
conflicted when using Prettier. To turn off rules that conflict with Prettier, using these pre-made configs:
- [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier)

### Commands

#### a) Check ESLint:

Find errors in the code with ESLint rules.

```
yarn dlx eslint ./src
```

#### b) Fix ESLint:

Fix errors in the code with ESLint rules.

```
yarn dlx eslint ./src --fix
```

Fix ESLint is not recommended because it may lead to unexpected changes in the code. You should only run checking
ESLint to find errors and fix the code manually.
