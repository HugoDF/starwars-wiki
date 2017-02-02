import {
  REQUEST_PLANET,
  RECEIVE_PLANET_SUCCESS,
  RECEIVE_PLANET_ERROR
} from '../actions';

const planet = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_PLANET:
      return {
        ...state,
        isLoading: true,
        url: action.url
      };
    case RECEIVE_PLANET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ...action.planet
      };
    case RECEIVE_PLANET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    default:
      return state
  }
};

export default planet;