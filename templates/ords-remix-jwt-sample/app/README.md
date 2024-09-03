# ORDS Concert App - Project  Configuration

![ORDS Logo](../../images/ORDS.png)

## Table of Contents

- [Component Structure](#component-structure)
- [What are routes and how are they used in this project?](#What-are-routes-and-how-are-they-used-in-this-project?)
- [Nested routes in Remix](#nested-routes-in-remix)
- [How do we fetch data and where does ORDS come in to play?](#How do we fetch data and where does ORDS come in to play?)
- [Loader functions](#loader-functions)
- [Action functions](#action-functions)
- [Resource routes](#resource-routes)
- [Error Boundaries](#error-boundaries)
-
- [Developing your own venues route](#developing-your-own-venues-route)

## Component Structure

About 80% of the application's code can be found in the `app/` directory.
Here we can find three very useful folders:

- `/components`
- `/routes`
- `/models`

Let's talk about the components directory. It is host to almost every React
component we developed for the application. These components can receive
props from wherever they are called and will only run on the client-side.

The routes directory is where we get access to the client and define our
URL's for the application. Developers get access to both the client and server
side. It is a common practice in this application for route files to import
React components from the components folder.

Finally, we have the models directory. Here is where all of our typescript interfaces
are stored. These files are imported often by files in the components and routes
directory.

## What are routes and how are they used in this project?

Routes are an esential part of Remix(<https://remix.run/docs/en/main/discussion/routes>.)
and one of the pillars for this whole project.
With nested routes, segments of the URL are coupled to both data dependencies and
the UI's component hierarchy. You can think of Remix in the same way a file
system works. Each file the in the app/routes directory corresponds to a route,
and the file's name and path determine the URL structure. For example, the sample
app has a file for each route that is available.

| Route      | File    |
|------------|--------------|
| `/home`    | `home.tsx`   |
| `/artists` | `artists.tsx`|
| `/admin`   | `admin.tsx`  |
| `/concerts`| `concerts.tsx`|

## Nested routes in Remix

Nested routes(<https://remix.run/docs/en/main/file-conventions/routes>) are a
very powerful concept in Remix that allows developers to segment
URL's and extract data from each segment. In the case of the sample app, we have
a couple of examples where this concept is used:

### Extracting parameters from the URL

In order to know which artist or concert to load for each of their respective routes,
we make use of the URL segmentation and grab the ID at the end to fetch the
correct data.

- `/artists/101` -> Fetch artist with ID of 101
- `/concerts/232` -> Fetch concert with ID of 232

### Using outlets and dynamic routes

Another powerful tool in Remix is the use of the `<Outlet />` component. Outlets
follow a parent-child relationship, in which the parent can display different
components using the URL to decipher which component(s) to show. In the sample app,
a good example of this is the `/private` route that can display info about the user.

- Parent route: `/private` -> `private.tsx`
- Children routes:
    - `/private/followed-artists` -> `private.followed-artists.tsx`
    - `/private/followed-events` -> `private.followed-events.tsx`
    - `/private/profile` -> `private.profile.tsx`

This allows us to have our components logic separated without having to use conditional
rendering and gives the developer the flexibility to keep clean separation of parent
and child components while maintaining a consistent layout.

## How do we fetch data and where does ORDS come in to play?

We've talked about how the sample app uses routes to structure frontend components,
but what about the backend? Lucky for us, a route file can include two functions
that work directly on the server side: `loader()` and `action()`. Each function handles
two different aspects of backend development that allow for the developers to freely
make calls to the backend. In this case, our backend features the ability to make
API calls to our ORDS handlers. Let's go into detail about how both functions work
in the sample app and how they interact with ORDS.

## Loader functions

Loader functions(<https://remix.run/docs/en/main/route/loader>) in Remix are
essential for fetching data that a route requires before
rendering. Each route can define a loader function, which is executed only on the
server side. This function is responsible for providing the necessary data to the
route during the initial server render and can also be invoked during client-side
navigations.

Let's take a look at the artist page for an example of how the loader function can
be used. The artist page needs to fetch the data for a particular artist
given an ID. We know that we can get the ID for that artist by using our URL, so
now all that's left is to call our ORDS handler and fetch the data. Here's an example
of how that would look like using the loader function:

```typescript
export const loader = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  const { id: artistID } = params;
  const artist = await ORDSFetcher(`${ARTIST_ENDPOINT}/${artistID}`, USER_CREDENTIALS) as ORDSResponse<Artist>;
  if (artist.items.length === 0) {
    const errorMessage = 'The Artist you were looking for does not exist, might have been removed or had its id changed.';
    throw new Response(errorMessage, {
      status: 404,
      statusText: 'Not Found',
    } as ErrorResponse);
  }
  return json({
    artist
  });
};
```

The loader function calls the ORDS handler and returns the artist object,
which can then be extracted in the client side and used for any component.

```typescript
const {
    artist
} = useLoaderData<typeof loader>();
```

The loader function can be mostly used to perform GET requests to our API and
is really helpful for read-only data.

## Action functions

In Remix, an action function(<https://remix.run/docs/en/main/route/action>) is
a server-side function that handles data mutations
and other actions when a non-GET request (e.g., POST, PUT, PATCH, DELETE) is made
to a route. The action function is called before the loader functions.

Given the nature of action functions in Remix, the sample app uses them a lot in
the admin feature. Let's take a look at how the action function is used to create
a new event:

```typescript
export const action = async ({ request }: ActionFunctionArgs) => {
  const {
    tokenType,
    accessToken,
  } = await auth.isAuthenticated(request, {
    failureRedirect: '/error',
  });
  const USER_JWT_AUTH = `${tokenType} ${accessToken}`;
  const body = await request.formData();
  let postResponse = null;
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
  return json({
    postResponse
  });
};
```

The action function will be used to create a POST request and call the ORDS handler
that handles the creation of new events. We also validate and sanitize the input
here to avoid unsafe user input.

## Resource Routes

Another type of route in Remix are the resource routes. Unlike the routes we described
before, these routes are not directly tied to the website's navigation pattern and
are often used to serve JSON data or perform operations like CRUD actions, which
can be consumed by other parts of the application.

Resource routes can be integrated with Remix's loader and action methods to handle
data fetching and mutations. These methods can be called directly from UI components
or other parts of the application, allowing for flexible data management.

An example of a resource route can be found in the  
`app/components/search/ArtistsSelector.tsx` file.

## Error Boundaries

Error Boundaries(<https://remix.run/docs/en/main/route/error-boundary>) are
Remix's solution to handling errors in the server-side.
An error boundary is a redirect mechanism that will automatically redirect
the user to an error page if any error happens when accessing a route. Remix
automatically includes a pre-made error boundary, but you are also allowed to
customize your own. The sample app has a custom implementation for the error
boundary, which looks something like this:

```typescript
export function ErrorBoundary() : ReactElement {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <ErrorComponent error={error} />
    );
  } if (error instanceof Error) {
    return (
      <div className="flex flex-col p-8">
        <h1 className="text-3xl font-semibold">Something went wrong...</h1>
        <pre>{error.message}</pre>
      </div>
    );
  }
  return <h1 className="text-3xl font-semibold">Unknown Error</h1>;
}
```

## Developing your own venues route

As part of setting up this guide, we wanted to leave an unfinished part
of the application so anyone can try setting up the venues route. Think
of it as an empty canvas and you are welcome to do whatever you desire.

Given the information described in our guide, we know for a fact that we
need three things for our route to work:

- A loader function to get the venues from our ORDS handler
- An error boundary to catch errors
- A custom React component to display a UI with our venues date

Here are the full steps towards creating your own venues route:

1. Create a file inside the `app/routes` folder called venues.tsx
2. Define your loader function. Below is a simple example on how to do this.

```typescript
export const loader = async ({
  request,
}: LoaderFunctionArgs) => {
  const userProfile = await auth.isAuthenticated(request);
  const USER_CREDENTIALS = userProfile === null
    ? BASIC_SCHEMA_AUTH
    : `${userProfile.tokenType} ${userProfile.accessToken}`;
  const session = await getSession(request.headers.get('Cookie'));
  const error = session.get(auth.sessionErrorKey) as LoaderError;
  const venues = await ORDSFetcher(`${VENUES_ENDPOINT}`, USER_CREDENTIALS) as ORDSResponse<Venue>;
  return json({
    venues,
    error,
  });
};
```

3. Define you error boundary to catch errors

```typescript
export function ErrorBoundary() : ReactElement {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <ErrorComponent error={error} />
    );
  } if (error instanceof Error) {
    return (
      <div className="flex flex-col p-8">
        <h1 className="text-3xl font-semibold">Something went wrong...</h1>
        <pre>{error.message}</pre>
      </div>
    );
  }
  return <h1 className="text-3xl font-semibold">Unknown Error</h1>;
}
```

4. Create a React component to display your venues data. You can use
whichever design you like. Here's a simple example.

```typescript
export default function Venues(): ReactElement {
  const {
    venues,
  } = useLoaderData<typeof loader>();
  return (
    <div>
      { venues.items.map((venue) => (
        <div key={venue.venue_id}>
          <h1>{ venue.name }</h1>
          <span>{ venue.location}</span>
        </div>
      ))}
    </div>
  );
}
```

Remember you are free to use any design you choose, but it is
necessary to define those three elements mentioned at the top.
