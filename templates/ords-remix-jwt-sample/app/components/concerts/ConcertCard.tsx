/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import React from 'react';
import {
  Form,
  Link,
  useSearchParams,
} from '@remix-run/react';
import {
  Card, CardContent, CardMedia, Typography,
} from '@mui/material';
import { CalendarMonth } from '@mui/icons-material';
import ORDSConcert from '../../models/ORDSConcert';
import { formatDate } from '../../utils/StringToDate';
import featureDescriptions from '../../utils/ORDSFeaturesDescription';
import AccordionComponent from '../tooltips/Accordion';
import { Ords } from '../icons';
import TooltipTextComponent from '../tooltips/TooltipTextComponent';
import imagesByGenre from '../utils/imagesByGenre';

interface ConcertCardProps {
  concert: ORDSConcert;
}

/**
 * The Concert Card Component
 * @param props the concert attributes.
 * @returns the Concert Card Component
 */
function ConcertCard(props: ConcertCardProps) {
  const { concert } = props;
  const concertTitle = `${concert.artist_name} at ${concert.venue_name}, ${concert.city_name}`;
  const concertDateString = formatDate(concert.event_date);
  const musicGenres = concert.music_genres ? concert.music_genres.split(',').map((item) => item.trim()) : ['Indie'];
  const [searchParams] = useSearchParams();
  const enableTooltips = searchParams.has('tooltips');
  const redirectToolTipDescription = featureDescriptions.redirectTooltip;
  const handlerToolTipDescription = featureDescriptions.handlerTooltip;
  return (
    <div className="flex flex-row justify-center py-2">
      <Card>
        <CardMedia
          component="img"
          alt="concert"
          image={imagesByGenre[musicGenres[0]]}
          sx={{ maxWidth: '700px' }}
        />
        <CardContent sx={{ maxWidth: '700px' }}>
          <div className="mx-4">
            {
              enableTooltips && (
              <AccordionComponent
                featureProps={redirectToolTipDescription}
              >
                <div className="flex flex-row items-center">
                  <div className="w-32 flex-none px-2">
                    <Ords />
                  </div>
                  <div className="flex-col align-middle">
                    <Typography component="div" variant="body2" color="text.secondary">
                      Clicking the link bellow will trigger an ORDS GET request to the
                      {' '}
                      <Typography variant="body2" color="text.secondary" display="inline" sx={{ textDecoration: 'underline' }}>
                        enduser/v1/event/:id
                      </Typography>
                      {' '}
                      <TooltipTextComponent anchorText="handler" featureProps={handlerToolTipDescription} />
                      {' '}
                      which will return the associated concert and this will be displayed
                      in the concerts/:id page.
                      {' '}
                      <a
                        className="text-blue-600 underline hover:text-blue-800"
                        target="_blank"
                        href={redirectToolTipDescription.link}
                        rel="noreferrer"
                      >
                        Learn more.
                      </a>
                      {' '}
                    </Typography>
                  </div>
                </div>
              </AccordionComponent>
              )
            }
            <Link to={`/concerts/${concert.event_id}`}>
              <h1 className="font-sans font-bold hover:underline">
                {concertTitle}
              </h1>
            </Link>
            <div className="flex items-center">
              <CalendarMonth />
              <p className="font-sans font-extralight">
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
