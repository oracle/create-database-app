/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
interface ArtistResult {
  artist_id: number;
  name: string;
  description: string;
  bio: string;
  music_genres?:string;
}

export default ArtistResult;