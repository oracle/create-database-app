/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import { useFetcher } from '@remix-run/react';
import { useState, useEffect } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { loader as venuesLoader } from '~/routes/resources.venues';
import { NavigationState } from '../../utils/NavigationState';
import ORDSResponse from '../../models/ORDSResponse';
import Venue from '../../models/Venue';
import InfiniteSelectorComponent from './InfiniteSelector';
import SearchExp from '../../models/SearchExp';

interface VenuesSelectorProps {
  venues: ORDSResponse<Venue>;
  selectedVenue:string[];
  setSelectedVenue:React.Dispatch<React.SetStateAction<string[]>>;
  setSearchExpression:React.Dispatch<React.SetStateAction<SearchExp>>;

}

/**
 *
 * @param localVenues the ORDSResponse object where the Venues are stored.
 * @returns the name of the Venues
 */
function getVenueNames(localVenues : ORDSResponse<Venue>) {
  return localVenues.items.map((venue) => venue.name);
}

/**
 * Provides a filter selection interface to the user.
 * @param props the props of the component
 * @returns The filter selector element
 */
function VenuesSelector(props : VenuesSelectorProps) {
  const {
    venues, selectedVenue, setSelectedVenue, setSearchExpression,
  } = props;
  const initialVenues = getVenueNames(venues);
  const [actualVenues, setActualVenues] = useState<string[]>(initialVenues);
  const [hasMoreVenues, setHasMoreVenues] = useState<boolean>(venues.hasMore);
  const handleSelectedVenueChange = (event: SelectChangeEvent<typeof selectedVenue>) => {
    const {
      target: { value },
    } = event;
    const venueValue = typeof value === 'string' ? value.split(',') : value;
    setSelectedVenue(venueValue);
    setSearchExpression((prevSearchExp) => ({
      ...prevSearchExp,
      venue_name: { $eq: `%${actualVenues[Number(venueValue)]}%` },
    }));
  };
  const VenuesFetcher = useFetcher<typeof venuesLoader>();
  useEffect(() => {
    if (!VenuesFetcher.data || VenuesFetcher.state === NavigationState.LOADING) {
      return;
    }
    // If we have new data - append it
    if (VenuesFetcher.data) {
      const newVenues = VenuesFetcher.data.venues as ORDSResponse<Venue>;
      const newVenueNames = getVenueNames(newVenues);
      setActualVenues((prevAssets) => [...prevAssets, ...newVenueNames]);
      setHasMoreVenues(newVenues.hasMore);
    }
  }, [VenuesFetcher.data, VenuesFetcher.state]);

  const loadNextVenues = () => {
    const DEFAULT_OFFSET = 10;
    if (hasMoreVenues) {
      const offset = actualVenues.length + DEFAULT_OFFSET;
      const query = `/resources/Venues?offset=${offset}`;
      VenuesFetcher.load(query);
    }
  };
  return (
    <InfiniteSelectorComponent
      label="Venue"
      value={selectedVenue}
      onChange={handleSelectedVenueChange}
      items={actualVenues}
      loading={hasMoreVenues && VenuesFetcher.state === NavigationState.LOADING}
      loadNext={loadNextVenues}
    />
  );
}

export default VenuesSelector;
