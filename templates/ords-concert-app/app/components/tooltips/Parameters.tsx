/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import { Typography } from '@mui/material';
import featureDescriptions from '../../utils/ORDSFeaturesDescription';
import AccordionComponent from './Accordion';
import { Ords } from '../icons';

/**
 * The admin JSON parameters tooltip component, describes the difference
 * between implicit and explicit parameters.
 * @returns the Admin Actions Tooltip Component.
 */
function ParametersToolTip() {
  const parameterTooltipDescription = featureDescriptions.explicitParameterDescription;
  return (
    <AccordionComponent
      featureProps={parameterTooltipDescription}
    >
      <div className="flex flex-row items-center">
        <div className="w-32 flex-none px-2">
          <Ords />
        </div>
        <div className="flex-col align-middle">
          <Typography component="div" variant="body2" color="text.secondary">
            ORDS allows us to handle the creation of artists, venues and events
            by making a POST request to specific admin endpoints.
            In order to handle dynamic data, ORDS gives us two different mechanisms to pass
            parameters: Implicitly and Explicitly.
            <br />
            <br />
            An example of explicit parameters can be found here in the admin page.
            When a user wants to create a new artist, venue, or concert, they
            fill out a form in the app. Each input value will be packaged in a JSON
            and the handler for that request will need to explicitly declare those
            parameters in the handler definition. This will be the case for handlers
            that work with POST and PUT requests.
            <br />
            <br />
            <Typography variant="body2" color="text.secondary" display="inline" fontWeight="bold">
              Defining a parameter
            </Typography>
            <br />
            Here is what defining an explicit parameter looks like in ORDS:
            <pre className="bg-gray-100">
              {
                `
                ORDS.DEFINE_PARAMETER(
                    p_module_name        => '<module_name>',
                    p_pattern            => '<pattern>',
                    p_method             => '<method>',
                    p_name               => '<name>',
                    p_bind_variable_name => '<bind_variable_name>',
                    p_source_type        => '<source_type>',
                    p_param_type         => '<param_type>',
                    p_access_method      => '<access_method>',
                    p_comments           => '<comments>'
                );
                `
              }
            </pre>
            <br />
            <br />
            <Typography variant="body2" color="text.secondary" display="inline" fontWeight="bold">
              How we use it in our handler
            </Typography>
            <br />
            Once our parameter is defined, we can then use it in our PL/SQL by using the :
            {'<param>'}
            {' '}
            notation
            <pre className="bg-gray-100">
              {
                `
                INSERT INTO ARTISTS(NAME, DESCRIPTION, BIO)
                VALUES (:name, :description, :bio)
                `
                }
            </pre>
          </Typography>
        </div>
      </div>
    </AccordionComponent>
  );
}

export default ParametersToolTip;
