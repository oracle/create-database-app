/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
/**
 * Defines an ords parameter procedure.
 * @param {string} moduleName the name of the module
 * @param {string} pattern matching pattern of the owner template
 * @param {string} method the owning handler method
 * @param {string} name the name of the parameter
 * @param {string} bindVariableName the name of the parameter, used in SQL
 * @param {'HEADER' | 'RESPONSE' | 'URI'} sourceType the type that identifies
 * the origin of the parameter.
 * @param {'STRING' | 'INT' | 'DOUBLE' | 'BOOLEAN' | 'LONG' | 'TIMESTAMP'} paramType
 * the native type of the parameter.
 * @param {'IN' | 'OUT' | 'INOUT'} accessMethod the parameter access method.
 * @param {string} comments comments
 * @returns {string} the ORDS define module procedure
 * @see {@link https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/23.4/orddg/ORDS-reference.html}
 */
function defineParameter(
  moduleName,
  pattern,
  method,
  name,
  bindVariableName,
  sourceType,
  paramType,
  accessMethod,
  comments,
) {
  return `
    ORDS.DEFINE_PARAMETER(
        p_module_name        => '${moduleName}',
        p_pattern            => '${pattern}',
        p_method             => '${method}',
        p_name               => '${name}',
        p_bind_variable_name => '${bindVariableName}',
        p_source_type        => '${sourceType}',
        p_param_type         => '${paramType}',
        p_access_method      => '${accessMethod}',
        p_comments           => '${comments}'
    );
    `;
}

export default defineParameter;
