/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import { json } from '@remix-run/node';
import type {
  LoaderFunctionArgs,
} from '@remix-run/node';
import type { LoaderError } from '~/models/LoaderError';
import {
  auth,
  getSession,
} from '~/utils/auth.server';
import {
  ARTISTS_ENDPOINT,
  BASIC_SCHEMA_AUTH,
} from './constants/index.server';
import ORDSFetcher from '../utils/ORDSFetcher';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const DEFAULT_RESULTS_LIMIT = 10;
  const limit = url.searchParams.get('limit') || DEFAULT_RESULTS_LIMIT;
  const offset = url.searchParams.get('offset') || 0;
  const artistsURL = new URL(ARTISTS_ENDPOINT);
  artistsURL.searchParams.append('offset', offset.toString());
  artistsURL.searchParams.append('limit', limit.toString());
  const userProfile = await auth.isAuthenticated(request);
  const USER_CREDENTIALS = userProfile === null
    ? BASIC_SCHEMA_AUTH
    : `${userProfile.tokenType} ${userProfile.accessToken}`;
  const session = await getSession(request.headers.get('Cookie'));
  const error = session.get(auth.sessionErrorKey) as LoaderError;
  const artists = await ORDSFetcher(artistsURL, USER_CREDENTIALS);
  return json({
    error,
    artists,
  });
};
