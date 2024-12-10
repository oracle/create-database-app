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
  MUSIC_GENRES_ENDPOINT,
} from './constants/index.server';
import ORDSFetcher from '../utils/ORDSFetcher';
import ORDSResponse from '../models/ORDSResponse';
import MusicGenre from '../models/MusicGenre';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const DEFAULT_RESULTS_LIMIT = 10;
  const limit = url.searchParams.get('limit') || DEFAULT_RESULTS_LIMIT;
  const offset = url.searchParams.get('offset') || 0;
  const musicGenresURL = new URL(MUSIC_GENRES_ENDPOINT);
  musicGenresURL.searchParams.append('offset', offset.toString());
  musicGenresURL.searchParams.append('limit', limit.toString());
  const userProfile = await auth.isAuthenticated(request);
  const USER_CREDENTIALS = userProfile === null
    ? null
    : `${userProfile.tokenType} ${userProfile.accessToken}`;
  const session = await getSession(request.headers.get('Cookie'));
  const error = session.get(auth.sessionErrorKey) as LoaderError;
  const musicGenres = await ORDSFetcher(
    musicGenresURL,
    USER_CREDENTIALS!,
  ) as ORDSResponse<MusicGenre>;
  return json({
    error,
    musicGenres,
  });
};
