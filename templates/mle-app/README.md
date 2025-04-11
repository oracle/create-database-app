# MLE Template Application

## Description

This project demonstrates how backend applications can be developed using [Oracle Database Multilingual Engine (MLE)](https://docs.oracle.com/en/database/oracle/oracle-database/23/mlejs/introduction-to-mle.html).

It implements a simple **TODO list** with full **CRUD** functionality. Each TODO item can be associated with a **User** and a **Category**. Users and Categories can be created independently.

---

## Project Structure

- `src/index.ts`  
  Main TypeScript file. It uses MLE SQL API to perform database operations (`INSERT`, `SELECT`, `UPDATE`, `DELETE`).

- `src/database/initdb.sql`  
  SQL script to initialize the required database tables (TODOs, Users, Categories).

- `src/database/cleanup.sql`  
  SQL script to drop all created database tables.

- `test-sql/call-specs.sql`  
  SQL file that defines PL/SQL **call specifications** to wrap MLE module functions, allowing them to be invoked from SQL. It uses `MLEAPP` as default MLE module name. The purpose of the script is to demonstrate how MLE module functions can be executed.

---

## Requirements

- [Oracle Database 23c](https://www.oracle.com/database/) or later (with MLE support).
- [SQLcl](https://www.oracle.com/database/sqldeveloper/technologies/sqlcl): used to deploy the bundled JS code as an MLE module.
- [Node.js](https://nodejs.org/) (v16+ recommended).

---

## Getting Started

### 1. Install SQLcl

Download and install SQLcl from Oracle:

🔗 https://www.oracle.com/database/sqldeveloper/technologies/sqlcl

Make sure it is unzipped and accessible via its full path (e.g. `/Users/yourname/sqlcl`).

---

### 2. Install Project Dependencies

```bash
npm install
```

Installs all necessary Node.js dependencies including [esbuild](https://esbuild.github.io/).

### 3. Initialize the Database

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

### 4. Build the Source Code

```bash
npm run build
```

This compiles and bundles src/index.ts using esbuild. The output file is written to:

```
dist/index.js
```

The bundled file is compatible with Oracle's MLE module format.

### 5. Deploy the MLE Module

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

### 6. Test MLE Module Functions

Once your MLE module is deployed, you can test its functionality using **call specifications** defined in the `test-sql/call-specs.sql` file.

Call specifications allow you to invoke MLE module functions as PL/SQL procedures or functions.

#### Example: Testing User Package

The following SQL code demonstrates how to invoke the MLE module function `newUser` and other functions via the `user_package` package.

```sql
-- Create the user_package package (wraps MLE functions)
CREATE OR REPLACE PACKAGE user_package AS
    PROCEDURE newUserFunc(name IN VARCHAR2);
    FUNCTION getUser(id IN NUMBER) RETURN VARCHAR2;
    PROCEDURE updateUser(id IN NUMBER, name IN VARCHAR2);
    PROCEDURE deleteUser(id IN NUMBER);
END user_package;
/
CREATE OR REPLACE PACKAGE BODY user_package AS
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

-- Call MLE functions via the user_package
EXECUTE USER_PACKAGE.NEWUSERFUNC('BLABLA');

SELECT USER_PACKAGE.GETUSER(5);

EXECUTE USER_PACKAGE.UPDATEUSER(5,'BLABLA');

SELECT USER_PACKAGE.GETUSER(5);

EXECUTE USER_PACKAGE.DELETEUSER(5);

SELECT USER_PACKAGE.GETUSER(5);
```

You can use tools like **SQLcl** or **SQL Developer** to execute these SQL commands.

#### **Test via Oracle APEX (Application Express)**:  
Oracle APEX allows you to create web applications that interact with MLE functions. You can create an APEX page that allows users to test CRUD operations, such as adding or displaying TODO items.

**Link**:  
[Oracle APEX](https://apex.oracle.com)

#### **Test via Oracle REST Data Services (ORDS)**:  
If you’ve exposed your MLE functions as RESTful services using ORDS, you can test them via HTTP requests. For instance, you might have a REST endpoint for creating a TODO item.

**Example**:

```bash
curl -X POST "https://yourserver.com/ords/mle/todo/create"   -H "Content-Type: application/json"   -d '{"todo_text": "Buy groceries", "user_id": "user123", "category": "personal"}'
```

**Links**:
- [Less-well-known features of Multilingual Engine: Document API](https://blogs.oracle.com/developers/post/lesswellknown-features-of-multilingual-engine-document-api)
- [ORDS Documentation](https://www.oracle.com/database/technologies/appdev/rest.html)
---

### 7. Clean Up the Database

```bash
npm run cleandb
```

This will drop all objects (tables, types, etc.) created by the `initdb` script.

---

## Links for Further Reading

- [Oracle MLE Documentation](https://docs.oracle.com/en/database/oracle/oracle-database/23/mlejs/introduction-to-mle.html)
- [SQLcl Documentation](https://www.oracle.com/database/sqldeveloper/technologies/sqlcl.html)
- [PL/SQL User Guide](https://docs.oracle.com/en/database/oracle/oracle-database/)
- [Oracle APEX Documentation](https://docs.oracle.com/en/database/oracle/application-express/)
- [ORDS Documentation](https://docs.oracle.com/en/database/oracle/application-express/)
- [SQL Developer](https://www.oracle.com/database/sqldeveloper/)
- [SQL Developer for VSCode](https://www.oracle.com/database/sqldeveloper/vscode/)
---


## Feedback

Feel free to open issues or suggestions if you want to improve this template. Contributions are welcome!