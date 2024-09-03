/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import jazzIcon from '../../assets/musicGenresIcons/jazz_icon.png';
import indieIcon from '../../assets/musicGenresIcons/indie_icon.png';
import rapIcon from '../../assets/musicGenresIcons/rap_icon.png';
import reggaeIcon from '../../assets/musicGenresIcons/reggae_icon.png';
import steamPunkIcon from '../../assets/musicGenresIcons/steampunk_icon.png';
import metalIcon from '../../assets/musicGenresIcons/metal_icon.png';

const imagesByGenre : Record<string, string> = {
  Jazz: jazzIcon,
  Metal: metalIcon,
  Reggae: reggaeIcon,
  Steampunk: steamPunkIcon,
  Rap: rapIcon,
  Indie: indieIcon,
  Rock: indieIcon,
  Pop: indieIcon,
};

export default imagesByGenre;
