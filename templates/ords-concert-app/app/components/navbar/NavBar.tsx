/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import {
  Form,
  Link,
  useSearchParams,
  useFetcher,
} from '@remix-run/react';
import React, { useEffect, useState } from 'react';
import {
  TextField,
  InputAdornment,
  Typography,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import Dropdown from './Dropdown';
import SearchDialog from './SearchDialog';
import NavBarProps from '../../models/NavBarProps';
import TooltipComponent from '../tooltips/TooltipComponent';
import featureDescriptions from '../../utils/ORDSFeaturesDescription';
import ORDSResponse from '../../models/ORDSResponse';
import City from '../../models/City';
import { loader } from '../../routes/resources.cities';
import { NavigationState } from '../../utils/NavigationState';
import { Ords } from '../icons';
/**
 *
 * @param localCities the ORDSResponse object where the cities are stored.
 * @returns the name of the cities
 */
function getCityNames(localCities : ORDSResponse<City>) {
  return localCities.items.map((city) => city.name);
}

/**
 * The Navbar Component.
 * @param props the Navbar props.
 * @returns the Navbar Component.
 */
function NavBar(props: NavBarProps) {
  const { user, cities } = props;
  const [searchParams] = useSearchParams();
  const enableTooltips = searchParams.has('tooltips');
  const hasSelectedCity = searchParams.has('cityName');
  const initialCity = hasSelectedCity ? searchParams.get('cityName')! : cities.items[0].name;
  const navPages = [
    ['Home', `/home?${enableTooltips ? 'tooltips' : ''}`],
    ['Concerts', `/search/concerts?${enableTooltips ? 'tooltips' : ''}`],
    ['Artists', `/search/artists?${enableTooltips ? 'tooltips' : ''}`],
    ['Venues', `/search/venues?${enableTooltips ? 'tooltips' : ''}`],
  ];
  const { URIParamsTooltip } = featureDescriptions;
  const [openCitySelector, setCitySelector] = React.useState(false);
  const [isSearchDialogOpen, setSearchDialogOpen] = React.useState(false);
  const handleClose = () => {
    setSearchDialogOpen(false);
  };
  const dialogSearchTextInputRef = React.useRef<HTMLInputElement>(null);
  const handleSearchTextInput = (event: React.MouseEvent<HTMLInputElement>) => {
    if (event.target) {
      setSearchDialogOpen(true);
    }
  };
  // Change focus to modal Search Textfield once the modal renders.
  React.useEffect(() => {
    const DELAY_TO_OPEN_DIALOG = 100;
    if (isSearchDialogOpen) {
      setTimeout(() => {
        dialogSearchTextInputRef.current?.focus();
      }, DELAY_TO_OPEN_DIALOG);
    }
  }, [isSearchDialogOpen]);

  const initialCities = getCityNames(cities);
  const [actualCities, setActualCities] = useState<string[]>(initialCities);
  const [hasMoreCities, setHasMoreCities] = useState<boolean>(cities.hasMore);
  const fetcher = useFetcher<typeof loader>();
  useEffect(() => {
    if (!fetcher.data || fetcher.state === NavigationState.LOADING) {
      return;
    }
    // If we have new data - append it
    if (fetcher.data) {
      const newCities = fetcher.data.cities as ORDSResponse<City>;
      const newCityNames = getCityNames(newCities);
      setActualCities((prevAssets) => [...prevAssets, ...newCityNames]);
      setHasMoreCities(newCities.hasMore);
    }
  }, [fetcher.data, fetcher.state]);

  const loadNext = () => {
    const DEFAULT_OFFSET = 10;
    const DEFAULT_CITIES_LIMIT = 30;
    if (hasMoreCities) {
      if (actualCities.length < DEFAULT_CITIES_LIMIT) {
        const offset = actualCities.length + DEFAULT_OFFSET;
        const query = `/resources/cities?offset=${offset}`;
        fetcher.load(query);
      }
    }
  };
  return (
    <div className="mb-auto w-full bg-black">
      <nav className="w-full">
        <ul className="flex flex-row items-center">
          {
            navPages.map(([title, url]) => (
              <li className="w-full hover:underline" key={title}>
                <Link
                  className="block size-full px-8 py-2 text-xs font-semibold text-white"
                  to={url}
                >
                  {title}
                </Link>
              </li>
            ))
          }
          {
            user && (
              <li className="w-full hover:underline" key="admin-dashboard">
                <Link
                  className="block size-full px-8 py-2 text-xs font-semibold text-white"
                  to={`/admin?${enableTooltips ? 'tooltips' : ''}`}
                >
                  Admin Dashboard
                </Link>
              </li>
            )
          }
          <li className="w-full px-8 py-4">
            <TextField
              className="rounded bg-white text-xs focus:border-white focus:outline"
              label="Search"
              id="outlined-size-small"
              size="small"
              onClick={handleSearchTextInput}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            <SearchDialog
              isSearchDialogOpen={isSearchDialogOpen}
              handleSearchDialogClose={handleClose}
              dialogSearchTextInputRef={dialogSearchTextInputRef}
            />
          </li>
          <li className="w-full py-2 pr-8">
            <div className="flex columns-2 pr-2">
              <Dropdown
                open={openCitySelector}
                selectedCity={initialCity}
                setCitySelector={setCitySelector}
                cities={actualCities}
                enableTooltips={enableTooltips}
                loading={hasMoreCities && fetcher.state === NavigationState.LOADING}
                loadNext={loadNext}
              />
              {
              enableTooltips && (
                <TooltipComponent featureProps={URIParamsTooltip}>
                  <div className="flex flex-row">
                    <div className="w-32 flex-none content-center px-2">
                      <Ords />
                    </div>
                    <div className="flex w-full flex-col">
                      <Typography gutterBottom variant="h5" component="div">
                        {URIParamsTooltip.title}
                      </Typography>
                      <Typography component="div" variant="body2" color="text.secondary">
                        When you change the city we update the URI CityName parameter of the
                        page which allows Remix to pass such parameter to the
                        {' '}
                        <Typography variant="body2" color="text.secondary" display="inline" sx={{ textDecoration: 'underline' }}>
                          /euser/v1/cityEvents/:CityName
                        </Typography>
                        {' '}
                        endpoint which returns the concerts of the selected city.
                        {' '}
                        <a
                          className="text-blue-600 underline hover:text-blue-800"
                          target="_blank"
                          href={URIParamsTooltip.link}
                          rel="noreferrer"
                        >
                          Learn more.
                        </a>
                      </Typography>
                    </div>
                  </div>
                </TooltipComponent>
              )
              }
            </div>

          </li>
          {
            user === null
              ? (
                <li className="w-full">
                  <Form method="post" action="/auth0">
                    <button
                      className="rounded bg-red-600 px-4 py-2 text-xs text-white hover:bg-red-500"
                      type="submit"
                    >
                      Log in/Sign In
                    </button>
                  </Form>
                </li>
              )
              : (
                <>
                  <li className="w-full px-4 py-2 text-xs">
                    <Link
                      className="w-full text-xs text-white hover:underline"
                      to="/private/profile"
                    >
                      {user.displayName}
                    </Link>
                  </li>
                  <li className="w-full">
                    <Form method="post" action="/logout">
                      <button
                        className="rounded bg-red-600 px-4 py-2
                                text-xs text-white hover:bg-red-500"
                        type="submit"
                      >
                        Logout
                      </button>
                    </Form>
                  </li>
                </>
              )
          }
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
