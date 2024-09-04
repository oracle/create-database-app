/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import type { ErrorResponse } from '@remix-run/node';
import { isORDSError } from '../models/ORDSError';
import { isServletError } from '../models/ServletError';

/**
 * Performs a GET request to the specified ORDS endpoint and checks the status code of the call
 * if the response is of the type ORDSError an ErrorResponse is thrown so the appropriate
 * Error Boundary function can render it properly.
 * @param endpoint the ORDS endpoint to fetch.
 * @param authCredentials The user credentials to authenticate the user.
 * @returns The endpoint response, in json format.
 * @throws an Error Response whit relevant error information.
 */
async function ORDSFetcher(endpoint : string | URL, authCredentials: string) {
  let url;
  if (typeof endpoint === 'string') {
    try {
      url = new URL(endpoint);
    } catch (e : unknown) {
      if (e instanceof Error) {
        const errorMessage = 'Something went wrong while trying to query one of our ORDS endpoints.';
        throw new Response(errorMessage, {
          status: 500,
          statusText: e.message,
        } as ErrorResponse);
      }
    }
  } else {
    url = endpoint;
  }
  const getItems = await fetch(url!, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: authCredentials,
    },
  });
  if (!getItems.ok) {
    const errorMessage = 'Something went wrong while trying to query one of our ORDS endpoints.';
    throw new Response(errorMessage, {
      status: getItems.status,
      statusText: getItems.statusText,
    } as ErrorResponse);
  }
  const items = await getItems.json();
  if (isORDSError(items) || isServletError(items)) {
    const errorMessage = 'Something went wrong while trying to query one of our ORDS endpoints.';
    throw new Response(errorMessage, {
      status: getItems.status,
      statusText: items.message,
    } as ErrorResponse);
  }
  return items;
}

export default ORDSFetcher;
