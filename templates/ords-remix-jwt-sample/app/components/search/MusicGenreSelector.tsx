/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import { useFetcher } from '@remix-run/react';
import { useState, useEffect } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { loader as MusicGenresLoader } from '~/routes/resources.musicGenres';
import { NavigationState } from '../../utils/NavigationState';
import ORDSResponse from '../../models/ORDSResponse';
import MusicGenre from '../../models/MusicGenre';
import InfiniteChipSelectorComponent from './InfiniteChipSelector';
import SearchExp from '../../models/SearchExp';

interface MusicGenresSelectorProps {
  musicGenres: ORDSResponse<MusicGenre>;
  selectedMusicGenre:string[];
  setSelectedMusicGenre:React.Dispatch<React.SetStateAction<string[]>>;
  setSearchExpression:React.Dispatch<React.SetStateAction<SearchExp>>;

}

/**
 *
 * @param localMusicGenres the ORDSResponse object where the MusicGenres are stored.
 * @returns the name of the MusicGenres
 */
function getMusicGenreNames(localMusicGenres : ORDSResponse<MusicGenre>) {
  return localMusicGenres.items.map((musicGenre) => musicGenre.name);
}

/**
 * Provides a filter selection interface to the user.
 * @param props the props of the component
 * @returns The filter selector element
 */
function MusicGenresSelector(props : MusicGenresSelectorProps) {
  const {
    musicGenres, selectedMusicGenre, setSelectedMusicGenre, setSearchExpression,
  } = props;
  const initialMusicGenres = getMusicGenreNames(musicGenres);
  const [actualMusicGenres, setActualMusicGenres] = useState<string[]>(initialMusicGenres);
  const [hasMoreMusicGenres, setHasMoreMusicGenres] = useState<boolean>(musicGenres.hasMore);
  const handleSelectedMusicGenreChange = (event: SelectChangeEvent<typeof selectedMusicGenre>) => {
    const {
      target: { value },
    } = event;
    const musicGenresValues = typeof value === 'string' ? value.split(',') : value;
    const actualMusicGenresValues = musicGenresValues.map(
      (id:string) => actualMusicGenres[Number(id)],
    );
    const musicGenresExp = actualMusicGenresValues.length === 1
      ? { $like: `%${actualMusicGenresValues}%` }
      : { $or: actualMusicGenresValues.map((musicGenre : string) => ({ $like: `%${musicGenre}%` })) };
    setSelectedMusicGenre(musicGenresValues);
    setSearchExpression((prevSearchExp) => ({
      ...prevSearchExp,
      music_genres: musicGenresExp,
    }));
  };
  const MusicGenresFetcher = useFetcher<typeof MusicGenresLoader>();
  useEffect(() => {
    if (!MusicGenresFetcher.data || MusicGenresFetcher.state === NavigationState.LOADING) {
      return;
    }
    // If we have new data - append it
    if (MusicGenresFetcher.data) {
      const newMusicGenres = MusicGenresFetcher.data.musicGenres as ORDSResponse<MusicGenre>;
      const newMusicGenreNames = getMusicGenreNames(newMusicGenres);
      setActualMusicGenres((prevAssets) => [...prevAssets, ...newMusicGenreNames]);
      setHasMoreMusicGenres(newMusicGenres.hasMore);
    }
  }, [MusicGenresFetcher.data, MusicGenresFetcher.state]);

  const loadNextMusicGenres = () => {
    const DEFAULT_OFFSET = 10;
    if (hasMoreMusicGenres) {
      const offset = actualMusicGenres.length + DEFAULT_OFFSET;
      const query = `/resources/MusicGenres?offset=${offset}`;
      MusicGenresFetcher.load(query);
    }
  };
  return (
    <div className="w-full">
      <InfiniteChipSelectorComponent
        value={selectedMusicGenre}
        onChange={handleSelectedMusicGenreChange}
        items={actualMusicGenres}
        loading={hasMoreMusicGenres && MusicGenresFetcher.state === NavigationState.LOADING}
        loadNext={loadNextMusicGenres}
      />
    </div>
  );
}

export default MusicGenresSelector;
