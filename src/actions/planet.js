import axios from 'axios';
import { fetchUrlArray } from './';

export const REQUEST_PLANET = 'REQUEST_PLANET';
export const RECEIVE_PLANET_SUCCESS = 'RECEIVE_PLANET_SUCCESS';
export const RECEIVE_PLANET_ERROR = 'RECEIVE_PLANET_ERROR';

export function requestPlanet(url) {
  return {
    type: REQUEST_PLANET,
    url
  };
}

export function receivePlanetSuccess(planet) {
  return {
    type: RECEIVE_PLANET_SUCCESS,
    planet
  };
}

export function receivePlanetError(error) {
  return {
    type: RECEIVE_PLANET_ERROR,
    error
  };
}

export function expandFields({ residents, ...rest }) {
  const promises = [ fetchUrlArray(residents) ];
  return Promise.all(promises)
    .then(([ residents ]) => {
      return {
        ...rest,
        residents
      };
    });
}

export function fetchPlanet(url) {
  return (dispatch) => {
    dispatch(requestPlanet(url));
    axios(url)
      .then(({ data }) => {
        return expandFields(data);
      })
      .then((planet) => {
        dispatch(receivePlanetSuccess(planet));
      })
      .catch( (err) => {
        dispatch(receivePlanetError(err));
      });
  }
}