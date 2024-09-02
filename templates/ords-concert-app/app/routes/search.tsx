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
import {
  isRouteErrorResponse,
  useRouteError,
  Outlet,
  useSearchParams,
} from '@remix-run/react';
import type { LoaderError } from '~/models/LoaderError';
import {
  auth, getSession,
} from '../utils/auth.server';
import ErrorComponent from '../components/error/ErrorPage';
import SearchNavBar from '../components/search/SearchNavBar';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userProfile = await auth.isAuthenticated(request);
  const session = await getSession(request.headers.get('Cookie'));
  const error = session.get(auth.sessionErrorKey) as LoaderError;

  return json({
    error,
    userProfile,
  });
};

/**
 *
 * @returns Display the error page.
 */
export function ErrorBoundary() : ReactElement {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <ErrorComponent error={error} />
    );
  } if (error instanceof Error) {
    const unknownError : ErrorResponse = {
      status: 500,
      statusText: error.message,
      data: error.stack,
    };
    return (
      <ErrorComponent error={unknownError} />
    );
  }
  return <h1 className="text-3xl font-semibold">Unknown Error</h1>;
}
/**
 *
 * @returns Display the user homepage.
 */
export default function Search(): ReactElement {
  const [searchParams] = useSearchParams();
  const enableTooltips = searchParams.has('tooltips');
  const navPages = [
    {
      title: 'Artists',
      link: `artists?${enableTooltips ? 'tooltips' : ''}`,
    },
    {
      title: 'Concerts',
      link: `concerts?${enableTooltips ? 'tooltips' : ''}`,
    },
    {
      title: 'Venues',
      link: `venues?${enableTooltips ? 'tooltips' : ''}`,
    },
  ];
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200 p-4">
      <div className="min-h-screen min-w-full rounded-lg bg-gray-100 p-4">
        <SearchNavBar
          navPages={navPages}
        />
        <hr className="my-4 h-0.5 bg-gray-700" />
        <Outlet />
      </div>
    </div>
  );
}
