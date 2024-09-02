/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import type { MetaFunction } from '@remix-run/node';

import { Outlet } from '@remix-run/react';
import { ReactElement } from 'react';
import { redirect } from '@remix-run/node';

export const meta: MetaFunction = () => [
  { title: 'ORDS Concert Sample App' },
  {
    name: 'description',
    content: 'ORDS Concert Sample App',
  },
];

export const loader = async () => redirect('/home');

/**
 *
 * @returns a React element that renders a log in button
 */
export default function Index(): ReactElement {
  return (
    <>
      <div>
        <div className=" bg-transparent" />
        <h1 className="text-3xl font-bold text-slate-600">Concert App</h1>
      </div>
      <Outlet />
    </>
  );
}
