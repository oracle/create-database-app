/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import type { LoaderFunctionArgs } from '@remix-run/node';
import { json, ErrorResponse } from '@remix-run/node';
import {
  useRouteError,
  isRouteErrorResponse,
  Outlet,
  Link,
} from '@remix-run/react';
import React, { ReactElement } from 'react';
import { auth } from '~/utils/auth.server';
import ErrorComponent from '../components/error/ErrorPage';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url);
  const enableTooltips = searchParams.has('tooltips');
  const {
    profile,
  } = await auth.isAuthenticated(request, {
    failureRedirect: `/error${enableTooltips ? '?tooltips' : ''}`,
  });
  return json({
    profile,
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
      <div>
        <h1 className="text-3xl font-semibold">
          {error.status}
          {' '}
          -
          {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
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
 * Renders a log out button in addition to the profile information that Auth0 provides to us.
 * @returns Log out button and Profile information.
 */
export default function Screen() : ReactElement {
  enum Tabs {
    PROFILE = 0,
    FOLLOWED_ARTISTS,
    UPCOMING_SHOWS,
  }
  const [selectedTab, setSelectedTab] = React.useState(Tabs.PROFILE);
  const handleTabSelect = (tab: number) => {
    setSelectedTab(tab);
  };
  return (
    <div className="flex size-full flex-col bg-white">
      <div className="flex flex-col p-8 font-mono">
        <h1 className="mb-4 text-4xl font-extrabold">Your profile</h1>
        <p className="text-xl">Take a look at your followed artists and upcoming events.</p>
      </div>
      <div className="flex h-4/5 flex-row justify-center p-8">
        <div className="flex w-1/5 flex-col items-start">
          <Link to="/private/profile" onClick={() => { handleTabSelect(Tabs.PROFILE); }} className={`w-full py-4 text-xl ${selectedTab === Tabs.PROFILE ? 'bg-slate-100' : ''}`}>
            Profile
          </Link>
          <Link to="/private/followed-artists" onClick={() => { handleTabSelect(Tabs.FOLLOWED_ARTISTS); }} className={`w-full py-4 text-xl ${selectedTab === Tabs.FOLLOWED_ARTISTS ? 'bg-slate-100' : ''}`}>
            Followed Artists
          </Link>
          <Link to="/private/followed-events" onClick={() => { handleTabSelect(Tabs.UPCOMING_SHOWS); }} className={`w-full py-4 text-xl ${selectedTab === Tabs.UPCOMING_SHOWS ? 'bg-slate-100' : ''}`}>
            Followed Events
          </Link>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
