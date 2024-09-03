/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import {
  postRequest,
  printResponse,
} from './ORDSRequests.js';

/**
 * Drops a user and all the objects associated to it. Useful for a cleanup script.
 * Uses the admin credentials.
 * @param {string} schemaName the name of the schema to create.
 * @param {string} endpoint the ADB-S admin endpoint.
 * @param {string} basicAuth the authentication string for the admin user.
 */
async function dropUser(schemaName, endpoint, basicAuth) {
  const dropRESTForSchemaStatement = `begin
        ords_admin.drop_rest_for_schema(
            p_schema => '${schemaName}'
        );
        commit;
    end;
    /
    `;
  const disableSchemaStatement = `begin
        ords_admin.enable_schema(
            p_schema => '${schemaName}',
            p_enabled => false);
        commit;
    end;
    /
    `;
  const dropSessionStatement = `BEGIN
  FOR r IN (select sid,serial#, inst_id from gv$session where username='${schemaName}')
        LOOP
            EXECUTE IMMEDIATE 
                'alter system kill session ''' || r.sid || ',' || r.serial# || ',@' || r.inst_id || ''' immediate';
        END LOOP;
    END;
    /
    `;
  const dropUserStatement = `DROP USER ${schemaName} CASCADE;`;
  const dropUserStatements = [disableSchemaStatement, dropRESTForSchemaStatement,
    dropSessionStatement, dropUserStatement].join(' ');
  const dropTestResponse = await postRequest(endpoint, dropUserStatements, basicAuth);
  printResponse(dropTestResponse);
}

export default dropUser;
