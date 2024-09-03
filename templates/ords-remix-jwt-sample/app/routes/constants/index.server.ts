/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
export const AUTH0_RETURN_TO_URL = process.env.AUTH0_RETURN_TO_URL!;
export const AUTH0_CALLBACK_URL = process.env.AUTH0_CALLBACK_URL!;
export const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID!;
export const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET!;
export const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN!;
export const AUTH0_LOGOUT_URL = process.env.AUTH0_LOGOUT_URL!;
export const AUTH0_AUDIENCE = process.env.JWT_AUDIENCE!;
export const SCHEMA_NAME = process.env.SCHEMA_NAME || '';
export const { SCHEMA_PASSWORD } = process.env;
export const ADBS_ENDPOINT = process.env.ADB_ORDS_URL;
export const BASE_ENDPOINT = ADBS_ENDPOINT + SCHEMA_NAME.toLowerCase();
export const STATS_ENDPOINT = `${BASE_ENDPOINT}/euser/v1/landing_page_global_stats/`;
export const CITIES_ENDPOINT = `${BASE_ENDPOINT}/euser/v1/cities`;
export const EVENTS_ENDPOINT = `${BASE_ENDPOINT}/euser/v1/eventsHome`;
export const EVENT_ENDPOINT = `${BASE_ENDPOINT}/euser/v1/event`;
export const ARTIST_ENDPOINT = `${BASE_ENDPOINT}/euser/v1/artist`;
export const ARTISTS_ENDPOINT = `${BASE_ENDPOINT}/euser/v1/artists`;
export const ARTIST_EVENT_ENDPOINT = `${BASE_ENDPOINT}/euser/v1/artistEvents`;
export const CONCERTS_BY_CITY_ENDPOINT = `${BASE_ENDPOINT}/euser/v1/cityEvents`;
export const EVENTS_BY_NAME_ENDPOINT = `${BASE_ENDPOINT}/euser/v1/events`;
export const VENUES_ENDPOINT = `${BASE_ENDPOINT}/euser/v1/venues`;
export const EVENT_STATUS_ENDPOINT = `${BASE_ENDPOINT}/euser/v1/eventStatus`;
export const MUSIC_GENRES_ENDPOINT = `${BASE_ENDPOINT}/euser/v1/musicGenres`;
export const AUTO_REST_SEARCH_ENDPOINT = `${BASE_ENDPOINT}/search_view/`;
export const AUTO_REST_SEARCH_ARTISTS_ENDPOINT = `${BASE_ENDPOINT}/search_artist_view/`;
export const AUTO_REST_SEARCH_VENUES_ENDPOINT = `${BASE_ENDPOINT}/search_venues_view/`;

// authuser endpoints
export const CONCERTS_ENDPOINT = `${BASE_ENDPOINT}/authuser/v1/events`;
export const CONCERT_ENDPOINT = `${BASE_ENDPOINT}/authuser/v1/event`;
export const LIKED_EVENT_ENDPOINT = `${BASE_ENDPOINT}/authuser/v1/liked_event`;
export const LIKED_ARTIST_ENDPOINT = `${BASE_ENDPOINT}/authuser/v1/liked_artist`;
export const FOLLOWED_ARTISTS_ENDPOINT = `${BASE_ENDPOINT}/authuser/v1/liked_artists`;
export const FOLLOWED_EVENTS_ENDPOINT = `${BASE_ENDPOINT}/authuser/v1/liked_events`;

export const ORDS_SCHEMA_AUTH_CREDENTIALS = `${SCHEMA_NAME}:${SCHEMA_PASSWORD}`;
export const BASIC_SCHEMA_AUTH = `Basic ${Buffer.from(ORDS_SCHEMA_AUTH_CREDENTIALS).toString('base64')}`;

export const BASE = 10;

export const SECONDS = 60;
export const MINUTES = 60;
export const HOURS = 24;
export const COOKIE_MAX_AGE = SECONDS * MINUTES * HOURS; // One Day
