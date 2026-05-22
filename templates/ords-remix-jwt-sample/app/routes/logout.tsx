/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import type { ActionFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';

import {
  OIDC_CLIENT_ID,
  OIDC_LOGOUT_ENDPOINT,
  OIDC_RETURN_TO_URL,
} from '~/routes/constants/index.server';
import {
  destroySession, getSession,
} from '~/utils/auth.server';

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get('Cookie'));
  if (!OIDC_LOGOUT_ENDPOINT) {
    return redirect(OIDC_RETURN_TO_URL, {
      headers: {
        'Set-Cookie': await destroySession(session),
      },
    });
  }
  const logoutURL = new URL(OIDC_LOGOUT_ENDPOINT);

  logoutURL.searchParams.set('client_id', OIDC_CLIENT_ID);
  logoutURL.searchParams.set('post_logout_redirect_uri', OIDC_RETURN_TO_URL);

  return redirect(logoutURL.toString(), {
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  });
};
