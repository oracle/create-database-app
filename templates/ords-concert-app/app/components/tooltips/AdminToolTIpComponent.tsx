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
 * The admin tooltip component, describes the admin actions workflow.
 * @returns the Admin Actions Tooltip Component.
 */
function AdminToolTip() {
  const adminActionsTooltipDescription = featureDescriptions.AdminActionsTooltip;
  return (
    <AccordionComponent
      featureProps={adminActionsTooltipDescription}
    >
      <div className="flex flex-row items-center">
        <div className="w-32 flex-none px-2">
          <Ords />
        </div>
        <div className="flex-col align-middle">
          <Typography component="div" variant="body2" color="text.secondary">
            ORDS allows us to handle the creation of artists, venues and events
            by making a POST request to specific admin endpoints.
            <br />
            When a user wants to create a new artist, venue, or concert, they
            fill out a form in the app. Upon submission, the app makes a POST
            request to the corresponding ORDS endpoint.
            <br />
            <br />
            <Typography variant="body2" color="text.secondary" display="inline" fontWeight="bold">
              Handling the Request
            </Typography>
            <br />
            We use ORDS to handle these requests effectively and securely:
            <br />
            <ol className="list-decimal px-8">
              <li>
                <strong>User Authentication:</strong>
                {' '}
                The user must be logged in and have the
                {' '}
                <code>concert_app_admin</code>
                {' '}
                privilege.
              </li>
              <li>
                <strong>Form Submission:</strong>
                {' '}
                Admin submits the form with the necessary details.
              </li>
              <li>
                <strong>Sanitizing Input:</strong>
                {' '}
                Before sending the data to the database, the app sanitizes
                the user input to prevent SQL injection and other security issues.
              </li>
              <li>
                <strong>POST Request:</strong>
                {' '}
                We then construct a JSON payload with the sanitized form data
                and Remix sends it as a POST request to the appropriate ORDS endpoint.
              </li>
              <li>
                <strong>Database Interaction:</strong>
                {' '}
                ORDS then processes the request and passes it to the appropriate
                handler which in turn executes a PL/SQL block to insert the new
                record into the database.
              </li>
              <li>
                <strong>Response Handling:</strong>
                {' '}
                The app receives a response from ORDS, indicating the success or failure of the
                operation. If successful, the new record details (e.g., the new artist ID)
                are returned. If an error occurs, the status and result message of the response
                indicate the failure and provide the error message so the user can change the
                form parameters accordingly.
              </li>
            </ol>
            <br />
          </Typography>
        </div>
      </div>
    </AccordionComponent>
  );
}

export default AdminToolTip;
