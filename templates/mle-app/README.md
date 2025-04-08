# MLE Template Application
## Description

The purpose of the project is to demonstrate how backend applications can be developed using [MLE](https://docs.oracle.com/en/database/oracle/oracle-database/23/mlejs/introduction-to-mle.html). Example application allows to perform CRUD operations on TODO list. TODO list item can belong to different category and user. Categories and Users can be created separately.

## Content
- SQL scripts that create and cleanup database tables to store TODO list, Users, Categories (see src/database/initdb.sql and src/database/cleanup.sql)
- Demo Typescript code (see src/index.ts). The code uses MLE SQL api to execute INSERT, UPDATE, DELETE, SELECT statements to interract with datatables.
- SQL scripts to test functionality (see test-sql folder).


## Requirements

- [SQLcl](https://www.oracle.com/database/sqldeveloper/technologies/sqlcl). Example application uses SQLcl to deploy generated JS code as MLE module. Path to SQLcl installation must be provided during the application creation process.

## Getting Started

### Setup your environment

#### Install SQLcl

#### Install project dependencies

```
npm install
```

#### Create required database objects

```
npm run initdb
```

Creates all necessary test tables and indexes.

### Build, bundle and deploy source code (index.ts)

```
npm run build
```

Compiles and bundles typescript code (index.ts). Bundled code is located in dist/index.js and deployed as MLE module to the database using SQLcl (see deploy.js). Result MLE module name is **mleapp**.

### Run your code

Deployed module code functions can be executed via MLE call specification procedures or functions. Example of call specifications organized in packages is located in test-sql/call-specs.sql. 

## MLE Application creation process

MLE Application can be created using dev. mode:

```sh
npm run dev
```

Answer all questions:

```sh
? What would you like your application's name to be? <PROJECT NAME>
? Which template would you like to use for your project? mle-app
? Which database connection type would you like to choose? Basic Connection (Protocol, Hostname, Port, Service Name / SID)
? What is your database protocol? tcp
? What is your database hostname? <DB host name e.g. localhost>
? What is your database port? <DB port>
? Which service type would you like to use? Service name
? Please enter your database service name:  <DB service name e.g. FREE>
? What's your database username? <YOUR DATABASE USER>
? What's your database password? <PASSWORD>
? Please provide full path to your SQLcl installation:  <Full path to you SQLcl installation ..../sqlcl>
```

The project will be created in generated/<PROJECT NAME> folder.