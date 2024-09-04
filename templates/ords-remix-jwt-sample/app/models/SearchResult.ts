/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
interface SearchResult {
  event_id: number;
  event_name:string;
  artist_name: string;
  event_date: string;
  event_details: string;
  event_status_name: string;
  event_status_id: number;
  venue_id: number;
  venue_name: number;
  city_name: string;
  music_genres: string;
}

export default SearchResult;
