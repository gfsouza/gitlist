import React, { Component } from 'react';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import View_List from '@material-ui/icons/View_List'

export default class Repositories extends Component {
  state = {
    repos: null,
  };

  getUserRepos(username) {
      const apiUrl = `https://api.github.com/users/${username}/repos`;
      axios.get(apiUrl)
      .then(response => {
         this.setState({
           repos: response.data
       });
     })
     .catch(error => {
          console.log(error);
     });
  }

  render() {
    const listItems = this.state.repos.map(repository => {
      <List key={repository.id}>
        <ListItem component="a" target="_blank" href={repository.html_url} button>
          <ListItemIcon>
            <View_List />
          <ListItemIcon/>
          {repository.name}
        </ListItem>
      </List>
    })
    return <div>{listItems}</div>;
  }
}
