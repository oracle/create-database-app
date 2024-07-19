# Create Database App <!-- omit in toc -->

## Table of Contents <!-- omit in toc -->

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
    - [Examples](#examples)
        - [Create a React Database App](#create-a-react-database-app)
        - [Create a Todo Database App](#create-a-todo-database-app)
- [Contributing](#contributing)
- [Security](#security)
- [License](#license)

## Overview

Create an Oracle Database Application from a template.

NOTE: The applications generated by this package should not be deployed using
privileged database accounts. In turn, Oracle recommends for them to be deployed
using the least privileged account possible.

## Prerequisites

- An Oracle Database, either on-prem or an
    [Autonomous Database](https://www.oracle.com/autonomous-database/) instance
- Node.js 18 (Recommendation is to use [nvm](https://github.com/nvm-sh/nvm))

## Getting Started

The main application usage is through the `@oracle/create-database-app` NPM
package, which will scaffold an application that will be connected to your
Oracle Database.

```sh
npm create @oracle/database-app
```

This will temporarily install the package in your computer and prompt
you for details like the name of the application, the template, and the database
connection, from which it will create a git folder named as the given
application name in your current directory, and install its dependencies.

Next, you will be able to open the project in your favorite IDE or Code Editor
and read the provided documentation to get started creating a database
application using your favorite framework. We ship configuration files with
recommended settings and extensions for Visual Studio Code.

The package offers the following templates, which connect to the database
using the the [`oracledb` database driver](https://github.com/oracle/node-oracledb):

- `node-vanilla`: A starter template that uses Node.js, vanilla JavaScript, HTML
    and CSS. It is built by [`vite`](https://vitejs.dev/)
- `node-jet`: A starter template that uses Node.js and
    [Oracle JET](https://www.oracle.com/webfolder/technetwork/jet/index.html).
    It is built using the `ojet-cli`
- `node-react`: A starter template that uses Node.js and
    [React](https://react.dev/). It is built by [`vite`](https://vitejs.dev/)
- `node-vue`: A starter template that uses Node.js and
    [Vue.js](https://vuejs.org/). It is built by [`vite`](https://vitejs.dev/)
- `node-react-todo`: A simple task manager template that uses Node.js and
    [React](https://react.dev/). It demonstrates the use of the database for
    Create, Read, Update and Delete (CRUD) operations. It is built by
    [`vite`](https://vitejs.dev/)

Each of the templates include documentation for you to get started with them, as
well as NPM scripts for you to use right after generating the application.

You can provide the following options directly to the command:

- `--name`: followed by the name of your application
- `--template`: followed by the name of the template to use (See above)

If none or only a few options are provided to the command, it will prompt for
the missing details.

### Examples

#### Create a React Database App

If you want to generate an application named `my-app` with the `node-react`
template, you can execute:

```sh
npm create @oracle/database-app -- \
    --name 'my-app' \
    --template 'node-react'
```

#### Create a Todo Database App

If you want to generate an application named `my-todo` with the `node-todo`
template, you can execute:

```sh
npm create @oracle/database-app -- \
    --name 'my-todo' \
    --template 'node-react-todo'
```

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
