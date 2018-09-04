import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { apiUser } from '../actions/user-actions';
import { bindActionCreators } from 'redux';
import User from './User';

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
    const userComponent = this.props.user ? <User user={this.props.user} /> : null;
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
        {userComponent}
      </div>
    )
  }
}

const mapActionsToProps = (dispatch, props) => {
  return bindActionCreators({
    onFetchUser: apiUser,
  }, dispatch)
};

const mapStateToProps = (state, props) => {
  return {
    user: state.userReducer.user,
  }
};

export default connect(mapStateToProps, mapActionsToProps)(App);