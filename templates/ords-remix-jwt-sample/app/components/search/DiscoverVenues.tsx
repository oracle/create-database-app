/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import React, { useEffect, useState } from 'react';
import {
  TextField,
  CircularProgress,
  InputAdornment,
  SelectChangeEvent,
} from '@mui/material';
import {
  useFetcher,
} from '@remix-run/react';
import { Search } from '@mui/icons-material';
import { loader } from '~/routes/search.venues';
import ORDSResponse, { ORDSLink } from '../../models/ORDSResponse';
import { NavigationState } from '../../utils/NavigationState';
import PaginationTab from './PaginationTab';
import SearchExp from '../../models/SearchExp';
import City from '../../models/City';
import VenueResult from '../../models/VenueResult';
import VenuesFilterSelector from './VenueFilterSelector';
import VenueResultCard from './VenuesResultCard';
import SearchTooltip from '../tooltips/SearchTooltipComponent';

interface DiscoverVenuesProps {
  id: string;
  title: string;
  description: string;
  enableTooltips: boolean;
  initialResultSet: ORDSResponse<VenueResult>;
  cities: ORDSResponse<City>;
}

/**
 * Renders the Discover Components of the requested elements
 * @param props the Discover Page props
 * @returns the Discover Component
 */
function DiscoverVenues(props: DiscoverVenuesProps) {
  const {
    id, title, description, enableTooltips, initialResultSet, cities,
  } = props;
  const [searchText, setSearchText] = useState('');
  const [searchExpression, setSearchExpression] = useState<SearchExp>({
  });
  const handleSearchTextInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetSearchText = event.target.value as string;
    setSearchText(targetSearchText);
    setSearchExpression((prevSearchExp) => ({
      ...prevSearchExp,
      name: { $like: `%${targetSearchText}%` },
    }));
  };
  const defaultPageSize = 10;
  const [itemsPerPage, setItemsPerPage] = useState(defaultPageSize);
  const [offset, setOffset] = useState(0);
  const handleChangeItemsPerPage = (
    event: SelectChangeEvent<number>,
  ) => {
    setItemsPerPage(event.target.value as number);
  };
  const handleNextPage = () => {
    setOffset(offset + itemsPerPage);
  };

  const handlePrevPage = () => {
    setOffset(offset - itemsPerPage);
  };

  const DEBOUNCE_DELAY = 500;
  const fetcher = useFetcher<typeof loader>();
  useEffect(() => {
    const delayInputTimeout = setTimeout(() => {
      if (fetcher.state === NavigationState.IDLE) {
        const urlParams = new URLSearchParams();
        if (Object.keys(searchExpression).length !== 0) {
          urlParams.append('q', JSON.stringify(searchExpression));
        }
        urlParams.append('limit', itemsPerPage.toString());
        urlParams.append('offset', offset.toString());
        fetcher.load(`/search/${id}?${urlParams.toString()}`);
      }
    }, DEBOUNCE_DELAY);
    return () => clearTimeout(delayInputTimeout);
  /*
  The dependencies of this object are searchText, itemsPerPage and offset
  if we add the fetcher object we fall
  into an infinite refetch loop.
  */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchExpression, itemsPerPage, offset]);

  const searchResult = fetcher.data === undefined ? initialResultSet
    : fetcher.data.searchResult;
  const hasNextPage = searchResult.links.some((link : ORDSLink) => link.rel === 'next');
  const hasPrevPage = searchResult.links.some((link : ORDSLink) => link.rel === 'prev');

  return (
    <div className="flex w-full flex-row">
      <div className="w-1/4 px-4">
        <VenuesFilterSelector
          cities={cities}
          setSearchExpression={setSearchExpression}
        />
      </div>
      <div className="w-3/4">
        <div className="flex columns-2 pr-2">
          <h1 className="text-4xl font-extrabold">
            {title}
          </h1>
          {
            enableTooltips && <SearchTooltip />
          }
        </div>
        <p className="my-4 text-lg font-normal">
          {description}
        </p>
        <div className="flex flex-row">
          <TextField
            className=" w-full rounded bg-white text-xs focus:border-white focus:outline"
            id="outlined-basic"
            name="search_text"
            label="Search"
            variant="outlined"
            value={searchText}
            onChange={handleSearchTextInput}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </div>
        {
          fetcher.state === NavigationState.IDLE ? (
            <div className=" grid grid-cols-2 justify-evenly gap-4 py-4">
              { searchResult.items.map((result : VenueResult, index: number) => (
                <div
                  key={result.name}
                >
                  <VenueResultCard
                    searchResult={result}
                    index={index}
                    enableTooltips={enableTooltips}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex size-full items-center justify-center p-4">
              <CircularProgress size={80} />
            </div>
          )
        }
        <div className="my-10 flex w-full items-center justify-center p-4">
          <PaginationTab
            pageSize={itemsPerPage}
            handlePageSizeChange={handleChangeItemsPerPage}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
            enableTooltips={enableTooltips}
          />
        </div>
      </div>
    </div>
  );
}

export default DiscoverVenues;
