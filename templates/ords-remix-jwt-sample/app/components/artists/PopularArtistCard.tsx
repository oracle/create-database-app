/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import React from 'react';
import Artist from '../../models/Artist';
import artistImages from '../utils/artistImages';

interface PopularArtistCardProps {
  artist: Artist;
}

/**
 * The Follow information Card.
 * @param props the popular artist propr.
 * @returns the Follow Artist Card
 */
function FollowInformation(props: PopularArtistCardProps) {
  const { artist } = props;
  return (
    <div className="absolute inset-0 top-24 m-auto flex flex-col items-center text-white">
      <span className="my-1 text-base font-bold">{ artist.name }</span>
      <button type="button" className="my-1 rounded bg-orange-500 p-2">Follow</button>
    </div>
  );
}

/**
 * The Popular Artist Component
 * @param props the popular artist attributes.
 * @returns the Popular Artists Component.
 */
function PopularArtistCard(props: PopularArtistCardProps) {
  const { artist } = props;
  const [isHovered, setIsHovered] = React.useState(false);
  const musicGenres = artist.music_genres ? artist.music_genres.split(',').map((item) => item.trim()) : ['Indie'];

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="relative flex">
      <img className="rounded-3xl px-4" src={artistImages[musicGenres[0]]} alt="artist" />
      { isHovered && <FollowInformation artist={artist} />}
    </div>
  );
}

export default PopularArtistCard;
