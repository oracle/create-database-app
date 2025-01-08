# ORDS Concert App

![ORDS Logo](./images/ORDS.png)

## What's in the project

- An [Oracle](https://www.oracle.com/cloud/free/) database schema that follow best practices
- [ORDS](https://www.oracle.com/database/technologies/appdev/rest.html) REST API definitions that power the sample app
- Authentication powered by [Auth0](https://auth0.com/)
- Styling with [Tailwind](https://tailwindcss.com/)
- React Components powered by [MUI](https://mui.com/)
- Linting with [ESlint](https://eslint.org/)
- Static types with [TypeScript](https://typescriptlang.org/)
- A bunch of guides to getting you familiar with the ORDS API Development Environment

All of this is built on top of [Remix](https://remix.run/) to provide a great development experience and to get you familiar with the Oracle development ecosystem

## Getting Started

Before you start exploring the ORDS Concert App you need to set up your development environment:

## Requirements

- An Oracle database with the latest version of ORDS installed, you can grab a Database with these characteristics using the [OCI always free tier](https://www.oracle.com/cloud/free/).
- An Oracle REST enabled schema with enough privileges to REST enable other schemas.
- Node >= 18 installed.
- An Auth0 tenant. You can follow the [Official Auth0 Documentation](https://auth0.com/docs/get-started/auth0-overview/create-tenants) to set up your own Auth0 tenant.

### Setup your environment

#### 1. Install the project dependencies

```
npm install
```

#### 2. Setup an Auth0 Tenant and authentication app

To set up your Auth0 tenant and application follow the steps outlined in [The Auth0 Application Configuration Guide](./ords/security/README.MD#setting-up-the-auth0-app) or review the [ORDS Concert App - Securing Services](./ords/security/README.MD) documentation to learn more.

#### 3. configure your `.env` file as it follows

You can create a `.env` file or rename the `.env.example` file to `.env` and use it to fill the following environment variables:

```bash
# We refer to some variables as Autonomous Database specific but you can use whichever ORDS URL you want/have as well as the user, as long as this user is capable of creating and REST Enabling other schemas.
ADB_ORDS_URL=https://example.com:8080/ords/ 
ADB_ADMIN_USER=username
ADB_ADMIN_PASSWORD=

# The name of the schema that will be created to host all of the ORDS Concert App database objects.
SCHEMA_NAME=ORDS_CONCERT_APP
SCHEMA_PASSWORD=

# Your Auth0 tenant JWT credentials, used by ORDS to validate request to protected endpoints.
JWT_ISSUER=https://my-domain.auth0.com
JWT_VERIFICATION_KEY=https://my-domain.auth0.com/oauth/token/.well-known/jwks.json
JWT_AUDIENCE=https://concert.sample.app

# Auth0 Authentication app configuration parameters specific of the sample app.
AUTH0_RETURN_TO_URL=http://localhost:3000
AUTH0_CALLBACK_URL=http://localhost:3000/callback
AUTH0_CLIENT_ID=auth0_client_id
AUTH0_CLIENT_SECRET=auth0_client_secret
AUTH0_DOMAIN=auth0_domain
AUTH0_LOGOUT_URL=http://localhost:3000/logout
```

```bash
AUTH0_CLIENT_ID=auth0_client_id
AUTH0_CLIENT_SECRET=auth0_client_secret
JWT_ISSUER=https://my-domain.auth0.com
JWT_VERIFICATION_KEY=https://my-domain.auth0.com/oauth/token/.well-known/jwks.json
JWT_AUDIENCE=https://concert.sample.app
AUTH0_RETURN_TO_URL=http://localhost:3000
AUTH0_CALLBACK_URL=http://localhost:3000/callback
AUTH0_DOMAIN=my-domain.auth0.com
AUTH0_LOGOUT_URL=https://my-domain.auth0.com/v2/logout
```

Once you have your development environment ready you can run the `migrate` and `seeding` scripts.

### Initialize the database schema - Run the migrate script

Before starting, the ORDS Concert App it is needed to bring up all of the Oracle Database Schema objects as well as ORDS API Endpoints, for that, you need to run the migrate script which does a couple of things:

. **Create a Schema and RESTEnable it**:

- Creates a new database schema.
- REST enables the schema, allowing it to support RESTful Web Services.

2. **Database Objects Creation**:
   - Uses the credentials of the recently created schema to create the essential database objects such as tables, indexes and triggers that the Concert App needs to work.

3. **ORDS Modules Definition**:
   - Defines three distinct ORDS modules: `enduser`, `authUser`, and `adminUser`.
   - Each module is associated with specific templates and handlers tailored for different types of users.
   - Protects each module with a unique privilege to ensure appropriate access control.

4. **AutoREST Enabling**:
   - AutoREST enables certain tables and views to facilitate their use by the Concert App and the seeding script. Each table is also protected by a privilege to ensure appropriate access control.

You can learn more about the Migrate Script in the [Migrate Scripts Documentation](./ords/migrateScripts/README.md) as well as the [Modules Definitions Documentation](./ords/modules/README.md).

To initialize the ORDS Concert App schema run the following command:

```
npm run migrate
```

Once the command is run you will asked if you want to use the credentials provided in the `.env` (type `n`) file or if you want to provide each one of those via the command line (type `y`).

```bash
> ords-remix-jwt-sample@1.0.0 migrate
> node ./ords/migrate.js

Do you want to set your config with the CLI? (y/n): 
```

 🚨 **Note** that defining the configuration options in a `.env` file is the recommended option and should be used instead of relying on the manual option. The use of the CLI interface is mean to be a one time usage and assumes that you do not intend to run the seeding script once the schema objects are created.

Once the script has finished it will display all the statements that were executed and if there was an error in any of those statements.

### Populate the schema - Run the seeding script

The `seed` script is designed to populate the database with initial data, ensuring that the application has the necessary data to function correctly. It leverages the autoREST batch load functionality to efficiently insert data into the AutoREST enabled tables created by the `migrate` script. This script performs the following tasks:

1. Connects to the database using the recently created Schema Credentials.
2. Utilizes the AutoREST batch load functionality to insert initial data into the recently created tables.

You can learn more about the Seed Script in the [Seeding Scripts Documentation](./ords/seedScripts/README.md).

To populate the ORDS Concert App schema objects run the following command:

```bash
npm run seed
```

Once the script has finished, it will display a resume of all of the rows that were inserted during execution and it will also report if there was during any of the batchload operations.

```bash
> ords-remix-jwt-sample@1.0.0 seed
> node ./ords/seed.js

#INFO Number of rows processed: 50
#INFO Number of rows in error: 0
#INFO No rows committed
SUCCESS: Processed without errors

#INFO Number of rows processed: 100
#INFO Number of rows in error: 0
#INFO No rows committed
SUCCESS: Processed without errors

#INFO Number of rows processed: 100
#INFO Number of rows in error: 0
#INFO No rows committed
SUCCESS: Processed without errors

#INFO Number of rows processed: 9
#INFO Number of rows in error: 0
#INFO Last row processed in final committed batch: 9
SUCCESS: Processed without errors

#INFO Number of rows processed: 256
#INFO Number of rows in error: 0
#INFO Last row processed in final committed batch: 256
SUCCESS: Processed without errors
```

### Start the dev server

```bash
npm run dev
```

This starts the ORDS Concert App in development mode, rebuilding assets on file changes.

Once the server is up you will see the following output on your console:

```bash
> ords-remix-jwt-sample@1.0.0 dev
> remix vite:dev

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

Now you can go to `http://localhost:3000` and see the ORDS Concert App in action fell free to explore the Discover Functionalities and don't forget to Enable the Tooltips functionality to learn more about Oracle REST Data Services!

## Relevant code

The ORDS Concert App is a pretty simple app but it's a good example of how you can build full stack apps with the help of ORDS and Remix. The main functionality is allowing users to subscribe to concerts, artists and venues as well as allow admin user to Create, Replace, Update or Delete those entities.

- managing authentication, scopes, log in, log out. [./app/utils/auth.server.ts](./app/utils/auth.server.ts)
- managing user actions, like subscribe/unsubscribe [./app/routes/concerts.$concertID.tsx](./app/routes/concerts.$concertID.tsx)
- create an schema and rest enable it [./ords/RESTfulServices/RESTSchema.js](./ords/RESTfulServices/RESTSchema.js)
- create ORDS modules templates and handlers [./ords/migrateScripts/defineModules.js](./ords/migrateScripts/defineModules.js)
- securing ORDS API Endpoints [./ords/migrateScripts/protectEndpoints.js](./ords/migrateScripts/protectEndpoints.js)

Feel free to explore the whole application to learn more about ORDS and if you want more insights about which ORDS features are used you can always enable the Tooltips functionality in whichever page of the sample app you are.

## Disclaimer

All names, characters, organizations, places, events and portrayals are entirely fictional for the sole purpose of this application's demonstration. Any resemblance to actual persons (living or dead) or actual entities or events is purely coincidental.

## License

Copyright (c) 2024 Oracle and/or its affiliates.

Released under the Universal Permissive License v1.0 as shown at <https://oss.oracle.com/licenses/upl/>.
