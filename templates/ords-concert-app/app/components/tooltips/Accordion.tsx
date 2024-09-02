/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import type { ReactElement } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import ORDSFeature from '../../models/ORDSFeature';
import { Ords } from '../icons';

interface AccordionProps {
  featureProps : ORDSFeature;
  children ?: ReactElement | undefined;

}

/**
 * Provides a tooltip component.
 * Uses an anchor element as reference.
 * @see {@link https://mui.com/material-ui/react-popover/} for more info.
 * @param props the ORDS feature props.
 * @returns the Requested ToolTip component.
 */
function AccordionComponent(props : AccordionProps) {
  const { featureProps, children } = props;
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
              {featureProps.title}
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          {
            children === undefined ? (
              <div className="flex flex-row items-center">
                <div className="w-32 flex-none px-2">
                  <Ords />
                </div>
                <div className="flex-col align-middle">
                  <Typography variant="body2" color="text.secondary">
                    {featureProps.description}
                    {' '}
                    <a
                      className="text-blue-600 underline hover:text-blue-800"
                      target="_blank"
                      href={featureProps.link}
                      rel="noreferrer"
                    >
                      Learn more.
                    </a>
                    {' '}
                  </Typography>
                </div>
              </div>
            )
              : children

          }
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default AccordionComponent;
