import {
  REQUEST_STARSHIP,
  RECEIVE_STARSHIP_SUCCESS,
  RECEIVE_STARSHIP_ERROR
} from '../actions';

const starship = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_STARSHIP:
      return {
        ...state,
        isLoading: true,
        url: action.url
      };
    case RECEIVE_STARSHIP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ...action.starship
      };
    case RECEIVE_STARSHIP_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    default:
      return state
  }
};

export default starship;