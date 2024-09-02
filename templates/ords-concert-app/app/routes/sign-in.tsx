/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import { Form } from '@remix-run/react';
import { ReactElement } from 'react';
/**
 *
 * @returns Sign In with Auth0
 */
export default function SignIn(): ReactElement {
  return (
    <div style={{
      fontFamily: 'system-ui, sans-serif',
      lineHeight: '1.8',
    }}
    >
      <h1>Sign In</h1>
      <Form action="../auth/auth0" method="post">
        <button type="button">Login with Auth0</button>
      </Form>
    </div>
  );
}
