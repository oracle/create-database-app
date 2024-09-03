/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
interface Concert {
  id: number;
  artist: string;
  img: string;
  date: string;
  title: string;
  description: string;
  price: number;
}

export default Concert;
