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

/**
 * Creates a Schema and REST-Enable it.
 * Uses the ADMIN credentials.
 * @param {string} schemaName the name of the schema to create.
 * @param {string} schemaPassword the password of the schema to create.
 * @param {string} endpoint the ADB-S admin endpoint.
 * @param {string} basicAuth the authentication string for the admin user.
 */
async function createSchema(schemaName, schemaPassword, endpoint, basicAuth) {
  const createSchemaStatement = `
    CREATE USER ${schemaName} IDENTIFIED BY ${schemaPassword}
    DEFAULT TABLESPACE DATA
    QUOTA UNLIMITED ON DATA;

    GRANT CREATE PROCEDURE,
    CREATE SEQUENCE,
    CREATE SESSION,
    CREATE SYNONYM,
    CREATE TABLE,
    CREATE TRIGGER,
    CREATE TYPE,
    CREATE VIEW
    TO ${schemaName};
    
    DECLARE
        L_PRIV_ROLES owa.vc_arr;
        L_PRIV_PATTERNS owa.vc_arr;
        L_PRIV_MODULES owa.vc_arr;

    BEGIN
        L_PRIV_ROLES( 1 ) := 'oracle.dbtools.autorest.any.schema';
        L_PRIV_ROLES( 2 ) := 'SQL Developer';

        ORDS.ENABLE_SCHEMA(
            P_ENABLED             => TRUE,
            P_SCHEMA              => '${schemaName}',
            P_URL_MAPPING_TYPE    => 'BASE_PATH',
            P_URL_MAPPING_PATTERN => '${schemaName.toLowerCase()}',
            P_AUTO_REST_AUTH      => FALSE
        );

        
            
        COMMIT;
    END;
    /
    `;
  const createSchemaResponse = await postRequest(endpoint, createSchemaStatement, basicAuth);
  printResponse(createSchemaResponse);
}

export default createSchema;
