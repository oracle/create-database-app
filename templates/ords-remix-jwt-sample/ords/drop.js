/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import * as dotenv from 'dotenv';
import path from 'path';
import dropUser from './utils/dropUser.js';

dotenv.config({ path: `${path.resolve()}/.env` });
const {
  ADB_ORDS_URL, SCHEMA_NAME,
  ADB_ADMIN_USER,
  ADB_ADMIN_PASSWORD,
} = process.env;
const ORDS_ADMIN_AUTH_CREDENTIALS = `${ADB_ADMIN_USER}:${ADB_ADMIN_PASSWORD}`;
const BASIC_ADMIN_AUTH = `Basic ${Buffer.from(ORDS_ADMIN_AUTH_CREDENTIALS).toString('base64')}`;
const ADB_ADMIN_ENDPOINT = `${ADB_ORDS_URL}admin/_/sql`;

/**
 * drop script, drops the schema and all of the objects associated to it.
 */
async function drop() {
  await dropUser(SCHEMA_NAME, ADB_ADMIN_ENDPOINT, BASIC_ADMIN_AUTH);
}

drop();
