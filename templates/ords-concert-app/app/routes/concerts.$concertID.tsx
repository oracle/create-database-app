/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import type {
  LoaderFunctionArgs,
  ActionFunctionArgs,
  ErrorResponse,
} from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  Outlet,
  useLoaderData,
  useRouteError,
  isRouteErrorResponse,
} from '@remix-run/react';
import { Divider } from '@mui/material';
import { ReactElement } from 'react';
import {
  auth,
  getSession,
} from '~/utils/auth.server';
import type { LoaderError } from '~/models/LoaderError';
import ConcertBanner from '../components/concerts/ConcertBanner';
import ConcertCountdown from '../components/concerts/ConcertCountdown';
import ConcertDetails from '../components/concerts/ConcertDetails';
import {
  EVENT_ENDPOINT,
  LIKED_EVENT_ENDPOINT,
  BASIC_SCHEMA_AUTH,
} from './constants/index.server';
import { UserActions } from '../utils/UserActions';
import ORDSFetcher from '../utils/ORDSFetcher';
import type Concert from '../models/ORDSConcert';
import ORDSResponse from '../models/ORDSResponse';
import ErrorComponent from '../components/error/ErrorPage';

export const action = async ({ request }: ActionFunctionArgs) => {
  const {
    tokenType,
    accessToken,
  } = await auth.isAuthenticated(request, {
    failureRedirect: '/error',
  });
  const USER_JWT_AUTH = `${tokenType} ${accessToken}`;
  const formData = await request.formData();
  const {
    kind, ...values
  } = Object.fromEntries(formData);

  if (kind === UserActions.INTERESTED) {
    // Add user to the interested table here
  }
  if (kind === UserActions.NOT_INTERESTED) {
    // Delete user from the interested table here
  }

  if (kind === UserActions.SUBSCRIBE) {
    const susbscribeToEvent = await fetch(LIKED_EVENT_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: USER_JWT_AUTH,
      },
    });
    const subResult = await susbscribeToEvent.json();
    return subResult;
  }

  if (kind === UserActions.UNSUBSCRIBE) {
    const unsusbscribeToEvent = await fetch(LIKED_EVENT_ENDPOINT, {
      method: 'DELETE',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: USER_JWT_AUTH,
      },
    });
    const unsubResult = await unsusbscribeToEvent.json();
    return unsubResult;
  }
  return null;
};

export const loader = async ({
  params, request,
}: LoaderFunctionArgs) => {
  const userProfile = await auth.isAuthenticated(request);
  const profile = userProfile?.profile || null;
  const USER_CREDENTIALS = userProfile === null
    ? BASIC_SCHEMA_AUTH
    : `${userProfile.tokenType} ${userProfile.accessToken}`;
  const session = await getSession(request.headers.get('Cookie'));
  const error = session.get(auth.sessionErrorKey) as LoaderError;
  const { concertID } = params;
  const concert = await ORDSFetcher(`${EVENT_ENDPOINT}/${concertID}`, USER_CREDENTIALS) as ORDSResponse<Concert>;
  if (concert.items.length === 0) {
    const errorMessage = 'The Concert you were looking for does not exist, might have been removed or had its id changed.';
    throw new Response(errorMessage, {
      status: 404,
      statusText: 'Not Found',
    } as ErrorResponse);
  }
  let likedConcert = false;
  if (profile !== null) {
    const userID = profile.id;
    const userLikedConcert = await ORDSFetcher(`${LIKED_EVENT_ENDPOINT}/${userID}/${concertID}`, USER_CREDENTIALS);
    likedConcert = userLikedConcert.likedevent === 1;
  }

  return json({
    profile,
    error,
    concertID,
    concert,
    likedConcert,
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
 * Display the concerts info page. Data displayed will depend on concert ID
 * @returns The concert page.
 */
export default function ConcertID() : ReactElement {
  const {
    profile,
    concert,
    likedConcert,
  } = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col">
      <ConcertBanner
        concert={concert}
        user={profile}
        likedConcert={likedConcert}
      />
      <ConcertCountdown concert={concert} />
      <Divider
        component="div"
        variant="middle"
        sx={{
          border: '2px solid',
        }}
      />
      <ConcertDetails concert={concert} />
      <Outlet />
    </div>
  );
}
