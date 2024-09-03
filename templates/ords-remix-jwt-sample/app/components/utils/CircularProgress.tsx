/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import { CircularProgress } from '@mui/material';

/**
 * @returns A styled circular progress.
 */
function CustomCircularProgress() {
  return (
    <div className="flex items-center">
      <CircularProgress style={{
        width: '25px',
        height: '25px',
      }}
      />
    </div>

  );
}

export default CustomCircularProgress;
