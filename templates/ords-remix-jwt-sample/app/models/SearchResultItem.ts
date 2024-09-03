/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
export interface SearchResultItem {
  id: number;
  kind: string;
  name: string;
  img: string;
  date?: string;
  description?: string;
  price?: number;
  followers?: number;
}
