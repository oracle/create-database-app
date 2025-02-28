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
import enableObject from '../RESTfulServices/enableObject.js';
import grantSQLDeveloperRole from '../RESTfulServices/grantSQLDeveloperRole.js';
import { TABLE_OBJECT_TYPE, VIEW_OBJECT_TYPE } from './constants/autoREST.js';
/**
 * Creates the schema objects (tables, views, etc).
 * Use the schema owner credentials.
 * @param {string} schemaName Name of the schema for the table or view.
 * @param {string} endpoint the ADB-S admin endpoint.
 * @param {string} basicAuth the authentication string for the admin user.
 */
async function autoRESTEnableObjects(schemaName, endpoint, basicAuth) {
  const objectsToRESTEnable = [
    {
      objectName: 'ARTISTS',
      objectType: TABLE_OBJECT_TYPE,
      objectAlias: 'artists',
      isAutoRestAuth: true,
    },
    {
      objectName: 'CITIES',
      objectType: TABLE_OBJECT_TYPE,
      objectAlias: 'cities',
      isAutoRestAuth: true,
    },
    {
      objectName: 'VENUES',
      objectType: TABLE_OBJECT_TYPE,
      objectAlias: 'venues',
      isAutoRestAuth: true,
    },
    {
      objectName: 'EVENTS',
      objectType: TABLE_OBJECT_TYPE,
      objectAlias: 'events',
      isAutoRestAuth: true,
    },
    {
      objectName: 'EVENT_STATUS',
      objectType: TABLE_OBJECT_TYPE,
      objectAlias: 'event_status',
      isAutoRestAuth: true,
    },
    {
      objectName: 'EVENT_STATUS',
      objectType: TABLE_OBJECT_TYPE,
      objectAlias: 'event_status',
      isAutoRestAuth: true,
    },
    {
      objectName: 'MUSIC_GENRES',
      objectType: TABLE_OBJECT_TYPE,
      objectAlias: 'music_genres',
      isAutoRestAuth: true,
    },
    {
      objectName: 'ARTIST_CLASSIFICATIONS',
      objectType: TABLE_OBJECT_TYPE,
      objectAlias: 'artist_classifications',
      isAutoRestAuth: true,
    },
    {
      objectName: 'SEARCH_VIEW',
      objectType: VIEW_OBJECT_TYPE,
      objectAlias: 'search_view',
      isAutoRestAuth: false,
    },
    {
      objectName: 'SEARCH_ARTIST_VIEW',
      objectType: VIEW_OBJECT_TYPE,
      objectAlias: 'search_artist_view',
      isAutoRestAuth: false,
    },
    {
      objectName: 'SEARCH_VENUES_VIEW',
      objectType: VIEW_OBJECT_TYPE,
      objectAlias: 'search_venues_view',
      isAutoRestAuth: false,
    },
  ];
  const autoRESTenableStatements = `
    BEGIN
        ${objectsToRESTEnable.map((object) => enableObject(schemaName, object.objectName, object.objectType, object.objectAlias, object.isAutoRestAuth)).join(' ')}
        COMMIT;
    END;
    /
    `;
  const statementsResponse = await postRequest(endpoint, autoRESTenableStatements, basicAuth);
  printResponse(statementsResponse);
  // Add the SQL Developer role to the objects that where autoREST Enabled.
  const sqlDeveloperObjects = objectsToRESTEnable.filter((object) => object.isAutoRestAuth)
    .map((object) => grantSQLDeveloperRole(
      schemaName,
      object.objectName,
      object.objectAlias,
    ));

  const sqlDeveloperStatement = `
    DECLARE
    L_PRIV_ROLES owa.vc_arr;
    L_PRIV_PATTERNS owa.vc_arr;
    L_PRIV_MODULES owa.vc_arr;
    BEGIN
        ${sqlDeveloperObjects.join(' ')}
        COMMIT;
    END;
    /
    `;
  const statementResponse = await postRequest(endpoint, sqlDeveloperStatement, basicAuth);
  printResponse(statementResponse);
}

export default autoRESTEnableObjects;
