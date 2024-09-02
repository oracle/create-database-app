/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import React from 'react';
import PopularArtistCard from './PopularArtistCard';
import ORDSResponse from '../../models/ORDSResponse';
import Artist from '../../models/Artist';

const END = 4;

interface DiscoverArtistsProps {
  similarArtists: ORDSResponse<Artist>;
}

/**
 * The Discover Artists Component
 * @param props A list of simialar Artists
 * @returns the About Artist Card
 */
function DiscoverArtists(props: DiscoverArtistsProps) {
  const { similarArtists } = props;
  return (
    <div className="flex flex-col bg-grey-background bg-cover bg-no-repeat py-20">
      <div className="my-10 flex flex-row justify-center">
        <h1 className="text-5xl font-semibold">Discover Similar Artists</h1>
      </div>
      <div className="my-10 flex w-full flex-row justify-evenly">
        { similarArtists.items.slice(0, END).map((artist) => (
          <div key={artist.artist_id}>
            <PopularArtistCard artist={artist} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DiscoverArtists;
