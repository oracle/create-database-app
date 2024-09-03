/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import { useState } from 'react';
import ORDSResponse from '../../models/ORDSResponse';
import SearchExp from '../../models/SearchExp';
import CitiesSelector from './CitiesSelector';
import City from '../../models/City';

interface VenuesFilterSelectorProps {
  cities: ORDSResponse<City>
  setSearchExpression: React.Dispatch<React.SetStateAction<SearchExp>>;
}

/**
 * Provides a filter selection interface to the user.
 * @param props the props of the component
 * @returns The filter selector element
 */
function VenuesFilterSelector(props : VenuesFilterSelectorProps) {
  const {
    cities, setSearchExpression,
  } = props;
  const [selectedCity, setSelectedCity] = useState<string[]>([]);

  const clearSelections = () => {
    setSelectedCity([]);
    setSearchExpression({});
  };

  return (
    <div className="min-h-screen rounded-lg bg-white p-4">
      <div className="flex flex-col justify-between">
        <h1 className="p-2 text-xl font-semibold">
          Narrow your Search
        </h1>
        <CitiesSelector
          cities={cities}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          setSearchExpression={setSearchExpression}

        />
        <div className="py-4">
          <button
            type="submit"
            className="float-right rounded-lg border-2 border-red-500 bg-red-500 p-2 font-semibold text-white hover:border-red-400
                            hover:bg-red-400 hover:underline"
            onClick={clearSelections}
          >
            Clear Selection
          </button>
        </div>
      </div>
    </div>
  );
}

export default VenuesFilterSelector;
