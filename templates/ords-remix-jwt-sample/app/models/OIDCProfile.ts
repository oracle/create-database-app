/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import type { OAuth2Profile } from 'remix-auth-oauth2';

interface OIDCProfile extends OAuth2Profile {
  provider: string;
  id: string;
  displayName: string;
  emails: Array<{ value: string; type?: string }>;
  photos: Array<{ value: string }>;
  _json?: {
    nickname?: string;
    [key: string]: unknown;
  };
}

export default OIDCProfile;
