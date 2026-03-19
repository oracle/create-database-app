/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import createCache from '@emotion/cache';
import type { EmotionCache } from '@emotion/react';

/**
 * Creates the Emotion cache used by both the server and the client.
 * @returns the Emotion cache instance.
 */
export default function createEmotionCache(): EmotionCache {
  return createCache({
    key: 'css',
  });
}
