/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { Ords } from '../icons';

interface AccordionProps {
  errorData : string;

}

/**
 * Provides a tooltip component.
 * Uses an anchor element as reference.
 * @see {@link https://mui.com/material-ui/react-popover/} for more info.
 * @param props the ORDS feature props.
 * @returns the Requested ToolTip component.
 */
function ErrorAccordionComponent(props : AccordionProps) {
  const { errorData } = props;
  return (
    <div className="py-2">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className="flex w-full flex-row items-center space-x-2">
            <div className="flex w-1/12 align-middle">
              <Ords style={{
                width: '40px',
                height: '40px',
              }}
              />
            </div>
            <Typography variant="h6" component="div" align="center">
              See Error stack trace
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-row items-center">
            <div className="flex-col align-middle">
              <Typography variant="body1" color="text.secondary">
                {errorData}
              </Typography>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default ErrorAccordionComponent;
