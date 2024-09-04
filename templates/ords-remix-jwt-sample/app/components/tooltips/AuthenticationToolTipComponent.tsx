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
function AuthenticationToolTip() {
  const authenticationTooltipDescription = featureDescriptions.authenticationTooltip;

  return (
    <AccordionComponent
      featureProps={authenticationTooltipDescription}
    >
      <div className="flex flex-row items-center">
        <div className="w-32 flex-none px-2">
          <Ords />
        </div>
        <div className="flex-col align-middle">
          <Typography component="div" variant="body2" color="text.secondary">
            The sample app has its RESTful Services divided in three modules:
            {' '}
            <Typography variant="body2" color="text.secondary" display="inline" fontWeight="bold">
              euser
            </Typography>
            {' '}
            (general purpose GET endpoints),
            {' '}
            <Typography variant="body2" color="text.secondary" display="inline" fontWeight="bold">
              authuser
            </Typography>
            {' '}
            (GET and POST endpoints that require of an user id and allow
            the user to subscribe/follow events, artists and venues),
            {' and '}
            <Typography variant="body2" color="text.secondary" display="inline" fontWeight="bold">
              adminuser
            </Typography>
            {' '}
            (POST PUT UPDATE and DELETE endpoints to administrate artists, venues and concerts).
            <br />
            Each module is protected by a privilege that is granted to the user depending
            on if the user is authenticated or not.
            <ul className="list-disc px-8">
              <li>
                <strong>Authenticated User</strong>
                {' '}
                An authenticated user is entitled to the
                {' '}
                <Typography variant="body2" color="text.secondary" display="inline" sx={{ textDecoration: 'underline' }}>
                  concert_app_euser
                </Typography>
                {', '}
                <Typography variant="body2" color="text.secondary" display="inline" sx={{ textDecoration: 'underline' }}>
                  concert_app_authuser
                </Typography>
                {' and '}
                <Typography variant="body2" color="text.secondary" display="inline" sx={{ textDecoration: 'underline' }}>
                  concert_app_admin
                </Typography>
                {' '}
                privileges.
              </li>
              <li>
                <strong>Unauthenticated User</strong>
                {' '}
                An unauthenticated user is entitled to the
                {' '}
                <Typography variant="body2" color="text.secondary" display="inline" sx={{ textDecoration: 'underline' }}>
                  concert_app_euser
                </Typography>
                {' '}
                privilege.
              </li>
            </ul>
          </Typography>
        </div>
      </div>
    </AccordionComponent>
  );
}

export default AuthenticationToolTip;
