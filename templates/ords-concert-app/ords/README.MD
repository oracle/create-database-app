# ORDS Concert App - ORDS Management Scripts

![ORDS Logo](../images/ORDS.png)

## Table of Contents

- [Introduction](#introduction)
- [Migrate Script](#migrate-script)
- [Seed Script](#seed-script)
- [Drop Script](#drop-script)


## Introduction

ORDS Management Scripts provides a comprehensive set of scripts designed to manage and streamline various Database RESTful operations, including schema creation, data population, and schema removal.

The main goal of this collection of scripts is to automate and facilitate the creation of an Oracle Database Schema that follows best practices with all the objects and REST Services that the Concert App needs as well as provide a guide on how to configure Oracle RESTful services. 

This documentation focuses on three primary scripts:

- **migrate** 🚀: Creates the database objects such as tables, triggers, and views and uses those objects to define a collection of REST Services that the Sample App consumes.
- **seed** 🌱: Populates the created objects with initial data using the autoREST batch load functionality.
- **drop** 🗑️: Deletes the schema and all of the associated database objects.

## Migrate Script

The `migrate` script is designed to set up the database schema and REST enable it, followed by the creation of the necessary database objects and ORDS modules definitions. This script performs the following tasks:

1. **Create a Schema and RESTEnable it**: 
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

You can learn more about the Migrate Script in the [Migrate Scripts Documentation](migrateScripts/README.md) as well as the [Modules Definitions Documentation](modules/README.md). 

### Configuration

The script requires that the following constants are defined  in a `.env` file at the same level of the `package.json` file of the ORDS Concert App project:

```bash
ADB_ORDS_URL=example.com:8080/ords/
ADB_ADMIN_USERNAME=username
ADB_ADMIN_PASSWORD=password

SCHEMA_NAME=CONCERT_SAMPLE_APP
SCHEMA_PASSWORD=SuperS3curePsswd

JWT_ISSUER=https://my-domain.auth0.com/
JWT_VERIFICATION_KEY=https://my-domain.auth0.com/oauth/token/.well-known/jwks.json

##This has to coincide with the audience you configured in your Auth0 app.
JWT_AUDIENCE=https://concert.sample.app
```

For more info about these constants refer to the [Configuration Section of the Sample App Installation Guide](../README.md#setup-your-environment). 

### Usage

Run the following command from your terminal: 

```bash
npm run migrate
```
Once the command is run you will asked if you want to use the credentials provided in the `.env` (type `n`) file or if you want to provide each one of those via the command line (type `y`).

```bash
> ords-concert-application@1.0.0 migrate
> node ./ords/migrate.js

Do you want to set your config with the CLI? (y/n): 
```
 🚨 **Note** that defining the configuration options in a `.env` file is the recommended option and should be used instead of relying on the manual option. The use of the CLI interface is mean to be a one time usage and assumes that you do not intend to run the seeding script once the schema objects are created. 

Once the script has finished it will display all the statements that were executed and if there was an error in any of those statements. 

## Seed Script

The `seed` script is designed to populate the database with initial data, ensuring that the application has the necessary data to function correctly. It leverages the autoREST batch load functionality to efficiently insert data into the AutoREST enabled tables created by the `migrate` script. This script performs the following tasks:

1. Connects to the database using the recently created Schema Credentials.
2. Utilizes the AutoREST batch load functionality to insert initial data into the recently created tables.

You can learn more about the Seed Script in the [Seeding Scripts Documentation](seedScripts/README.md). 

### Configuration

The script requires that the following constants are defined  in a `.env` file at the same level of the `package.json` file of the ORDS Concert App project:

```python
ADB_ORDS_URL=example.com:8080/ords/
SCHEMA_NAME=CONCERT_SAMPLE_APP
SCHEMA_PASSWORD=SuperS3curePsswd
```

For more info about these constants refer to the [Configuration Section of the Sample App Installation Guide](../README.md#getting-started). 

### Usage

Run the following command from your terminal: 

```bash
npm run seed
```
Once the script has finished, it will display a resume of all of the rows that were inserted during execution and it will also report if there was during any of the batchload operations. 

```bash
> ords-concert-application@1.0.0 seed
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

## Drop Script

The `drop` script is designed to cleanly and thoroughly remove all traces of the database schema and its associated objects. This script is useful for completely removing the Concert App database components. It performs the following tasks:

1. **Dropping REST Objects**:
   - Drops all REST objects associated with the schema, including modules, templates, handlers and security clients.

2. **REST Disabling the Schema**:
   - REST disables the schema, removing its capability to support RESTful web services.

3. **Disconnecting Active Sessions**:
   - Disconnects any active user sessions to ensure that no operations are being performed on the schema during the deletion process.

4. **Deleting Schema Database Objects**:
   - Deletes all database objects within the schema, such as tables, indexes, triggers, and views.

You can learn more about the Drop Script in the [Utils Scripts Documentation](utils/README.md). 

### Configuration

The script requires that the following constants are defined  in a `.env` file at the same level of the `package.json` file of the ORDS Concert App project:

```python
ADB_ORDS_URL=example.com:8080/ords/
ADB_ADMIN_USERNAME=username
ADB_ADMIN_PASSWORD=password
SCHEMA_NAME=CONCERT_SAMPLE_APP
SCHEMA_PASSWORD=SuperS3curePsswd
```

For more info about these constants refer to the [Configuration Section of the Sample App Installation Guide](../README.md#getting-started). 

### Usage

Run the following command from your terminal: 

```bash
npm run drop
```

Once the script has finished it will display a resume of all REST SQL calls that were executed. 

```bash
> ords-concert-application@1.0.0 drop
> node ./ords/drop.js

id : 4
statement :      DROP USER CONCERT_SAMPLE_APP CASCADE
response:  
User CONCERT_SAMPLE_APP dropped.
```