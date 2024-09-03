/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
/**
 * Enables autoREST access to the specified object.
 * @param {string} schema Name of the schema for the table or view.
 * @param {string} object Name of the table or view.
 * @param {'FUNCTION'|'VIEW'|'PACKAGE'|'PROCEDURE'|'TABLE'} objectType Type of the object.
 * Valid values: FUNCTION, VIEW, PACKAGE, PROCEDURE, TABLE (default), or VIEW.
 * @param {string} objectAlias Alias of the object.
 * @param {'TRUE' | 'FALSE'} restAuth Controls whether Oracle REST Data Services should require user
 * authorization before allowing access to the Oracle REST Data Services metadata for this object.
 * @param {'TRUE' | 'FALSE'} enabled if the object is mean to be REST enabled or not.
 * @returns {string} the enable object Expression.
 */
function enableObject(schema, object, objectType, objectAlias, restAuth, enabled = 'TRUE') {
  return `
    ORDS.enable_object (
    p_enabled      => ${enabled},
    p_schema       => '${schema}',
    p_object       => '${object}',
    p_object_type  => '${objectType}',
    p_object_alias => '${objectAlias}',
    p_auto_rest_auth => ${restAuth}
  );
    `;
}

export default enableObject;
