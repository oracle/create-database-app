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
  useSearchParams,
} from '@remix-run/react';
import type { LoaderError } from '~/models/LoaderError';
import {
  auth, getSession,
} from '../utils/auth.server';
import {
  AUTO_REST_SEARCH_ENDPOINT,
  CITIES_ENDPOINT,
  ARTISTS_ENDPOINT,
  VENUES_ENDPOINT,
} from './constants/index.server';
import ORDSFetcher from '../utils/ORDSFetcher';
import ErrorComponent from '../components/error/ErrorPage';
import Discover from '../components/search/Discover';
import ORDSResponse from '../models/ORDSResponse';
import SearchResult from '../models/SearchResult';
import City from '../models/City';
import Venue from '../models/Venue';
import Artist from '../models/Artist';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userProfile = await auth.isAuthenticated(request);
  const USER_CREDENTIALS = userProfile === null
    ? ''
    : `${userProfile.tokenType} ${userProfile.accessToken}`;
  const session = await getSession(request.headers.get('Cookie'));
  const error = session.get(auth.sessionErrorKey) as LoaderError;
  const url = new URL(request.url);
  const qParam = url.searchParams.get('q');
  const DEFAULT_RESULTS_LIMIT = 10;
  const limit = url.searchParams.get('limit') || DEFAULT_RESULTS_LIMIT;
  const offset = url.searchParams.get('offset') || 0;
  const searchURL = new URL(AUTO_REST_SEARCH_ENDPOINT);
  if (qParam !== null) {
    searchURL.searchParams.append('q', qParam);
  }
  searchURL.searchParams.append('limit', limit.toString());
  searchURL.searchParams.append('offset', offset.toString());
  const searchResult = await ORDSFetcher(
    searchURL,
    USER_CREDENTIALS,
  ) as ORDSResponse<SearchResult>;
  const cities = await ORDSFetcher(CITIES_ENDPOINT, USER_CREDENTIALS) as ORDSResponse<City>;
  const venues = await ORDSFetcher(VENUES_ENDPOINT, USER_CREDENTIALS) as ORDSResponse<Venue>;
  const artists = await ORDSFetcher(ARTISTS_ENDPOINT, USER_CREDENTIALS) as ORDSResponse<Artist>;

  return json({
    error,
    userProfile,
    searchResult,
    cities,
    venues,
    artists,
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
export default function SearchConcerts(): ReactElement {
  const {
    searchResult, cities, venues, artists,
  } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const enableTooltips = searchParams.has('tooltips');
  const title = 'Discover Concerts Near You';
  const description = 'Check out what\'s popular in your city, or look for the next event of your favorite artists';
  const id = 'concerts';
  return (
    <Discover
      title={title}
      description={description}
      id={id}
      enableTooltips={enableTooltips}
      initialResultSet={searchResult}
      cities={cities}
      venues={venues}
      artists={artists}
    />
  );
}
