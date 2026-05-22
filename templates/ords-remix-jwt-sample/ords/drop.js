/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import * as dotenv from 'dotenv';
import path from 'path';
import dropUser from './utils/dropUser.js';
import {
  closeConnection,
  getConnection,
} from './utils/oracleConnection.js';

dotenv.config({ path: `${path.resolve()}/.env` });
const {
  BD_CONNECT_STRING,
  SCHEMA_NAME,
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
 * Drop script: drops the schema and all associated objects.
 */
async function drop() {
  const connectString = getRequiredEnvVar(BD_CONNECT_STRING, 'BD_CONNECT_STRING');
  const schemaName = getRequiredEnvVar(SCHEMA_NAME, 'SCHEMA_NAME');
  const adminUser = getRequiredEnvVar(BD_ADMIN_USER, 'BD_ADMIN_USER');
  const adminPassword = getRequiredEnvVar(BD_ADMIN_PASSWORD, 'BD_ADMIN_PASSWORD');

  let adminConnection;
  try {
    adminConnection = await getConnection({
      user: adminUser,
      password: adminPassword,
      connectString,
    });
    await dropUser(adminConnection, schemaName);
    // eslint-disable-next-line no-console
    console.log(`Drop completed successfully for schema ${schemaName}.`);
  } finally {
    await closeConnection(adminConnection);
  }
}

drop().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exitCode = 1;
});
