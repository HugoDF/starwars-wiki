import {
  REQUEST_VEHICLE,
  RECEIVE_VEHICLE_SUCCESS,
  RECEIVE_VEHICLE_ERROR
} from '../actions';

const vehicle = (state = {}, action) => {
  switch(action.type) {
    case REQUEST_VEHICLE:
      return {
        ...state,
        isLoading: true,
        url: action.url
      };
    case RECEIVE_VEHICLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ...action.vehicle
      };
    case RECEIVE_VEHICLE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    default:
      return state;
  }
}

export default vehicle;