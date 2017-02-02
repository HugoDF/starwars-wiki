import {
  ADD_FAVOURITE,
  REMOVE_FAVOURITE
} from '../actions';

const favourites = (state = [], action) => {
  switch (action.type) {
    case ADD_FAVOURITE:
      if (state.map(({ url }) => url).includes(action.favourite.url)) {
        return state;
      }
      return [
        action.favourite,
        ...state,
      ];
    case REMOVE_FAVOURITE:
      return state.filter(({ url }) => url !== action.url);
    default:
      return state;
  }
}

export default favourites;