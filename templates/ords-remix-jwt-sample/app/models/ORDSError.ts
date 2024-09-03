/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
/**
 * For this to response to be fully compatible with the Remix ErrorResponse
 * (import { ErrorResponse } from "@remix-run/node") the code must be a number
 * so we may need to map ORDS error codes to actual http codes.
 */
interface ORDSError {
  code: string;
  message: string;
  type: string;
  instance: string;
}

export default ORDSError;

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Checks if an object is instanceof ORDSError
 * Disables no-explicit-any rule to properly evaluate all object types.
 * @param object the object to check
 * @returns whether the object is instance of the interface or not.
 */
export function isORDSError(object : any) : boolean {
  return 'code' in object;
}