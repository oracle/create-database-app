/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import type {
  LoaderFunctionArgs,
  ErrorResponse,
} from '@remix-run/node';
import { json } from '@remix-run/node';
import { auth } from '~/utils/auth.server';
import {
  ARTISTS_ENDPOINT,
  VENUES_ENDPOINT,
  EVENTS_BY_NAME_ENDPOINT,
} from './constants/index.server';
import { isORDSError } from '../models/ORDSError';
import artistImage from '../assets/musicGenresIcons/indie_icon.png';
import eventImage from '../assets/musicGenresIcons/reggae_icon.png';
import Artist from '../models/Artist';
import Concert from '../models/ORDSConcert';
import Venue from '../models/Venue';
import ORDSFetcher from '../utils/ORDSFetcher';

export const loader = async ({
  params, request,
}: LoaderFunctionArgs) => {
  const { searchKind, searchParam } = params;
  const userProfile = await auth.isAuthenticated(request);
  const USER_CREDENTIALS = userProfile === null
    ? null
    : `${userProfile.tokenType} ${userProfile.accessToken}`;
  // eslint-disable-next-line no-magic-numbers
  const FOLLOWERS = [69420, 99876, 45632, 32496, 98765, 12776, 100000, 88999, 99999];

  switch (searchKind) {
    case 'Artists': {
      const artists = await ORDSFetcher(`${ARTISTS_ENDPOINT}/${searchParam}`, USER_CREDENTIALS!);
      const SearchResult = artists.items.map((artist: Artist, index : number) => ({
        id: artist.artist_id,
        kind: 'artists',
        name: artist.name,
        img: artistImage,
        followers: FOLLOWERS[index],
      }));
      return json({
        SearchResult,
      });
    }
    case 'Events': {
      const events = await ORDSFetcher(`${EVENTS_BY_NAME_ENDPOINT}/${searchParam}`, USER_CREDENTIALS!);
      const SearchResult = events.items.map((event: Concert) => ({
        id: event.event_id,
        kind: 'concerts',
        name: `${event.artist_name} at ${event.venue_name}`,
        img: eventImage,
        date: event.event_date,
      }));
      return json({
        SearchResult,
      });
    }
    case 'Venues': {
      const venues = await ORDSFetcher(`${VENUES_ENDPOINT}/${searchParam}`, USER_CREDENTIALS!);
      const SearchResult = venues.items.map((venue: Venue) => ({
        id: venue.venue_id,
        kind: 'venues',
        name: venue.name,
        img: eventImage,
      }));
      return json({
        SearchResult,
      });
    }
    default: {
      const getArtist = await fetch(`${ARTISTS_ENDPOINT}/${searchParam}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: USER_CREDENTIALS!,
        },
      });
      const artists = await getArtist.json();
      if (isORDSError(artists)) {
        throw new Response('Something went wrong! ', {
          status: 403,
          statusText: artists.code,
          data: artists.message,
        } as ErrorResponse);
      }
      const SearchResult = artists.items.map((artist: Artist, index : number) => ({
        id: artist.artist_id,
        name: artist.name,
        img: artistImage,
        followers: FOLLOWERS[index],
      }));
      return json({
        SearchResult,
      });
    }
  }
};
