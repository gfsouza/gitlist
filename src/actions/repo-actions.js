import { FETCH_REPO } from './types';
import axios from 'axios';
import { apiUrl } from './../components/apiUrl';

export function fetchRepo(repos) {
  return {
    type: FETCH_REPO,
    repos: repos
  }
};

export const apiRepo = user => {
  return (dispatch) => {
    return axios.get(`${apiUrl}${user}/repos`)
      .then(response => {
        dispatch(fetchRepo(response.data));
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  };
};
