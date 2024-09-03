/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
} from '@remix-run/node';
import {
  Link, useActionData, useLoaderData, useSearchParams,
} from '@remix-run/react';
import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import DOMPurify from 'isomorphic-dompurify';
import AdminDashboard from '../components/admin/AdminDashboard';
import {
  ARTISTS_ENDPOINT,
  CITIES_ENDPOINT,
  EVENT_STATUS_ENDPOINT,
  VENUES_ENDPOINT,
} from './constants/index.server';
import { auth } from '../utils/auth.server';
import { ExitEvents, StatusCodes } from '../utils/enums';
import { createArtistRequest, createEventRequest, createVenueRequest } from '../utils/FormRequests';
import TooltipComponent from '../components/tooltips/TooltipComponent';
import featureDescriptions from '../utils/ORDSFeaturesDescription';
import ORDSFetcher from '../utils/ORDSFetcher';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url);
  const enableTooltips = searchParams.has('tooltips');
  const {
    tokenType,
    accessToken,
  } = await auth.isAuthenticated(request, {
    failureRedirect: `/error${enableTooltips ? '?tooltips' : ''}`,

  });
  const USER_JWT_AUTH = `${tokenType} ${accessToken}`;
  const artists = await ORDSFetcher(ARTISTS_ENDPOINT, USER_JWT_AUTH);
  const venues = await ORDSFetcher(VENUES_ENDPOINT, USER_JWT_AUTH);
  const eventStatus = await ORDSFetcher(EVENT_STATUS_ENDPOINT, USER_JWT_AUTH);
  const cities = await ORDSFetcher(CITIES_ENDPOINT, USER_JWT_AUTH);

  return json({
    artists,
    venues,
    eventStatus,
    cities,
  });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const {
    tokenType,
    accessToken,
  } = await auth.isAuthenticated(request, {
    failureRedirect: '/error',
  });
  const USER_JWT_AUTH = `${tokenType} ${accessToken}`;
  const body = await request.formData();
  const { type } = Object.fromEntries(body);
  let postResponse = null;
  if (type === 'artists') {
    const name = DOMPurify.sanitize(body.get('artist_name') as string);
    const bio = DOMPurify.sanitize(body.get('bio') as string);
    const description = DOMPurify.sanitize(body.get('description') as string);
    postResponse = await createArtistRequest(name, bio, description, USER_JWT_AUTH);
  } else if (type === 'concerts') {
    const eDate = DOMPurify.sanitize(body.get('event_date') as string);
    const artistID = DOMPurify.sanitize(body.get('artist_id') as string);
    const venueID = DOMPurify.sanitize(body.get('venue_id') as string);
    const eventStatusID = DOMPurify.sanitize(body.get('status_id') as string);
    const eventDetails = DOMPurify.sanitize(body.get('details') as string);
    postResponse = await createEventRequest(
      eDate,
      artistID,
      venueID,
      eventStatusID,
      eventDetails,
      USER_JWT_AUTH,
    );
  } else if (type === 'venues') {
    const name = DOMPurify.sanitize(body.get('venue_name') as string);
    const location = DOMPurify.sanitize(body.get('location') as string);
    const cityID = DOMPurify.sanitize(body.get('city_id') as string);
    postResponse = await createVenueRequest(name, location, cityID, USER_JWT_AUTH);
  }
  return json({
    postResponse,
    type,
  });
};

/**
 *
 * @returns the selected form.
 */
function Admin() {
  const {
    artists,
    venues,
    eventStatus,
    cities,
  } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const postResponse = actionData?.postResponse;
  const type = actionData?.type;
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState('');
  const [searchParams] = useSearchParams();
  const enableTooltips = searchParams.has('tooltips');

  const AUTO_HIDE_DURATION = 5000;

  let entity = '';
  switch (type) {
    case 'concerts':
      entity = 'Event';
      break;
    case 'artists':
      entity = 'Artist';
      break;
    case 'venues':
      entity = 'Venue';
      break;
    default:
      entity = 'error';
  }

  React.useEffect(() => {
    if (postResponse) {
      if (postResponse.STATUS_CODE === StatusCodes.SUCCESS) {
        setOpen(true);
        setError('');
      } else {
        setOpen(true);
        setError(postResponse.error || 'Something went wrong! Please try again later.');
      }
    } else {
      setOpen(false);
      setError('');
    }
  }, [postResponse]);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === ExitEvents.CLICKAWAY) {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="flex flex-col items-center">
      <AdminDashboard artists={artists} venues={venues} status={eventStatus} cities={cities} />
      <Snackbar
        open={open}
        autoHideDuration={AUTO_HIDE_DURATION}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {postResponse?.STATUS_CODE === StatusCodes.SUCCESS ? (
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
          >
            <Link className="mr-2 underline" to={`/${type}/${postResponse?.OBJECT_ID}`}>
              { `${entity} was created successfully` }
            </Link>
            {
            enableTooltips && (
              <TooltipComponent
                featureProps={featureDescriptions.entityCreationSuccess}
                width="20px"
                height="20px"
              />
            )
          }
          </Alert>
        ) : (
          <Alert
            onClose={handleClose}
            severity="error"
            variant="filled"
            sx={{ width: '100%' }}
          >
            {error}
            {
            enableTooltips && (
              <TooltipComponent
                featureProps={featureDescriptions.entityCreationFailure}
                width="20px"
                height="20px"
              />
            )
          }
          </Alert>
        )}
      </Snackbar>
    </div>
  );
}

export default Admin;
