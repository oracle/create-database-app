/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
/**
 * Defines an ords module procedure.
 * @param {string} privilegeName the name of the privilege
 * @param {number} label the privilege label
 * @param {string} description the privilege description
 * @param {string} moduleName the name of the module to which this privilege belongs to.
 * @returns {string} the ORDS create privilege and privilege mapping statement
 * @see {@link https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/23.4/orddg/ORDS-reference.html}
 */
function definePrivilege(privilegeName, label, description, moduleName) {
  return `
  l_modules(1) := '${moduleName}';

  ORDS.DEFINE_PRIVILEGE(
      p_privilege_name => '${privilegeName}',
      p_roles          => l_roles,
      p_patterns       => l_patterns,
      p_modules        => l_modules,
      p_label          => '${label}',
      p_description    => '${description}',
      p_comments       => NULL);
    
  l_roles.DELETE;
  l_modules.DELETE;
  l_patterns.DELETE;
      `;
}

export default definePrivilege;
