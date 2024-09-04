/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
/**
 * Grants SQL Developer Role to the specified privileges
 * @param {string} schema Name of the schema for the table or view.
 * @param {string} object Name of the table or view.\
 * @param {string} objectAlias Alias of the object.
 * @returns {string} the define privilege expression.
 */
function grantSQLDeveloperRole(schema, object, objectAlias) {
  return `
    DECLARE
    L_PRIV_ROLES owa.vc_arr;
    L_PRIV_PATTERNS owa.vc_arr;
    L_PRIV_MODULES owa.vc_arr;
    BEGIN
    L_PRIV_ROLES( 1 ) := 'oracle.dbtools.autorest.any.schema';
    L_PRIV_ROLES( 2 ) := 'oracle.dbtools.role.autorest.${schema}.${object}';
    L_PRIV_ROLES( 3 ) := 'SQL Developer';
    L_PRIV_PATTERNS( 1 ) := '/${objectAlias}/*';
    L_PRIV_PATTERNS( 2 ) := '/metadata-catalog/${objectAlias}/*';
    ORDS.DEFINE_PRIVILEGE(
        P_PRIVILEGE_NAME => 'oracle.dbtools.autorest.privilege.${schema}.${object}',
        P_ROLES => L_PRIV_ROLES,
        P_PATTERNS =>  L_PRIV_PATTERNS,
        P_MODULES => L_PRIV_MODULES,
        P_LABEL => 'autorest_${schema}_${object}',
        P_DESCRIPTION => 'allow access to autoREST API',
        P_COMMENTS=> ''
    );
    COMMIT;
    END;
    /
    `;
}

export default grantSQLDeveloperRole;
