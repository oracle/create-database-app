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
  useLoaderData,
  useRouteError,
  Outlet,
  useLocation,
  useSearchParams,
} from '@remix-run/react';
import type { LoaderError } from '~/models/LoaderError';
import {
  auth, getSession,
} from '../utils/auth.server';
import {
  STATS_ENDPOINT,
  EVENTS_ENDPOINT,
  ARTISTS_ENDPOINT,
  CONCERTS_BY_CITY_ENDPOINT,
} from './constants/index.server';
import ORDSFetcher from '../utils/ORDSFetcher';
import ErrorComponent from '../components/error/ErrorPage';

import HeroBanner from '../components/homepage/HeroBanner';
import Countdown from '../components/homepage/Countdown';
import Timeline from '../components/homepage/Timeline';
import PopularArtists from '../components/homepage/PopularArtists';
import EmailForm from '../components/homepage/EmailForm';
import BannerComponent from '../components/tooltips/BannerComponent';
import BannerComponentProps from '../models/BannerComponentProps';
import featureDescriptions from '../utils/ORDSFeaturesDescription';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userProfile = await auth.isAuthenticated(request);
  const USER_CREDENTIALS = userProfile === null
    ? null
    : `${userProfile.tokenType} ${userProfile.accessToken}`;
  const session = await getSession(request.headers.get('Cookie'));
  const error = session.get(auth.sessionErrorKey) as LoaderError;
  const { searchParams } = new URL(request.url);
  const hasCityName = searchParams.has('cityName');
  const cityName = searchParams.get('cityName');
  const eventsQuery = hasCityName ? `${CONCERTS_BY_CITY_ENDPOINT}/${cityName}` : EVENTS_ENDPOINT;
  const stats = await ORDSFetcher(STATS_ENDPOINT, USER_CREDENTIALS!);
  const events = await ORDSFetcher(eventsQuery, USER_CREDENTIALS!);
  const artists = await ORDSFetcher(ARTISTS_ENDPOINT, USER_CREDENTIALS!);
  return json({
    error,
    stats,
    events,
    artists,
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
export default function Home(): ReactElement {
  const {
    stats,
    events,
    artists,
    userProfile,
  } = useLoaderData<typeof loader>();
  const HOME_BASE_ROUTE = '/home';
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const enableTooltips = searchParams.has('tooltips');
  const [userIsLoggedOut, setUserIsLoggedOut] = React.useState(userProfile === null);
  const handleBannerClose = () => {
    setUserIsLoggedOut(false);
  };

  const bannerProps: BannerComponentProps = {
    open: userIsLoggedOut && enableTooltips,
    severity: 'info',
    onClose: handleBannerClose,
    autoHideDuration: 6000,
    vertical: 'top',
    horizontal: 'center',
    feature: featureDescriptions.userNotLoggedInTooltip,
  };
  return (
    <div
      style={{
        fontFamily: 'system-ui, sans-serif',
        lineHeight: '1.8',
      }}
    >
      <BannerComponent
        open={bannerProps.open}
        severity={bannerProps.severity}
        onClose={bannerProps.onClose}
        autoHideDuration={bannerProps.autoHideDuration}
        vertical={bannerProps.vertical}
        horizontal={bannerProps.horizontal}
        feature={bannerProps.feature}
      />
      <HeroBanner stats={stats} />
      <Outlet />
      {location.pathname === HOME_BASE_ROUTE
        ? (
          <>
            <Countdown events={events} />
            <Timeline events={events} />
          </>
        )
        : null}
      <EmailForm />
      <PopularArtists artists={artists} />
    </div>
  );
}
