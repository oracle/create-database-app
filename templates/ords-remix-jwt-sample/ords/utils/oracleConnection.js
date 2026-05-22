/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import oracledb from 'oracledb';

let oracleClientInitialized = false;

/**
 * Initializes Oracle Thick mode once for the process.
 */
function initializeOracleClient() {
  if (oracleClientInitialized) {
    return;
  }

  const libDir = process.env.ORACLE_CLIENT_LIB_DIR;
  if(!libDir)
     throw new Error("Missing required setting: ORACLE_CLIENT_LIB_DIR");
  else{
    oracledb.initOracleClient({ libDir });
    oracleClientInitialized = true;
  }
}

/**
 * Returns a required setting, throwing an error if missing.
 * @param {string | undefined} value the setting value.
 * @param {string} settingName the setting name for error messages.
 * @returns {string} the non-empty setting value.
 */
function getRequiredSetting(value, settingName) {
  if (!value || value.trim() === '') {
    throw new Error(`Missing required setting: ${settingName}`);
  }
  return value;
}

/**
 * Creates a database connection using Oracle Thick mode.
 * @param {{
 * user: string | undefined,
 * password: string | undefined,
 * connectString: string | undefined,
 * }} config the connection configuration.
 * @returns {Promise<oracledb.Connection>} the database connection.
 */
export async function getConnection(config) {
  initializeOracleClient();
  return oracledb.getConnection({
    user: getRequiredSetting(config.user, 'user'),
    password: getRequiredSetting(config.password, 'password'),
    connectString: getRequiredSetting(config.connectString, 'BD_CONNECT_STRING'),
  });
}

/**
 * Closes a database connection when it exists.
 * @param {oracledb.Connection | undefined} connection the connection to close.
 */
export async function closeConnection(connection) {
  if (connection) {
    await connection.close();
  }
}
