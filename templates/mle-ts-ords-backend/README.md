<!-- markdownlint-disable MD013 -->

# In-Database JavaScript with ORDS Backend Template

An application template for Typescript and JavaScript developers showcasing REST API development using Oracle REST Data Services (ORDS) and Multilingual Engine (MLE).  
**Extends [`mle-ts-sample`](../mle-ts-sample/README.md); see that template's readme for foundational features and explanations.**

## Description

This project builds upon the [mle-ts-sample](../mle-ts-sample/README.md) template by demonstrating how to create REST APIs within Oracle Database using [Oracle REST Data Services (ORDS)](https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/) and the [Multilingual Engine (MLE) JavaScript](https://docs.oracle.com/en/database/oracle/oracle-database/23/mlejs/introduction-to-mle.html).  
In addition to the TODO functionality of `mle-ts-sample`, this template shows how to:

- Configure ORDS modules, templates, and handlers using SQL.
- Export JavaScript functions as REST endpoints via ORDS, with handler logic in an MLE module.
- Test REST endpoints with HTTP requests.
- Set up a development environment using Docker Compose, with Oracle Database and an ORDS server.

The basic application logic structure, build/deploy system, and database initialization approach remain as documented in the [mle-ts-sample README](../mle-ts-sample/README.md).

### Project Structure

Building on top of the standard [mle-ts-sample](../mle-ts-sample/README.md) layout, this template introduces several new files and conventions:

| Source File                       | Used For                                                                               |
| ---------------------------------- | ------------------------------------------------------------------------------------- |
| `src/ords.ts`                     | Contains handler functions for ORDS REST endpoints.                      |
| `src/index.ts`                    | Exports the public API for the MLE module (see mle-ts-sample), plus ORDS handler implementations.                |
| `utils/database/ords.sql`         | SQL script to configure ORDS: installs ORDS modules, templates, and handlers bound to the MLE JS module.           |
| `test/rest.test.js`               | Automated tests for the REST API endpoints, using HTTP requests against the running ORDS backend.                  |
| `docker-compose.yml`              | Docker Compose file spinning up both Oracle Database 23 Free (`db23`) and an ORDS node (`ords-node1`).             |

All standard files and scripts from [`mle-ts-sample`](../mle-ts-sample/README.md) are also present and used as described in that README.

### Requirements

- [Oracle Database 23ai](https://www.oracle.com/database/) or Oracle Database Free (provided via Docker Compose).
- [Oracle REST Data Services](https://www.oracle.com/database/technologies/appdev/rest.html) (ORDS, configured for database access).
- [SQLcl](https://www.oracle.com/database/sqldeveloper/technologies/sqlcl) for deploying MLE modules.
- [Node.js](https://nodejs.org/).
- (Optional) [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) for quick local setup.  
  _Note: Any suitable container engine, such as [Podman](https://podman.io/), can be used in place of Docker._

### 1. Create the Application

Follow the general steps in the [mle-ts-sample/README](../mle-ts-sample/README.md#getting-started) to create your project, but **choose `mle-ts-ords-backend` as the template** during `@create-database-app` initialization.

### 2. (Optional) Start Development Environment with Docker Compose

To quickly launch both Oracle Database and ORDS locally:

```bash
docker-compose up
```
This starts:

- `db23` - Oracle Database 23 Free
- `ords-node1` - ORDS server configured to use `db23`

See the `docker-compose.yml` file (and its comments) for configuration options.

### 3. Install Project Dependencies

```bash
npm install
```

Installs all node modules, just like in mle-ts-sample.

### 4. Initialize the Database

Initialize the application data tables (as in mle-ts-sample):

```bash
npm run initdb
```

### 5. Build and Deploy the MLE Module

Build your application:

```bash
npm run build
```

Deploy the transpiled JS module to the database:

```bash
npm run deploy
```

Please check [mle-ts-sample/README](../mle-ts-sample/README.md) for more information about naming of the deployed modules.

## REST Endpoint Development

The main logic for REST endpoints is in [`src/ords.ts`](src/ords.ts).  
This file exports handler functions used by ORDS to process REST requests. These handlers are linked to ORDS modules and templates via SQL in [`utils/database/ords.sql`](utils/database/ords.sql).

> **Before running any REST API tests, you must execute [`utils/database/ords.sql`](utils/database/ords.sql) to configure the ORDS modules, templates, and handlers.**
> 
> **Important:** The MLE module name used in `ords.sql` is currently hardcoded. If you deployed your module under a different name, **edit `ords.sql` and replace the module name accordingly** to ensure ORDS invokes the correct module.

- `src/index.ts` exports public functions and handlers for deployment as an MLE module.
- ORDS is configured (via `ords.sql`) to call the correct JS handler for each endpoint.

## Application Testing

### Testing REST API Endpoints

After deploying the MLE module and executing the ORDS configuration (`utils/database/ords.sql`), you can test the exposed REST API endpoints.

#### Automated Testing

Run the REST API test suite (see [`test/rest.test.js`](test/rest.test.js)):

```bash
npm run test
```

This will send HTTP requests to the running ORDS server and verify the responses against expectations.

You can also use `curl`, `Postman`, or any HTTP client to manually test the REST endpoints.
Example (replace `[host]`, `[port]`, `<schema>`, and path as appropriate):

```bash
curl -X GET "http://localhost:8080/ords/<schema>/<ords_module_name>/<user_id>"
```

All endpoint routes, HTTP methods, and request/response formats are defined in the ORDS configuration and documented in `utils/database/ords.sql`.

## Other Testing, Cleanup, and Usage

You can use all application testing and database management approaches described in [mle-ts-sample/README](../mle-ts-sample/README.md) , including PLSQL call specifications, Oracle APEX, and other methods.

## Links for Further Reading
- [mle-ts-sample/README](../mle-ts-sample/README.md) - foundational documentation for this template.
- [ORDS Documentation](https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/index.html)
- [Docker Compose](https://docs.docker.com/compose/)
- [Podman Compose](https://docs.podman.io/en/v5.3.1/markdown/podman-compose.1.html)