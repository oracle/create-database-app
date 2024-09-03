/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
/**
 * Defines an ords module procedure.
 * @param {string} moduleName the name of the module
 * @param {string} basePath the base path of the module
 * @param {number} items the number of items per page
 * @param {'PUBLISHED' | 'NOT_PUBLISHED'} status the status of the module
 * Valid values: PUBLISHED (default) or NOT_PUBLISHED.
 * @param {string} comments the module comments
 * @returns {string} the ORDS define module procedure
 * @see {@link https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/23.4/orddg/ORDS-reference.html}
 */
function defineModule(moduleName, basePath, items, status, comments) {
  return `
        BEGIN
            ORDS.DEFINE_MODULE(P_MODULE_NAME => '${moduleName}', 
                P_BASE_PATH => '${basePath}', 
                P_ITEMS_PER_PAGE => ${items}, 
                P_STATUS => '${status}',
                P_COMMENTS => '${comments}'
            );

        COMMIT;
        END;
        /
    `;
}

export default defineModule;
