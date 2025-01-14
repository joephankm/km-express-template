# Express App

<p align="right"><em>&lt;Last updated: 2025-01-01&gt;</em></p>

This guide walks you through setting up an **Express.js** application from scratch. It covers essential steps like
**initializing the project**, **installing core dependencies**, and configuring tools like **Docker** or **CI
pipelines** — serving as a starting point for backend development.

> ### 🗂️ Contents
> - 🏗️ [Create Express App](#-create-express-app-)

************


## 🏗️ Create Express App [🔺](#express-app)

### 1. 📁 Init Empty Project

**① Create project folder:**

```shell
mkdir <project-folder> && cd <project-folder>
```

**② Init pnpm project:**

```shell
pnpm init
```

**③ Init Git:**

```shell
git init
```

### 2. ![typescript](../_assets/icons/typescript-16.png) Install Typescript

**① Install Typescript:**

```shell
pnpm add -D typescript
```

**② Init Typescript:**

```shell
pnpm tsc --init
```

### 3. ![express](../_assets/icons/express-16.png) Install Express

**① Install Express:**

```shell
pnpm add express
```

**② Add Types:**

```shell
pnpm add -D @types/express @types/node
```
