/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import React from 'react';
import HeroBanner from './HeroBanner';
import Countdown from './Countdown';
import Timeline from './Timeline';
import PopularArtists from './PopularArtists';
import EmailForm from './EmailForm';
import ORDSResponse from '../../models/ORDSResponse';
import BannerStats from '../../models/BannerStats';
import ORDSConcert from '../../models/ORDSConcert';
import Artist from '../../models/Artist';

interface UserHomeProps {
  stats: ORDSResponse< BannerStats >;
  events: ORDSResponse< ORDSConcert >;
  artists: ORDSResponse< Artist >;
}

/**
 * The Home User Component.
 * @param props the Home User props.
 * @returns the Home User Component.
 */
function UserHome(props: UserHomeProps) {
  const { stats, events, artists } = props;
  return (
    <div className="flex h-screen w-full flex-col">
      <HeroBanner stats={stats} />
      <Countdown events={events} />
      <Timeline events={events} />
      <EmailForm />
      <PopularArtists artists={artists} />
    </div>
  );
}

export default UserHome;
