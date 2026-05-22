/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import { executeWithLogging } from './sqlExecutionLogger.js';

const IDENTIFIER_PATTERN = /^[A-Za-z][A-Za-z0-9_$#]*$/;
const ORA_INVALID_IDENTIFIER = 904;
const ORA_TABLE_OR_VIEW_DOES_NOT_EXIST = 942;
const ORA_INSUFFICIENT_PRIVILEGES = 1031;
const ORA_USER_DOES_NOT_EXIST = 1918;
const IGNORABLE_SESSION_KILL_ERRORS = [
  ORA_INVALID_IDENTIFIER,
  ORA_TABLE_OR_VIEW_DOES_NOT_EXIST,
  ORA_INSUFFICIENT_PRIVILEGES,
];

/**
 * Validates and normalizes an Oracle identifier.
 * @param {string} identifier the raw identifier.
 * @returns {string} uppercase Oracle-safe identifier.
 */
function normalizeIdentifier(identifier) {
  if (!identifier || !IDENTIFIER_PATTERN.test(identifier)) {
    throw new Error('Invalid SCHEMA_NAME. Use only Oracle identifier-safe characters.');
  }
  return identifier.toUpperCase();
}

/**
 * Kills active sessions for a schema, when permitted.
 * @param {import('oracledb').Connection} connection the admin connection.
 * @param {string} schemaName uppercase schema name.
 */
async function killSchemaSessions(connection, schemaName) {
  try {
    await executeWithLogging(
      connection,
      `BEGIN
         FOR schema_session IN (
           SELECT sid, serial#, inst_id
           FROM gv$session
           WHERE username = :schemaName
         ) LOOP
           EXECUTE IMMEDIATE
             'alter system kill session ''' ||
             schema_session.sid || ',' || schema_session.serial# || ',@' ||
             schema_session.inst_id || ''' immediate';
         END LOOP;
       END;`,
      { schemaName },
    );
  } catch (error) {
    if (!IGNORABLE_SESSION_KILL_ERRORS.includes(error.errorNum)) {
      throw error;
    }
  }
}

/**
 * Drops a schema and all associated objects.
 * @param {import('oracledb').Connection} connection the admin connection.
 * @param {string} schemaName the schema to drop.
 */
async function dropUser(connection, schemaName) {
  const normalizedSchemaName = normalizeIdentifier(schemaName);
  await killSchemaSessions(connection, normalizedSchemaName);

  try {
    await executeWithLogging(connection, `DROP USER ${normalizedSchemaName} CASCADE`);
  } catch (error) {
    if (error.errorNum !== ORA_USER_DOES_NOT_EXIST) {
      throw error;
    }
  }
}

export default dropUser;
