/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import ORDSFeature from '../models/ORDSFeature';

const featureDescriptions : { [key : string] : ORDSFeature } = {
  subscribeTooltip: {
    featureID: 'simple-popover-subscriptions',
    title: 'How does a user get subscribed?',
    description: 'When a user subscribes/shows interest in a concert, Remix performs a POST request to an ORDS PL/SQL handler that adds a new registry to the corresponding table.',
    link: 'https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/24.2/orddg/developing-REST-applications.html',
  },
  howIsSubscribeTooltip: {
    featureID: 'simple-popover-remove-subscriptions',
    title: 'How do we know a user is subscribed?',
    description: 'To determine if a user is already subscribed to a concert Remix performs a GET request to to the authuser/v1/liked_event/:userID/:eventID API endpoint that tells the app if the user is already subscribed or not.',
    link: 'https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/24.2/orddg/developing-REST-applications.html',
  },
  redirectTooltip: {
    featureID: 'simple-popover-redirect',
    title: 'How redirection works?',
    description: 'Clicking this link will trigger an ORDS GET request to the enduser/v1/event/:id ORDS endpoint which will return the associated concert and this will be displayed in the concerts/:id page.',
    link: 'https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/24.2/orddg/developing-REST-applications.html',
  },
  handlerTooltip: {
    featureID: 'simple-popover-redirect',
    title: 'What is a handler?',
    description: 'A handler is a link between the service logic (a SQL statement or a PL/SQL block) and a HTTP action (a POST, PUT, PATCH, DELETE request). ',
    link: 'https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/24.2/orddg/developing-REST-applications.html',
  },
  paginationTooltip: {
    featureID: 'simple-accordion-pagination',
    title: 'How do we load more concert slides into the carousel?',
    description: 'The ORDS response we get from Collection Query Endpoints contains some helpful extra parameters like \'hasMore\', \'count\' \'limit\' and \'offset\' which allows us to determine the amount of pages we need to display per result search.',
    link: 'https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/24.2/orddg/developing-REST-applications.html',
  },
  collectionQueryTooltip: {
    featureID: 'simple-accordion-pagination',
    title: 'What is a Collection Query Endpoint?',
    description: 'A collection Query Endpoint is a handler whose source type is \'Collection Query\' this allows developers to paginate the response and it also includes some helpful metadata to get more info of the result set.',
    link: 'https://www.thatjeffsmith.com/archive/2019/02/ords-and-source-types/',
  },
  offsetCallsTooltip: {
    featureID: 'simple-accordion-offset-calls',
    title: 'How do we load more Concerts?',
    description: 'Once you reach the last slide on the carousel and you try to get more concerts, a fetch request to the /euser/v1/eventsHome?offset=OFFSET endpoint will be made and once we get the response the Carousel will be updated with the newly created slides.',
    link: 'https://www.thatjeffsmith.com/archive/2019/12/how-paging-works-in-ords/',
  },
  itemsPerPageTooltip: {
    featureID: 'simple-accordion-offset-calls',
    title: 'How do we define the amount of results we get per page?',
    description: 'ORDS allow us to define the number of results that will be returned on each GET Endpoint by setting up the p_items_per_page parameter in the handler definition.',
    link: 'https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/24.2/orddg/ORDS-reference.html#GUID-3393526F-0E85-49D8-AB2B-71048C9E0031',
  },
  URIParamsTooltip: {
    featureID: 'simple-accordion-uri-params',
    title: 'How does choosing a city affects the page?',
    description: 'When you change the city we update the URI city parameter of the page which allows Remix to pass such parameter to the \'get concerts by city\' endpoint which returns the concerts of the selected city.',
    link: 'https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/24.2/orddg/developing-REST-applications.html#GUID-FCE0FAAF-0671-4C04-8B0B-36F0FA396543',
  },
  AdminActionsTooltip: {
    featureID: 'simple-accordion-admin-actions',
    title: 'How Do We Use ORDS for Creating Artists, Venues, and Concerts in the App?',
    description: 'ORDS allows us to handle the creation of artists, venues and events by making a POST request to specific admin endpoints',
    link: 'https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/24.2/orddg/developing-REST-applications.html#GUID-FCE0FAAF-0671-4C04-8B0B-36F0FA396543',
  },
  errorTooltip: {
    featureID: 'simple-accordion-error',
    title: 'How do we know that something went wrong?',
    description: 'ORDS allows us to define output variables to expose useful information when something goes wrong. We have access to a status code as well as a message that can be as detailed or generic as you want to help users understand what went wrong and how it can be fixed.',
    link: 'https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/24.2/orddg/developing-REST-applications.html#GUID-6490250C-9604-4257-A179-963E7CFB7C43',
  },
  authenticationTooltip: {
    featureID: 'simple-accordion-error',
    title: 'What does it mean to be authenticated?',
    description: 'The sample app is divided in three modules: euser (general purpose GET endpoints) authuser (GET and POST endpoints that require an user id), adminuser (POST PUT UPDATE and DELETE endpoints for artists, venues and concerts). Each module is protected by a different privilege. Let the user know to which privileges is entitled to.',
    link: 'https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/24.2/orddg/developing-REST-applications.html#GUID-5B39A5A6-C55D-452D-AE53-F49431A4DE97',
  },
  userNotLoggedInTooltip: {
    featureID: 'user-not-logged',
    title: 'How is authentication handled when a user is not logged in?',
    description: `If a user is not logged in, BASIC authentication will be used to fetch data for the app. 
    If the user logs in, then we use the JWT token to map the scopes of the application with ORDS privileges. 
    This gives the user the ability to access protected endpoints and unlocks features such as subscribing to an artist or concert `,
    link: 'https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/24.2/orddg/developing-REST-applications.html#GUID-02B6DC5B-347A-417A-855F-C4A3F4B77538',
  },
  userLoggedInTooltip: {
    featureID: 'user-logged',
    title: 'How is authentication handled for a logged user?',
    description: `Once a user is logged in, JWT provides us with the application scopes. 
    These are then mapped to ORDS privileges and allows users to access protected routes and certain endpoints,
    such as the ones that allow a user to subscribe to an artist or a concert. 
    Authentication will also switch from using BASIC to using an actual bearer token, allowing for improved performance when making requests to the ORDS endoints.`,
    link: 'https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/24.2/orddg/developing-REST-applications.html#GUID-02B6DC5B-347A-417A-855F-C4A3F4B77538',
  },
  subscribeArtistTooltip: {
    featureID: 'artist-subscriptions',
    title: 'How does a user subscribe to an artist?',
    description: 'When a user subscribes/shows interest in an artist, Remix performs a POST request to an ORDS PL/SQL handler that adds a new registry to the corresponding table. JSON parameters are used for dynamic values that need to be binded into the corresponding PL/SQL handler.',
    link: 'https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/24.2/orddg/developing-REST-applications.html',
  },
  getDatesTooltip: {
    featureID: 'get-dates-tooltip',
    title: 'How do we get Dates from ORDS? ',
    description: 'ORDS allows us to use different date formats when defining our GET handlers so you can use the format of your choosing to avoid additional formatting once the response hits the client. By default ORDS returns Date columns using the ISO 8601 string format. ',
    link: 'https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/24.2/orddg/developing-REST-applications.html#GUID-D67648DE-7BF6-4ACA-8C2A-5BC360AB7FE7',
  },
  postDatesTooltip: {
    featureID: 'post-dates-tooltip',
    title: 'How do we post Dates to ORDS? ',
    description: 'ORDS allows us to use different date formats in each handler, as long as the date string format coincides with the one specified on the handler you are good to go. ',
    link: 'https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/24.2/orddg/developing-REST-applications.html#GUID-D67648DE-7BF6-4ACA-8C2A-5BC360AB7FE7',
  },
  sanitizationTooltip: {
    featureID: 'sanitization-tooltip',
    title: 'How does the validation process work? ',
    description: 'We have validation for both empty input fields and SQL injection. By implementing SQL sanitization techniques, we safeguard the application against SQL injection attacks, ensuring a secure and robust application environment.',
    link: 'https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation',
  },
  entityCreationSuccess: {
    featureID: 'entity-success-tooltip',
    title: 'How do we know that a POST Request went well?',
    description: 'When the green snackbar message appears, it means that a new entity (Event, Artist or Venue) was successfully created using the data provided by an admin user. The data in the form gets packaged in a JSON format and binded to the corresponding PL/SQL handler in ORDS. A link is provided so the user can access the newest created entity.',
    link: 'https://www.thatjeffsmith.com/archive/2020/06/ords-101-working-with-pl-sql/',
  },
  entityCreationFailure: {
    featureID: 'entity-failure-tooltip',
    title: 'How do we know that a POST Request went wrong? ',
    description: 'When the red snackbar message appears, it means that something went wrong and the entity was not created. You can customize how errors are returned in the response directly in the handler definition. ',
    link: 'https://www.thatjeffsmith.com/archive/2021/09/more-on-exception-handling-in-your-ords-rest-apis/',
  },
  explicitParameterDescription: {
    featureID: 'explicit-parameter-description-tooltip',
    title: 'Explicit parameters in ORDS ',
    description: ' ',
    link: '',
  },
  implicitParameterDescription: {
    featureID: 'implicit-parameter-description-tooltip',
    title: 'Implicit parameters in ORDS ',
    description: 'If you click the link in this card, it will redirect you to the concerts page and it will use the concert ID to fetch the data for that specific concert. This is what we call an implicit parameter in ORDS. There is no need to define it in the handler definition. You simply add it at the end of the handler URL.',
    link: 'https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/24.2/orddg/implicit-parameters.html',
  },
  PaginationTooltipDescription: {
    featureID: 'simple-accordion-uri-params',
    title: 'How does ORDS allow us to implement pagination?',
    description: 'This ORDS API response provides the necessary information to implement pagination in your application.',
    link: 'https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/24.2/orddg/developing-REST-applications.html#GUID-8701726C-E050-47AA-AD79-3B14396CD23B',
  },
  musicGenresTooltipDescription: {
    featureID: 'simple-tooltip-music-genres',
    title: 'How does ORDS allow us to filter by music genres?',
    description: `This component leverages ORDS autoREST filtering capabilities to allow users to
            filter results based on multiple music genres. It dynamically constructs a filter
            expression based on the user's selection, enabling complex queries like filtering for
            rows containing any combination of specified genres in the music_genres column.`,
    link: 'https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/24.2/orddg/developing-REST-applications.html#GUID-091748F8-3D14-402B-9310-25E6A9116B47',
  },
  autoRESTDatesTooltipDescription: {
    featureID: 'simple-tooltip-autoREST-dates',
    title: 'How does ORDS allow us to filter by dates?',
    description: `This component leverages ORDS autoREST filtering capabilities to allow users to
            filter results based on start and end dates, setting or updating the lower bound of the date range using the $gte or $between filters and setting or updating the upper bound using $lte or $between filters. This allow precise filtering of concerts within the selected date range.`,
    link: 'https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/24.2/orddg/developing-REST-applications.html#GUID-091748F8-3D14-402B-9310-25E6A9116B47',
  },
  searchTooltipDescription: {
    featureID: 'simple-tooltip-autoREST-search',
    title: 'How does ORDS allow us to implement a simple search engine?',
    description: `The ORDS Concert App uses ORDS autoREST filters to implement a search component by building a query based on user input and executing it with a debounce delay. It constructs the query parameters, 
    including the filter expression (searchExpression or 'q' URI parameter), pagination details (limit and offset), and then triggers the search with the Remix fetcher functionality. The debounce prevents excessive requests, ensuring efficient and responsive search functionality.`,
    link: 'https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/24.2/orddg/developing-REST-applications.html#GUID-091748F8-3D14-402B-9310-25E6A9116B47',
  },
};

export default featureDescriptions;
