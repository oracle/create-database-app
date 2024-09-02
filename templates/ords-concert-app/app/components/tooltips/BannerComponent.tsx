/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import React from 'react';
import {
  Alert, Snackbar, IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import SvgOrds from '../icons/Ords';
import BannerComponentProps from '../../models/BannerComponentProps';

/**
 * Returns a customizable banner component for popups
 * @param props Props for the banner component.
 * @returns The Banner component.
 */
function BannerComponent(props: BannerComponentProps) {
  const {
    open,
    severity,
    onClose,
    autoHideDuration,
    vertical = 'top',
    horizontal = 'center',
    feature,
  } = props;
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical, horizontal }}
      sx={{ width: '100%', marginTop: '3rem', border: '1px solid black' }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        hidden={open}
        icon={false}
        sx={{ width: '100%', backgroundColor: '#fff', '& .MuiAlert-action': { padding: 0 } }}
        action={(
          <IconButton
            aria-label="close"
            color="info"
            size="small"
            onClick={onClose}
          >
            <Close fontSize="inherit" />
          </IconButton>
        )}
      >
        <div className="flex w-full flex-row items-center">
          <SvgOrds className="mr-2 w-20" />
          {`${feature.title} `}
          {feature.description}
          <a
            className="text-blue-600 underline hover:text-blue-800"
            target="_blank"
            href={feature.link}
            rel="noreferrer"
          >
            Learn more.
          </a>
        </div>
      </Alert>
    </Snackbar>
  );
}

export default BannerComponent;
