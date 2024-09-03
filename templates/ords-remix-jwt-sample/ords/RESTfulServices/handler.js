/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
/**
 *
 * @param {string} moduleName the name of module that owns this template.
 * @param {string} pattern the template pattern
 * @param {'GET' | 'POST' | 'PUT' | 'DELETE'} method the template http method
 * Valid values:
 * GET (retrieves a representation of a resource),
 * POST (creates a new resource or adds a resource to a collection),
 * PUT (updates an existing resource),
 * DELETE (deletes an existing resource).
 * @param {string} sourceType the HTTP request method for this handler
 * @param {string} source the source implementation of the method
 * @param {string} items the default pagination of the handler
 * @returns {string} the ords define handler module
 */
function defineHandler(moduleName, pattern, method, sourceType, source, items) {
  return `
    ORDS.DEFINE_HANDLER(
        P_MODULE_NAME => '${moduleName}', 
        P_PATTERN => '${pattern}', 
        P_METHOD => '${method}', 
        P_SOURCE_TYPE => ${sourceType}, 
        P_SOURCE => '${source}',
        P_ITEMS_PER_PAGE => ${items}
    );
    `;
}

export default defineHandler;
