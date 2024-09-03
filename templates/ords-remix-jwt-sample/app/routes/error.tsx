/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import React, { ReactElement } from 'react';
import type {
  LoaderFunctionArgs,
} from '@remix-run/node';
import { json, ErrorResponse } from '@remix-run/node';
import type { LoaderError } from '~/models/LoaderError';
import {
  auth, getSession,
} from '../utils/auth.server';
import ErrorComponent from '../components/error/ErrorPage';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get('Cookie'));
  const error = session.get(auth.sessionErrorKey) as LoaderError;
  return json({
    error,
  });
};

/**
 *
 * @returns Display the user homepage.
 */
export default function Error(): ReactElement {
  const errorMessage = 'The action you were trying to perform requires authentication. Please sign in or log in to access this route.';
  const error = {
    status: 401,
    statusText: 'Unauthorized',
    data: errorMessage,
  } as ErrorResponse;
  return (
    <ErrorComponent error={error} />
  );
}
