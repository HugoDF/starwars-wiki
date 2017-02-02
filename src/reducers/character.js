import {
  REQUEST_CHARACTER,
  RECEIVE_CHARACTER_SUCCESS,
  RECEIVE_CHARACTER_ERROR
} from '../actions';

const character = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_CHARACTER:
      return {
        ...state,
        isLoading: true,
        url: action.url
      };
    case RECEIVE_CHARACTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ...action.character
      };
    case RECEIVE_CHARACTER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    default:
      return state
  }
};

export default character;
