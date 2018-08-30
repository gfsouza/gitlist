import { FETCH_USER, FETCH_REPO } from './types.js';
import axios from 'axios';

const apiUrl = 'https://api.github.com/users/';

export default function userReducer(state = [], action) {
  switch (action.type) {
    case FETCH_REPO:
      return action.repo;
    case FETCH_USER:
      return action.user;
    default:
      return state;
  }
}

export function fetchUser(data) {
    return {
        type: FETCH_USER,
        payload: {
        user: data.user
        }
    }
};

export const apiUser = user => {
  return(dispatch) => {
    return axios.get(`apiUrl${user}`)
    .then(response => {
      dispatch(fetchUser(response.data))
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

export function fetchRepo(data) {
    return {
      type: FETCH_REPO,
      payload: {
        repo: data.name
      }
    }
};
  
  export const apiRepo = user => {
    return(dispatch) => {
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