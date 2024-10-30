/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import {
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { useNavigate } from '@remix-run/react';
import { CalendarMonth } from '@mui/icons-material';
import { formatDate } from '../../utils/StringToDate';
import SearchResult from '../../models/SearchResult';
import imagesByGenre from '../utils/imagesByGenre';

interface ConcertResultCardProps {
  searchResult: SearchResult;
  enableTooltips : boolean;
}

/**
 * The Result Card Component.
 * @param props the Result Card props.
 * @returns the Result Card Component.
 */
function ConcertResultCard(props: ConcertResultCardProps) {
  const { searchResult, enableTooltips } = props;
  const navigate = useNavigate();
  const musicGenres = searchResult.music_genres ? searchResult.music_genres.split(',').map((item) => item.trim()) : ['Indie'];
  const concertDateString = formatDate(searchResult.event_date);
  return (
    <div className="flex">
      <Card className="flex flex-col p-5">
        <div className="flex flex-row items-center">
          <div className="flex w-1/3 items-center justify-center">
            <CardMedia
              component="img"
              alt="searchResult"
              className="rounded-full"
              image={imagesByGenre[musicGenres[0]]}
            />
          </div>
          <CardContent className="flex w-2/3 grow flex-col">
            <div>
              <h1 className="py-2 font-sans text-lg font-medium">
                { searchResult.event_name }
              </h1>
              <div className="flex items-center">
                <CalendarMonth />
                <p className="font-sans font-extralight" suppressHydrationWarning>
                  { concertDateString }
                </p>
              </div>
              <p className="py-2 font-sans font-extralight">
                { searchResult.event_details }
              </p>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="mr-5 rounded-3xl border-2 border-orange-400 bg-orange-400 px-4 py-2 text-sm
                                  font-semibold text-white hover:border-orange-300 hover:bg-orange-300"
                onClick={
                    () => {
                      navigate(`/concerts/${searchResult.event_id}${enableTooltips ? '?tooltips' : ''}`);
                    }
                  }
              >
                See More
              </button>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

export default ConcertResultCard;
