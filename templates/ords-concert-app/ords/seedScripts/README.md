# ORDS Management Scripts - Seeding Script 

## Overview

The ORDS Concert App Seeding Script is designed to initialize the database with essential data for the application. It uses the batch load functionality of AutoREST enabled endpoints to efficiently import large volumes of data from CSV files into the database. This process ensures that the application starts with the necessary data without manual entry.

## Functionality

The seeding script performs the following tasks:

- Reads data from CSV files located in the `ords/data/` directory.
- Uses the AutoREST enabled endpoints to batch load the data into the database.
- Handles the authentication required to access the endpoints.
- Processes the data in batches to ensure efficient loading and to manage large datasets.

## Prerequisites

Before running the seeding script make sure that the following prerequisites are met:

-Ensure that the following environment variables are set in the `.env` file.

```bash
ADB_ORDS_URL=example.com:8080/ords/
SCHEMA_NAME=test
SCHEMA_PASSWORD=SuperS3curePsswd1
```

- Ensure that the necessary objects in the database, our tables, are REST enabled. This involves using ORDS to publish the database objects as RESTful endpoints.
- Grant the SQL Developer role to the newly created AutoREST privileges to ensure that the endpoints are accessible. This gives us authorization to call the batchload endpoints as well as granting us access to the AutoREST endpoints. 

Note that these prerequisites are already met if you run the [migrate script](../migrateScripts/README.md) first.

## Example: Loading Cities Data

The script reads from the CITIES.csv file and uses the `cities/batchload` endpoint to populate the `CITIES` table. The batch load endpoint processes the data in chunks (batches) of a specified size, which helps in managing large volumes of data efficiently.

```js

const { ADB_ORDS_URL } = process.env;
const { SCHEMA_NAME } = process.env;
const ORDS_SCHEMA_AUTH_CREDENTIALS = `${SCHEMA_NAME}:${SCHEMA_PASSWORD}`;
const BASIC_SCHEMA_AUTH = `Basic ${Buffer.from(ORDS_SCHEMA_AUTH_CREDENTIALS).toString('base64')}`;
const ADB_SCHEMA_ENDPOINT = `${ADB_ORDS_URL}${SCHEMA_NAME.toLowerCase()}/`;
const citiesFileStream = fs.createReadStream('ords/data/CITIES.csv');
  const citiesBatchResult = await postBatchRequest(
    `${endpoint}cities/batchload?batchRows=50&dateFormat=DD-MM-YYYY`,
    citiesFileStream,
    basicAuth,
  );
  console.log(citiesBatchResult);
```

Thee `batchload` endpoint allows us specify a series of parameters that serve a specific purpose to control the behavior of the batch load operation. Let's take, for example, each parameter in the `cities/batchload?batchRows=50&dateFormat=DD-MM-YYYY` endpoint and see what it does:

- batchRows: This parameter specifies the number of rows to be processed in each batch during the load operation. Batch processing helps manage large datasets by breaking them into smaller, more manageable chunks. In this example, batchRows=50 means that the batch load operation will process 50 rows of data at a time.
- dateFormat: This parameter specifies the format of date values in the CSV file being uploaded. The format string DD-MM-YYYY indicates that dates are represented with the day first, followed by the month, and then the year (e.g., 22-07-2024).

You can learn more About batch load parameters in the Accessing [Objects Using RESTful Services Documentation](https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/24.2/orddg/developing-REST-applications.html#GUID-CA242E61-9012-4081-85A0-CC410B18A3CD)

## Running the Script

```
bash
npm run seed

> ords-concert-application@1.0.0 seed
> node ./ords/seed.js

#INFO Number of rows processed: 256
#INFO Number of rows in error: 0
#INFO Last row processed in final committed batch: 256
SUCCESS: Processed without errors

```

## Disclaimer

All names, characters, organizations, places, events and portrayals are entirely fictional for the sole purpose of this application's demonstration. Any resemblance to actual persons (living or dead) or actual entities or events is purely coincidental.