/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import React from 'react';
import {
  TextField,
} from '@mui/material';

/**
 * The Email Component.
 * @returns the Email Component.
 */
function EmailForm() {
  return (
    <div className="flex flex-row justify-center bg-gradient-to-r from-email-red to-email-purple py-20">
      <TextField
        InputProps={{
          style: {
            backgroundColor: '#fff',
            borderRadius: '30px',
          },
        }}
        InputLabelProps={{
          style: {
            marginLeft: '10px',
            color: '#E86C00',
          },
        }}
        className="flex w-1/4"
        label="Enter you mail to get updates"
      />
      <button type="button" className="ml-2 rounded-3xl border-2 border-orange-500 bg-orange-500 px-4 py-3 text-white">
        Find an Event
      </button>
    </div>
  );
}

export default EmailForm;
