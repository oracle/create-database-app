/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import React, {
  useRef, useEffect, UIEvent,
} from 'react';
import { ArrowDropDown } from '@mui/icons-material';
import { Link } from '@remix-run/react';
import CustomCircularProgress from '../utils/CircularProgress';

interface DropDownProps {
  open : boolean;
  selectedCity : string
  setCitySelector : (state : boolean) => void;
  cities : string[];
  enableTooltips : boolean;
  loading:boolean;
  loadNext: () => void;
}

/**
 * The Dropdown Component.
 * @param props the Dropdown props.
 * @returns the Dropdown Component.
 */
function Dropdown(props: DropDownProps) {
  const {
    open, selectedCity, setCitySelector, cities, enableTooltips, loading, loadNext,
  } = props;
  const scrollListener = useRef(loadNext);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    /**
     * Close the dropdown when the user click outside of it.
     * @param event the mouse event
     */
    function handleClickOutside(event : MouseEvent | TouchEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCitySelector(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setCitySelector]);

  useEffect(() => {
    scrollListener.current = loadNext;
  }, [loadNext]);

  useEffect(() => {
    const dropdownComponent = dropdownRef.current;
    const onScroll = (event : UIEvent<HTMLDivElement>) => {
      const target = event.currentTarget;
      if (target.scrollHeight - target.scrollTop
          === target.clientHeight && !loading) {
        scrollListener.current();
      }
    };
    const handleScrollEvent = (event: Event) => onScroll(event as
      unknown as UIEvent<HTMLDivElement>);
    if (dropdownComponent) {
      dropdownComponent.addEventListener('scroll', handleScrollEvent as EventListener);
      return () => {
        dropdownComponent.removeEventListener('scroll', handleScrollEvent as EventListener);
      };
    }
    return undefined;
  });
  return (
    <div className="min-w-6">
      <button
        type="button"
        onClick={() => {
          setCitySelector(true);
        }}
        className="inline-flex items-center rounded px-4 py-2 text-xs text-white hover:bg-gray-700"
      >
        {selectedCity}
        <ArrowDropDown />
      </button>
      {
        open
          ? (
            <div className="absolute z-10 max-h-64 origin-top-right overflow-y-scroll rounded-md bg-black" ref={dropdownRef}>
              {cities.map((item) => (
                <Link
                  className="block size-full px-4 py-2 text-xs text-white hover:bg-gray-700"
                  to={`/home?cityName=${encodeURIComponent(item)}${enableTooltips ? '&tooltips' : ''}`}
                  key={`link-${item}`}
                  reloadDocument
                >
                  {item}
                </Link>
              ))}
              {
                loading && (
                <div className="flex justify-center">
                  <CustomCircularProgress />
                </div>
                )
              }
            </div>
          )
          : null
      }
    </div>
  );
}

export default Dropdown;
