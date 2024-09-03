/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import { useState } from 'react';
import ORDSResponse from '../../models/ORDSResponse';
import City from '../../models/City';
import Venue from '../../models/Venue';
import Artist from '../../models/Artist';
import CitiesSelector from './CitiesSelector';
import VenuesSelector from './VenuesSelector';
import ArtistsSelector from './ArtistsSelector';
import DateRangePicker from './DatePicker';
import SearchExp from '../../models/SearchExp';
import AutoRESTDatesTooltip from '../tooltips/autoRESTDatesTooltipComponent';

interface FilterSelectorProps {
  cities: ORDSResponse<City>;
  venues: ORDSResponse<Venue>;
  artists: ORDSResponse<Artist>;
  setSearchExpression: React.Dispatch<React.SetStateAction<SearchExp>>;
  enableTooltips: boolean;
}

/**
 * Provides a filter selection interface to the user.
 * @param props the props of the component
 * @returns The filter selector element
 */
function FilterSelector(props : FilterSelectorProps) {
  const {
    cities, venues, artists, setSearchExpression, enableTooltips,
  } = props;
  const [selectedCity, setSelectedCity] = useState<string[]>([]);
  const [selectedVenue, setSelectedVenue] = useState<string[]>([]);
  const [selectedArtist, setSelectedArtist] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const handleSetStartDate = (event: Date) => {
    setStartDate(event);
    setSearchExpression((prevSearchExp : SearchExp) => {
      if ('event_date' in prevSearchExp) {
        const eventDateExp = prevSearchExp.event_date;
        if ('$lte' in eventDateExp!) {
          return ({
            ...prevSearchExp,
            event_date: { $between: [{ $date: `${event.toISOString()}` }, { $date: eventDateExp.$lte.$date }] },
          });
        }
        if ('$between' in eventDateExp!) {
          return ({
            ...prevSearchExp,
            event_date: { $between: [{ $date: `${event.toISOString()}` }, { $date: eventDateExp.$between[1].$date }] },
          });
        }
      }
      return ({
        ...prevSearchExp,
        event_date: { $gte: { $date: `${event.toISOString()}` } },
      });
    });
  };
  const handleSetEndDate = (event: Date) => {
    setEndDate(event);
    setSearchExpression((prevSearchExp : SearchExp) => {
      if ('event_date' in prevSearchExp) {
        const eventDateExp = prevSearchExp.event_date;
        if ('$gte' in eventDateExp!) {
          return ({
            ...prevSearchExp,
            event_date: { $between: [{ $date: eventDateExp.$gte.$date }, { $date: `${event.toISOString()}` }] },
          });
        }
        if ('$between' in eventDateExp!) {
          return ({
            ...prevSearchExp,
            event_date: { $between: [{ $date: eventDateExp.$between[0].$date }, { $date: `${event.toISOString()}` }] },
          });
        }
      }
      return ({
        ...prevSearchExp,
        event_date: { $lte: { $date: `${event.toISOString()}` } },
      });
    });
  };

  const clearSelections = () => {
    setSelectedCity([]);
    setSelectedVenue([]);
    setStartDate(null);
    setEndDate(null);
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
        <VenuesSelector
          venues={venues}
          selectedVenue={selectedVenue}
          setSelectedVenue={setSelectedVenue}
          setSearchExpression={setSearchExpression}

        />
        <ArtistsSelector
          artists={artists}
          selectedArtist={selectedArtist}
          setSelectedArtist={setSelectedArtist}
          setSearchExpression={setSearchExpression}
        />
        <div className="flex columns-2 pr-2">
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            handleSetStartDate={handleSetStartDate}
            handleSetEndDate={handleSetEndDate}
          />
          {
          enableTooltips && <AutoRESTDatesTooltip />
        }
        </div>
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

export default FilterSelector;
