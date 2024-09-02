/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { ReactElement } from 'react';
import {
  auth,
  getSession,
} from '~/utils/auth.server';
import { BASIC_SCHEMA_AUTH, VENUES_ENDPOINT } from './constants/index.server';
import { LoaderError } from '../models/LoaderError';
import ORDSFetcher from '../utils/ORDSFetcher';
import Venue from '../models/Venue';
import ORDSResponse from '../models/ORDSResponse';

export const loader = async ({
  request,
}: LoaderFunctionArgs) => {
  const userProfile = await auth.isAuthenticated(request);
  const USER_CREDENTIALS = userProfile === null
    ? BASIC_SCHEMA_AUTH
    : `${userProfile.tokenType} ${userProfile.accessToken}`;
  const session = await getSession(request.headers.get('Cookie'));
  const error = session.get(auth.sessionErrorKey) as LoaderError;
  const venues = await ORDSFetcher(`${VENUES_ENDPOINT}`, USER_CREDENTIALS) as ORDSResponse<Venue>;
  return json({
    venues,
    error,
  });
};

/**
 *The Venues Route
 @returns The venues components
 */
export default function Venues(): ReactElement {
  const {
    venues,
  } = useLoaderData<typeof loader>();
  return (
    <div>
      { venues.items.map((venue) => (
        <div key={venue.venue_id}>
          <h1>{ venue.name }</h1>
          <span>{ venue.location}</span>
        </div>
      ))}
    </div>
  );
}
