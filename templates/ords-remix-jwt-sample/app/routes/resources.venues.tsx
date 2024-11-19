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
  VENUES_ENDPOINT,
} from './constants/index.server';
import ORDSFetcher from '../utils/ORDSFetcher';
import ORDSResponse from '../models/ORDSResponse';
import Venue from '../models/Venue';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const DEFAULT_RESULTS_LIMIT = 10;
  const limit = url.searchParams.get('limit') || DEFAULT_RESULTS_LIMIT;
  const offset = url.searchParams.get('offset') || 0;
  const venuesURL = new URL(VENUES_ENDPOINT);
  venuesURL.searchParams.append('offset', offset.toString());
  venuesURL.searchParams.append('limit', limit.toString());
  const userProfile = await auth.isAuthenticated(request);
  const USER_CREDENTIALS = userProfile === null
    ? ''
    : `${userProfile.tokenType} ${userProfile.accessToken}`;
  const session = await getSession(request.headers.get('Cookie'));
  const error = session.get(auth.sessionErrorKey) as LoaderError;
  const venues = await ORDSFetcher(venuesURL, USER_CREDENTIALS) as ORDSResponse<Venue>;
  return json({
    error,
    venues,
  });
};
