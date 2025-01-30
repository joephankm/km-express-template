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
