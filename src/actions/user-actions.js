import { FETCH_USER_SUCCESS, FETCH_USER_REQUEST, FETCH_USER_ERROR } from './types';
import axios from 'axios';
import { apiUrl } from './../components/apiUrl';

function receiveUser(user) {
  return {
    type: FETCH_USER_SUCCESS,
    user: user
  }
}

function requestUser(user) {
  return {
    type: FETCH_USER_REQUEST,
    user
  }
}

export function missingUser(message) {
  return {
    type: FETCH_USER_ERROR,
    message: message || 'Something went wrong, please try again.'
  }
}

export function apiUser(user) {
  return dispatch => {
    dispatch(requestUser(user))
    return axios.get(`${apiUrl}${user}`)
      .then(
        response => {
          dispatch(receiveUser(response.data));
        },
        error => {
          dispatch(missingUser(error.response.data.message));
        }
      );
  };
};