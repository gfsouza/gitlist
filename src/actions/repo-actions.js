import { FETCH_REPO_SUCCESS, FETCH_REPO_ERROR } from './types';
import axios from 'axios';
import { apiUrl } from './../components/apiUrl';

export function receiveRepos(repos) {
  return {
    type: FETCH_REPO_SUCCESS,
    repos: repos
  }
};

export function missingRepos(message) {
  return {
    type: FETCH_REPO_ERROR,
    message: message || 'Something went wrong, please try again.'
  }
};

export function apiRepo(user) {
  return dispatch => {
    return axios.get(`${apiUrl}${user}/repos`)
      .then(
        response => {
          dispatch(receiveRepos(response.data));
        },
        error => {
          dispatch(missingRepos(error.response.data.message));
        }
      );
  };
};
