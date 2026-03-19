/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import { CacheProvider } from '@emotion/react';
import React from 'react';
import { ThemeProvider } from '@mui/material';
import type { EmotionCache } from '@emotion/react';
import createEmotionCache from './createEmotionCache';
import theme from './theme';

interface MuiProviderProps {
  children: React.ReactNode;
  emotionCache?: EmotionCache;
}

/**
 * Provider used to wrap the App root component to make all of the
 * MUI style configurations available.
 * @param root0 the Page React Nodes.
 * @param root0.children the page React Node children's.
 * @param root0.emotionCache the Emotion cache used for SSR and hydration.
 * @see {@link https://mui.com/material-ui/guides/server-rendering/}
 * @returns the react root component.
 */
export function MuiProvider({
  children,
  emotionCache,
}: MuiProviderProps): React.ReactNode {
  const [cache] = React.useState(() => emotionCache ?? createEmotionCache());

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CacheProvider>
  );
}
