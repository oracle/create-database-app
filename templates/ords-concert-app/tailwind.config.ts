/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'email-red': '#FE2465',
        'email-purple': '#98163C',
        'list-items': '#394452',
      },
      flex: {
        'embla-slide': '0 0 101%',
      },
      height: {
        50: '50vh',
      },
      backgroundImage: {
        hero: 'url(\'../app/assets/hero.jpg\')',
        half: 'url(\'../app/assets/hero.png\')',
        'artist-Jazz-bg': 'url(\'../app/assets/patterns/jazz_pattern.png\')',
        'artist-Indie-bg': 'url(\'../app/assets/patterns/indie_pattern.png\')',
        'artist-Reggae-bg': 'url(\'../app/assets/patterns/reggae_pattern.png\')',
        'artist-SteamPunk-bg': 'url(\'../app/assets/patterns/steampunk_pattern.png\')',
        'artist-Rap-bg': 'url(\'../app/assets/patterns/rap_pattern_2.png\')',
        'artist-Rock-bg': 'url(\'../app/assets/patterns/indie_pattern.png\')',
        'artist-Pop-bg': 'url(\'../app/assets/patterns/indie_pattern.png\')',
        'artist-Metal-bg': 'url(\'../app/assets/patterns/indie_pattern.png\')',
        'venue-Jazz-bg': 'url(\'../app/assets/venues/jazz_venue.png\')',
        'venue-Indie-bg': 'url(\'../app/assets/venues/indie_venue.png\')',
        'venue-Reggae-bg': 'url(\'../app/assets/venues/reggae_venue.png\')',
        'venue-SteamPunk-bg': 'url(\'../app/assets/venues/steampunk_venue.png\')',
        'venue-Rap-bg': 'url(\'../app/assets/venues/rap_venue.png\')',
        'venue-Rock-bg': 'url(\'../app/assets/venues/indie_venue.png\')',
        'venue-Pop-bg': 'url(\'../app/assets/venues/indie_venue.png\')',
        'venue-Metal-bg': 'url(\'../app/assets/venues/indie_venue.png\')',
        'grey-background': 'url(\'../app/assets/bg-grey-rounded.png\')',
      },
    },
  },
  plugins: [],
} satisfies Config;
