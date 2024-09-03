/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import createAuthenticatedUserModules from '../modules/authenticatedUserModule.js';
import createAdminUserModules from '../modules/adminUserModule.js';
import createEndUserModules from '../modules/endUserModule.js';

/**
 * Creates all the Schema Modules.
 * Uses the schema credentials.
 * @param {string} endpoint the ORDS schema endpoint.
 * @param {string} auth the auth user credentials.
 */
async function createModules(endpoint, auth) {
  await createEndUserModules(endpoint, auth);
  await createAuthenticatedUserModules(endpoint, auth);
  await createAdminUserModules(endpoint, auth);
}

export default createModules;
