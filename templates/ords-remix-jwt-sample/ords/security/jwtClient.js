/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
/**
 *
 * @param {string} issuer the issuer of acceptable JWT access tokens.
 * @param {string} audience the audience of the tokens.
 * @param {string} jwkUrl the URL to validate the acceptable access tokens.
 * @returns {string} the ords create jwt profile procedure.
 */
function defineJWTClient(issuer, audience, jwkUrl) {
  return `
    BEGIN
        OAUTH.DELETE_JWT_PROFILE();  
        OAUTH.CREATE_JWT_PROFILE(
            p_issuer => '${issuer}',
            p_audience => '${audience}' ,
            p_jwk_url =>'${jwkUrl}'
        );
        COMMIT;
    END;
    /
    `;
}

export default defineJWTClient;
