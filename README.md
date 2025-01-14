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

### 🚀 Application

List of the **core libraries and frameworks** used within the application to implement its functionality and structure.

| Package     |                     Version                     | Description                                   | Links                                                                                                  | Internal Guides                                                |
|-------------|:-----------------------------------------------:|-----------------------------------------------|--------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| **Express** | [`^5.2`](https://www.npmjs.com/package/express) | Core web framework for HTTP APIs and services | [Docs](https://expressjs.com/en/starter/installing.html) - [API](https://expressjs.com/en/5x/api.html) | [Setup Express App](docs/backend/express/setup/express-app.md) |

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
tsc --noEmit
# - ✅ Expected: (no error shown) -
```

------------


## ⚡️ Scripts [🔺](#km-express-template)

### 🏗️ Development

Scripts used during development to run the application, maintain code quality, and perform local tasks.

| Script           | Purpose                                           |
|------------------|---------------------------------------------------|
| `pnpm start`     | Start app in **DEV mode**                         |
| `pnpm build`     | Compile **TypeScript** source into **JavaScript** |
