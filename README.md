# KM Express Template

**km-express-template** is a template for a **basic Express application**. It can be used as a starting point for a
**new Express application**.

************


## 📋 Specifications

### 🌳 Environment

| Specification |                         Version                          | Links                                                                                                                                             |
|---------------|:--------------------------------------------------------:|---------------------------------------------------------------------------------------------------------------------------------------------------|
| Node          | [`^24.7`](https://nodejs.org/en/about/previous-releases) | [Docs](https://nodejs.org/docs/latest-v24.x/api/documentation.html) - [Learn](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs) |
| PNPM          |      [`^10.15`](https://www.npmjs.com/package/pnpm)      | [Docs](https://pnpm.io/pnpm-cli)                                                                                                                  |

### 📦 Application

| Specification |                      Version                       | Links                                                                                                                                                                                |
|---------------|:--------------------------------------------------:|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Typescript    | [`^5.9`](https://www.npmjs.com/package/typescript) | [Docs](https://eslint.org/docs/latest/) - [Util Types](https://www.typescriptlang.org/docs/handbook/utility-types.html) - [Cheat Sheet](https://www.typescriptlang.org/cheatsheets/) |
| Express       |  [`^5.1`](https://www.npmjs.com/package/express)   | [Learn](https://expressjs.com/en/starter/installing.html) - [API](https://expressjs.com/en/5x/api.html)                                                                              |
| ESLint        |  [`^9.37`](https://www.npmjs.com/package/eslint)   | [Docs](https://eslint.org/docs/latest/) - [CLI](https://eslint.org/docs/latest/use/command-line-interface) - [TypeScript ESLint](https://typescript-eslint.io/getting-started/)      |

------------


## 🔰 Getting Started

### 📚 Setup Guides

Browse the following guides for common setup and usage instructions:

1. Set up the **runtime environment** — 🤘 _Refer to the [Node and Package Manager guide](docs/common/general/setup/node-and-package-manager.md)_
2. Initialize the **Express project** — 🤘 _Follow the [Create Express App guide](docs/common/express/setup/express-app.md#-create-express-app-)_
3. Configure **Linters and Development Tools (Prettier, ESLint, etc.)** — 🤘 _See the [Code Quantity, Linting & Development Tools guide](docs/common/general/setup/linting-development-tools/-intro.md)_

------------


## 🚀 Scripts

### 🛠 Development Scripts

| Script           | Description                           |
|------------------|---------------------------------------|
| `pnpm start`     | Start the **development server**      |
| `pnpm build`     | Build application                     |
| `pnpm format`    | Format code with **Prettier rules**   |
| `pnpm typecheck` | Validate **TypeScript** types         |
| `pnpm lint:es`   | Check code with **ESLint rules**      |
| `pnpm lint`      | Run both **ESLint** and **typecheck** |
