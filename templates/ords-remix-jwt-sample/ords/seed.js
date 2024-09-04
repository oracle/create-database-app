/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import * as dotenv from 'dotenv';
import path from 'path';
import populateObjects from './seedScripts/batchload.js';
import autoRESTDisableObjects from './migrateScripts/autoRESTDisableObjects.js';

dotenv.config({ path: `${path.resolve()}/.env` });
const { ADB_ORDS_URL } = process.env;
const { SCHEMA_NAME } = process.env;
const { SCHEMA_PASSWORD } = process.env;
const ORDS_SCHEMA_AUTH_CREDENTIALS = `${SCHEMA_NAME}:${SCHEMA_PASSWORD}`;
const BASIC_SCHEMA_AUTH = `Basic ${Buffer.from(ORDS_SCHEMA_AUTH_CREDENTIALS).toString('base64')}`;
const ADB_SCHEMA_ENDPOINT = `${ADB_ORDS_URL}${SCHEMA_NAME.toLowerCase()}/`;

/**
 * Seeding script populates the schema objects with randomly generated data.
 */
async function seed() {
  await populateObjects(ADB_SCHEMA_ENDPOINT, BASIC_SCHEMA_AUTH);
  // eslint-disable-next-line no-console
  console.log('Disabling autoREST functionality...');
  await autoRESTDisableObjects(SCHEMA_NAME, ADB_SCHEMA_ENDPOINT, BASIC_SCHEMA_AUTH);
}

seed();
