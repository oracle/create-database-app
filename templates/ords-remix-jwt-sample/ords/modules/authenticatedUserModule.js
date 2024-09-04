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
import defineParameter from '../RESTfulServices/parameter.js';
import {
  COLLECTION_FEED_SOURCE_TYPE,
  COLLECTION_ITEM_SOURCE_TYPE,
  PLSQL_SOURCE_TYPE,
} from '../RESTfulServices/constants/handler.js';

/**
 * Creates all the Authenticated User Modules.
 * Uses the schema credentials.
 * @param {string} endpoint the ADB-S ords endpoint.
 * @param {string} basicAuth the authentication string for the models owner.
 */
async function createAuthenticatedUserModules(endpoint, basicAuth) {
  const ITEMS_PER_PAGE = 10;
  const MODULE_NAME = 'concert_app.authuser.v1';
  const endUserModuleStatements = `
    ${defineModule(MODULE_NAME, 'authuser/v1/', 0, 'PUBLISHED', 'authenticated user APIs Version 1')}

  BEGIN

  ${defineTemplate(MODULE_NAME, 'events/', 'events resource for authenticated users')}

  ${defineHandler(
    MODULE_NAME,
    'events/',
    'GET',
    COLLECTION_FEED_SOURCE_TYPE,
    `SELECT 
        a.name AS ARTIST_NAME,
        e.event_id AS EVENT_ID,
        e.event_date AS EVENT_DATE,
        e.event_details AS EVENT_DETAILS,
        es.event_status_name as EVENT_STATUS_NAME,
        es.event_status_id AS EVENT_STATUS_ID,
        v.venue_id AS VENUE_ID,
        v.name AS VENUE_NAME
    FROM 
        events e
        INNER JOIN artists a ON e.artist_id = a.artist_id
        INNER JOIN event_status es ON e.event_status_id = es.event_status_id
        INNER JOIN venues v ON e.venue_id = v.venue_id
        ORDER BY e.event_date DESC`,
    ITEMS_PER_PAGE,
  )}

  ${defineTemplate(
    MODULE_NAME,
    'event/:event_id',
    'event resource for authenticated users',
  )}

  ${defineHandler(
    MODULE_NAME,
    'event/:event_id',
    'GET',
    COLLECTION_FEED_SOURCE_TYPE,
    `SELECT 
        a.name AS ARTIST_NAME,
        e.event_id AS EVENT_ID,
        e.event_date AS EVENT_DATE,
        e.event_details AS EVENT_DETAILS,
        es.event_status_name as EVENT_STATUS_NAME,
        es.event_status_id AS EVENT_STATUS_ID,
        v.venue_id AS VENUE_ID,
        v.name AS VENUE_NAME
    FROM 
        events e
        INNER JOIN artists a ON e.artist_id = a.artist_id
        INNER JOIN event_status es ON e.event_status_id = es.event_status_id
        INNER JOIN venues v ON e.venue_id = v.venue_id
        WHERE e.event_id = :event_id`,
    ITEMS_PER_PAGE,
  )}

  ${defineTemplate(
    MODULE_NAME,
    'liked_artists/:user_id',
    'Liked artist of user',
  )}

  ${defineHandler(
    MODULE_NAME,
    'liked_artists/:user_id',
    'GET',
    COLLECTION_FEED_SOURCE_TYPE,
    `SELECT A.* FROM ARTISTS A 
        JOIN LIKED_ARTIST L_A 
        ON A.ARTIST_ID = L_A.ARTIST_ID
        WHERE L_A.USER_ID = :user_id`,
    ITEMS_PER_PAGE,
  )}

  ${defineTemplate(MODULE_NAME, 'liked_artist/:user_id/:artist_id', 'Check if user liked an artist')}

  ${defineHandler(
    MODULE_NAME,
    'liked_artist/:user_id/:artist_id',
    'GET',
    COLLECTION_ITEM_SOURCE_TYPE,
    `SELECT COUNT(1) as likedArtist FROM LIKED_ARTIST 
        WHERE USER_ID = :user_id AND ARTIST_ID = :artist_id`,
    ITEMS_PER_PAGE,
  )}

  ${defineTemplate(
    MODULE_NAME,
    'liked_venues/:user_id',
    'Liked venues of user',
  )}

  ${defineHandler(
    MODULE_NAME,
    'liked_venues/:user_id',
    'GET',
    COLLECTION_FEED_SOURCE_TYPE,
    `SELECT V.* FROM VENUE V 
        JOIN LIKED_VENUE L_V 
        ON V.ID = L_V.VENUE_ID
        WHERE L_V.USER_ID = :user_id`,
    ITEMS_PER_PAGE,
  )}

  ${defineTemplate(
    MODULE_NAME,
    'liked_venue/:user_id/:venue_id',
    'Check if user liked a venue',
  )}

  ${defineHandler(
    MODULE_NAME,
    'liked_venue/:user_id/:venue_id',
    'GET',
    COLLECTION_ITEM_SOURCE_TYPE,
    `SELECT COUNT(1) as likedVenue FROM LIKED_VENUE 
        WHERE USER_ID = :user_id AND VENUE_ID = :venue_id`,
    ITEMS_PER_PAGE,
  )}

  ${defineTemplate(
    MODULE_NAME,
    'liked_events/:user_id',
    'Liked events of user',
  )}

  ${defineHandler(
    MODULE_NAME,
    'liked_events/:user_id',
    'GET',
    COLLECTION_FEED_SOURCE_TYPE,
    `SELECT E.* FROM EVENTS E 
        JOIN LIKED_EVENT L_E 
        ON E.EVENT_ID = L_E.EVENT_ID
        WHERE L_E.USER_ID = :user_id`,
    ITEMS_PER_PAGE,
  )}

  ${defineTemplate(
    MODULE_NAME,
    'liked_event/:user_id/:event_id',
    'Check if user liked an event',
  )}

  ${defineHandler(
    MODULE_NAME,
    'liked_event/:user_id/:event_id',
    'GET',
    COLLECTION_ITEM_SOURCE_TYPE,
    `SELECT COUNT(1) as likedEvent FROM LIKED_EVENT 
        WHERE USER_ID = :user_id AND EVENT_ID = :event_id`,
    ITEMS_PER_PAGE,
  )}

  ${defineTemplate(MODULE_NAME, 'liked_artist', 'add an entry to the liked artist table')}
        
  ${defineHandler(
    MODULE_NAME,
    'liked_artist',
    'POST',
    PLSQL_SOURCE_TYPE,
    `BEGIN
      INSERT INTO LIKED_ARTIST(ARTIST_ID, USER_ID)
      VALUES (:ARTIST_ID, :USER_ID);
      :status_code := 201;
      :pv_result := ''ARTIST LIKED SUCCESSFULLY'';
      :pn_status := ''SUCCESS'';
      EXCEPTION 
      WHEN OTHERS THEN 
      :status_code := 400;
      :pv_result := ''UNABLE TO LIKE ARTIST'';
      :pn_status := ''ERROR'';
    END;
        `,
    ITEMS_PER_PAGE,
  )}

  ${defineParameter(
    MODULE_NAME,
    'liked_artist',
    'POST',
    'STATUS_CODE',
    'pn_status',
    'RESPONSE',
    'STRING',
    'OUT',
    'Response status',
  )}

  ${defineParameter(
    MODULE_NAME,
    'liked_artist',
    'POST',
    'RESULT_MESSAGE',
    'pv_result',
    'RESPONSE',
    'STRING',
    'OUT',
    'Response message',
  )}

  ${defineParameter(
    MODULE_NAME,
    'liked_artist',
    'POST',
    'ARTIST_ID ',
    'artist_id',
    'HEADER',
    'INT',
    'IN',
    'id of artists',
  )}

  ${defineParameter(
    MODULE_NAME,
    'liked_artist',
    'POST',
    'USER_ID ',
    'user_id',
    'HEADER',
    'STRING',
    'IN',
    'user id, provided by auth0',
  )}

  ${defineHandler(
    MODULE_NAME,
    'liked_artist',
    'DELETE',
    PLSQL_SOURCE_TYPE,
    `BEGIN
      DELETE FROM LIKED_ARTIST
      WHERE ARTIST_ID = :ARTIST_ID AND USER_ID = :USER_ID;
      IF SQL%ROWCOUNT = 0 THEN
          :status_code := 404;
          :pv_result := ''Invalid user_id or artist_id number'';
          :pn_status := ''NO_MATCH'';
      ELSE
          :status_code := 200;
          :pv_result := ''UNLIKED ARTIST SUCCESSFULLY'';
          :pn_status := ''SUCCESS'';
      END IF;
      EXCEPTION 
      WHEN OTHERS THEN 
          :status_code := 400;
          :pv_result := ''UNABLE TO UNLIKE '';
          :pn_status := ''ERROR'';
        END;
        `,
    ITEMS_PER_PAGE,
  )}

  ${defineParameter(
    MODULE_NAME,
    'liked_artist',
    'DELETE',
    'STATUS_CODE',
    'pn_status',
    'RESPONSE',
    'STRING',
    'OUT',
    'Response status',
  )}

  ${defineParameter(
    MODULE_NAME,
    'liked_artist',
    'DELETE',
    'RESULT_MESSAGE',
    'pv_result',
    'RESPONSE',
    'STRING',
    'OUT',
    'Response message',
  )}

  ${defineParameter(
    MODULE_NAME,
    'liked_artist',
    'DELETE',
    'ARTIST_ID ',
    'artist_id',
    'HEADER',
    'INT',
    'IN',
    'id of artists',
  )}

  ${defineParameter(
    MODULE_NAME,
    'liked_artist',
    'DELETE',
    'USER_ID ',
    'user_id',
    'HEADER',
    'STRING',
    'IN',
    'user id, provided by auth0',
  )}

  ${defineTemplate(
    MODULE_NAME,
    'liked_venue',
    'add an entry to the liked venue table',
  )}
        
  ${defineHandler(
    MODULE_NAME,
    'liked_venue',
    'POST',
    PLSQL_SOURCE_TYPE,
    `BEGIN
      INSERT INTO LIKED_VENUE(VENUE_ID, USER_ID)
      VALUES (:VENUE_ID, :USER_ID);
      :status_code := 201;
      :pv_result := ''VENUE LIKED SUCCESSFULLY'';
      :pn_status := ''SUCCESS'';
      EXCEPTION 
      WHEN OTHERS THEN 
      :status_code := 400;
      :pv_result := ''UNABLE TO LIKE VENUE'';
      :pn_status := ''ERROR'';
    END;
        `,
    ITEMS_PER_PAGE,
  )}

  ${defineParameter(
    MODULE_NAME,
    'liked_venue',
    'POST',
    'STATUS_CODE',
    'pn_status',
    'RESPONSE',
    'STRING',
    'OUT',
    'Response status',
  )}

  ${defineParameter(
    MODULE_NAME,
    'liked_venue',
    'POST',
    'RESULT_MESSAGE',
    'pv_result',
    'RESPONSE',
    'STRING',
    'OUT',
    'Response message',
  )}

  ${defineParameter(
    MODULE_NAME,
    'liked_venue',
    'POST',
    'VENUE_ID ',
    'venue_id',
    'HEADER',
    'INT',
    'IN',
    'id of artists',
  )}

  ${defineParameter(
    MODULE_NAME,
    'liked_venue',
    'POST',
    'USER_ID ',
    'user_id',
    'HEADER',
    'STRING',
    'IN',
    'user id, provided by auth0',
  )}

  ${defineHandler(
    MODULE_NAME,
    'liked_venue',
    'DELETE',
    COLLECTION_FEED_SOURCE_TYPE,
    `BEGIN
      DELETE FROM LIKED_VENUE 
      WHERE VENUE_ID = :VENUE_ID AND USER_ID = :USER_ID;
      IF SQL%ROWCOUNT = 0 THEN
          :status_code := 404;
          :pv_result := ''Invalid user_id or venue_id number'';
          :pn_status := ''NO_MATCH'';
      ELSE
          :status_code := 200;
          :pv_result := ''UNLIKED VENUE SUCCESSFULLY'';
          :pn_status := ''SUCCESS'';
      END IF;
      EXCEPTION 
      WHEN OTHERS THEN 
      :status_code := 400;
      :PN_RESULT := ''UNABLE TO UNLIKE VENUE'';
      :pn_status := ''ERROR'';
    END;
        `,
    ITEMS_PER_PAGE,
  )}

  ${defineParameter(
    MODULE_NAME,
    'liked_venue',
    'DELETE',
    'STATUS_CODE',
    'pn_status',
    'RESPONSE',
    'STRING',
    'OUT',
    'Response status',
  )}

  ${defineParameter(
    MODULE_NAME,
    'liked_venue',
    'DELETE',
    'RESULT_MESSAGE',
    'pv_result',
    'RESPONSE',
    'STRING',
    'OUT',
    'Response message',
  )}

  ${defineParameter(
    MODULE_NAME,
    'liked_venue',
    'DELETE',
    'VENUE_ID ',
    'venue_id',
    'HEADER',
    'INT',
    'IN',
    'id of artists',
  )}

  ${defineParameter(
    MODULE_NAME,
    'liked_venue',
    'DELETE',
    'USER_ID ',
    'user_id',
    'HEADER',
    'STRING',
    'IN',
    'user id, provided by auth0',
  )}

  ${defineTemplate(
    MODULE_NAME,
    'liked_event',
    'add an entry to the liked event table',
  )}
        
  ${defineHandler(
    MODULE_NAME,
    'liked_event',
    'POST',
    PLSQL_SOURCE_TYPE,
    `BEGIN
      INSERT INTO LIKED_EVENT(EVENT_ID, USER_ID)
      VALUES (:EVENT_ID, :USER_ID);
      :status_code := 201;
      :pv_result := ''EVENT LIKED SUCCESSFULLY'';
      :pn_status := ''SUCCESS'';
      EXCEPTION 
      WHEN OTHERS THEN 
          :status_code := 400;
          :pv_result := ''UNABLE TO LIKE EVENT.'';
          :pn_status := ''ERROR'';
    END;
        `,
    ITEMS_PER_PAGE,
  )}

  ${defineParameter(
    MODULE_NAME,
    'liked_event',
    'POST',
    'STATUS_CODE',
    'pn_status',
    'RESPONSE',
    'STRING',
    'OUT',
    'Response status',
  )}

  ${defineParameter(
    MODULE_NAME,
    'liked_event',
    'POST',
    'RESULT_MESSAGE',
    'pv_result',
    'RESPONSE',
    'STRING',
    'OUT',
    'Response message',
  )}

  ${defineParameter(
    MODULE_NAME,
    'liked_event',
    'POST',
    'VENUE_ID ',
    'event_id',
    'HEADER',
    'INT',
    'IN',
    'id of artists',
  )}

  ${defineParameter(
    MODULE_NAME,
    'liked_event',
    'POST',
    'USER_ID ',
    'user_id',
    'HEADER',
    'STRING',
    'IN',
    'user id, provided by auth0',
  )}

  ${defineHandler(
    MODULE_NAME,
    'liked_event',
    'DELETE',
    PLSQL_SOURCE_TYPE,
    `BEGIN
      DELETE FROM LIKED_EVENT 
      WHERE EVENT_ID = :EVENT_ID AND USER_ID = :USER_ID;
      IF SQL%ROWCOUNT = 0 THEN
          :status_code := 404;
          :pv_result := ''Invalid user_id or event_id number'';
          :pn_status := ''NO_MATCH'';
      ELSE
          :status_code := 200;
          :pv_result := ''UNLIKED EVENT SUCCESSFULLY'';
          :pn_status := ''SUCCESS'';
      END IF;
      EXCEPTION 
      WHEN OTHERS THEN 
          :status_code := 400;
          :pv_result := ''UNABLE TO UNLIKE EVENT'';
          :pn_status := ''ERROR'';
        END;
        `,
    ITEMS_PER_PAGE,
  )}

  ${defineParameter(
    MODULE_NAME,
    'liked_event',
    'DELETE',
    'STATUS_CODE',
    'pn_status',
    'RESPONSE',
    'STRING',
    'OUT',
    'Response status',
  )}

  ${defineParameter(
    MODULE_NAME,
    'liked_event',
    'DELETE',
    'RESULT_MESSAGE',
    'pv_result',
    'RESPONSE',
    'STRING',
    'OUT',
    'Response message',
  )}

  ${defineParameter(
    MODULE_NAME,
    'liked_event',
    'DELETE',
    'VENUE_ID ',
    'event_id',
    'HEADER',
    'INT',
    'IN',
    'id of artists',
  )}

  ${defineParameter(
    MODULE_NAME,
    'liked_event',
    'DELETE',
    'USER_ID ',
    'user_id',
    'HEADER',
    'STRING',
    'IN',
    'user id, provided by auth0',
  )}

    COMMIT;
END;
/
`;
  const statementsResponse = await postRequest(endpoint, endUserModuleStatements, basicAuth);
  printResponse(statementsResponse);
}

export default createAuthenticatedUserModules;
