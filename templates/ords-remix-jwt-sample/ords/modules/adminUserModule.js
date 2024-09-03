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
import { PLSQL_SOURCE_TYPE } from '../RESTfulServices/constants/handler.js';

/**
 * Creates all the Admin User Modules.
 * Uses the schema credentials.
 * @param {string} endpoint the ADB-S ords endpoint.
 * @param {string} basicAuth the authentication string for the models owner.
 */
async function createAdminUserModules(endpoint, basicAuth) {
  const ITEMS_PER_PAGE = 10;
  const MODULE_NAME = 'concert_app.adminuser.v1';
  const adminUserStatements = `
    ${defineModule(MODULE_NAME, 'adminuser/v1/', 0, 'PUBLISHED', 'admin user APIs Version 1')}

  BEGIN
        
  ${defineTemplate(
    MODULE_NAME,
    'artists',
    'Artists resource for admins',
  )}

  ${defineHandler(
    MODULE_NAME,
    'artists',
    'POST',
    PLSQL_SOURCE_TYPE,
    `BEGIN
    INSERT INTO ARTISTS(NAME, DESCRIPTION, BIO)
    VALUES (:name, :description, :bio)
    RETURNING ARTIST_ID INTO :artist_id;
    :status_code:= 201;
    :pv_result := ''Artists Added'';
    :pn_status := ''SUCCESS'';
    EXCEPTION 
        WHEN OTHERS THEN 
        :status_code:= 400;
        :artist_id := -1;
        :pv_result := ''UNABLE TO ADD ARTIST'' || SQLERRM;
        :pn_status := ''ERROR'';
    END;
        `,
    ITEMS_PER_PAGE,
  )}

  ${defineParameter(
    MODULE_NAME,
    'artists',
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
    'artists',
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
    'artists',
    'POST',
    'OBJECT_ID',
    'artist_id',
    'RESPONSE',
    'INT',
    'OUT',
    'The artist id of the created artist',
  )}

  ${defineParameter(
    MODULE_NAME,
    'artists',
    'POST',
    'NAME',
    'name',
    'HEADER',
    'STRING',
    'IN',
    'artist_name',
  )}

  ${defineParameter(
    MODULE_NAME,
    'artists',
    'POST',
    'DESCRIPTION',
    'description',
    'HEADER',
    'STRING',
    'IN',
    'artist bio',
  )}

  ${defineParameter(
    MODULE_NAME,
    'artists',
    'POST',
    'BIO',
    'bio',
    'HEADER',
    'STRING',
    'IN',
    'artist bio',
  )}

  ${defineHandler(
    MODULE_NAME,
    'artists',
    'PUT',
    PLSQL_SOURCE_TYPE,
    `BEGIN
          UPDATE ARTISTS A
          SET NAME = nvl(:name, A.NAME), BIO = nvl(:bio, A.BIO)
          WHERE A.ARTIST_ID = :id;
          :status_code:= 201;
          :pv_result := ''Artists Updated'';
          :pn_status := ''SUCCESS'';
          EXCEPTION 
              WHEN OTHERS THEN 
              :status_code:= 400;
              :pv_result := ''UNABLE TO UPDATE ARTIST'' || SQLERRM;
              :pn_status := ''ERROR'';
          END;
          `,
    ITEMS_PER_PAGE,
  )}

  ${defineParameter(
    MODULE_NAME,
    'artists',
    'PUT',
    'STATUS_CODE',
    'pn_status',
    'RESPONSE',
    'STRING',
    'OUT',
    'Response status',
  )}

  ${defineParameter(
    MODULE_NAME,
    'artists',
    'PUT',
    'RESULT_MESSAGE',
    'pv_result',
    'RESPONSE',
    'STRING',
    'OUT',
    'Response message',
  )}

  ${defineParameter(
    MODULE_NAME,
    'artists',
    'PUT',
    'ARTIST_ID',
    'artist_id',
    'HEADER',
    'INT',
    'IN',
    'artist_id',
  )}

  ${defineParameter(
    MODULE_NAME,
    'artists',
    'PUT',
    'ARTIST_NAME ',
    'artist_name',
    'HEADER',
    'STRING',
    'IN',
    'artist_name',
  )}

  ${defineParameter(
    MODULE_NAME,
    'artists',
    'PUT',
    'BIO',
    'bio',
    'HEADER',
    'STRING',
    'IN',
    'artist bio',
  )}

  ${defineHandler(
    MODULE_NAME,
    'artists',
    'DELETE',
    PLSQL_SOURCE_TYPE,
    `BEGIN
      DELETE FROM ARTISTS
      WHERE ARTIST_ID = :id;

      IF SQL%ROWCOUNT = 0 THEN
          :status_code:= 404;
          :pv_result := ''Invalid artist id'';
          :pn_status := ''NO_MATCH'';
      ELSE
          :status_code:= 200;
          :pv_result := ''Artist Deleted'';
          :pn_status := ''SUCCESS'';
      END IF;

      EXCEPTION 
          WHEN OTHERS THEN 
          :status_code:= 400;
          :pv_result := ''UNABLE TO DELETE ARTIST'' || SQLERRM;
          :pn_status := ''ERROR'';
    END;
        `,
    ITEMS_PER_PAGE,
  )}

  ${defineParameter(
    MODULE_NAME,
    'artists',
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
    'artists',
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
    'artists',
    'DELETE',
    'ARTIST_ID',
    'artist_id',
    'HEADER',
    'INT',
    'IN',
    'artist_id',
  )}
          
  ${defineTemplate(
    MODULE_NAME,
    'venues',
    'Venues resource for admins',
  )}

  ${defineHandler(
    MODULE_NAME,
    'venues',
    'POST',
    PLSQL_SOURCE_TYPE,
    `BEGIN
      INSERT INTO VENUES(NAME, LOCATION, CITY_ID)
      VALUES (:name, :location, :city_id)
      RETURNING VENUE_ID INTO :venue_id; 
      :status_code:= 201;
      :pv_result := ''Venue Added'';
      :pn_status := ''SUCCESS'';
      EXCEPTION 
          WHEN OTHERS THEN 
          :status_code:= 400;
          :pv_result := ''UNABLE TO ADD VENUE'' || SQLERRM;
          :pn_status := ''ERROR'';
      END;
          `,
    ITEMS_PER_PAGE,
  )}

  ${defineParameter(
    MODULE_NAME,
    'venues',
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
    'venues',
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
    'venues',
    'POST',
    'OBJECT_ID',
    'venue_id',
    'RESPONSE',
    'INT',
    'OUT',
    'The venue id of the created venue.',
  )}

  ${defineParameter(
    MODULE_NAME,
    'venues',
    'POST',
    'VENUE_NAME ',
    'name',
    'HEADER',
    'STRING',
    'IN',
    'name of the venue',
  )}

  ${defineParameter(
    MODULE_NAME,
    'venues',
    'POST',
    'VENUE_LOCATION ',
    'location',
    'HEADER',
    'STRING',
    'IN',
    'venue location',
  )}

  ${defineParameter(
    MODULE_NAME,
    'venues',
    'POST',
    'CITY_ID ',
    'city_id',
    'HEADER',
    'INT',
    'IN',
    'City ID of the venue.',
  )}

  ${defineHandler(
    MODULE_NAME,
    'venues',
    'PUT',
    PLSQL_SOURCE_TYPE,
    `BEGIN
      UPDATE VENUES V
      SET NAME = nvl(:name, V.NAME), LOCATION = nvl(:location, V.LOCATION)
      WHERE V.ID = :id;
      :status_code:= 201;
      :pv_result := ''VENUE Updated'';
      :pn_status := ''SUCCESS'';
      EXCEPTION 
          WHEN OTHERS THEN 
          :status_code:= 400;
          :pv_result := ''UNABLE TO UPDATE VENUE'' || SQLERRM;
          :pn_status := ''ERROR'';
      END;
          `,
    ITEMS_PER_PAGE,
  )}

  ${defineParameter(
    MODULE_NAME,
    'venues',
    'PUT',
    'STATUS_CODE',
    'pn_status',
    'RESPONSE',
    'STRING',
    'OUT',
    'Response status',
  )}

  ${defineParameter(
    MODULE_NAME,
    'venues',
    'PUT',
    'RESULT_MESSAGE',
    'pv_result',
    'RESPONSE',
    'STRING',
    'OUT',
    'Response message',
  )}

  ${defineParameter(
    MODULE_NAME,
    'venues',
    'PUT',
    'VENUE_ID ',
    'id',
    'HEADER',
    'INT',
    'IN',
    'venue id',
  )}

  ${defineParameter(
    MODULE_NAME,
    'venues',
    'PUT',
    'VENUE_NAME ',
    'name',
    'HEADER',
    'STRING',
    'IN',
    'name of the venue',
  )}

  ${defineParameter(
    MODULE_NAME,
    'venues',
    'PUT',
    'VENUE_LOCATION ',
    'location',
    'HEADER',
    'STRING',
    'IN',
    'venue location',
  )}

  ${defineHandler(
    MODULE_NAME,
    'venues',
    'DELETE',
    PLSQL_SOURCE_TYPE,
    `BEGIN
      DELETE FROM VENUES
      WHERE VENUE_ID = :id;

      IF SQL%ROWCOUNT = 0 THEN
          :status_code:= 404;
          :pv_result := ''Invalid venue id'';
          :pn_status := ''NO_MATCH'';
      ELSE
          :status_code:= 200;
          :pv_result := ''Venue Deleted'';
          :pn_status := ''SUCCESS'';
      END IF;

      EXCEPTION 
          WHEN OTHERS THEN 
          :status_code:= 400;
          :pv_result := ''UNABLE TO DELETE ARTIST'' || SQLERRM;
          :pn_status := ''ERROR'';
      END;
          `,
    ITEMS_PER_PAGE,
  )}

  ${defineParameter(
    MODULE_NAME,
    'venues',
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
    'venues',
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
    'venues',
    'DELETE',
    'VENUE_ID ',
    'id',
    'HEADER',
    'STRING',
    'IN',
    'venue_id',
  )}

  ${defineTemplate(
    MODULE_NAME,
    'events',
    'Events resource for admins',
  )}

  ${defineHandler(
    MODULE_NAME,
    'events',
    'POST',
    PLSQL_SOURCE_TYPE,
    `BEGIN
      INSERT INTO EVENTS(EVENT_DATE, ARTIST_ID, VENUE_ID, EVENT_STATUS_ID, EVENT_DETAILS)
      VALUES (TO_DATE(:e_date, ''YYYY-MM-DD''),
      :artist_id, :venue_id, :event_status_id, :event_details)
      RETURNING EVENT_ID INTO :event_id; 
      :status_code:= 201;
      :pv_result := ''Event Added'';
      :pn_status := ''SUCCESS'';
      EXCEPTION 
          WHEN OTHERS THEN 
          :status_code:= 400;
          :pv_result := ''UNABLE TO ADD EVENT'' || SQLERRM;
          :pn_status := ''ERROR'';
      END;
          `,
    ITEMS_PER_PAGE,
  )}

  ${defineParameter(
    MODULE_NAME,
    'events',
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
    'events',
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
    'events',
    'POST',
    'OBJECT_ID',
    'event_id',
    'RESPONSE',
    'INT',
    'OUT',
    'The event id of the created event.',
  )}

  ${defineParameter(
    MODULE_NAME,
    'events',
    'POST',
    'EVENT_DATE ',
    'e_date',
    'HEADER',
    'STRING',
    'IN',
    'date of event',
  )}

  ${defineParameter(
    MODULE_NAME,
    'events',
    'POST',
    'ARTIST_ID ',
    'artist_id',
    'HEADER',
    'INT',
    'IN',
    'artist id',
  )}

  ${defineParameter(
    MODULE_NAME,
    'events',
    'POST',
    'VENUE_ID ',
    'venue_id',
    'HEADER',
    'INT',
    'IN',
    'venue id',
  )}

  ${defineParameter(
    MODULE_NAME,
    'events',
    'POST',
    'EVENT_STATUS_ID ',
    'event_status_id',
    'HEADER',
    'INT',
    'IN',
    'status of the event',
  )}

  ${defineParameter(
    MODULE_NAME,
    'events',
    'POST',
    'EVENT_DETAILS',
    'event_details',
    'HEADER',
    'STRING',
    'IN',
    'event_details',
  )}

  ${defineHandler(
    MODULE_NAME,
    'events',
    'PUT',
    PLSQL_SOURCE_TYPE,
    `BEGIN
      UPDATE EVENTS E
      SET 
      E_DATE = nvl(TO_DATE(:e_date, ''YYYY-MM-DDTHH:mm:ss.SSSZ''), E.EVENT_DATE), 
      ARTIST_ID = nvl(:artist_id, E.ARTIST_ID),
      VENUE_ID = nvl(:venue_id, E.VENUE_ID),
      EVENT_STATUS_ID = nvl(:event_status_id, E.EVENT_STATUS_ID),
      EVENT_DETAILS = nvl(:event_details, E.EVENT_DETAILS),
      WHERE E.ID = :id;
      :status_code:= 201;
      :pv_result := ''Event Updated'';
      :pn_status := ''SUCCESS'';
      EXCEPTION 
          WHEN OTHERS THEN 
          :status_code:= 400;
          :pv_result := ''UNABLE TO UPDATE EVENT'' || SQLERRM;
          :pn_status := ''ERROR'';
      END;
          `,
    ITEMS_PER_PAGE,
  )}

  ${defineParameter(
    MODULE_NAME,
    'events',
    'PUT',
    'STATUS_CODE',
    'pn_status',
    'RESPONSE',
    'STRING',
    'OUT',
    'Response status',
  )}

  ${defineParameter(
    MODULE_NAME,
    'events',
    'PUT',
    'RESULT_MESSAGE',
    'pv_result',
    'RESPONSE',
    'STRING',
    'OUT',
    'Response message',
  )}

  ${defineParameter(
    MODULE_NAME,
    'events',
    'PUT',
    'EVENT_ID ',
    'event_id',
    'HEADER',
    'STRING',
    'IN',
    'event id',
  )}

  ${defineParameter(
    MODULE_NAME,
    'events',
    'PUT',
    'EVENT_DATE ',
    'e_date',
    'HEADER',
    'STRING',
    'IN',
    'date of event',
  )}

  ${defineParameter(
    MODULE_NAME,
    'events',
    'PUT',
    'ARTIST_ID ',
    'artist_id',
    'HEADER',
    'INT',
    'IN',
    'artist id',
  )}

  ${defineParameter(
    MODULE_NAME,
    'events',
    'PUT',
    'VENUE_ID ',
    'venue_id',
    'HEADER',
    'INT',
    'IN',
    'venue id',
  )}

  ${defineParameter(
    MODULE_NAME,
    'events',
    'PUT',
    'EVENT_STATUS_ID ',
    'event_status_id',
    'HEADER',
    'INT',
    'IN',
    'status of the event',
  )}

  ${defineParameter(
    MODULE_NAME,
    'events',
    'PUT',
    'EVENT_DETAILS',
    'event_details',
    'HEADER',
    'STRING',
    'IN',
    'event_details',
  )}
          
  ${defineHandler(
    MODULE_NAME,
    'events',
    'DELETE',
    PLSQL_SOURCE_TYPE,
    `BEGIN
      DELETE FROM EVENTS
      WHERE EVENT_ID = :id;

      IF SQL%ROWCOUNT = 0 THEN
          :status_code:= 404;
          :pv_result := ''Invalid event id'';
          :pn_status := ''NO_MATCH'';
      ELSE
          :status_code:= 200;
          :pv_result := ''Event Deleted'';
          :pn_status := ''SUCCESS'';
      END IF;

      EXCEPTION 
          WHEN OTHERS THEN 
          :status_code:= 400;
          :pv_result := ''UNABLE TO DELETE ARTIST'' || SQLERRM;
          :pn_status := ''ERROR'';
      END;
          `,
    ITEMS_PER_PAGE,
  )}

  ${defineParameter(
    MODULE_NAME,
    'events',
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
    'events',
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
    'events',
    'DELETE',
    'EVENT_ID ',
    'event_id',
    'HEADER',
    'STRING',
    'IN',
    'event id',
  )}

      COMMIT;
  END;
  /
`;
  const statementsResponse = await postRequest(endpoint, adminUserStatements, basicAuth);
  printResponse(statementsResponse);
}

export default createAdminUserModules;
