# KM Express Template

km-express-template is a template for a basic Express application. It can be used as a starting
point for a new Express application.


--------

## 📖 Table of Contents

- 📋 [**Specifications**](#-specifications-)
- 🔰 [**Getting Started**](#-getting-started-)
- ⚡ [**Scripts**](#-scripts-)
- 📕 [**Other Guides**](#-other-guides-)


--------

## 📋 Specifications [🔝](#-table-of-contents)

### 🌴 Environment

| Specification |                          Version                          | Links                                                                                                                                             |
|---------------|:---------------------------------------------------------:|---------------------------------------------------------------------------------------------------------------------------------------------------|
| Node          | [`^22.13`](https://nodejs.org/en/about/previous-releases) | [Docs](https://nodejs.org/docs/latest-v22.x/api/documentation.html) - [Learn](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs) |
| Yarn          |    [`^4.6`](https://github.com/yarnpkg/berry/releases)    | [Docs](https://yarnpkg.com/getting-started) - [CLI](https://yarnpkg.com/cli)                                                                      |

### 📦 Application

| Specification |                         Version                         | Links                                                                                                   |
|---------------|:-------------------------------------------------------:|---------------------------------------------------------------------------------------------------------|
| Typescript    |   [`^5.7`](https://www.npmjs.com/package/typescript)    | [Docs](https://eslint.org/docs/latest/)                                                                 |
| Express       | [`^5.0`](https://www.npmjs.com/package/express/v/5.0.1) | [Learn](https://expressjs.com/en/starter/installing.html) - [API](https://expressjs.com/en/5x/api.html) |
| Prettier      |    [`^3.4`](https://www.npmjs.com/package/prettier)     | [Docs](https://prettier.io/docs/)                                                                       |
| ESLint        |     [`^9.18`](https://www.npmjs.com/package/eslint)     | [Docs](https://eslint.org/docs/latest/)                                                                 |


--------

## 🔰 Getting Started [🔝](#-table-of-contents)

### ✅ Prerequisites

Before installing, ensure you have the [required environment specifications](#environment) on your
system.


### 🌱 Install

1. Clone the project from git:

```sh
git clone https://github.com/joephankm/km-express-template.git your-project
cd your-project
```

2. Install dependencies:

```sh
yarn install
```

3. Create local development environment file (optional):

```sh
cp .env.development .env.development.local
vi .env.development.local
```

Custom variables in `.env.local` file for local-specific configurations. Avoid unnecessary
variables to inherit future updates from the default environment. Check [`.env`](.env) file for
full list of environment variables.


### 🚀 Run the Project

1. Update dependencies and migrate DB

```sh
yarn predev
```

2. Start node server for development

```sh
yarn start
```


--------

## ⚡ Scripts [🔝](#-table-of-contents)

### 🛠 Development Scripts

These scripts are used for running and managing the **development environment** on a local machine.

| Script              | Description                                                                    |
|---------------------|--------------------------------------------------------------------------------|
| `yarn start`        | Starts the **development server**                                              |
| `yarn predev`       | Prepares the environment for development                                       |
| `yarn prettier`     | Checks code formatting using `Prettier`                                        |
| `yarn prettier:fix` | Automatically formats code with `Prettier`                                     |
| `yarn lint`         | Runs the `Linter` to check for code issues                                     |
| `yarn postinstall`  | Automatically initiates `husky` for development after `yarn install` completes |

📝 **Note:** `predev` is similar to `prerun`, but **without the build step**, used for **development**.

### 🪂 Deployment Scripts

These scripts are used for running the application in **production environments** or **CI/CD pipelines**.

| Script                  | Description                                                                          |
|-------------------------|--------------------------------------------------------------------------------------|
| `yarn build`            | Builds the application for deployment                                                |
| `yarn prerun`           | Prepares and builds the application (for **DEV** environment, used for testing only) |
| `yarn server`           | Starts the **production server** (for **DEV** environment, used for testing only)    |
| `yarn prerun:{APP_ENV}` | Prepares and builds the application for `{APP_ENV}` environment on the server        |
| `yarn server:{APP_ENV}` | Starts the **production server** for `{APP_ENV}` environment on the server           |

💡 **Tip:** Replace `{APP_ENV}` with the target environment, such as `staging` or `production`, e.g.,
```sh
yarn prerun:production
yarn server:production
```

📝 **Note:** `prerun` scripts **prepare** the environment by:
- **Installing dependencies** (`yarn install`)
- **Running database migrations**
- **Building the application**

--------

## 📕 Other Guides [🔝](#-table-of-contents)

1. Initialize project, see [create express app guide](./docs/installations/create-express-app.md)
2. Config Prettier, see [config linter guide](./docs/installations/config-linter.md)
