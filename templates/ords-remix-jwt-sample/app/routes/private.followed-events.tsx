/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import { ErrorResponse, LoaderFunctionArgs } from '@remix-run/node';
import { json, useLoaderData } from '@remix-run/react';
import React, { ReactElement } from 'react';
import { auth } from '~/utils/auth.server';
import { FOLLOWED_EVENTS_ENDPOINT } from './constants/index.server';
import Concert from '../models/ORDSConcert';
import FollowedEventCard from '../components/private/FollowedEventCard';
import { isORDSError } from '../models/ORDSError';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const {
    profile,
    tokenType,
    accessToken,
  } = await auth.isAuthenticated(request, {
    failureRedirect: '/error',
  });
  const USER_JWT_AUTH = `${tokenType} ${accessToken}`;
  const userID = profile.id;
  const getFollowedEvents = await fetch(`${FOLLOWED_EVENTS_ENDPOINT}/${userID}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: USER_JWT_AUTH,
    },
  });
  const followedEvents = await getFollowedEvents.json();
  if (isORDSError(followedEvents)) {
    throw new Response('Something went wrong! ', {
      status: 403,
      statusText: followedEvents.code,
      data: followedEvents.message,
    } as ErrorResponse);
  }
  return json({
    profile,
    followedEvents,
  });
};

/**
 * Renders the user's followed events.
 * @returns The FollowedEvents component.
 */
export default function FollowedEvents() : ReactElement {
  const {
    followedEvents,
  } = useLoaderData<typeof loader>();
  return (
    <div className="flex size-full flex-col bg-slate-100">
      <div className="size-full flex-col items-center px-8 py-4">
        <h1 className="mb-4 ml-10 text-4xl font-extrabold">Followed Events</h1>
        { followedEvents.items.length === 0
          ? (
            <div className="flex flex-row py-4">
              <h1 className="mb-4 ml-10 text-2xl font-medium underline">No Events Followed!</h1>
            </div>
          )
          : (
            <div className="flex flex-row justify-evenly py-4">
              {
              // eslint-disable-next-line no-magic-numbers
              followedEvents.items.slice(0, 4).map((item: Concert) => (
                <div className="w-1/4" key={item.event_id}>
                  <FollowedEventCard concert={item} />
                </div>
              ))
}
            </div>
          )}
      </div>
    </div>
  );
}
