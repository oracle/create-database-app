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
import { LocationCity } from '@mui/icons-material';
import jazzVenue from '../../assets/venues/jazz_venue.png';
import indieVenue from '../../assets/venues/indie_venue.png';
import rapVenue from '../../assets/venues/rap_venue.png';
import reggaeVenue from '../../assets/venues/reggae_venue.png';
import steamPunkVenue from '../../assets/venues/steampunk_venue.png';
import VenueResult from '../../models/VenueResult';

interface VenueResultCardProps {
  searchResult: VenueResult;
  index: number;
  enableTooltips : boolean;
}

/**
 * The Result Card Component.
 * @param props the Result Card props.
 * @returns the Result Card Component.
 */
function VenueResultCard(props: VenueResultCardProps) {
  const { searchResult, index, enableTooltips } = props;
  const link = `/venues/${searchResult.venue_id}${enableTooltips ? '?tooltips' : ''}`;
  const images = [jazzVenue, reggaeVenue, steamPunkVenue, rapVenue, indieVenue];
  return (
    <div className="flex">
      <Card className="flex flex-col p-5">
        <div className="flex flex-row items-center">
          <div className="flex w-1/3 items-center justify-center">
            <CardMedia
              component="img"
              alt="searchResult"
              className="rounded-full"
              image={images[index % images.length]}
            />
          </div>
          <CardContent className="flex w-2/3 grow flex-col">
            <div>
              <h1 className="py-2 font-sans text-lg font-medium">
                { `${searchResult.name}, ${searchResult.city_name}` }
              </h1>
              <div className="flex items-center">
                <p className="py-2 font-sans font-extralight">
                  <LocationCity />
                  { searchResult.location }
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <a
                className="mr-5 rounded-3xl border-2 border-orange-400 bg-orange-400 px-4 py-2 text-sm
                                      font-semibold text-white hover:border-orange-300 hover:bg-orange-300"
                href={link}
              >
                See More
              </a>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

export default VenueResultCard;
