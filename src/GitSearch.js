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

getUserRepos(username) {
    axios.get(`https://api.github.com/users/${username}/repos`)
    .then(response => {
       this.setState({
         repos: response.data
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

  displayUserRepos(repos) {
    return repos.map(repository => {
      return <div key={repository.id} className="repoResults">
        <p> {repository.name} </p>
      </div>
    })
  }

  displayUser(user) {
    return (
      <div className="results">
        <p className="userInfo">{user.name}</p>
        <img src={user.avatar_url} alt="user avatar"/>
        <p className="followerInfo">Followers: {user.followers}</p>
        <p className="followingInfo">Following: {user.following}</p>
      </div>
    )
  }

  render() {
    const {user, repos} = this.state

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
            {user && this.displayUser(user)}
            {repos && this.displayUserRepos(repos)}
          </div>
        </div>
      </div>
    )
  }

}

ReactDOM.render(<GitSearch />, document.getElementById('root'));
