/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
/*
  * Disabling the no console rule for this specific file since it allows us to communicate
  * the result of the POST requests to the user.
*/
/* eslint-disable no-console */

import fetch from 'node-fetch';

/**
 * Execute a POST request to the ORDS_RESTSQL_URL endpoint
 * using the provided auth credentials.
 * @param {string} URL  the endpoint.
 * @param {string} sql  the SQL statement to execute.
 * @param {string} authHeader the auth credentials to use.
 * @returns {Promise<JSON>} the result of the POST request.
 */
export async function postRequest(URL, sql, authHeader) {
  const request = await fetch(URL, {
    method: 'POST',
    headers: {
      Authorization: authHeader,
      'Content-Type': 'application/sql',
      Accept: 'application/json',
    },
    body: sql,
  });
  const response = await request.json();
  return response;
}

/**
 * Execute a POST request to the ORDS_REST SQL_URL endpoint
 * using the provided auth credentials and fileStream.
 * @param {string} URL  the endpoint.
 * @param {string} fileStream  the fileStream statement to batch load.
 * @param {string} authHeader the auth credentials to use.
 * @returns {Promise<string>} the result of the POST request.
 */
export async function postBatchRequest(URL, fileStream, authHeader) {
  const request = await fetch(URL, {
    method: 'POST',
    headers: {
      Authorization: authHeader,
      'Content-Type': 'text/csv',
    },
    body: fileStream,
  });
  const response = await request.text();
  return response;
}

/**
 * Print the operation response.
 * @param {JSON} response the response to print.
 */
export function printResponse(response) {
  if ('items' in response) {
    response.items.forEach((item) => {
      console.log(`id : ${item.statementId}`);
      console.log(`statement : ${item.statementText}`);
      console.log(`response:  ${item.response}`);
    });
  } else {
    console.log(response);
  }
}
