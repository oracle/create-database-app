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
import defineJWTClient from '../security/jwtClient.js';
import definePrivilege from '../security/privilege.js';

/**
 * Protects all the defined models.
 * Uses the schema credentials.
 * @param {string} endpoint the ADB-S ords endpoint.
 * @param {string} basicAuth the authentication string for the owner user.
 * @param {string} jwtIssuer the issuer of acceptable JWT access tokens.
 * @param {string} jwtAudience the audience of the tokens.
 * @param {string} jwtVerification the URL to validate the acceptable access tokens.
 */
async function protectEndpoints(
  endpoint,
  basicAuth,
  jwtIssuer,
  jwtAudience,
  jwtVerification,
) {
  const protectEndpointStatements = `
  ${defineJWTClient(jwtIssuer, jwtAudience, jwtVerification)}

  DECLARE
    l_roles     OWA.VC_ARR;
    l_modules   OWA.VC_ARR;
    l_patterns  OWA.VC_ARR;

  BEGIN
  ${definePrivilege(
    'concert_app_authuser',
    'authenticated end user privilege',
    'Provides access to the user specific endpoints',
    'concert_app.authuser.v1',
  )}

  ${definePrivilege(
    'concert_app_admin',
    'Admin user privilege',
    'Provides access to the concert app admin endpoints',
    'concert_app.adminuser.v1',
  )}

  ${definePrivilege(
    'concert_app_euser',
    'Non authenticated end user privilege',
    'Provides limited access to the concert app endpoints',
    'concert_app.euser.v1',
  )}

        COMMIT;
    END;
    /
    `;
  const statementsResponse = await postRequest(endpoint, protectEndpointStatements, basicAuth);
  printResponse(statementsResponse);
}

export default protectEndpoints;
