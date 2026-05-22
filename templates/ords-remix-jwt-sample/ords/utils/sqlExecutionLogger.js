/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
/*
  * Disabling no-console in this utility because it is dedicated to
  * operational script logging.
*/
/* eslint-disable no-console */

const MAX_STATEMENT_PREVIEW_LENGTH = 260;
const PREVIEW_ELLIPSIS = '...';
const DML_VERBS_WITH_ROW_COUNT = ['INSERT', 'UPDATE', 'DELETE'];
let statementCounter = 0;

/**
 * Formats SQL into a single line for readable logs.
 * @param {string} statement the SQL statement.
 * @returns {string} normalized statement.
 */
function normalizeStatement(statement) {
  return statement.replace(/\s+/g, ' ').trim();
}

/**
 * Returns the first SQL verb from a statement.
 * @param {string} statement the SQL statement.
 * @returns {string} uppercase SQL verb or empty string.
 */
function getStatementVerb(statement) {
  const normalizedStatement = normalizeStatement(statement);
  const [verb = ''] = normalizedStatement.split(' ');
  return verb.toUpperCase();
}

/**
 * Creates a statement preview that stays compact in terminal output.
 * @param {string} statement the SQL statement.
 * @returns {string} statement preview.
 */
function getStatementPreview(statement) {
  const normalizedStatement = normalizeStatement(statement);
  if (normalizedStatement.length <= MAX_STATEMENT_PREVIEW_LENGTH) {
    return normalizedStatement;
  }

  const previewLength = MAX_STATEMENT_PREVIEW_LENGTH - PREVIEW_ELLIPSIS.length;
  return `${normalizedStatement.slice(0, previewLength)}${PREVIEW_ELLIPSIS}`;
}

/**
 * Formats rowsAffected for logging.
 * @param {import('oracledb').Result<unknown>} result the execution result.
 * @returns {string} rows affected display.
 */
function getRowsAffectedDisplay(result) {
  if (typeof result.rowsAffected === 'number') {
    return `${result.rowsAffected}`;
  }
  return 'N/A';
}

/**
 * Determines if rows affected should be displayed for the statement.
 * @param {string} statement the SQL statement.
 * @returns {boolean} true when statement is INSERT/UPDATE/DELETE.
 */
function shouldDisplayRowsAffected(statement) {
  return DML_VERBS_WITH_ROW_COUNT.includes(getStatementVerb(statement));
}

/**
 * Prints a standard SQL execution log line set.
 * @param {string} statement the SQL statement.
 * @param {import('oracledb').Result<unknown>} result the execution result.
 */
function printExecutionResult(statement, result) {
  statementCounter += 1;
  console.log(`id : ${statementCounter}`);
  console.log(`statement : ${getStatementPreview(statement)}`);
  if (shouldDisplayRowsAffected(statement)) {
    console.log(`rows affected: ${getRowsAffectedDisplay(result)}`);
  }
  console.log('response: Statement executed successfully.');
}

/**
 * Executes SQL and logs statement text and rows affected.
 * @param {import('oracledb').Connection} connection the database connection.
 * @param {string} statement the SQL statement.
 * @param {import('oracledb').BindParameters} [binds] optional binds.
 * @param {import('oracledb').ExecuteOptions} [options] optional execute options.
 * @returns {Promise<import('oracledb').Result<unknown>>} execution result.
 */
export async function executeWithLogging(connection, statement, binds = {}, options = {}) {
  const result = await connection.execute(statement, binds, options);
  printExecutionResult(statement, result);
  return result;
}

/**
 * Executes SQL in bulk and logs statement text and rows affected.
 * @param {import('oracledb').Connection} connection the database connection.
 * @param {string} statement the SQL statement.
 * @param {Array<import('oracledb').BindParameters>} bindsArray bind rows.
 * @param {import('oracledb').ExecuteManyOptions} [options] optional executeMany options.
 * @returns {Promise<import('oracledb').Result<unknown>>} execution result.
 */
export async function executeManyWithLogging(
  connection,
  statement,
  bindsArray,
  options = {},
) {
  const result = await connection.executeMany(statement, bindsArray, options);
  printExecutionResult(statement, result);
  return result;
}
