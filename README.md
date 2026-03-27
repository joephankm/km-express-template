# KM Express Template

**km-express-template** is a template for a **basic Express application**. It can be used as a starting point for a
**new Express application**.

> ### 🗂️ Table of Contents
>   - 📋 [Specifications](#-specifications-)
>   - 🔰 [Getting Started](#-getting-started-)
>   - ⚡️ [Scripts](#-scripts-)

## 📖 References

- 💎 [About This Template](docs/about-this.md)
- 📚 [Read More — Setup & Tool Guides](docs/read-more.md)

************


## 📋 Specifications [🔺](#km-express-template)

### 🌳 Environment

**Runtime, language, and tooling** required to develop, build, and run the project.

| Specification  |                         Version                          | Description                             | Links                                                                                                                                                                                                                               | Internal Guides                                                                                                             |
|----------------|:--------------------------------------------------------:|-----------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| **Node**       | [`24.16`](https://nodejs.org/en/about/previous-releases) | JavaScript runtime & build tooling      | [Docs](https://nodejs.org/docs/latest-v24.x/api/documentation.html) - [Learn](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs) - [Manage Version <sup>**(NVM)**</sup>](https://www.nvmnode.com/guide/usage.html) | [NVM](docs/js-foundation/environment/node-core/nvm.md)                                                                      |
| **PNPM**       |       [`11.3`](https://www.npmjs.com/package/pnpm)       | Fast, disk-efficient package management | [Docs](https://pnpm.io/motivation) - [CLI](https://pnpm.io/cli/add) - [Manage Version <sup>**(Corepack)**</sup>](https://github.com/nodejs/corepack#usage)                                                                          | [PNPM](docs/js-foundation/environment/node-core/pnpm.md) - [Corepack](docs/js-foundation/environment/node-core/corepack.md) |
| **Typescript** |    [`^6.0`](https://www.npmjs.com/package/typescript)    | Type safety & enhanced IDE intellisense | [Docs](https://www.typescriptlang.org/docs/) - [Util Types](https://www.typescriptlang.org/docs/handbook/utility-types.html) - [Cheat Sheet](https://www.typescriptlang.org/cheatsheets/)                                           | [TSC](docs/js-foundation/environment/compilers/tsc.md)                                                                      |


### 🚀 Application

List of the **core libraries and frameworks** used within the application to implement its functionality and structure.

| Package     |                     Version                     | Description                                   | Links                                                                                                  | Internal Guides                                                |
|-------------|:-----------------------------------------------:|-----------------------------------------------|--------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| **Express** | [`^5.2`](https://www.npmjs.com/package/express) | Core web framework for HTTP APIs and services | [Docs](https://expressjs.com/en/starter/installing.html) - [API](https://expressjs.com/en/5x/api.html) | [Setup Express App](docs/backend/express/setup/express-app.md) |


### 🧰 Utilities

**Tools and utility libraries** that support project development and functionality.

| Package     |                     Version                      |   Type    | Description                                  | Links                                                                                                    | Internal Guides                                         |
|-------------|:------------------------------------------------:|:---------:|----------------------------------------------|----------------------------------------------------------------------------------------------------------|---------------------------------------------------------|
| **TS-Node** | [`^10.9`](https://www.npmjs.com/package/ts-node) | _Runtime_ | Execute TypeScript files directly in Node.js | [Docs](https://typestrong.org/ts-node/docs/) - [Options](https://typestrong.org/ts-node/docs/options)    | [TS-Node](docs/js-foundation/server/runtime/ts-node.md) |
| **Nodemon** | [`^3.1`](https://www.npmjs.com/package/nodemon)  | _Runtime_ | Auto-restart server on file changes          | [Docs](https://github.com/remy/nodemon#nodemon) - [Config](https://github.com/remy/nodemon#config-files) | [Nodemon](docs/js-foundation/server/runtime/nodemon.md) |

------------


## 🔰 Getting Started [🔺](#km-express-template)

### 🌱 Installation

Follow the steps below to set up the project locally.

**① Clone the Repository**

Clone code into your local workspace:

```shell
git clone https://github.com/joephankm/km-express-template.git <your-project-name>
cd <your-project-name>
```

**② Install Dependencies**

Install all required dependencies and set up development tooling:

```shell
pnpm install
```


### ▶️ Run DEV Server

**① Start the Server**

Start the development server using the predefined script:

```shell
pnpm build
pnpm start
```

When the server starts successfully, you should see:

```
> App listening on port 3000
```

**② Verify the Server**

Confirm the server is running by calling the root endpoint:

```shell
curl http://localhost:3000
```

You can also verify the development environment by running:

```shell
# Confirm no TypeScript or type-related issues
pnpm typecheck
# - ✅ Expected: (no error shown) -
```

------------


## ⚡️ Scripts [🔺](#km-express-template)

### 🏗️ Development

Scripts used during development to run the application, maintain code quality, and perform local tasks.

| Script                     | Purpose                                                  | Multi-env |
|----------------------------|----------------------------------------------------------|:---------:|
| `pnpm start`               | Start app in **DEV mode**                                |     ✓     |
| `pnpm script <file>`       | Run a TypeScript script from [`scripts/<file>`](scripts) |     ✓     |
| `pnpm typecheck`           | Validate **TypeScript** types                            |           |


### 🚀 Deployment

Scripts used to run the application in server environments and execute deployment-related tasks.

| Script              | Purpose                                                                                               | Multi-env |
|---------------------|-------------------------------------------------------------------------------------------------------|:---------:|
| `pnpm build`        | Compile **TypeScript** source into **JavaScript**                                                     |           |
| `pnpm prerun`       | Prepare application for deployment: <ol> <li>Install dependencies</li> <li>Build artifacts</li> </ol> |           |
| `pnpm server`       | Run app in **PRODUCTION mode**                                                                        |     ✓     |
| `pnpm server:<env>` | Run app in a specific environment                                                                     |           |


### 🌍 Environments

Scripts that include `<env>` in their name (e.g., `server:<env>`) run in a specific environment.

The following environments are supported by this project:

| Environment | `<env>` in Script | Runtime Env   | `.env` file                            | 📗 Example     |
|-------------|-------------------|---------------|----------------------------------------|----------------|
| Development | _                 | `development` | [`.env.development`](.env.development) | `server`       |
| Staging     | `stage`           | `staging`     | [`.env.staging`](.env.staging)         | `server:prod`  |
| Production  | `prod`            | `production`  | [`.env.production`](.env.production)   | `server:stage` |
