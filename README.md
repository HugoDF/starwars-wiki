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

- The homepage includes a list of characters (the first page of characters in the `/people/` response from the API).
- Each character has their own profile page where you can see their bio and links to their home planet and starship pages.
- Linked planets and starships also have a 'bio' page.
- Loading states are taken into account.
- Errors are handled with correct messages when the API call fails.
- Thoroughly tested using chai, enzyme and sinon.
