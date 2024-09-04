/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import { CacheProvider } from '@emotion/react';
import React from 'react';
import { ThemeProvider } from '@mui/material';
import createCache from '@emotion/cache';
import type { EmotionCache } from '@emotion/react';
import theme from './theme';

/**
 * Create an instance of the emotion cache on every request to make the style
 * configuration available to all components in the component tree.
 * @returns an instance of the emotion cache.
 */
function createEmotionCache(): EmotionCache {
  return createCache({ key: 'css' });
}
/**
 * Provider used to wrap the App root component to make all of the
 * MUI style configurations available.
 * @param root0 the Page React Nodes.
 * @param root0.children the page React Node children's.
 * @see {@link https://mui.com/material-ui/guides/server-rendering/}
 * @returns the react root component.
 */
export function MuiProvider({ children }: { children: React.ReactNode }): React.ReactNode {
  const cache = createEmotionCache();

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CacheProvider>
  );
}
