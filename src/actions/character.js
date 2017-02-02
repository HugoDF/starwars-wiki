import axios from 'axios';
import { fetchUrlArray } from './';

export const REQUEST_CHARACTER = 'REQUEST_CHARACTER';
export const RECEIVE_CHARACTER_SUCCESS = 'REQUEST_CHARACTER_SUCCESS';
export const RECEIVE_CHARACTER_ERROR = 'REQUEST_CHARACTER_ERROR';

export function requestCharacter(url) {
  return {
    type: REQUEST_CHARACTER,
    url
  };
}

export function receiveCharacterSuccess(character) {
  return {
    type: RECEIVE_CHARACTER_SUCCESS,
    character
  };
}

export function receiveCharacterError(error) {
  return {
    type: RECEIVE_CHARACTER_SUCCESS,
    error
  };
}

export function expandFields({ homeworld, species, starships, vehicles, ...rest }) {
  const promises = [ axios(homeworld), fetchUrlArray(species), fetchUrlArray(starships), fetchUrlArray(vehicles) ];
  return Promise.all(promises)
    .then(([ { data: homeworld }, species, starships, vehicles ]) => {
      return {
        ...rest,
        homeworld,
        species,
        starships,
        vehicles
      };
    });
}

export function fetchCharacter(url) {
  return (dispatch) => {
    dispatch(requestCharacter(url));
    axios(url)
      .then(({ data }) => {
        return expandFields(data);
      })
      .then( (character) => {
        dispatch(receiveCharacterSuccess(character));
      })
      .catch((err) => {
        dispatch(receiveCharacterError(err));
      });
  }
}