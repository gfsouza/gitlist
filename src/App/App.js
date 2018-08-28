import React, { Component } from 'react';
import User from './../Users/User.js';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import LoadingSpinner from "../LoadingSpinner";

export default class App extends Component {

  state = {
    user: {},
    loading: false,
  };

  getUser() {
    const auth = `?access_token=52726f825d7badfcfc72f2f2f7b4e1819f3c898c`;
    const username = this.username.value
    const apiUrl = `https://api.github.com/users/${username}${auth}`;
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
      <div className="GitSearch container">
        <div className="col-md-8">
          <header className="Search-header">
            <h1>Github<br></br>User Search</h1>
          </header>

          <form onSubmit={e => this.handleSubmit(e)}>
            <input ref={(username) => { this.username = username }} type='text' placeholder='Username' />
            <IconButton className="search-icon" onClick={this.getUser}>
              <SearchIcon />
            </IconButton>
          </form>

        </div>
        {loading ? <LoadingSpinner /> : user.id != null ? <User user={user} /> : <span></span>}
      </div>
    )
  }
}
