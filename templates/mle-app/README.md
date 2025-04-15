<!-- markdownlint-disable MD013 -->

# In-Database JavaScript Template Application

A small, database-centric application template for Typescript and JavaScript developers.

## Description

This project demonstrates how to develop data-centric applications within a database using [Multilingual Engine (MLE)](https://docs.oracle.com/en/database/oracle/oracle-database/23/mlejs/introduction-to-mle.html)/JavaScript. The code example requires you to use an Oracle Database 23ai instance. If you don't have one already, you may want to try [Oracle Database Free](https://www.oracle.com/database/free/). The [get started](https://www.oracle.com/database/free/get-started/) page lists multiple alternatives, including container images. Alternatively, you can use an [Always Free Autonomous Database](https://docs.oracle.com/en/cloud/paas/autonomous-database/serverless/adbsb/autonomous-always-free.html).

The application template implements a simple **TODO list** with full **CRUD** (create, update, read, delete) functionality. Different users can maintain their respective TODO lists. Each list can have tasks pertaining to a category. It is possible to also assign a priority to a task. This application implements the necessary code to maintain TODO lists, there is no graphical user frontend associated with the application.

`src/index.ts` is the main component in the template. It defines the entire application logic in Typescript. This allows developers to benefit from a wide range of tools in the Typescript eco-system, most notably:

- type checking
- syntax highlighting
- tab completion based on the [MLE type declarations](https://oracle-samples.github.io/mle-modules/)
- linting
- formatting
- many others...

The Oracle Database engine does not support Typescript input directly, therefore the file needs to undergo transpilation to JavaScript before it can be deployed. This is taken care off in the `package.json`'s _build_ step. Here is a list of further actions available in `package.json`:

- build: transpiles the Typescript file to JavaScript based on an opinionated `tsconfig.json`
- deploy: deploys the transpiled file into the database
- initdb: creates the necessary tables in the database
- cleandb: tears the application down (use with care!)

You typically start by deploying the schema objects before transpiling and deploying the JavaScript code.

### Project Structure

The project is structured as follows:

| Source File | Used For |
| -- | -- |
| `src/index.ts` | This file is the main TypeScript file containing the application logic. It uses MLE SQL API to perform database operations (`INSERT`, `SELECT`, `UPDATE`, `DELETE`). |
| `src/database/initdb.sql` | A short SQL script to initialize the required database tables (TODOs, Users, Categories). |
| `src/database/cleanup.sql` | A SQL script to drop all created database tables. Use with care! |
| `test-sql/call-specs.sql` | The final SQL file defines PL/SQL [call specifications](https://docs.oracle.com/en/database/oracle/oracle-database/23/mlejs/call-specifications-functions.html) to wrap MLE module functions, allowing them to be invoked from SQL. It uses `MLEAPP` as default MLE module name. The purpose of the script is to demonstrate how MLE module functions can be executed. |

### Requirements

You need the following components to use this application template.

- A running [Oracle Database 23ai](https://www.oracle.com/database/) instance.
- [SQL Developer Command Line](https://www.oracle.com/database/sqldeveloper/technologies/sqlcl), aka _sqlcl_ is used to deploy the bundled JavaScript code as an MLE module in the database.
- [Node.js](https://nodejs.org/) to create this application template.

An Always Free Autonomous Database offers the quickest way to get started. If you would like to use {Docker,Podman} Compose to get up-and-running quickly, you can refer to [Server-Side JavaScript driven by node-express](https://blogs.oracle.com/developers/post/serverside-javascript-driven-by-nodeexpress) for reference.

## Getting Started

If you haven't already, please download and install SQLcl from Oracle:

🔗 <https://www.oracle.com/database/sqldeveloper/technologies/sqlcl>

Make sure it is unzipped and accessible via its full path (e.g. `/Users/yourname/sqlcl`). Take a note of the top-level directory where you unzipped the file, you will need this when creating the application.

### 1. Create the application

Use the `@create-database-app` command as described in the [top-level readme](https://github.com/oracle/create-database-app/blob/main/README.md) to set up your application. You will be prompted to make a number of choices. Make sure you select `mle-app` as shown here:

```
? What would you like your application's name to be? demo
? Which template would you like to use for your project?
  node-angular
  node-react-todo
  ords-remix-jwt-sample
❯ mle-app
  node-vanilla
  node-react
  node-vue
(Use arrow keys to reveal more choices)
This creates an empty project with MLE and Oracle database connection starter code.
```

Depending on your database configuration you can choose between a TCP connection to a database, or use a Wallet to connect to an Autonomous Database.

### 2. Install Project Dependencies

Install the necessary modules.

```bash
npm install
```

The `npm` command triggers the installation of all necessary Node.js dependencies, including [esbuild](https://esbuild.github.io/).

### 3. Initialize the Database

The application stores TODO items in various tables. These must be deployed first, before switching the focus to the application code.

```bash
npm run initdb
```

This creates the required tables and indexes:

- `todo_list`
- `users`
- `categories`

Make sure your environment variables or `.env` file provides connection details:

- `DB_USER`
- `DB_PASSWORD`
- `CONNECT_STRING`
- `SQL_CL_PATH`
- `WALLET_PATH` (optional)

You should have been prompted for those values upon project initialisation.

### 4. Build the Source Code

Oracle Database 23ai requires you to create JavaScript modules. The Typescript code must first be transpiled.

```bash
npm run build
```

This compiles and bundles `src/index.ts` using esbuild. The output file is written to `dist/index.js`. The resulting file is created using ECMAScript syntax, therefore complying with the requirements set out by MLE.

### 5. Deploy the MLE Module

Finally you can deploy the transpiled JavaScript code using the `deploy` script:

```bash
npm run deploy
```

This uses SQLcl to upload and register the bundled JS code as an MLE module in the database.
By default, the module is named `mleapp`. To specify a custom module name:

```bash
npm run deploy -- <your-module-name>
```

Example:

```bash
npm run deploy -- my-custom-module
```

## Application Testing

Once your MLE module is deployed, you can test its functionality using [call specifications](https://docs.oracle.com/en/database/oracle/oracle-database/23/mlejs/call-specifications-functions.html) defined in `test-sql/call-specs.sql`.

A call specification allows you to invoke JavaScript code from SQL and PL/SQL.

### Testing in SQL and PL/SQL

The following SQL code demonstrates how to invoke the MLE module function `newUser` and other functions via the `user_package` package. Make sure to update the call specification in case you changed the name of the MLE module.

```sql
-- Create the user_package package
CREATE OR REPLACE PACKAGE AS
    PROCEDURE newUserFunc(name IN VARCHAR2)
    AS MLE MODULE MLEAPP SIGNATURE 'newUser(string)';

    FUNCTION getUser(id IN NUMBER) RETURN VARCHAR2
    AS MLE MODULE MLEAPP SIGNATURE 'getUser(number)';

    PROCEDURE updateUser(id IN NUMBER, name IN VARCHAR2)
    AS MLE MODULE MLEAPP SIGNATURE 'updateUser(number, string)';

    PROCEDURE deleteUser(id IN NUMBER)
    AS MLE MODULE MLEAPP SIGNATURE 'deleteUser(number)';
END user_package;
/

-- Call MLE functions via the user_package in SQL*Plus or SQLcl
EXECUTE USER_PACKAGE.NEWUSERFUNC('EMILY');

SELECT USER_PACKAGE.GETUSER(5);

EXECUTE USER_PACKAGE.UPDATEUSER(5,'EMILY');

SELECT USER_PACKAGE.GETUSER(5);

EXECUTE USER_PACKAGE.DELETEUSER(5);

SELECT USER_PACKAGE.GETUSER(5);
```

Use any of your favourite tools to connect to the database schema and run these commands.

### Testing MLE Code in Oracle APEX

Oracle [APEX](https://apex.oracle.com) was one of the first development environments supporting MLE/JavaScript. You can create an APEX page that allows users to test CRUD operations, such as adding or displaying TODO items.

You can integrate JavaScript in Page Designer to create:

- validations
- processes
- computations

Furthermore, you can use MLE/JavaScript for

- SQL queries
- SQL Workshop

You may want to add a page process using the JavaScript code to perform the CRUD operations, rather than the default submit actions.

### Testing REST endpoints using Oracle REST Data Services (ORDS)

If you’ve exposed your MLE functions as RESTful services using [ORDS](https://www.oracle.com/ords), you can test them via HTTP requests. For instance, you might have a REST endpoint for creating a TODO item.

Assuming you REST-enabled your schema, and created an ORDS handler for MLE/JavaScript [as described in this blog post](https://blogs.oracle.com/developers/post/advanced-ords-rest-handlers-written-in-javascript), you can invoke the REST-endpoint like this:

```bash
curl -X POST "https://yourserver.com/ords/mle/todo/create" \
  -H "Content-Type: application/json" \
  -d '{"todo_text": "Buy groceries", "user_id": "user123", "category": "personal"}'
```

## Clean Up

If you concluded your testing, and wish to remove the database objects, you can invoke the `cleanup` task via NPM, like so:

```bash
npm run cleandb
```

This will drop all objects (tables, types, etc.) created by the `initdb` script.

## Links for Further Reading

Here are some further resources relevant to Multilingual Engine/JavaScript:

- [Oracle JavaScript Developer's Guide](https://docs.oracle.com/en/database/oracle/oracle-database/23/mlejs/introduction-to-mle.html)
- [SQL Developer Command Line (sqlcl)](https://www.oracle.com/database/sqldeveloper/technologies/sqlcl.html)
- [PL/SQL User Guide](https://docs.oracle.com/en/database/oracle/oracle-database/)
- [Oracle APEX Documentation](https://docs.oracle.com/en/database/oracle/application-express/)
- [ORDS Documentation](https://docs.oracle.com/en/database/oracle/application-express/)
- [SQL Developer](https://www.oracle.com/database/sqldeveloper/)
- [SQL Developer for VSCode](https://www.oracle.com/database/sqldeveloper/vscode/)

## Feedback

Feel free to open issues or suggestions if you want to improve this template. Contributions are welcome!
