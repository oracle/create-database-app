/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import { createCookieSessionStorage } from '@remix-run/node';
import { Authenticator } from 'remix-auth';
import type { Auth0Profile } from 'remix-auth-auth0';
import { Auth0Strategy } from 'remix-auth-auth0';

import {
  AUTH0_CALLBACK_URL,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_DOMAIN,
  COOKIE_MAX_AGE,
  AUTH0_AUDIENCE,
} from '~/routes/constants/index.server';

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '_remix_session',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: ['foobar'],
    secure: process.env.NODE_ENV === 'production',
    maxAge: COOKIE_MAX_AGE,
  },
});

type UserProfile = {
  profile: Auth0Profile;
  tokenType: string;
  accessToken: string
};

export const auth = new Authenticator<UserProfile>(sessionStorage);

const auth0Strategy = new Auth0Strategy(
  {
    callbackURL: AUTH0_CALLBACK_URL,
    clientID: AUTH0_CLIENT_ID,
    clientSecret: AUTH0_CLIENT_SECRET,
    domain: AUTH0_DOMAIN,
    audience: AUTH0_AUDIENCE,
    scope: ['openid', 'email', 'profile', 'concert_app_authuser', 'concert_app_admin', 'oracle.dbtools.autorest.privilege.CONCERT_SAMPLE_APP.SEARCH_VIEW', 'oracle.dbtools.autorest.privilege.CONCERT_SAMPLE_APP.SEARCH_ARTIST_VIEW', 'oracle.dbtools.autorest.privilege.CONCERT_SAMPLE_APP.SEARCH_VENUES_VIEW'],
  },
  async ({
    accessToken, profile,
  }) => {
    const tokenType = 'Bearer';
    return {
      profile,
      tokenType,
      accessToken,
    };
  },
);

auth.use(auth0Strategy);

export const {
  getSession, commitSession, destroySession,
} = sessionStorage;
