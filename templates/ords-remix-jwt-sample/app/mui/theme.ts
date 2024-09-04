/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import {
  createTheme,
} from '@mui/material';

// Augment the palette to include an orange color
declare module '@mui/material/styles' {
  interface Palette {
    orange: Palette['primary'];
  }

  interface PaletteOptions {
    orange?: PaletteOptions['primary'];
  }
}

// Update the Button's color options to include an orange option
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    orange: true;
  }
}

// Create a theme instance.
// See https://mui.com/material-ui/customization/color/
const theme = createTheme({
  palette: {
    orange: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
      contrastText: '#000',
    },
  },
});

export default theme;
