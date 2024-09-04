/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
export interface ORDSLink {
  rel: 'self' | 'describedby' | 'first' | 'next' | 'prev';
  href:'string'
}

interface ORDSResponse<Type> {
  count: number;
  hasMore: boolean;
  items: Type[];
  limit: number;
  links: ORDSLink[];
  offset: number;
}

export default ORDSResponse;

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Checks if an object is instanceof ORDSError
 * Disables no-explicit-any rule to properly evaluate all object types.
 * @param object the object to check
 * @returns whether the object is instance of the interface or not.
 */
export function isORDSResponse(object : any) : boolean {
  return 'items' in object;
}
