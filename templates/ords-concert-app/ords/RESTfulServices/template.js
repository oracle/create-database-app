/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
/**
 *
 * @param {string} moduleName the name of module that owns this template.
 * @param {string} pattern the template matching pattern
 * @param {string} comments the template comments
 * @returns {string} the ords define template module
 */
function defineTemplate(moduleName, pattern, comments) {
  return `
    ORDS.DEFINE_TEMPLATE(
        P_MODULE_NAME => '${moduleName}', 
        P_PATTERN => '${pattern}', 
        P_COMMENTS => '${comments}'
    );
    `;
}

export default defineTemplate;
