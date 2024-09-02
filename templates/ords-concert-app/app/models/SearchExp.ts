/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
type ORDSDate = {
  $date : string
};

type SearchExp = {
  event_name? : object;
  artist_name? : object;
  city_name? : object;
  venue_name? : object;
  music_genres? : object;
  event_date? : { $gte : ORDSDate } |
  { $lte : ORDSDate } |
  { $between : ORDSDate[] };
};

export default SearchExp;
