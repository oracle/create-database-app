/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import React from 'react';
import { Button } from '@mui/material';

// TO-DO: Add colors to MUI theme once it's available.
const activeBg = '#C32E4C';
const inactiveBg = '#FFFFFF';
const active = '#FFFFFF';
const inactive = '#686766';

interface FilterButtonProps {
  genre: string;
}

/**
 * The filter button component
 * @param props the music genre to filter.
 * @returns tfe filter button component
 */
function FilterButton(props: FilterButtonProps) {
  const { genre } = props;
  const [bgColor, setBgColor] = React.useState(inactiveBg);
  const [textColor, setTextColor] = React.useState(inactive);

  const toggleButtonStyle = () => {
    setBgColor((prevColor) => (prevColor === inactiveBg ? activeBg : inactiveBg));
    setTextColor((prevTextColor) => (prevTextColor === inactive ? active : inactive));
  };
  return (
    <div>
      <Button
        onClick={toggleButtonStyle}
        variant="contained"
        sx={{
          backgroundColor: bgColor,
          '&:hover': {
            backgroundColor: bgColor,
          },
          color: textColor,
          marginLeft: '8px',
          marginRight: '8px',
          fontWeight: 600,
          textTransform: 'none',
        }}
      >
        {genre}
      </Button>
    </div>
  );
}

export default FilterButton;
