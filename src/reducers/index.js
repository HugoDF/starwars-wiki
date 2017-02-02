import { combineReducers } from 'redux';

import characters from './characters';
import character from './character';
import planet from './planet';
import starship from './starship';
import vehicle from './vehicle';
import favourites from './favourites';

const rootReducer = combineReducers({
  characters,
  character,
  planet,
  starship,
  vehicle,
  favourites
});

export default rootReducer;
