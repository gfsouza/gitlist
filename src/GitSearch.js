import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';

export default class GitSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userlist: null,
      username: null,
    };
  }

  componentDidMount() {
    axios.get('https://api.github.com/users')
      .then(response => {
        this.setState({
          userlist: response.data
        })
      })
      .catch(error => {
        console.log(error);
      });
  }

  getUser(username) {
    axios.get(`https://api.github.com/users/${username}`)
      .then(response => {
        this.setState({
          user: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.getUser(this.refs.username.value);
  }

  displayUser() {
    if (this.state.user) {
      return <div className="results">
        <img src={this.state.user.avatar_url} alt="user avatar" />
        <p className="userInfo">Username: {this.state.user.username}</p>
        <p className="followerInfo">{this.state.user.followers} Followers</p>
        <p className="followingInfo">Following {this.state.user.following} users</p>
      </div>
    }
  }

  displayList() {
    if (this.state.userlist) {
      return this.state.userlist.map(this.renderUserListRow)
    }
  }

  renderUserListRow(userListRow, i) {
    return <div className="resultlist">
      <img src={userListRow.avatar_url} alt="avatar" />
    </div>
  }

  render() {
    return (
      <div className="GitSearch container">
        <header className="Search-header">
          <h1>Github<br></br>User Search </h1>
        </header>

        <div className="row">{this.displayList()}</div>

        <form onSubmit={e => this.handleSubmit(e)}>
          <input ref='username' type='text' placeholder='Username' />
          <button submit='username'>Search</button>
        </form>
        <div className="Search-body">{this.displayUser()}</div>
      </div>
    );
  }
}

ReactDOM.render(<GitSearch />, document.getElementById('root'));
