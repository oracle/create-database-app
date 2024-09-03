/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import React from 'react';
import {
  Card, CardContent,
} from '@mui/material';
import {
  Form, Link,
  useSearchParams,
} from '@remix-run/react';
import artistImages from '../utils/artistImages';
import Artist from '../../models/Artist';

interface ArtistCardProps {
  artist: Artist;
  followers: number;
}

/**
 * The Artist Card Component.
 * @param props the Artist Card props.
 * @returns the Artist Card Component.
 */
function ArtistCard(props: ArtistCardProps) {
  const { artist, followers } = props;
  const musicGenres = artist.music_genres ? artist.music_genres.split(',').map((item) => item.trim()) : ['Indie'];
  const [searchParams] = useSearchParams();
  const enableTooltips = searchParams.has('tooltips');
  return (
    <div className="flex justify-center">
      <div className="flex w-4/5 flex-row">
        <Card>
          <div className="mt-4 flex justify-center">
            <img className="w-2/3 rounded-2xl" src={artistImages[musicGenres[0]]} alt="artist" />
          </div>
          <CardContent>
            <div className="flex flex-row justify-center">
              <div className="flex flex-col items-center">
                <Link to={`/artists/${artist.artist_id}${enableTooltips ? '?tooltips' : ''}`}>
                  <h3 className="my-2 text-xl font-medium hover:underline">
                    { artist.name }
                  </h3>
                </Link>
                <h3 className="my-2 text-xl font-light">
                  { `${followers.toLocaleString()}  followers`}
                </h3>
                <Form method="post">
                  <button type="button" className="my-2 rounded bg-gray-200 px-8 py-2 font-bold">
                    Follow
                  </button>
                </Form>

              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ArtistCard;
