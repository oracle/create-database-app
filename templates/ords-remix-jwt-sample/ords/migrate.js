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
import {
  closeConnection,
  getConnection,
} from './utils/oracleConnection.js';

dotenv.config({ path: `${path.resolve()}/.env` });

const {
  BD_CONNECT_STRING,
  SCHEMA_NAME,
  SCHEMA_PASSWORD,
  BD_ADMIN_USER,
  BD_ADMIN_PASSWORD,
} = process.env;

/**
 * Returns a required environment variable and throws when missing.
 * @param {string | undefined} value the variable value.
 * @param {string} variableName the variable name.
 * @returns {string} the non-empty variable value.
 */
function getRequiredEnvVar(value, variableName) {
  if (!value || value.trim() === '') {
    throw new Error(`Missing required environment variable: ${variableName}`);
  }
  return value;
}

/**
 * Migrate script: creates schema and schema objects using direct SQL.
 */
async function migrate() {
  const connectString = getRequiredEnvVar(BD_CONNECT_STRING, 'BD_CONNECT_STRING');
  const schemaName = getRequiredEnvVar(SCHEMA_NAME, 'SCHEMA_NAME');
  const schemaPassword = getRequiredEnvVar(SCHEMA_PASSWORD, 'SCHEMA_PASSWORD');
  const adminUser = getRequiredEnvVar(BD_ADMIN_USER, 'BD_ADMIN_USER');
  const adminPassword = getRequiredEnvVar(BD_ADMIN_PASSWORD, 'BD_ADMIN_PASSWORD');

  let adminConnection;
  let schemaConnection;

  try {
    adminConnection = await getConnection({
      user: adminUser,
      password: adminPassword,
      connectString,
    });
    await createSchema(adminConnection, schemaName, schemaPassword);

    schemaConnection = await getConnection({
      user: schemaName,
      password: schemaPassword,
      connectString,
    });
    await createObjects(schemaConnection);
    // eslint-disable-next-line no-console
    console.log(`Migrate completed successfully for schema ${schemaName}.`);
  } finally {
    await closeConnection(schemaConnection);
    await closeConnection(adminConnection);
  }
}

migrate().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exitCode = 1;
});
