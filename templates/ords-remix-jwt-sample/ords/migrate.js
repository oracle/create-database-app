/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import * as dotenv from 'dotenv';
import path from 'path';
import createSchema from './RESTfulServices/RESTSchema.js';
import createObjects from './migrateScripts/schemaObjects.js';
import createModules from './migrateScripts/defineModules.js';
import protectEndpoints from './migrateScripts/protectEndpoints.js';
import autoRESTEnableObjects from './migrateScripts/autoRESTEnableObjects.js';
import setConfig from './utils/enviroment.js';

dotenv.config({ path: `${path.resolve()}/.env` });
let {
  ADB_ORDS_URL,
  SCHEMA_NAME,
  SCHEMA_PASSWORD,
  ADB_ADMIN_USER,
  ADB_ADMIN_PASSWORD,
} = process.env;
let ORDS_ADMIN_AUTH_CREDENTIALS = `${ADB_ADMIN_USER}:${ADB_ADMIN_PASSWORD}`;
let BASIC_ADMIN_AUTH = `Basic ${Buffer.from(ORDS_ADMIN_AUTH_CREDENTIALS).toString('base64')}`;
let ORDS_SCHEMA_AUTH_CREDENTIALS = `${SCHEMA_NAME}:${SCHEMA_PASSWORD}`;
let BASIC_SCHEMA_AUTH = `Basic ${Buffer.from(ORDS_SCHEMA_AUTH_CREDENTIALS).toString('base64')}`;
let ADB_ADMIN_ENDPOINT = `${ADB_ORDS_URL}${ADB_ADMIN_USER.toLowerCase()}/_/sql`;
let ADB_SCHEMA_ENDPOINT = `${ADB_ORDS_URL}${SCHEMA_NAME.toLowerCase()}/_/sql`;

const { JWT_ISSUER } = process.env;
const { JWT_VERIFICATION_KEY } = process.env;
const { JWT_AUDIENCE } = process.env;

/**
 * Uses CLI and .env to set environment constants.
 */
async function setEnvironment() {
  const envConfig = await setConfig();
  if (Object.keys(envConfig).length > 0) {
    ADB_ORDS_URL = envConfig.ADB_ORDS_URL || ADB_ORDS_URL;
    SCHEMA_NAME = envConfig.SCHEMA_NAME || SCHEMA_NAME;
    SCHEMA_PASSWORD = envConfig.SCHEMA_PASSWORD || SCHEMA_PASSWORD;
    ADB_ADMIN_USER = envConfig.ADB_ADMIN_USER || ADB_ADMIN_USER;
    ADB_ADMIN_PASSWORD = envConfig.ADB_ADMIN_PASSWORD || ADB_ADMIN_PASSWORD;
    ORDS_ADMIN_AUTH_CREDENTIALS = `${ADB_ADMIN_USER}:${ADB_ADMIN_PASSWORD}`;
    BASIC_ADMIN_AUTH = `Basic ${Buffer.from(ORDS_ADMIN_AUTH_CREDENTIALS).toString('base64')}`;
    ORDS_SCHEMA_AUTH_CREDENTIALS = `${SCHEMA_NAME}:${SCHEMA_PASSWORD}`;
    BASIC_SCHEMA_AUTH = `Basic ${Buffer.from(ORDS_SCHEMA_AUTH_CREDENTIALS).toString('base64')}`;
    ADB_ADMIN_ENDPOINT = `${ADB_ORDS_URL}${ADB_ADMIN_USER.toLowerCase()}/_/sql`;
    ADB_SCHEMA_ENDPOINT = `${ADB_ORDS_URL}${SCHEMA_NAME.toLowerCase()}/_/sql`;
  }
}

/**
 * migrate script, creates the schema, objects, modules, and more.
 */
async function migrate() {
  await setEnvironment();
  await createSchema(SCHEMA_NAME, SCHEMA_PASSWORD, ADB_ADMIN_ENDPOINT, BASIC_ADMIN_AUTH);
  await createObjects(ADB_SCHEMA_ENDPOINT, BASIC_SCHEMA_AUTH);
  await createModules(ADB_SCHEMA_ENDPOINT, BASIC_SCHEMA_AUTH);
  await protectEndpoints(
    ADB_SCHEMA_ENDPOINT,
    BASIC_SCHEMA_AUTH,
    JWT_ISSUER,
    JWT_AUDIENCE,
    JWT_VERIFICATION_KEY,
  );
  await autoRESTEnableObjects(SCHEMA_NAME, ADB_SCHEMA_ENDPOINT, BASIC_SCHEMA_AUTH);
}

migrate();
