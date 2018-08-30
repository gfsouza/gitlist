import "./App.css";
import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
// import LoadingSpinner from "../LoadingSpinner";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { fetchUser, fetchRepo } from './../actions/actions.js';
import { bindActionCreators } from 'redux';

class App extends Component {
  constructor(props) {
    super(props);

    this.onFetchUser = this.onFetchUser.bind(this);
  }

  onFetchUser(e) {
    this.props.onFetchUser(e.target.value);
  }

  render() {
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
            label="Search Username"
            className="nameInput"
            type="search"
            margin="normal"
            />
          <IconButton className="search-icon" onClick={this.onFetchUser}>
            <SearchIcon />
          </IconButton>
        </form>
        {/* {loading ? <LoadingSpinner /> : user.id != null ? <User user={user} /> : <span></span>} */}
      </div>
    )
  }
}

const mapActionsToProps = (dispatch, props) => {
  return bindActionCreators({
  onFetchUser: fetchUser,
  onFetchRepo: fetchRepo
  }, dispatch)
};

const mapStateToProps = (state, props) => {
  return {
    user: state.user,
    repo: state.repo,
  }
};

export default connect(mapStateToProps, mapActionsToProps)(App);
