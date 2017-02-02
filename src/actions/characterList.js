import axios from 'axios';
import { BASE_URL } from './constants';

export const REQUEST_CHARACTER_LIST = 'REQUEST_CHARACTER_LIST';
export const RECEIVE_CHARACTER_LIST_SUCCESS = 'RECEIVE_CHARACTER_LIST_SUCESS';
export const RECEIVE_CHARACTER_LIST_ERROR = 'RECEIVE_CHARACTER_LIST_ERROR';

export function requestCharacterList() {
  return {
    type: REQUEST_CHARACTER_LIST
  };
}

export function receiveCharacterListSuccess(list) {
  return {
    type: RECEIVE_CHARACTER_LIST_SUCCESS,
    list
  };
}

export function receiveCharacterListError(error) {
  return {
    type: RECEIVE_CHARACTER_LIST_ERROR,
    error
  };
}

export function fetchCharacterList() {
  return (dispatch) => {
    dispatch(requestCharacterList());
    axios(BASE_URL + '/people')
      .then(({ data }) => {
        const { results } = data;
        dispatch(receiveCharacterListSuccess(results));
      })
      .catch((err) => {
        dispatch(receiveCharacterListError(err));
      });
  }
}