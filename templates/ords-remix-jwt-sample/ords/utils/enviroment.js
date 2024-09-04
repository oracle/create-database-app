/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import * as readline from 'node:readline/promises';
import {
  stdin as input,
  stdout as output,
} from 'node:process';
/*
  * Disabling the no console rule for this specific route since it
  * allows us to communicate with the user.
*/
/* eslint-disable no-console */
const MIN_PASSWORD_LENGTH = 8;
/**
 * @typedef {{
    ADB_ORDS_URL: string;
    ADB_ADMIN_USERNAME: string;
    ADB_ADMIN_PASSWORD: string;
    SCHEMA_NAME: string;
    SCHEMA_PASSWORD: string | Promise<string>;}} config
 */
/**
 * Will show CLI prompt to user to dynamically set credentials
 * @returns {config} the expected user credentials to properly execute the ORDs scrips.
 */
async function setConfig() {
  const config = {};
  const rl = readline.createInterface({
    input,
    output,
  });
  const useCli = await rl.question('Do you want to set your config with the CLI? (y/n): ') || 'n';
  if (useCli.toLocaleLowerCase() === 'y') {
    config.ADB_ORDS_URL = await rl.question('ORDS URL: ') || 'example.com:8080/ords/';
    config.ADB_ADMIN_USERNAME = await rl.question('Admin username: ') || 'ADMIN';
    config.ADB_ADMIN_PASSWORD = await rl.question('Admin password: ') || 'oracle';
    config.SCHEMA_NAME = await rl.question('Schema Name: ') || 'HR';
    config.SCHEMA_PASSWORD = await rl.question('Schema Password: ') || 'oracle';
    while (config.SCHEMA_PASSWORD.length < MIN_PASSWORD_LENGTH) {
      console.log('Password length less than 8, try again.');
      config.SCHEMA_PASSWORD = rl.question('Schema Password: ') || 'oracle';
    }
  }
  rl.close();
  return config;
}

export default setConfig;
