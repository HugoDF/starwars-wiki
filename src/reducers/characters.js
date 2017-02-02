import {
  REQUEST_CHARACTER_LIST,
  RECEIVE_CHARACTER_LIST_SUCCESS,
  RECEIVE_CHARACTER_LIST_ERROR
} from '../actions';

const characters = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_CHARACTER_LIST:
      return {
        ...state,
        isLoading: true
      };
    case RECEIVE_CHARACTER_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        characterList: action.list
      };
    case RECEIVE_CHARACTER_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    default:
      return state
  }
};

export default characters;
