/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import {
  Outlet,
} from '@remix-run/react';
import { ReactElement } from 'react';

/**
 *Display the concerts info page. Data displayed will depend on concert ID
 * @returns The concert page.
 */
export default function Concerts() : ReactElement {
  return (
    <div>
      <Outlet />
    </div>
  );
}
