/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import { ReactElement } from 'react';
import { Outlet } from '@remix-run/react';

/**
 *
 * @returns Display the artist homepage. Data displayed will depend on artist ID.
 */
export default function Artist(): ReactElement {
  return (
    <div style={{
      fontFamily: 'system-ui, sans-serif',
      lineHeight: '1.8',
    }}
    >
      <Outlet />
    </div>
  );
}
