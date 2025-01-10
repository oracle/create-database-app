/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import React from 'react';
import {
  Form, Link,
} from '@remix-run/react';
import {
  Card, CardContent, CardMedia,
} from '@mui/material';
import { CalendarMonth } from '@mui/icons-material';
import ORDSConcert from '../../models/ORDSConcert';
import { formatDate } from '../../utils/StringToDate';
import TooltipComponent from '../tooltips/TooltipComponent';
import featureDescriptions from '../../utils/ORDSFeaturesDescription';
import imagesByGenre from '../utils/imagesByGenre';

interface ConcertCardProps {
  concert: ORDSConcert;
  enableTooltips:boolean;
}

/**
 * The Concert Card Component.
 * @param props the Concert Card props.
 * @returns the Concert Card Component.
 */
function ConcertCard(props: ConcertCardProps) {
  const { concert, enableTooltips } = props;
  const concertDateString = formatDate(concert.event_date);
  const musicGenres = concert.music_genres ? concert.music_genres.split(',').map((item) => item.trim()) : ['Indie'];
  return (
    <div className="flex flex-row justify-center py-2">
      <Card>
        <CardMedia
          component="img"
          alt="concert"
          image={imagesByGenre[musicGenres[0]]}
          sx={{ maxWidth: '500px', maxHeight: '400px' }}
        />
        <CardContent sx={{ maxWidth: '500px' }}>
          <div className="mx-4">
            <div className="flex items-center">
              <Link to={`../concerts/${concert.event_id}?${enableTooltips ? 'tooltips' : ''}`}>
                <h1 className="font-sans font-bold hover:underline">
                  {`${concert.artist_name} at ${concert.venue_name}, ${concert.city_name}`}
                </h1>
              </Link>
              {enableTooltips && (
              <TooltipComponent
                featureProps={featureDescriptions.implicitParameterDescription}
                width="40px"
                height="40px"
              />
              )}
            </div>
            <div className="flex items-center">
              <CalendarMonth />
              <p className="font-sans font-extralight" suppressHydrationWarning>
                { concertDateString }
              </p>
            </div>
            <p className="font-sans font-extralight">
              { concert.event_details }
            </p>
          </div>
          <div className="my-2 flex w-full columns-2 justify-center space-x-6 px-4 py-2">
            <Form method="post">
              <button
                type="button"
                className="rounded-lg border-2 border-orange-500 bg-orange-500 px-4
                                    py-2 font-semibold text-white
                                    hover:border-orange-400 hover:bg-orange-400 hover:underline"
                name="_action"
                value="subscribe"
              >
                Subscribe
              </button>
            </Form>
            <Form method="post">
              <button
                type="button"
                className="rounded-lg border-2 border-orange-500 bg-orange-500 px-4
                                py-2 font-semibold text-white
                                hover:border-orange-400 hover:bg-orange-400 hover:underline"
                name="_action"
                value="interested"
              >
                Interested
              </button>
            </Form>
          </div>
        </CardContent>

      </Card>
    </div>
  );
}

export default ConcertCard;
