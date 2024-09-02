/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import { useFetcher } from '@remix-run/react';
import { useState, useEffect } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { loader as citiesLoader } from '~/routes/resources.cities';
import { NavigationState } from '../../utils/NavigationState';
import ORDSResponse from '../../models/ORDSResponse';
import City from '../../models/City';
import InfiniteSelectorComponent from './InfiniteSelector';
import SearchExp from '../../models/SearchExp';

interface CitiesSelectorProps {
  cities: ORDSResponse<City>;
  selectedCity:string[];
  setSelectedCity:React.Dispatch<React.SetStateAction<string[]>>;
  setSearchExpression:React.Dispatch<React.SetStateAction<SearchExp>>;

}

/**
 *
 * @param localCities the ORDSResponse object where the cities are stored.
 * @returns the name of the cities
 */
function getCityNames(localCities : ORDSResponse<City>) {
  return localCities.items.map((city) => city.name);
}

/**
 * Provides a filter selection interface to the user.
 * @param props the props of the component
 * @returns The filter selector element
 */
function CitiesSelector(props : CitiesSelectorProps) {
  const {
    cities, selectedCity, setSelectedCity, setSearchExpression,
  } = props;
  const initialCities = getCityNames(cities);
  const [actualCities, setActualCities] = useState<string[]>(initialCities);
  const [hasMoreCities, setHasMoreCities] = useState<boolean>(cities.hasMore);
  const handleSelectedCityChange = (event: SelectChangeEvent<typeof selectedCity>) => {
    const {
      target: { value },
    } = event;
    const cityValue = typeof value === 'string' ? value.split(',') : value;
    setSelectedCity(cityValue);
    setSearchExpression((prevSearchExp) => ({
      ...prevSearchExp,
      city_name: { $eq: `${actualCities[Number(cityValue)]}` },
    }));
  };
  const citiesFetcher = useFetcher<typeof citiesLoader>();
  useEffect(() => {
    if (!citiesFetcher.data || citiesFetcher.state === NavigationState.LOADING) {
      return;
    }
    // If we have new data - append it
    if (citiesFetcher.data) {
      const newCities = citiesFetcher.data.cities as ORDSResponse<City>;
      const newCityNames = getCityNames(newCities);
      setActualCities((prevAssets) => [...prevAssets, ...newCityNames]);
      setHasMoreCities(newCities.hasMore);
    }
  }, [citiesFetcher.data, citiesFetcher.state]);

  const loadNextCities = () => {
    const DEFAULT_OFFSET = 10;
    if (hasMoreCities) {
      const offset = actualCities.length + DEFAULT_OFFSET;
      const query = `/resources/cities?offset=${offset}`;
      citiesFetcher.load(query);
    }
  };
  return (
    <InfiniteSelectorComponent
      label="City"
      value={selectedCity}
      onChange={handleSelectedCityChange}
      items={actualCities}
      loading={hasMoreCities && citiesFetcher.state === NavigationState.LOADING}
      loadNext={loadNextCities}
    />
  );
}

export default CitiesSelector;
