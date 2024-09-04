/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import React from 'react';
import { Divider } from '@mui/material';
import { Auth0Profile } from 'remix-auth-auth0';
import HeroBanner from './HeroBanner';
import Countdown from '../homepage/Countdown';
import Timeline from '../homepage/Timeline';
import AboutArtist from './AboutArtist';
import DiscoverArtists from './DiscoverArtists';
import Artist from '../../models/Artist';
import ORDSResponse from '../../models/ORDSResponse';
import ORDSConcert from '../../models/ORDSConcert';

interface ArtistHomeProps {
  artists: ORDSResponse< Artist>;
  events: ORDSResponse< ORDSConcert >;
  similarArtists: ORDSResponse< Artist >;
  user: Auth0Profile | null;
  likedArtist: boolean;
}
/**
 * The About Artist Home Component
 * @param props the artist attributes.
 * @returns the About Artist Card
 */
function ArtistHome(props: ArtistHomeProps) {
  const {
    artists, events, similarArtists, user, likedArtist,
  } = props;
  const artist = artists.items[0];
  return (
    <>
      <HeroBanner artist={artist} user={user} userLikedArtist={likedArtist} />
      <Countdown events={events} />
      <Divider component="div" />
      <Timeline events={events} />
      <Divider component="div" />
      <AboutArtist artist={artist} events={events} />
      <DiscoverArtists similarArtists={similarArtists} />
    </>

  );
}

export default ArtistHome;
