/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import type { LoaderFunctionArgs } from '@remix-run/node';

import { auth } from '~/utils/auth.server';

export const loader = async ({ request }: LoaderFunctionArgs) => auth.authenticate('auth0', request, {
  successRedirect: '/private/profile',
  failureRedirect: '/error',
});
