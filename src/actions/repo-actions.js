import { FETCH_REPO } from './types';
import axios from 'axios';
import RepoConnect from './../components/Repos';

const apiUrl = 'https://api.github.com/users/';

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

  export const renderReposList = (repository, i) => {
    return <div key={repository.id} className="repo-listItems">
      <ListItem component="a" target="_blank" href={repository.html_url} button>
        <ListItemText style={{textAlign:'center', padding:'none'}} inset primary={repository.name} />
        <ListItemIcon>
          <OpenInNew />
        </ListItemIcon>
      </ListItem>
    </div>
  };