/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/

/**
 *
 * Add the MuiProvider Component to fully integrate the MUI library into the app.
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it
 * revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser } from '@remix-run/react';
import {
  startTransition, StrictMode,
} from 'react';
import { hydrateRoot } from 'react-dom/client';
import { MuiProvider } from './mui/MuiProvider';

const SERVER_HEAD_PATTERN = /<!--start head-->[\s\S]*?<!--end head-->/;

/**
 * Removes the static server-rendered head so the client portal can own it.
 */
function removeServerHead() : void {
  document.head.innerHTML = document.head.innerHTML.replace(SERVER_HEAD_PATTERN, '');
}

startTransition(() => {
  const rootElement = document.getElementById('root');

  if (rootElement === null) {
    throw new Error('Could not find the root element to hydrate.');
  }

  hydrateRoot(
    rootElement,
    <StrictMode>
      <MuiProvider>
        <RemixBrowser />
      </MuiProvider>
    </StrictMode>,
  );

  removeServerHead();
});
