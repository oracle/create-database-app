# ORDS Concert App - ORDS Management Scripts

![ORDS Logo](../images/ORDS.png)

## Overview

This folder contains scripts used to manage the ORDS Concert App backend lifecycle:

- `migrate` to create schema + database objects (no ORDS package calls)
- `seed` to insert starter CSV data with direct SQL inserts
- `drop` to remove the schema and related objects

## Script Summary

| Script | Command | Purpose |
|---|---|---|
| Migrate | `npm run migrate` | Creates schema user + tables/views/sequences/triggers |
| Seed | `npm run seed` | Loads starter CSV data directly into schema tables |
| Drop | `npm run drop` | Drops sample schema and schema objects |

## Environment Variables

The `.env.example` file is focused on app runtime + OIDC settings. If you run ORDS management scripts, include these additional values in `.env`.

### Required for `npm run migrate`

```bash
BD_CONNECT_STRING=<host>:<port>/<service_name>
ORACLE_CLIENT_LIB_DIR=/<path>/instantclient_23_26
BD_ADMIN_USER=BD_admin
BD_ADMIN_PASSWORD=<admin_password>
SCHEMA_NAME=ORDS_CONCERT_APP
SCHEMA_PASSWORD=<schema_password>
```

### Required for `npm run seed`

```bash
BD_CONNECT_STRING=<host>:<port>/<service_name>
ORACLE_CLIENT_LIB_DIR=/<path>/instantclient_23_26
SCHEMA_NAME=ORDS_CONCERT_APP
SCHEMA_PASSWORD=<schema_password>
```

### Required for `npm run drop`

```bash
BD_CONNECT_STRING=<host>:<port>/<service_name>
ORACLE_CLIENT_LIB_DIR=/<path>/instantclient_23_26
BD_ADMIN_USER=BD_admin
BD_ADMIN_PASSWORD=<admin_password>
SCHEMA_NAME=ORDS_CONCERT_APP
```

## OCI Database API Gateway / OCS

Use the ords-sample-app skill to generate API spec and auto API spec.

Review generated payloads before executing in shared environments.

## Additional Documentation

- [Security and endpoint protection](./security/README.MD)
- [Module definitions and endpoint modeling](./modules/README.md)
- [Migration scripts details](./migrateScripts/README.md)
- [Seed scripts details](./seedScripts/README.md)
- [Drop script details](./utils/README.md)

## Disclaimer

All names, characters, organizations, places, events and portrayals are entirely fictional for the sole purpose of this application's demonstration. Any resemblance to actual persons (living or dead) or actual entities or events is purely coincidental.
