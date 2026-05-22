/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import { executeWithLogging } from '../utils/sqlExecutionLogger.js';

const IDENTIFIER_PATTERN = /^[A-Za-z][A-Za-z0-9_$#]*$/;

/**
 * Validates and normalizes an Oracle identifier.
 * @param {string} identifier the raw identifier.
 * @param {string} fieldName the field name for error messages.
 * @returns {string} the validated uppercase identifier.
 */
function normalizeIdentifier(identifier, fieldName) {
  if (!identifier || !IDENTIFIER_PATTERN.test(identifier)) {
    throw new Error(`Invalid ${fieldName}. Use only Oracle identifier-safe characters.`);
  }
  return identifier.toUpperCase();
}

/**
 * Escapes a password so it can be used as a quoted Oracle password literal.
 * @param {string} password the password to escape.
 * @returns {string} quoted password.
 */
function getQuotedPassword(password) {
  return `"${password.replaceAll('"', '""')}"`;
}

/**
 * Checks if an Oracle user already exists.
 * @param {import('oracledb').Connection} connection the admin connection.
 * @param {string} schemaName the schema name.
 * @returns {Promise<boolean>} true when the user exists.
 */
async function userExists(connection, schemaName) {
  const result = await executeWithLogging(
    connection,
    'SELECT COUNT(*) FROM ALL_USERS WHERE USERNAME = :schemaName',
    { schemaName },
  );
  return (result.rows?.[0]?.[0] || 0) > 0;
}

/**
 * Creates the schema user and grants required object privileges.
 * This workflow intentionally avoids ORDS package calls in the target database.
 * @param {import('oracledb').Connection} connection the admin connection.
 * @param {string} schemaName the schema name.
 * @param {string} schemaPassword the schema password.
 */
async function createSchema(connection, schemaName, schemaPassword) {
  const normalizedSchemaName = normalizeIdentifier(schemaName, 'SCHEMA_NAME');
  if (!schemaPassword || schemaPassword.trim() === '') {
    throw new Error('Missing required setting: SCHEMA_PASSWORD');
  }

  const quotedPassword = getQuotedPassword(schemaPassword);
  if (await userExists(connection, normalizedSchemaName)) {
    await executeWithLogging(
      connection,
      `ALTER USER ${normalizedSchemaName} IDENTIFIED BY ${quotedPassword}`,
    );
  } else {
    await executeWithLogging(connection, `
      CREATE USER ${normalizedSchemaName}
      IDENTIFIED BY ${quotedPassword}
      DEFAULT TABLESPACE DATA
      QUOTA UNLIMITED ON DATA
    `);
  }

  await executeWithLogging(
    connection,
    `ALTER USER ${normalizedSchemaName} QUOTA UNLIMITED ON DATA`,
  );
  await executeWithLogging(connection, `
    GRANT CREATE PROCEDURE,
          CREATE SEQUENCE,
          CREATE SESSION,
          CREATE SYNONYM,
          CREATE TABLE,
          CREATE TRIGGER,
          CREATE TYPE,
          CREATE VIEW
    TO ${normalizedSchemaName}
  `);
}

export default createSchema;
