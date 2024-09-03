/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import React, { useEffect } from 'react';
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  InputAdornment,
  Tabs,
  Tab,
  IconButton,
  CircularProgress,
} from '@mui/material';
import {
  Search,
  Close,
} from '@mui/icons-material';
import {
  useFetcher,
  useNavigate,
  useSearchParams,
} from '@remix-run/react';
import { SearchDialogProps } from '../../models/SearchDialogProps';
import ResultCard from './ResultSearchCard';
import TabPanelProps from '../../models/TabPanelProps';
import artistImage from '../../assets/musicGenresIcons/jazz_icon.png';
import { loader } from '../../routes/search.$searchKind.$searchParam';
import { SearchResultItem } from '../../models/SearchResultItem';
import { NavigationState } from '../../utils/NavigationState';

/**
 * A tab panel component
 * @param props the tab panel Props
 * @returns a tab panel component
 */
function CustomTabPanel(props: TabPanelProps) {
  const {
    children, value, index,
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
      <div>
        <div>{children}</div>
      </div>
      )}
    </div>
  );
}

/**
 * The Search Dialog Component.
 * @param props the Search Dialog props.
 * @returns the Search Dialog Component.
 */
function SearchDialog(props: SearchDialogProps) {
  const {
    isSearchDialogOpen,
    handleSearchDialogClose,
    dialogSearchTextInputRef,
  } = props;

  const searchTabsOptions = ['Artists', 'Events', 'Venues'];
  const [searchParams] = useSearchParams();
  const areTooltipsEnabled = searchParams.has('tooltips');
  const navigate = useNavigate();
  const [searchText, setSearchText] = React.useState('');
  const handleSearchTextInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value as string);
  };
  const [searchTabValue, setSearchTabValue] = React.useState(0);
  const DEBOUNCE_DELAY = 500;
  const fetcher = useFetcher<typeof loader>();
  useEffect(() => {
    const delayInputTimeout = setTimeout(() => {
      if (fetcher.state === NavigationState.IDLE && searchText !== '') {
        fetcher.load(`search/${searchTabsOptions[searchTabValue]}/${searchText}`);
      }
    }, DEBOUNCE_DELAY);
    return () => clearTimeout(delayInputTimeout);
  /*
  The dependencies of this object are searchText, searchTabValue
  if we add the fetcher and searchTabsOptions objects we fall
  into an infinite refetch loop.
  */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, searchTabValue]);
  const handleSearchTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSearchTabValue(newValue);
  };
  const { SearchResult } = fetcher.data === undefined ? {
    SearchResult: [
      {
        name: 'Joe Ridley',
        followers: 938292,
        img: artistImage,
      },
    ],
  } : fetcher.data!;

  const handleClose = () => {
    setSearchText('');
    handleSearchDialogClose();
  };
  return (
    <Dialog
      open={isSearchDialogOpen}
      onClose={handleSearchDialogClose}
      autoFocus={false}
      maxWidth={false}
      classes={{ paper: 'min-w-[calc(100%-96px)] min-h-[calc(100%-96px)] p-4' }}
      sx={{
        '.MuiPaper-root': {
          margin: 2,
        },
      }}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>Search</Box>
          <Box>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent className="py-4">
        <TextField
          className="w-full rounded bg-white text-sm focus:border-white focus:outline"
          label="Search"
          id="outlined-size-small"
          inputRef={dialogSearchTextInputRef}
          size="small"
          value={searchText}
          onChange={handleSearchTextInput}
          InputProps={{
            startAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Tabs
          value={searchTabValue}
          onChange={handleSearchTabChange}
          aria-label="search tabs control"
        >
          {
            searchTabsOptions.map((searchOption) => (
              <Tab
                label={searchOption}
                key={`searchOption-${searchOption}`}
              />
            ))
          }
        </Tabs>
        {
          searchTabsOptions.map((searchOption, index) => (
            <CustomTabPanel
              value={searchTabValue}
              key={`searchOptionCustomPanel-${searchOption}`}
              index={index}
            >
              {
                fetcher.state !== NavigationState.IDLE ? (
                  <div className="flex size-full items-center justify-center p-4">
                    <CircularProgress size={80} />
                  </div>
                )
                  : (
                    <div className="grid grid-cols-2 justify-evenly gap-4">
                      { SearchResult.map((result : SearchResultItem) => (
                        <div
                          key={result.name}
                        >
                          <ResultCard searchResult={result} closeDialog={handleClose} />
                        </div>
                      ))}
                    </div>
                  )

              }

            </CustomTabPanel>
          ))
        }
      </DialogContent>
      <DialogActions
        className="flex justify-center"
      >
        <button
          type="button"
          className="mr-5 rounded-3xl border-2 border-orange-400 bg-orange-400 px-4 py-2 text-sm
                                font-semibold text-white hover:border-orange-300 hover:bg-orange-300"
          onClick={() => {
            handleClose();
            navigate(`/search/${areTooltipsEnabled ? '?tooltips' : ''}`);
          }}
        >
          View More
        </button>
      </DialogActions>
    </Dialog>
  );
}

export default SearchDialog;
