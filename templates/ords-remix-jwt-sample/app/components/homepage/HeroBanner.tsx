/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import React from 'react';
import BannerStats from '../../models/BannerStats';
import ORDSResponse from '../../models/ORDSResponse';

interface HeroBannerProps {
  stats: ORDSResponse< BannerStats>
}
/**
 * The Hero Banner Component.
 * @param props the Hero Banner props.
 * @returns the Hero Banner Component.
 */
function HeroBanner(props: HeroBannerProps) {
  const { stats } = props;
  return (
    <div className="flex w-full flex-row justify-around bg-half bg-cover bg-no-repeat">
      <div className="flex w-2/5 flex-col py-56">
        <div className="relative left-full max-w-fit">
          <div className="mb-12 flex flex-col text-4xl font-normal text-white">
            <span className="py-3">
              <span className="mr-2 text-emerald-500 drop-shadow-[0_1.2px_1.2px_rgba(1,1,1,0.8)]">{stats.items[0].events_count}</span>
              Music Concerts
            </span>
            <span className="py-3">
              <span className="mr-2 text-emerald-500 drop-shadow-[0_1.2px_1.2px_rgba(1,1,1,0.8)]">{stats.items[0].venues_count}</span>
              Total Venues
            </span>
            <span className="py-3">
              <span className="mr-2 text-emerald-500 drop-shadow-[0_1.2px_1.2px_rgba(1,1,1,0.8)]">{stats.items[0].artists_count}</span>
              Popular Artists
            </span>
          </div>
          <div className="flex flex-row justify-start text-white">
            <button
              type="button"
              className="mr-5 rounded-3xl border-2 border-red-500 bg-red-500 px-4 py-2"
            >
              Find an Event
            </button>
            <button type="button" className="rounded-3xl border-2 border-red-500 px-4 py-2">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
