# KM Express Template

km-express-template is a template for a basic Express application. It can be
used as a starting point for a new Express application.

--------

## Specifications

### Environment

| Specification | Version  |
|---------------|:--------:|
| Node          | `^22.13` |
| Yarn          |  `^4.6`  |

### Application

| Specification | Version |
|---------------|:-------:|
| Typescript    | `^5.7`  |
| Express       | `^5.0`  |
| Prettier      | `^3.4`  |
| ESLint        | `^9.18` |


--------

## Installation

1. Initialize project, see [create express app guide](./docs/installations/create-express-app.md)
2. Config Prettier, see [config linter guide](./docs/installations/config-linter.md)

--------

## Scripts

### Development

| Script              | Description                     |
|---------------------|---------------------------------|
| `yarn start`        | Start development server        |
| `yarn predev`       | Prepare for development         |
| `yarn prettier`     | Check code with Prettier rules  |
| `yarn prettier:fix` | Format code with Prettier rules |
| `yarn lint`         | Check code with Linter rules    |


### Deployment

| Script                  | Description                                 |
|-------------------------|---------------------------------------------|
| `yarn build`            | Build application                           |
| `yarn prerun`           | Prepare and build application (DEV env)     |
| `yarn server`           | Start server (DEV env)                      |
| `yarn prerun:{APP_ENV}` | Prepare and build application for {APP_ENV} |
| `yarn server:{APP_ENV}` | Start server for {APP_ENV}                  |
