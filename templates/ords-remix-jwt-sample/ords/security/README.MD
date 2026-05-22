# ORDS Concert App - Securing the Services

This guide explains how the sample app secures ORDS endpoints using JWT bearer tokens and OIDC login in the Remix frontend.

## Security Model

The API is split into three ORDS modules:

| Module | Pattern | Access |
|---|---|---|
| `concert_app.euser.v1` | `/euser/v1/*` | Public/anonymous browse endpoints |
| `concert_app.authuser.v1` | `/authuser/v1/*` | Authenticated user endpoints |
| `concert_app.adminuser.v1` | `/adminuser/v1/*` | Administrator endpoints |

Privileges created by migration scripts:

- `concert_app_authuser`
- `concert_app_admin`

These privileges are attached to protected modules during `npm run migrate`.

## ORDS JWT Profile

The migration flow configures ORDS JWT validation through:

```sql
BEGIN
    OAUTH.DELETE_JWT_PROFILE();
    OAUTH.CREATE_JWT_PROFILE(
        p_issuer   => '<JWT_ISSUER>',
        p_audience => '<JWT_AUDIENCE>',
        p_jwk_url  => '<JWT_VERIFICATION_KEY>'
    );
    COMMIT;
END;
/
```

Set these values in `.env` before running `npm run migrate`:

```bash
JWT_ISSUER=https://identity.oraclecloud.com/
JWT_VERIFICATION_KEY=https://<domain-url>:443/admin/v1/SigningCert/jwk
JWT_AUDIENCE=ords/sample-app/
```

## OIDC Setup (OCI IAM Target)

The frontend now uses OIDC (`remix-auth-oauth2`) and the `/oidc` login route.

### 1. Create a confidential OIDC application

In OCI IAM Identity Domains, create an application for this sample app with:

- Authorization code flow
- Redirect URI: `http://localhost:3000/callback`
- Post logout redirect URI: `http://localhost:3000`
- Scopes including:
  - `openid`
  - `email`
  - `profile`
  - `ords/sample-app/concert_app_authuser`
  - `ords/sample-app/concert_app_admin`

### 2. Configure `.env`

```bash
OIDC_RETURN_TO_URL=http://localhost:3000
OIDC_REDIRECT_URI=http://localhost:3000/callback
OIDC_CLIENT_ID=<CLIENT_ID>
OIDC_CLIENT_SECRET=<CLIENT_SECRET>
OIDC_AUTHORIZATION_ENDPOINT=https://<domain-url>:443/oauth2/v1/authorize
OIDC_TOKEN_ENDPOINT=https://<domain-url>:443/oauth2/v1/token
OIDC_USERINFO_ENDPOINT=https://<domain-url>:443/oauth2/v1/userinfo
OIDC_LOGOUT_ENDPOINT=https://<domain-url>:443/oauth2/v1/userlogout
OIDC_AUDIENCE=ords/sample-app/
OIDC_SCOPES=openid,email,profile,ords/sample-app/concert_app_authuser,ords/sample-app/concert_app_admin
```

## Validation Checklist

1. Run the app and sign in from the navbar (`POST /oidc`).
2. Confirm callback succeeds to `/private/profile`.
3. Call an authenticated endpoint and verify success with a valid token.
4. Call an admin endpoint with a non-admin token and confirm it is rejected.
5. Sign out and confirm provider logout + local session clear.

## Legacy Auth0 Compatibility

The app still supports legacy Auth0 variable names as fallback for compatibility:

- `AUTH0_RETURN_TO_URL`
- `AUTH0_CALLBACK_URL`
- `AUTH0_CLIENT_ID`
- `AUTH0_CLIENT_SECRET`
- `AUTH0_DOMAIN`
- `AUTH0_LOGOUT_URL`
- `JWT_AUDIENCE`

If these are present, the app can still build OIDC endpoints from `AUTH0_DOMAIN`.
