/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import { CalendarMonth } from '@mui/icons-material';
import {
  Card, CardContent, CardMedia,
} from '@mui/material';
import ORDSConcert from '../../models/ORDSConcert';
import { formatDate } from '../../utils/StringToDate';
import imagesByGenre from '../utils/imagesByGenre';

interface FollowedEventCardProps {
  concert: ORDSConcert;
}

/**
 * The Followed Event Card Component.
 * @param props Contains the concert for the card.
 * @returns the Followed Event Card Component.
 */
function FollowedEventCard(props: FollowedEventCardProps) {
  const { concert } = props;
  const musicGenres = concert.music_genres ? concert.music_genres.split(',').map((item) => item.trim()) : ['Indie'];
  const concertDateString = formatDate(concert.event_date);
  return (
    <div className="flex flex-row justify-center py-2">
      <Card>
        <CardMedia
          component="img"
          alt="concert"
          image={imagesByGenre[musicGenres[0]]}
          sx={{ maxWidth: '500px' }}
        />
        <CardContent sx={{ maxWidth: '500px', minHeight: '200px' }}>
          <div className="mx-4">
            <div className="mb-2 flex items-center">
              <CalendarMonth />
              <p className="font-sans font-extralight" suppressHydrationWarning >
                { concertDateString }
              </p>
            </div>
            <p className="font-sans font-extralight">
              { concert.event_details }
            </p>
          </div>
        </CardContent>

      </Card>
    </div>
  );
}

export default FollowedEventCard;
