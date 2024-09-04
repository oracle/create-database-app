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
  Chip,
} from '@mui/material';
import { useNavigate } from '@remix-run/react';
import { Groups } from '@mui/icons-material';
import ArtistResult from '../../models/ArtistResult';
import artistImages from '../utils/artistImages';

interface ArtistResultCardProps {
  searchResult: ArtistResult;
  index: number;
  enableTooltips : boolean;
}

/**
 * The Result Card Component.
 * @param props the Result Card props.
 * @returns the Result Card Component.
 */
function ArtistResultCard(props: ArtistResultCardProps) {
  const { searchResult, index, enableTooltips } = props;
  const navigate = useNavigate();
  // eslint-disable-next-line no-magic-numbers
  const FOLLOWERS = [69420, 99876, 45632, 32496, 98765, 12776, 100000, 88999, 99999];
  const musicGenres = searchResult.music_genres ? searchResult.music_genres.split(',').map((item) => item.trim()) : ['Indie'];
  return (
    <div className="flex">
      <Card className="flex flex-col p-5">
        <div className="flex flex-row items-center">
          <div className="flex w-1/3 items-center justify-center">
            <CardMedia
              component="img"
              alt="searchResult"
              className="rounded-full"
              image={artistImages[musicGenres[0]]}
            />
          </div>
          <CardContent className="flex w-2/3 grow flex-col">
            <div>
              <h1 className="py-2 font-sans text-2xl font-medium">
                { searchResult.name }
              </h1>
              <div className="flex flex-wrap gap-2 py-2">
                {
                  musicGenres.map((musicGenre : string) => (
                    <Chip
                      key={`music-genre-${musicGenre}-${index}`}
                      label={musicGenre}
                      sx={{
                        backgroundColor: 'green',
                        color: 'white',
                      }}
                    />
                  ))
                }
              </div>
              <div className="flex items-center">
                <Groups />
                <p className="font-sans font-extralight">
                  { `${FOLLOWERS[index % Object.keys(artistImages).length].toLocaleString()} followers` }
                </p>
              </div>
              <p className="py-2 font-sans font-extralight">
                { searchResult.description }
              </p>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="mr-5 rounded-3xl border-2 border-orange-400 bg-orange-400 px-4 py-2 text-sm
                                    font-semibold text-white hover:border-orange-300 hover:bg-orange-300"
                onClick={
                      () => {
                        navigate(`/artists/${searchResult.artist_id}${enableTooltips ? '?tooltips' : ''}`);
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

export default ArtistResultCard;
