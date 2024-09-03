/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import React from 'react';
import {
  Card, CardContent, CardMedia,
  Chip,
} from '@mui/material';
import ORDSConcert from '../../models/ORDSConcert';
import imagesByGenre from '../utils/imagesByGenre';

interface EventCardProps {
  event: ORDSConcert;
}

/**
 * The Event Card Component.
 * @param props the Event Card props.
 * @returns the Event Card Component.
 */
function EventCard(props:EventCardProps) {
  const { event } = props;
  const musicGenres = event.music_genres ? event.music_genres.split(',').map((item) => item.trim()) : ['Indie'];

  return (
    <div className="flex">
      <Card className="flex flex-col p-5">
        <div className="mb-5 flex flex-row justify-start">
          <Chip label="#Festival" className="mr-4" />
          <Chip label="#Pop" className="mr-4" />
        </div>
        <div className="flex flex-row">
          <div className="flex w-1/4 px-4">
            <CardMedia
              component="img"
              alt="concert"
              image={imagesByGenre[musicGenres[0]]}
            />
          </div>
          <CardContent className="w-3/4 p-0">
            <div className="mx-4 flex flex-col">
              <h1 className="font-sans text-2xl font-medium">
                { event.artist_name }
                {' '}
                at
                { event.venue_name }
              </h1>
              <p className="flex font-sans text-lg font-extralight">{ event.event_details }</p>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

export default EventCard;
