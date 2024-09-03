/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
/**
 * Validate the event creation form
 * @param date the event date to be validated.
 * @param details the event details to be validated.
 * @returns if the form values are valid.
 */
export function validateEventForm(date: string, details: string) {
  const dateInput = new Date(date);
  let isValidInput = true;
  if (!dateInput) {
    isValidInput = false;
  } else if (details.length === 0) {
    isValidInput = false;
  }
  return isValidInput;
}

/**
 * Validate the artist creation form
 * @param name the name of the artist to be validated
 * @param biography the bio to be validated
 * @param description the description to be validated\
 * @returns if the form values are valid.
 */
export function validateArtistForm(name: string, biography: string, description: string) {
  const MIN_ARTIST_NAME_LENGTH = 2;
  const MIN_BIOGRAPHY_LENGTH = 10;
  const MIN_DESCRIPTION_LENGTH = 10;
  let isValidInput = true;
  if (name.length < MIN_ARTIST_NAME_LENGTH) {
    isValidInput = false;
  } else if (biography.length < MIN_BIOGRAPHY_LENGTH) {
    isValidInput = false;
  } else if (description.length < MIN_DESCRIPTION_LENGTH) {
    isValidInput = false;
  }
  return isValidInput;
}

/**
 * Validate the venue form
 * @param name the name of the venue to be validated.
 * @param location the location of the venue to be validated.
 * @returns if the form values are valid.
 */
export function validateVenueForm(name: string, location: string) {
  const MIN_VENUE_NAME_LENGTH = 6;
  const MIN_LOCATION_LENGTH = 2;
  let isValidInput = true;
  if (name.length < MIN_VENUE_NAME_LENGTH) {
    isValidInput = false;
  } else if (location.length < MIN_LOCATION_LENGTH) {
    isValidInput = false;
  }
  return isValidInput;
}
