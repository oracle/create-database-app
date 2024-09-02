/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import { ErrorResponse, LoaderFunctionArgs } from '@remix-run/node';
import { json, useLoaderData } from '@remix-run/react';
import { ReactElement } from 'react';
import { auth } from '../utils/auth.server';
import { FOLLOWED_ARTISTS_ENDPOINT } from './constants/index.server';
import Artist from '../models/Artist';
import ArtistCard from '../components/homepage/ArtistCard';
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
  const getFollowedArtists = await fetch(`${FOLLOWED_ARTISTS_ENDPOINT}/${userID}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: USER_JWT_AUTH,
    },
  });
  const followedArtists = await getFollowedArtists.json();
  if (isORDSError(followedArtists)) {
    throw new Response('Something went wrong! ', {
      status: 403,
      statusText: followedArtists.code,
      data: followedArtists.message,
    } as ErrorResponse);
  }
  return json({
    followedArtists,
  });
};

/**
 * Renders the user's followed artist.
 * @returns The FollowedArtists component.
 */
export default function FollowedArtists() : ReactElement {
  const {
    followedArtists,
  } = useLoaderData<typeof loader>();
  return (
    <div className="flex size-full flex-col bg-slate-100">
      <div className="size-full flex-col items-center px-8 py-4">
        <h1 className="mb-4 ml-10 text-4xl font-extrabold">Followed Artists</h1>
        { followedArtists.items.length === 0
          ? (
            <div className="flex flex-row py-4">
              <h1 className="mb-4 ml-10 text-2xl font-medium underline">No Artists Followed!</h1>
            </div>
          )
          : (
            <div>
              <div className="flex flex-row py-4">
                {
                // eslint-disable-next-line no-magic-numbers
                followedArtists.items.slice(0, 4).map((item: Artist) => (
                  <div className="w-1/4" key={item.artist_id}>
                    <ArtistCard artist={item} followers={100} />
                  </div>
                ))
}
              </div>
              <div className="flex flex-row py-4">
                {
                // eslint-disable-next-line no-magic-numbers
                followedArtists.items.slice(4, 8).map((item: Artist) => (
                  <div className="w-1/4" key={item.artist_id}>
                    <ArtistCard artist={item} followers={100} />
                  </div>
                ))
}
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
