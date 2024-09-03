/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import * as fs from 'fs';
import { postBatchRequest } from '../utils/ORDSRequests.js';
/*
  * Disabling the no console rule for this specific route since it allows us to communicate
  * the result of the batchload requests to the user.
*/
/* eslint-disable no-console */
/**
 * Creates all the Admin User Modules.
 * Uses the schema credentials.
 * @param {string} endpoint the ADB-S ords endpoint.
 * @param {string} basicAuth the authentication string for the models owner.
 */
async function populateObjects(endpoint, basicAuth) {
  const citiesFileStream = fs.createReadStream('ords/data/CITIES.csv');
  const citiesBatchResult = await postBatchRequest(
    `${endpoint}cities/batchload?batchRows=50&dateFormat=DD-MM-YYYY`,
    citiesFileStream,
    basicAuth,
  );
  console.log(citiesBatchResult);
  const venuesFileStream = fs.createReadStream('ords/data/VENUES.csv');
  const venuesBatchResult = await postBatchRequest(
    `${endpoint}venues/batchload?batchRows=50&dateFormat=DD-MM-YYYY`,
    venuesFileStream,
    basicAuth,
  );
  console.log(venuesBatchResult);
  const artistsFileStream = fs.createReadStream('ords/data/ARTISTS.csv');
  const artistsBatchResult = await postBatchRequest(
    `${endpoint}artists/batchload?batchRows=50&dateFormat=YYYY-MM-DD`,
    artistsFileStream,
    basicAuth,
  );
  console.log(artistsBatchResult);
  const eventStatusFileStream = fs.createReadStream('ords/data/EVENT_STATUS.csv');
  const eventStatusBatchResult = await postBatchRequest(
    `${endpoint}event_status/batchload?batchRows=50&dateFormat=YYYY-MM-DD`,
    eventStatusFileStream,
    basicAuth,
  );
  console.log(eventStatusBatchResult);
  const eventsFileStream = fs.createReadStream('ords/data/EVENTS.csv');
  const eventsBatchResult = await postBatchRequest(
    `${endpoint}events/batchload?batchRows=50&dateFormat=YYYY-MM-DD`,
    eventsFileStream,
    basicAuth,
  );
  console.log(eventsBatchResult);
  const musicGenresFileStream = fs.createReadStream('ords/data/MUSIC_GENRES.csv');
  const musicGenresBatchResult = await postBatchRequest(
    `${endpoint}music_genres/batchload?batchRows=50&dateFormat=YYYY-MM-DD`,
    musicGenresFileStream,
    basicAuth,
  );
  console.log(musicGenresBatchResult);
  const artistClassificationsFileStream = fs.createReadStream('ords/data/ARTIST_CLASSIFICATIONS.csv');
  const artistClassificationsBatchResult = await postBatchRequest(
    `${endpoint}artist_classifications/batchload?batchRows=50&dateFormat=YYYY-MM-DD`,
    artistClassificationsFileStream,
    basicAuth,
  );
  console.log(artistClassificationsBatchResult);
}

export default populateObjects;
