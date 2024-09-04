/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
/**
 *
 * @param stringDate the string representation of a Date,
 * follows the YYYY-MM-DDThh:mm:ss.sTZD  format
 * @returns the formatted date. (MM DD day, YYYYY)
 */
export function formatDate(stringDate: string) : string {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const concertDate = new Date(stringDate);
  const month = monthNames[concertDate.getMonth()];
  const day = concertDate.getDay();
  const dayName = days[day];
  const monthDay = concertDate.getDate();
  const year = concertDate.getFullYear();
  return `${dayName} ${month} ${monthDay}, 
  ${year}`;
}
