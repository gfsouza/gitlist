import axios from 'axios';

export const FETCH_API = 'FETCH_API'

const username = this.username.value
const apiUrl = `https://api.github.com/users/${username}`;

export const fetchUsers = (username) => {
  return (
    type: FETCH_API,
    username
  )
};

export const fetchApi = () => {
  return(dispatch) => {
    return axios.get(apiUrl)
    .then(response => {
      dispatch(fetchUsers(response.data))
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
