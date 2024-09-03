/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import type { ActionFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';

import { auth } from '~/utils/auth.server';

export const loader = async () => redirect('/');

export const action = async ({ request }: ActionFunctionArgs) => auth.authenticate('auth0', request);
