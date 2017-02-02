import axios from 'axios';

import { fetchUrlArray } from './';

export const REQUEST_STARSHIP = 'REQUEST_STARSHIP';
export const RECEIVE_STARSHIP_SUCCESS = 'RECEIVE_STARSHIP_SUCCESS';
export const RECEIVE_STARSHIP_ERROR = 'RECEIVE_STARSHIP_ERROR';

export function requestStarship(url) {
  return {
    type: REQUEST_STARSHIP,
    url
  };
}

export function receiveStarshipSuccess(starship) {
  return {
    type: RECEIVE_STARSHIP_SUCCESS,
    starship
  };
}

export function receiveStarshipError(error) {
  return {
    type: RECEIVE_STARSHIP_ERROR,
    error
  };
}

export function expandFields({ pilots, ...rest}) {
  const promises = [ fetchUrlArray(pilots) ];
  return Promise.all(promises)
    .then(([ pilots ]) => {
      return {
        ...rest,
        pilots
      };
    });
}

export function fetchStarship(url) {
  return (dispatch) => {
    dispatch(requestStarship(url));
    axios(url)
      .then(({ data }) => {
        return expandFields(data);
      })
      .then( (starship) => {
        dispatch(receiveStarshipSuccess(starship));
      })
      .catch((err) => {
        dispatch(receiveStarshipError(err));
      })
  }
}