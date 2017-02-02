export {
  REQUEST_CHARACTER,
  RECEIVE_CHARACTER_SUCCESS,
  RECEIVE_CHARACTER_ERROR,
  fetchCharacter
} from './character';

export {
  REQUEST_CHARACTER_LIST,
  RECEIVE_CHARACTER_LIST_SUCCESS,
  RECEIVE_CHARACTER_LIST_ERROR,
  fetchCharacterList
} from './characterList';

export {
  REQUEST_PLANET,
  RECEIVE_PLANET_SUCCESS,
  RECEIVE_PLANET_ERROR,
  fetchPlanet
} from './planet';

export {
  REQUEST_STARSHIP,
  RECEIVE_STARSHIP_SUCCESS,
  RECEIVE_STARSHIP_ERROR,
  fetchStarship
} from './starship';

export {
  REQUEST_VEHICLE,
  RECEIVE_VEHICLE_SUCCESS,
  RECEIVE_VEHICLE_ERROR,
  fetchVehicle
} from './vehicle';

export {
  ADD_FAVOURITE,
  REMOVE_FAVOURITE,
  TOGGLE_FAVOURITE,
  addFavourite,
  removeFavourite,
  toggleFavourite
} from './favourites';

import axios from 'axios';

export function fetchUrlArray(arr = []) {
  return new Promise(function (resolve, reject) {
    const promises = arr.map(axios);
    Promise.all(promises)
      .then((arr) => {
        return arr.map(({ data }) => data);
      })
      .then(resolve)
      .catch(reject);
  });
}