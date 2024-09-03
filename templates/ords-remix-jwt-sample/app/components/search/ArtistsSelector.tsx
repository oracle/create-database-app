/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import { useFetcher } from '@remix-run/react';
import { useState, useEffect } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { loader as ArtistsLoader } from '~/routes/resources.artists';
import { NavigationState } from '../../utils/NavigationState';
import ORDSResponse from '../../models/ORDSResponse';
import Artist from '../../models/Artist';
import InfiniteSelectorComponent from './InfiniteSelector';
import SearchExp from '../../models/SearchExp';

interface ArtistsSelectorProps {
  artists: ORDSResponse<Artist>;
  selectedArtist:string[];
  setSelectedArtist:React.Dispatch<React.SetStateAction<string[]>>;
  setSearchExpression:React.Dispatch<React.SetStateAction<SearchExp>>;

}

/**
 *
 * @param localArtists the ORDSResponse object where the Artists are stored.
 * @returns the name of the Artists
 */
function getArtistNames(localArtists : ORDSResponse<Artist>) {
  return localArtists.items.map((artist) => artist.name);
}

/**
 * Provides a filter selection interface to the user.
 * @param props the props of the component
 * @returns The filter selector element
 */
function ArtistsSelector(props : ArtistsSelectorProps) {
  const {
    artists, selectedArtist, setSelectedArtist, setSearchExpression,
  } = props;
  const initialArtists = getArtistNames(artists);
  const [actualArtists, setActualArtists] = useState<string[]>(initialArtists);
  const [hasMoreArtists, setHasMoreArtists] = useState<boolean>(artists.hasMore);
  const handleSelectedArtistChange = (event: SelectChangeEvent<typeof selectedArtist>) => {
    const {
      target: { value },
    } = event;
    const artistValue = typeof value === 'string' ? value.split(',') : value;
    setSelectedArtist(artistValue);
    setSearchExpression((prevSearchExp) => ({
      ...prevSearchExp,
      artist_name: { $eq: `${actualArtists[Number(artistValue)]}` },
    }));
  };
  const artistsFetcher = useFetcher<typeof ArtistsLoader>();
  useEffect(() => {
    if (!artistsFetcher.data || artistsFetcher.state === NavigationState.LOADING) {
      return;
    }
    // If we have new data - append it
    if (artistsFetcher.data) {
      const newArtists = artistsFetcher.data.artists as ORDSResponse<Artist>;
      const newArtistNames = getArtistNames(newArtists);
      setActualArtists((prevAssets) => [...prevAssets, ...newArtistNames]);
      setHasMoreArtists(newArtists.hasMore);
    }
  }, [artistsFetcher.data, artistsFetcher.state]);

  const loadNextArtists = () => {
    const DEFAULT_OFFSET = 10;
    if (hasMoreArtists) {
      const offset = actualArtists.length + DEFAULT_OFFSET;
      const query = `/resources/Artists?offset=${offset}`;
      artistsFetcher.load(query);
    }
  };
  return (
    <InfiniteSelectorComponent
      label="Artist"
      value={selectedArtist}
      onChange={handleSelectedArtistChange}
      items={actualArtists}
      loading={hasMoreArtists && artistsFetcher.state === NavigationState.LOADING}
      loadNext={loadNextArtists}
    />
  );
}

export default ArtistsSelector;
