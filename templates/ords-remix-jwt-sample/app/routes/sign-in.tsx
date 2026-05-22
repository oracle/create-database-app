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
 * @returns Sign In with OCI IAM
 */
export default function SignIn(): ReactElement {
  return (
    <div style={{
      fontFamily: 'system-ui, sans-serif',
      lineHeight: '1.8',
    }}
    >
      <h1>Sign In</h1>
      <Form action="/oidc" method="post">
        <button type="submit">Login with OCI IAM</button>
      </Form>
    </div>
  );
}
