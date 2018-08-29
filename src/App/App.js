import "./App.css";
import React, { Component } from 'react';
import User from './../Users/User.js';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import LoadingSpinner from "../LoadingSpinner";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

export default class App extends Component {

  state = {
    user: {},
    loading: false,
  };

  getUser() {
    // const auth = `?access_token=GITHUB_TOKEN`;
    const username = this.username.value
    const apiUrl = `https://api.github.com/users/${username}`;
    this.setState({ loading: true });
    setTimeout(() => {

      axios.get(apiUrl)
        .then(response => {
          this.setState({
            loading: false,
            user: response.data
          });
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
    }, 500);
  };

  handleSubmit(e) {
    e.preventDefault()
    let user = this.getUser(this.username);
    this.setState({ user })
  }

  render() {
    const { user, loading } = this.state;
    return (
      <div className="container">
        <Typography className="App-title" gutterBottom variant="display3" align="center">
          GitHub
        </Typography>
        <Typography className="App-title" gutterBottom variant="display1" align="center">
          User Search
        </Typography>

        <form onSubmit={e => this.handleSubmit(e)}>
          <TextField
            id="name"
            label="Search Username"
            className="nameInput"
            type="search"
            inputRef={ (username) => { this.username = username } }
            margin="normal"
            />
          <IconButton className="search-icon" onClick={this.getUser}>
            <SearchIcon />
          </IconButton>
        </form>
        {loading ? <LoadingSpinner /> : user.id != null ? <User user={user} /> : <span></span>}
      </div>
    )
  }
}
