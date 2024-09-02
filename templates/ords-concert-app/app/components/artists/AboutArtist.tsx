/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import React, { ReactElement } from 'react';
import Artist from '../../models/Artist';
import ORDSConcert from '../../models/ORDSConcert';
import ORDSResponse from '../../models/ORDSResponse';

interface AboutCardProps {
  artist: Artist;
  events: ORDSResponse<ORDSConcert>;
}

/**
 * The About Artist Component
 * @param props the artist atributes.
 * @returns the About Artist Card
 */
function AboutArtist(props: AboutCardProps) : ReactElement {
  const { artist, events } = props;
  const lastEventCity = events.items.length > 0 ? events.items[0].city_name : 'New York';
  const totalConcerts = events.items.length;
  return (
    <div className="mt-8 flex flex-col">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center">
          <h1 className="my-1 text-5xl font-semibold">About Artist</h1>
          <p className="my-1 text-lg font-normal">
            Everything to know about
            { artist.name }
          </p>
        </div>
      </div>
      <div className="flex flex-row justify-between px-24">
        <div className="flex w-1/3 flex-col p-10">
          <div className="my-8 flex flex-col">
            <span className="text-2xl font-bold">Bio</span>
            <p className="text-lg font-normal">{ artist.bio }</p>
          </div>
          <div className="my-8 flex flex-col">
            <span className="text-2xl font-bold">Fun Facts</span>
            <ul className="text-lg font-normal">
              <li>Favorite Artist: Michael Robinson</li>
              <li>Loves to eat fruity snacks</li>
              <li>Owns a cat named Theo</li>
            </ul>
          </div>
          <div className="my-8 flex flex-col">
            <span className="text-2xl font-bold">Details</span>
            <p className="text-lg font-normal">{ artist.description }</p>
          </div>
        </div>
        <div className="flex w-1/3 flex-col p-10">
          <div className="my-8 flex flex-col">
            <span className="text-2xl font-bold">Last Concert</span>
            <span className="text-lg font-normal text-list-items">{ lastEventCity }</span>
          </div>
          <div className="my-8 flex flex-col">
            <span className="text-2xl font-bold">Last Concert Near You</span>
            <p className="text-lg  font-normal">Dallas, TX</p>
          </div>
          <div className="my-8 flex flex-col">
            <span className="text-2xl font-bold">Popularity Ranking</span>
            <p className="text-lg font-normal text-list-items">#10</p>
          </div>
          <div className="my-8 flex flex-col">
            <span className="text-2xl font-bold">Concerts played in 2024</span>
            <p className="text-lg font-normal">
              {totalConcerts}
              {' '}
              concerts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutArtist;
