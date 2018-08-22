import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';

export default class GitSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      repos: null,
    };
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
    e.preventDefault()

    const { value } = this.refs.username
    let user = this.getUser(value);
    let repos = this.getUserRepos(value);

    this.setState({user, repos})
  }

  displayUser(user) {
    return (
      <div className="results">
        <img src={user.avatar_url} alt="user avatar"/>
        <div className="userInfo">
          <p>Username: {user.name}</p>
          <p>Followers: {user.followers}</p>
          <p>Following: {user.following}</p>
          <div className="repos">
            <p>Repositories</p>
            <div className="repoList">
              {this.state.repos && this.displayUserRepos(this.state.repos)}
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="GitSearch container">
        <div className="col-md-8">
          <header className="Search-header">
            <h1>Github<br></br>User Search</h1>
          </header>

          <form onSubmit={e => this.handleSubmit(e)}>
            <input ref='username' type='text' placeholder='Username'/>
            <button submit='username'>Search</button>
          </form>

          <div className="Search-body">
            {this.state.user && this.displayUser(this.state.user)}
          </div>
        </div>
      </div>
    )
  }

}

ReactDOM.render(<GitSearch />, document.getElementById('root'));
