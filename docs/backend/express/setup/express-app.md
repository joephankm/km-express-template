# ![express](../_static/icons/express-28.png) Setup Express App

<p align="right"><em>&lt;Last updated: 2025-01-01&gt;</em></p>

This guide walks you through setting up an **Express.js** application from scratch. It covers essential steps like
**initializing the project**, **installing core dependencies**, and configuring tools like **Docker** or **CI
pipelines** — serving as a starting point for backend development.

> ### 🗂️ Contents
>   - 🏗️ [Create Express App](#-create-express-app-)

************


## 🏗️ Create Express App [🔺](#-setup-express-app)

### ⓵. 📁 Init Empty Project

Create a new project directory and navigate into it:

```shell
mkdir <project-name> && cd <project-name>
```

Initialize a new **PNPM** project:

```shell
pnpm init
```

Initialize a **Git repository**:

```shell
git init
```


### ⓶. ![typescript](../_static/icons/typescript-16.png) Install Typescript

Add **TypeScript** as a development dependency:

```shell
pnpm add -D typescript
```

Generate a default **TypeScript configuration**:

```shell
pnpm tsc --init
```


### ⓷. ![express](../_static/icons/express-16.png) Install Express

Install **Express** as a runtime dependency:

```shell
pnpm add express
```

Install type definitions for **Express** and **Node.js**:

```shell
pnpm add -D @types/express @types/node
```
