/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import * as dotenv from 'dotenv';
import path from 'path';
import populateObjects from './seedScripts/batchload.js';
import {
  closeConnection,
  getConnection,
} from './utils/oracleConnection.js';

dotenv.config({ path: `${path.resolve()}/.env` });
const {
  BD_CONNECT_STRING,
  SCHEMA_NAME,
  SCHEMA_PASSWORD,
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
 * Seeding script populates the schema objects with sample data using direct SQL.
 */
async function seed() {
  const connectString = getRequiredEnvVar(BD_CONNECT_STRING, 'BD_CONNECT_STRING');
  const schemaName = getRequiredEnvVar(SCHEMA_NAME, 'SCHEMA_NAME');
  const schemaPassword = getRequiredEnvVar(SCHEMA_PASSWORD, 'SCHEMA_PASSWORD');

  let schemaConnection;
  try {
    schemaConnection = await getConnection({
      user: schemaName,
      password: schemaPassword,
      connectString,
    });
    await populateObjects(schemaConnection);
  } finally {
    await closeConnection(schemaConnection);
  }
}

seed().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exitCode = 1;
});
