# Create Database App <!-- omit in toc -->

## Table of Contents <!-- omit in toc -->

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Templates](#templates)
- [Options](#options)
- [Examples](#examples)
  - [Usage](#usage)
  - [Simple React app](#simple-react-app)
  - [React todo app](#react-todo-app)
  - [Application without interactive prompts](#application-without-interactive-prompts)
- [Contributing](#contributing)
- [Security](#security)
- [License](#license)

## Overview

Create an Oracle Database Application from a template.

NOTE: The applications generated by this package should not be deployed using privileged database accounts. In turn, Oracle recommends for them to be deployed using the least privileged account possible.

## Prerequisites

- An Oracle Database, either on-prem or an [Autonomous Database](https://www.oracle.com/autonomous-database/) instance
- Node.js 18 (Recommendation is to use nvm)

## Installation

Install the package globally using npm

```sh
npm install -g @oracle/create-database-app
```

## Getting Started

The main application usage is through the @oracle/create-database-app NPM package, which will scaffold an application that will be connected to your Oracle Database.

```sh
npm create @oracle/database-app
```
This will temporarily install the package in your computer and prompt you for details like the name of the application, the template, and the database connection, from which it will create a git folder named as the given application name in your current directory, and install its dependencies.

Next, you will be able to open the project in your favorite IDE or Code Editor and read the provided documentation to get started creating a database application using your favorite framework. We ship configuration files with recommended settings and extensions for Visual Studio Code.

## Templates

The package offers the following templates, some of them connect to the database using the [oracledb database driver](https://github.com/oracle/node-oracledb) and other use [Oracle REST Data Services](https://www.oracle.com/database/technologies/appdev/rest.html) endpoints:

- `node-vanilla`: A starter template that uses Node.js, vanilla JavaScript, HTML and CSS. It is built by [vite](https://vitejs.dev/).
- `node-jet`: A starter template that uses Node.js and [Oracle JET](https://www.oracle.com/webfolder/technetwork/jet/index.html). It is built using the [ojet-cli](https://www.npmjs.com/package/@oracle/ojet-cli).
- `node-react`: A starter template that uses Node.js and [React](https://react.dev/). It is built by [vite](https://vitejs.dev/).
- `node-vue`: A starter template that uses Node.js and [Vue.js](https://vuejs.org/). It is built by [vite](https://vitejs.dev/).
- `node-angular`: A starter template that uses Node.js and [Angular](https://angular.dev/). It is built by [Angular CLI](https://github.com/angular/angular-cli). (New in `v1.2.0`)
- `node-react-todo`: A simple task manager template that uses Node.js and [React](https://react.dev/). It demonstrates the use of the database for Create, Read, Update and Delete (CRUD) operations. It is built by [vite](https://vitejs.dev/).
- `ords-remix-jwt-sample`: A full stack Concert Application made with [Remix](https://remix.run/) that showcases the [Oracle REST Data Services](https://www.oracle.com/database/technologies/appdev/rest.html) functionalities. Some extra configuration is required, learn more about it in the `ords-remix-jwt-sample` [Getting Started Guide](/templates/ords-remix-jwt-sample/README.md#getting-started).
- `mle-ts-sample`: A starter template application that demonstrates how backend applications can be developed using [Oracle Database Multilingual Engine (MLE)](https://docs.oracle.com/en/database/oracle/oracle-database/23/mlejs/introduction-to-mle.html). Requires SQLcl to be installed, for more information please read [README](/templates/mle-ts-sample/README.md)
- `mle-ts-ords-backend`: A starter template application that demonstrates how to expose MLE-based backend logic as RESTful endpoints using [Oracle REST Data Services](https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/) (ORDS). This template requires both SQLcl and ORDS to be installed. For more information, please refer to the [README](/templates/mle-ts-ords-backend/).

Each of the templates include documentation for you to get started with them, as well as NPM scripts for you to use right after generating the application.

## Options

You can provide the following options directly to the command:

- `template`: Name of the template to use ([See options above](#templates))
- `connection-type`: Options listed below:
  - `basic`: Requires additional information like `db-protocol`, `db-hostname`, etc.
  - `walletPath`: Requires a path to the wallet via the `wallet-path` flag.
- `wallet-path`: Path to the zip file (or folder if uncompressed) containing the wallet and network configuration files.
- `db-username`: Database username to connect. **Note**: For [Autonomous Databases](https://www.oracle.com/autonomous-database/) we do not recommend using the ADMIN user.
- `db-protocol`: For details consult [Connecting to Oracle Database](https://node-oracledb.readthedocs.io/en/latest/user_guide/connection_handling.html).
- `db-hostname`: For details consult [Connecting to Oracle Database](https://node-oracledb.readthedocs.io/en/latest/user_guide/connection_handling.html).
- `db-port`: For details consult [Connecting to Oracle Database](https://node-oracledb.readthedocs.io/en/latest/user_guide/connection_handling.html).
- `db-service-type`: Options listed below. For details consult [Connecting to Oracle Database](https://node-oracledb.readthedocs.io/en/latest/user_guide/connection_handling.html).
  - `serviceName`
  - `sid`
- `db-service-name`: For details consult [Connecting to Oracle Database](https://node-oracledb.readthedocs.io/en/latest/user_guide/connection_handling.html).
- `db-sid`: For details consult [Connecting to Oracle Database](https://node-oracledb.readthedocs.io/en/latest/user_guide/connection_handling.html).

## Database Environment
When an application is generated, you'll find a `.env` file with details regarding the connection to the database used in the application.

```properties
# Database user
DB_USER=<my-username>
# Database password
DB_PASSWORD=<my-password>
...
```
Note: For the `ords-remix-jwt-sample` is expected that you will configurate your own `.env` file folowing the `ords-remix-jwt-sample` [Getting Started Guide](/templates/ords-remix-jwt-sample/README.md#getting-started).

## Examples

### Usage

The simplest example on how to use the generator is via:
```sh
npm create @oracle/database-app
```
This opens an interactive prompt where information regarding the application and connection details can be provided.

### Simple React app

```sh
npm create @oracle/database-app -- "my-react-app" --template "node-react"
```

### React todo app

You can generate an example of a fully functional application. The example below creates an app named `my-todo` with the `node-react-todo` template.

```sh
npm create @oracle/database-app -- "my-todo" --template "node-react-todo"
```

### Application without interactive prompts

Any combination of parameters defined via the interactive prompt can be defined using a flag as part of the command.*

```sh
npm create @oracle/database-app -- "my-app" \
    --template "node-react" \
    --connection-type "walletPath" \
    --db-username "<my-db-user>" \
    --wallet-path "<path>.zip"
```

The example above shows how to connect to an [Autonomous Database](https://www.oracle.com/autonomous-database/) using a wallet.

Note: passwords still need to be provided using the prompt.

## Contributing

This project welcomes contributions from the community. Before submitting a pull
request, please [review our contribution guide](./CONTRIBUTING.md)

## Security

Please consult the [security guide](./SECURITY.md) for our responsible security
vulnerability disclosure process

## License

Copyright (c) 2024 Oracle and/or its affiliates.

Released under the Universal Permissive License v1.0 as shown at
<https://oss.oracle.com/licenses/upl/>.
