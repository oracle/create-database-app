/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import { AlertColor } from '@mui/material';
import ORDSFeature from './ORDSFeature';

interface BannerComponentProps {
  open: boolean;
  severity?: AlertColor;
  onClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
  autoHideDuration?: number;
  vertical?: 'top' | 'bottom';
  horizontal?: 'left' | 'center' | 'right';
  feature: ORDSFeature
}

export default BannerComponentProps;
