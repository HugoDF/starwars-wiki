# StarWars Wiki

Leverages [swapi.co](swapi.co).
Uses React, React Router and redux.
Tests are written using chai (expect), enzyme and sinon.

# Setup

This project was built using `create-react-app`.

Run `npm i` to install dependencies.

Use `npm start` to start the development server on [http://localhost:3000](http://localhost:3000).

`npm t` to run the tests.

## Implementation

- The homepage should include a list of characters (the first page of characters in the `/people/` response from the API is sufficient).
- Each character should then have their own profile page where you can see their bio and links to their home planet and starship pages.
- Linked planets and starships should also have a 'bio' page.
- Loading states should be taken into account.
- The data you choose to display on each screen is up to you.
- Handling errors with correct messages when/if the API call fails would be appreciated.
