import React, { Component } from 'react';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ViewList from '@material-ui/icons/ViewList'

export default class Repos extends Component {
  state = {
    repos: [],
  };

  getUserRepos = (username) => {
      const apiUrl = `https://api.github.com/users/${username}/repos`;
      axios.get(apiUrl)
      .then(response => {
         this.setState({
           repos: response.data
       });
       console.log(response.data);
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
  }

  componentDidMount = () => {
    this.getUserRepos();
  };

  render() {
    const listItems = this.state.repos.map(repository => (
      <List key={repository.id}>
        <ListItem component="a" target="_blank" href={repository.html_url} button>
          <ListItemIcon>
            <ViewList />
          </ListItemIcon>
          {repository.name}
        </ListItem>
      </List>
    ));
    return <div>{listItems}</div>;
  }
}
