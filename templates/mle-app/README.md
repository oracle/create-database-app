## Overview

Run in dev mode to generate MLE application:

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

Run in the project folder:

    - `npm install`: To install all required dependencies.
    - `npm run cleandb`: To clean up database. Removes all created tables and modules. See src/database/creanup.sql.
    - `npm run initdb`: Creates all necessary test tables and indexes.
    - `npm run build`: Compiles and bundles typescript code (index.ts). Bundled code is located in dist/index.js and deployed as MLE module to the database using SQLcl (see deploy.js). Result MLE module name is **mleapp**.

There are manual test scripts can be used to test created MLE module. They are located in test-sql folder.