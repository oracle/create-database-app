/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import { createFileSessionStorage } from '@remix-run/node';
import { Authenticator } from 'remix-auth';
import { OAuth2Strategy } from 'remix-auth-oauth2';

import {
  COOKIE_MAX_AGE,
  OIDC_AUDIENCE,
  OIDC_AUTHORIZATION_ENDPOINT,
  OIDC_CLIENT_ID,
  OIDC_CLIENT_SECRET,
  OIDC_REDIRECT_URI,
  OIDC_SCOPES,
  OIDC_TOKEN_ENDPOINT,
  OIDC_USERINFO_ENDPOINT,
} from '~/routes/constants/index.server';
import type OIDCProfile from '~/models/OIDCProfile';

const DEFAULT_PROFILE_PICTURE = '/favicon.ico';

const readClaim = (claim: unknown): string => (typeof claim === 'string' ? claim : '');

const sessionStorage = createFileSessionStorage({
  dir: '/tmp/remix-sessions',
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
  profile: OIDCProfile;
  tokenType: string;
  accessToken: string
};

export const auth = new Authenticator<UserProfile>(sessionStorage);

class OIDCOAuth2Strategy extends OAuth2Strategy<UserProfile, OIDCProfile> {
  protected authorizationParams(params: URLSearchParams): URLSearchParams {
    const configuredScopes = OIDC_SCOPES.split(',').map((scope) => scope.trim()).filter(Boolean).join(' ');
    if (configuredScopes) {
      params.set('scope', configuredScopes);
    }
    if (OIDC_AUDIENCE) {
      params.set('audience', OIDC_AUDIENCE);
    }
    return params;
  }

  protected async userProfile(accessToken: string): Promise<OIDCProfile> {
    const userInfoResponse = await fetch(OIDC_USERINFO_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!userInfoResponse.ok) {
      throw new Error(`OIDC userinfo request failed with status ${userInfoResponse.status}`);
    }

    const userInfo = (await userInfoResponse.json()) as Record<string, unknown>;
    const email = readClaim(userInfo.email);
    const picture = readClaim(userInfo.picture) || DEFAULT_PROFILE_PICTURE;
    const displayName = readClaim(userInfo.name)
      || readClaim(userInfo.preferred_username)
      || email
      || 'User';
    const nickname = readClaim(userInfo.nickname) || readClaim(userInfo.preferred_username);
    const id = readClaim(userInfo.sub) || readClaim(userInfo.user_id) || email || displayName;

    return {
      provider: 'oidc',
      id,
      displayName,
      emails: email ? [{ value: email }] : [],
      photos: [{ value: picture }],
      _json: {
        ...userInfo,
        nickname,
      },
    };
  }
}

const oidcStrategy = new OIDCOAuth2Strategy(
  {
    clientID: OIDC_CLIENT_ID,
    clientSecret: OIDC_CLIENT_SECRET,
    authorizationURL: OIDC_AUTHORIZATION_ENDPOINT,
    tokenURL: OIDC_TOKEN_ENDPOINT,
    callbackURL: OIDC_REDIRECT_URI,
  },
  async ({
    accessToken,
    profile,
  }) => {
    const tokenType = 'Bearer';
    return {
      profile,
      tokenType,
      accessToken,
    };
  },
);

auth.use(oidcStrategy, 'oidc');

export const {
  getSession, commitSession, destroySession,
} = sessionStorage;
