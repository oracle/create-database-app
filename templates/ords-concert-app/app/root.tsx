/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import type {
  LinksFunction,
  LoaderFunctionArgs,
} from '@remix-run/node';
import { json, ErrorResponse } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';
import { ReactElement } from 'react';
import { StyledEngineProvider } from '@mui/material';
import datepicker from 'react-datepicker/dist/react-datepicker.css';
import stylesheet from './tailwind.css?url';
import type { LoaderError } from './models/LoaderError';
import {
  auth, getSession,
} from './utils/auth.server';
import NavBar from './components/navbar/NavBar';
import {
  BASIC_SCHEMA_AUTH,
  CITIES_ENDPOINT,
} from './routes/constants/index.server';
import TooltipButton from './components/tooltips/TooltipButton';
import ErrorComponent from './components/error/ErrorPage';
import ORDSFetcher from './utils/ORDSFetcher';
import Footer from './components/homepage/Footer';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userProfile = await auth.isAuthenticated(request);
  const profile = userProfile?.profile || null;
  const USER_CREDENTIALS = userProfile === null
    ? BASIC_SCHEMA_AUTH
    : `${userProfile.tokenType} ${userProfile.accessToken}`;
  const session = await getSession(request.headers.get('Cookie'));
  const error = session.get(auth.sessionErrorKey) as LoaderError;

  const cities = await ORDSFetcher(CITIES_ENDPOINT, USER_CREDENTIALS);
  if (cities.items.length === 0) {
    const errorMessage = 'The cities endpoint has no elements. Review your database configuration and try again.';
    throw new Response(errorMessage, {
      status: 404,
      statusText: 'Not Found',
    } as ErrorResponse);
  }

  return json({
    profile,
    error,
    cities,
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
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body>
          <StyledEngineProvider injectFirst>
            <ErrorComponent error={error} />
            <TooltipButton />
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </StyledEngineProvider>
        </body>
      </html>
    );
  } if (error instanceof Error) {
    const unknownError : ErrorResponse = {
      status: 500,
      statusText: error.message,
      data: error.stack,
    };
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body>
          <StyledEngineProvider injectFirst>
            <ErrorComponent error={unknownError} />
            <TooltipButton />
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </StyledEngineProvider>
        </body>
      </html>
    );
  }
  return <h1 className="text-3xl font-semibold">Unknown Error</h1>;
}

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: stylesheet,
  },
  {
    rel: 'stylesheet',
    href: datepicker,
  },
];

/**
 *
 * @returns the Root element of the app.
 */
export default function App() : ReactElement {
  const {
    profile,
    cities,
  } = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <StyledEngineProvider injectFirst>
          <NavBar user={profile} cities={cities} />
          <Outlet />
          <TooltipButton />
          <Footer />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </StyledEngineProvider>
      </body>
    </html>
  );
}
