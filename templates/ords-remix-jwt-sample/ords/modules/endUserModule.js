/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import {
  postRequest,
  printResponse,
} from '../utils/ORDSRequests.js';
import defineModule from '../RESTfulServices/module.js';
import defineHandler from '../RESTfulServices/handler.js';
import defineTemplate from '../RESTfulServices/template.js';
/**
 * Creates all the End User Modules.
 * Uses the schema credentials.
 * @param {string} endpoint the ADB-S ords endpoint.
 * @param {string} basicAuth the authentication string for the owner user.
 */
async function createEndUserModules(endpoint, basicAuth) {
  const ITEMS_PER_PAGE = 10;
  const SOURCE_TYPE = 'ords.source_type_collection_feed';
  const MODULE_NAME = 'concert_app.euser.v1';

  const endUserModuleStatements = `
  ${defineModule(
    MODULE_NAME,
    'euser/v1/',
    0,
    'PUBLISHED',
    'end user APIs Version 1',
  )}

  BEGIN
        
  ${defineTemplate(
    MODULE_NAME,
    'artists/',
    'Artist resource for end users',
  )}

  ${defineHandler(
    MODULE_NAME,
    'artists/',
    'GET',
    SOURCE_TYPE,
    `SELECT
      A.ARTIST_ID,
      A.NAME,
      A.DESCRIPTION,
      LISTAGG(MG.NAME, '', '') WITHIN GROUP(
      ORDER BY
          MG.NAME
      ) AS MUSIC_GENRES
    FROM
      ARTISTS A
      LEFT JOIN ARTIST_CLASSIFICATIONS AA ON A.ARTIST_ID = AA.ARTIST_ID
      LEFT JOIN MUSIC_GENRES           MG ON AA.MUSIC_GENRE_ID = MG.MUSIC_GENRE_ID
    GROUP BY
      A.ARTIST_ID,
      A.NAME,
      A.DESCRIPTION
    ORDER BY
      A.NAME`,
    ITEMS_PER_PAGE,
  )}
        
  ${defineTemplate(MODULE_NAME, 'artist/:id', 'Artist resource for end users')}

  ${defineHandler(
    MODULE_NAME,
    'artist/:id',
    'GET',
    SOURCE_TYPE,
    `SELECT
      A.ARTIST_ID,
      A.NAME,
      A.DESCRIPTION,
      A.BIO,
      LISTAGG(MG.NAME, '', '') WITHIN GROUP( 
      ORDER BY
          MG.NAME
      ) AS MUSIC_GENRES
    FROM
      ARTISTS A
      LEFT JOIN ARTIST_CLASSIFICATIONS AA ON A.ARTIST_ID = AA.ARTIST_ID
      LEFT JOIN MUSIC_GENRES           MG ON AA.MUSIC_GENRE_ID = MG.MUSIC_GENRE_ID
    WHERE A.ARTIST_ID = :id
    GROUP BY
      A.ARTIST_ID,
      A.NAME,
      A.DESCRIPTION,
      A.BIO
    ORDER BY
      A.NAME`,
    ITEMS_PER_PAGE,
  )}

  ${defineTemplate(MODULE_NAME, 'artists/:artist_name', 'Artist resource for end users')}

  ${defineHandler(
    MODULE_NAME,
    'artists/:artist_name',
    'GET',
    SOURCE_TYPE,
    `SELECT * FROM ARTISTS 
      WHERE NAME LIKE ''%'' || :artist_name || ''%''`,
    ITEMS_PER_PAGE,
  )}

  ${defineTemplate(
    MODULE_NAME,
    'venues/',
    'Artist resource for end users',
  )}

  ${defineHandler(
    MODULE_NAME,
    'venues/',
    'GET',
    SOURCE_TYPE,
    'SELECT * FROM VENUES ORDER BY NAME DESC',
    ITEMS_PER_PAGE,
  )}
  
  ${defineTemplate(
    MODULE_NAME,
    'venues/:venue_name',
    'Artist resource for end users',
  )}

  ${defineHandler(
    MODULE_NAME,
    'venues/:venue_name',
    'GET',
    SOURCE_TYPE,
    `SELECT * FROM VENUES
    WHERE NAME LIKE ''%'' || :venue_name || ''%''`,
    ITEMS_PER_PAGE,
  )}

  ${defineTemplate(
    MODULE_NAME,
    'cities/',
    'Cities resource for end users',
  )}

  ${defineHandler(
    MODULE_NAME,
    'cities/',
    'GET',
    SOURCE_TYPE,
    `SELECT C.CITY_ID, C.NAME, C.DESCRIPTION, COUNT(E.EVENT_ID) AS EVENT_COUNT
      FROM CITIES C
      LEFT JOIN VENUES V ON C.CITY_ID = V.CITY_ID
      LEFT JOIN EVENTS E ON V.VENUE_ID = E.VENUE_ID
      GROUP BY C.CITY_ID, C.NAME, C.DESCRIPTION
      ORDER BY EVENT_COUNT DESC`,
    ITEMS_PER_PAGE,
  )}

  ${defineTemplate(MODULE_NAME, 'venues_by_city/:city_name', 'Artist resource for end users')}

  ${defineHandler(
    MODULE_NAME,
    'venues_by_city/:city_name',
    'GET',
    SOURCE_TYPE,
    `SELECT V.* 
      FROM VENUES V JOIN CITIES C 
      ON V.CITY_ID = C.CITY_ID
      WHERE C.CITY_NAME = :CITY_NAME
            `,
    ITEMS_PER_PAGE,
  )}

  ${defineTemplate(
    MODULE_NAME,
    'venue/:venue_id',
    'Artist resource for end users',
  )}

  ${defineHandler(
    MODULE_NAME,
    'venue/:venue_id',
    'GET',
    SOURCE_TYPE,
    'SELECT * FROM VENUES WHERE VENUE_ID = :VENUE_ID',
    ITEMS_PER_PAGE,
  )}

  ${defineTemplate(
    MODULE_NAME,
    'events/',
    'Artist resource for end users',
  )}

  ${defineHandler(
    MODULE_NAME,
    'events/',
    'GET',
    SOURCE_TYPE,
    'SELECT * FROM EVENTS',
    ITEMS_PER_PAGE,
  )}

  ${defineTemplate(MODULE_NAME, 'events/:event_name', 'Events for the homepage')}

  ${defineHandler(
    MODULE_NAME,
    'events/:event_name',
    'GET',
    SOURCE_TYPE,
    `SELECT * FROM EVENTS_VIEW 
    WHERE ARTIST_NAME LIKE ''%'' || :event_name || ''%''
    ORDER BY EVENT_DATE ASC`,
    ITEMS_PER_PAGE,
  )}

  ${defineTemplate(
    MODULE_NAME,
    'event/:event_id',
    'Artist resource for end users',
  )}

  ${defineHandler(
    MODULE_NAME,
    'event/:event_id',
    'GET',
    SOURCE_TYPE,
    'SELECT * FROM EVENTS_VIEW WHERE EVENT_ID = :event_id',
    ITEMS_PER_PAGE,
  )}

  ${defineTemplate(
    MODULE_NAME,
    'landing_page_global_stats/',
    'Banner stats for end users.',
  )}

  ${defineHandler(
    MODULE_NAME,
    'landing_page_global_stats/',
    'GET',
    SOURCE_TYPE,
    'SELECT * FROM BANNER_VIEW',
    ITEMS_PER_PAGE,
  )}

  ${defineTemplate(MODULE_NAME, 'eventsHome/', 'Events for the homepage')}

  ${defineHandler(
    MODULE_NAME,
    'eventsHome/',
    'GET',
    SOURCE_TYPE,
    'SELECT * FROM EVENTS_VIEW ORDER BY EVENT_DATE ASC',
    ITEMS_PER_PAGE,
  )}

  ${defineTemplate(
    MODULE_NAME,
    'artistEvents/:id',
    'Events for a particular Artist.',
  )}

  ${defineHandler(
    MODULE_NAME,
    'artistEvents/:id',
    'GET',
    SOURCE_TYPE,
    'SELECT * FROM EVENTS_VIEW WHERE ARTIST_ID = :id ORDER BY EVENT_DATE ASC',
    ITEMS_PER_PAGE,
  )}

  ${defineTemplate(MODULE_NAME, 'cityEvents/:cityName', 'Events for a particular City.')}

  ${defineHandler(
    MODULE_NAME,
    'cityEvents/:cityName',
    'GET',
    SOURCE_TYPE,
    'SELECT * FROM EVENTS_VIEW WHERE CITY_NAME=:cityName  ORDER BY EVENT_DATE ASC',
    ITEMS_PER_PAGE,
  )}

  ${defineTemplate(
    MODULE_NAME,
    'eventStatus/',
    'Event status resource for end users',
  )}

  ${defineHandler(
    MODULE_NAME,
    'eventStatus/',
    'GET',
    SOURCE_TYPE,
    'SELECT * FROM EVENT_STATUS',
    ITEMS_PER_PAGE,
  )}

  ${defineTemplate(
    MODULE_NAME,
    'musicGenres/',
    ' music genres resource for end users',
  )}

  ${defineHandler(
    MODULE_NAME,
    'musicGenres/',
    'GET',
    SOURCE_TYPE,
    'SELECT * FROM MUSIC_GENRES',
    ITEMS_PER_PAGE,
  )}

    COMMIT;
END;
/
`;
  const statementsResponse = await postRequest(endpoint, endUserModuleStatements, basicAuth);
  printResponse(statementsResponse);
}

export default createEndUserModules;
