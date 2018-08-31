import { FETCH_USER, FETCH_REPO } from './types';
import axios from 'axios';

const apiUrl = 'https://api.github.com/users/';

export function fetchUser(user) {
    return {
        type: FETCH_USER,
        user: user
    }
};

export const apiUser = user => {
  return (dispatch) => {
    return axios.get(`${apiUrl}${user}`)
    .then(response => {
      dispatch(fetchUser(response.data));
    })
    .catch(function(error) {
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

export function fetchRepo(user) {
    return {
      type: FETCH_REPO,
      repo: user.name
    }
};

  export const apiRepo = user => {
    return (dispatch) => {
      return axios.get(`${apiUrl}${user}/repos`)
      .then(response => {
        dispatch(fetchRepo(response.data))
      })
      .catch(function(error) {
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
