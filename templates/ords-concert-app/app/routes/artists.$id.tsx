/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import { ReactElement } from 'react';
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  ErrorResponse,
  json,
} from '@remix-run/node';
import {
  Outlet,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';
import ArtistHome from '../components/artists/ArtistHome';
import {
  ARTISTS_ENDPOINT,
  ARTIST_ENDPOINT,
  ARTIST_EVENT_ENDPOINT,
  BASIC_SCHEMA_AUTH,
  CITIES_ENDPOINT,
  LIKED_ARTIST_ENDPOINT,
} from './constants/index.server';
import {
  auth,
  getSession,
} from '~/utils/auth.server';
import { LoaderError } from '../models/LoaderError';
import { UserActions } from '../utils/UserActions';
import ORDSFetcher from '../utils/ORDSFetcher';
import ORDSResponse from '../models/ORDSResponse';
import Artist from '../models/Artist';
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

  if (kind === UserActions.SUBSCRIBE) {
    const susbscribeToArtist = await fetch(LIKED_ARTIST_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: USER_JWT_AUTH,
      },
    });
    const subResult = await susbscribeToArtist.json();
    return subResult;
  }

  if (kind === UserActions.UNSUBSCRIBE) {
    const unsusbscribeToArtist = await fetch(LIKED_ARTIST_ENDPOINT, {
      method: 'DELETE',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: USER_JWT_AUTH,
      },
    });
    const unsubResult = await unsusbscribeToArtist.json();
    return unsubResult;
  }
  return null;
};

export const loader = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  const userProfile = await auth.isAuthenticated(request);
  const profile = userProfile?.profile || null;
  const USER_CREDENTIALS = userProfile === null
    ? BASIC_SCHEMA_AUTH
    : `${userProfile.tokenType} ${userProfile.accessToken}`;
  const session = await getSession(request.headers.get('Cookie'));
  const error = session.get(auth.sessionErrorKey) as LoaderError;
  const { id: artistID } = params;
  let likedArtist = false;
  const artist = await ORDSFetcher(`${ARTIST_ENDPOINT}/${artistID}`, USER_CREDENTIALS) as ORDSResponse<Artist>;
  if (artist.items.length === 0) {
    const errorMessage = 'The Artist you were looking for does not exist, might have been removed or had its id changed.';
    throw new Response(errorMessage, {
      status: 404,
      statusText: 'Not Found',
    } as ErrorResponse);
  }
  const artistEvents = await ORDSFetcher(`${ARTIST_EVENT_ENDPOINT}/${artistID}`, USER_CREDENTIALS);
  const similarArtists = await ORDSFetcher(ARTISTS_ENDPOINT, USER_CREDENTIALS);
  const cities = await ORDSFetcher(CITIES_ENDPOINT, USER_CREDENTIALS);
  if (profile) {
    const userID = profile.id;
    const userLikedArtist = await ORDSFetcher(`${LIKED_ARTIST_ENDPOINT}/${userID}/${artistID}`, USER_CREDENTIALS);
    likedArtist = userLikedArtist.likedartist === 1;
  }
  return json({
    artist,
    artistEvents,
    similarArtists,
    profile,
    error,
    cities,
    likedArtist,
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
 * @returns Display the artist homepage. Data displayed will depend on artist ID.
 */
export default function ArtistID(): ReactElement {
  const {
    artist,
    artistEvents,
    similarArtists,
    profile,
    likedArtist,
  } = useLoaderData<typeof loader>();
  return (
    <div style={{
      fontFamily: 'system-ui, sans-serif',
      lineHeight: '1.8',
    }}
    >
      <ArtistHome
        artists={artist}
        events={artistEvents}
        similarArtists={similarArtists}
        user={profile}
        likedArtist={likedArtist}
      />
      <Outlet />
    </div>
  );
}
