/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import {
  Select, MenuItem,
  SelectChangeEvent,
  FormControl, InputLabel,
  Chip, OutlinedInput, Box,
} from '@mui/material';
import { useRef, useEffect, UIEvent } from 'react';
import CustomCircularProgress from '../utils/CircularProgress';

interface InfiniteSelectorProps {
  value: string[];
  onChange: (event: SelectChangeEvent<string[]>) => void;
  items: string[];
  loading: boolean;
  loadNext: () => void;
}

/**
 * Provides an infinite Selector Component
 * @param props the props of the component
 * @returns the infinite selector
 */
function InfiniteChipSelectorComponent(props : InfiniteSelectorProps) {
  const {
    value, onChange, items, loading, loadNext,
  } = props;
  const scrollListener = useRef(loadNext);
  const selectRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollListener.current = loadNext;
  }, [loadNext]);
  return (
    <div className="py-4">
      <FormControl sx={{
        minWidth: '100%',
      }}
      >
        <InputLabel>
          Music Genres
        </InputLabel>
        <Select
          labelId="simple-select-page-size"
          id="simple-select-page-size"
          multiple
          value={value}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              { Array.isArray(selected) && selected.map((selectedValue) => (
                <Chip key={selectedValue} label={items[selectedValue as unknown as number]} color="error" />
              ))}
            </Box>
          )}
          onChange={onChange}
          MenuProps={{
            ref: selectRef,
            style: {
              maxHeight: '24rem',
            },
            PaperProps: {
              onScroll: (event : UIEvent<HTMLDivElement>) => {
                const target = event.currentTarget;
                if (target.scrollHeight - target.scrollTop
                        === target.clientHeight && !loading) {
                  scrollListener.current();
                }
              },
            },
          }}
        >
          <MenuItem disabled value="">
            <em>Choose an item</em>
          </MenuItem>
          {
            items.map((item : string, index : number) => <MenuItem key={`menu-item-${item}`} value={index}>{item}</MenuItem>)
        }
          {
            loading && (
            <div className="flex justify-center">
              <CustomCircularProgress />
            </div>
            )
        }
        </Select>
      </FormControl>
    </div>
  );
}

export default InfiniteChipSelectorComponent;
