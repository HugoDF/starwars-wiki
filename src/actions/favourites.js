export const ADD_FAVOURITE = 'ADD_FAVOURITE';
export const REMOVE_FAVOURITE = 'REMOVE_FAVOURITE';
export const TOGGLE_FAVOURITE = 'TOGGLE_FAVOURITE';

export function addFavourite(favourite) {
  return {
    type: ADD_FAVOURITE,
    favourite
  };
}

export function removeFavourite(url) {
  return {
    type: REMOVE_FAVOURITE,
    url
  };
}

export function toggleFavourite(url, favourite) {
  return {
    type: TOGGLE_FAVOURITE,
    url,
    favourite
  };
}