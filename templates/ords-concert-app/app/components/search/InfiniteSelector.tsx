/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import {
  Select, MenuItem,
  SelectChangeEvent,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useRef, useEffect, UIEvent } from 'react';
import CustomCircularProgress from '../utils/CircularProgress';

interface InfiniteSelectorProps {
  label:string;
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
function InfiniteSelectorComponent(props : InfiniteSelectorProps) {
  const {
    label, value, onChange, items, loading, loadNext,
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
          {label}
        </InputLabel>
        <Select
          labelId="simple-select-page-size"
          id="simple-select-page-size"
          value={value}
          onChange={onChange}
          MenuProps={{
            ref: selectRef,
            style: {
              maxHeight: '24rem',
              maxWidth: '100%',
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

export default InfiniteSelectorComponent;
