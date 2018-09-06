import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { apiUser } from '../actions/user-actions';
import User from './User';
import LoadingSpinner from './LoadingSpinner';
import { FetchError } from './fetchError';

class App extends Component {

  constructor(props) {
    super(props);
    this.onFetchUser = this.onFetchUser.bind(this);
  }

  onFetchUser(e) {
    e.preventDefault();
    this.props.onFetchUser(e.target.name.value);
  }

  render() {
    const { loading, user, message } = this.props;
    if (message && !user) {
      return (
        <FetchError message={message} />
      );
    }
    return (
      <div className="container">
        <Typography className="App-title" gutterBottom variant="display3" align="center">
          GitHub
        </Typography>
        <Typography className="App-title" gutterBottom variant="display1" align="center">
          User Search
        </Typography>

        <form onSubmit={this.onFetchUser}>
          <TextField
            id="name"
            name="name"
            label="Search Username"
            className="nameInput"
            type="search"
            margin="normal"
          />
          <IconButton className="search-icon" onClick={this.onFetchUser}>
            <SearchIcon />
          </IconButton>
        </form>
        {loading ? <LoadingSpinner /> : user != null ? <User user={user} /> : <span></span>}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUser: (user) => dispatch(apiUser(user))
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    loading: state.userReducer.loading,
    message: state.userReducer.message
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
