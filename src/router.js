import React from 'react';
import {
  Router,
  IndexRoute,
  Route,
  hashHistory as history
} from 'react-router';

import App from './components/App';
import Home from './components/Home';
import Favourites from './components/Favourites';
import Character from './components/Character';
import Planet from './components/Planet';
import Starship from './components/Starship';
import Vehicle from './components/Vehicle';

export default (
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/character" component={Character} />
      <Route path="/planet" component={Planet} />
      <Route path="/starship" component={Starship} />
      <Route path="/vehicle" component={Vehicle} />
      <Route path="/favourites" component={Favourites} />
    </Route>
  </Router>
);
