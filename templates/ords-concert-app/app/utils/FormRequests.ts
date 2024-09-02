/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import { validateArtistForm, validateEventForm, validateVenueForm } from './FormValidation';
import { CREATE_ARTIST_ENDPOINT, CREATE_EVENTS_ENDPOINT, CREATE_VENUES_ENDPOINT } from '~/routes/constants/admin.server';

const INPUT_ERROR = {
  error: 'Input error. Please fill all fields correctly.',
};

/**
 * Helper function to performs a POST request to the artist endpoint
 * @param name {string} the name of the artist.
 * @param bio the bio of the artists.
 * @param description the description of the artist.
 * @param auth the user credentials to authenticate the user
 * @returns the Artist endpoint response.
 */
export async function createArtistRequest(
  name: string,
  bio: string,
  description: string,
  auth: string,
) {
  let response = null;
  if (validateArtistForm(name, bio, description)) {
    const createArtist = await fetch(CREATE_ARTIST_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({
        name,
        description,
        bio,
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: auth,
      },
    });
    response = await createArtist.json();
  } else {
    response = INPUT_ERROR;
  }
  return response;
}

/**
 *
 * @param date the event date.
 * @param artist_id the id of the artist that gives the concert.
 * @param venue_id the id where the event will take place.
 * @param status the status of the event.
 * @param details the details of the event
 * @param auth the auth credentials to be used to create the event.
 * @returns the Event endpoint response.
 */
export async function createEventRequest(
  date: string,
  artist_id: string,
  venue_id: string,
  status: string,
  details: string,
  auth: string,
) {
  let response = null;
  if (validateEventForm(date, details)) {
    const createArtist = await fetch(CREATE_EVENTS_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({
        e_date: date,
        artist_id,
        venue_id,
        event_status_id: status,
        event_details: details,
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: auth,
      },
    });
    response = await createArtist.json();
  } else {
    response = INPUT_ERROR;
  }
  return response;
}

/**
 *
 * @param name the name of the venue
 * @param location the location of the venue
 * @param cityID the city id in which the venue is located
 * @param auth the auth credentials to be used to create the venue.
 * @returns the Venue endpoint response.
 */
export async function createVenueRequest(
  name: string,
  location: string,
  cityID: string,
  auth: string,
) {
  let response = null;
  if (validateVenueForm(name, location)) {
    const createVenue = await fetch(CREATE_VENUES_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({
        name,
        location,
        city_id: cityID,
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: auth,
      },
    });
    response = await createVenue.json();
  } else {
    response = INPUT_ERROR;
  }
  return response;
}
