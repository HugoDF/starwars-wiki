import axios from 'axios';
import { fetchUrlArray } from './';

export const REQUEST_VEHICLE = 'REQUEST_VEHICLE';
export const RECEIVE_VEHICLE_SUCCESS = 'RECEIVE_VEHICLE_SUCCESS';
export const RECEIVE_VEHICLE_ERROR = 'RECEIVE_VEHICLE_ERROR';

export function requestVehicle(url) {
  return {
    type: REQUEST_VEHICLE,
    url
  };
}

export function receiveVehicleSuccess(vehicle) {
  return {
    type: RECEIVE_VEHICLE_SUCCESS,
    vehicle
  };
}

export function receiveVehicleError(error) {
  return {
    type: RECEIVE_VEHICLE_ERROR,
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

export function fetchVehicle(url) {
  return (dispatch) => {
    dispatch(requestVehicle(url));
    axios(url)
      .then(({ data }) => {
        return expandFields(data);
      })
      .then((vehicle) => {
        dispatch(receiveVehicleSuccess(vehicle));
      })
      .catch( (err) => {
        dispatch(receiveVehicleError(err));
      });
  }
}