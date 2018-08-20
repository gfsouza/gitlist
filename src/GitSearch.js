import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

export default class GitSearch extends Component {
       constructor(props){
         super(props);
          this.state = {
           username: '',
           userrepo: '',
          };
       }

       getUser(username) {
          return fetch(`https://api.github.com/users/${username}`)
          .then(response => response.json())
          .then(response => {
            return response;
           })
      }

       async handleSubmit(e) {
           e.preventDefault();
           let user = await this.getUser(this.refs.username.value);
           this.setState({ avatar_url: user.avatar_url,
           username: user.login,
           followers: user.followers,
           following: user.following,
           url: user.url,
       });

  }

     render() {
       let user;
       if(this.state.username) {
          user =
          <div className="results">
            <img src={this.state.avatar_url} alt="user avatar"/>
            <p className="userInfo">Username: {this.state.username}</p>
            <p className="followerInfo">{this.state.followers} Followers</p>
            <p className="followingInfo">Following {this.state.following} users</p>
          </div>
      }

           return (
              <div className="GitSearch">
                <header className="Search-header">
                  <h1>Github<br></br>User Search </h1>
                </header>
                <form onSubmit={e => this.handleSubmit(e)}>
                   <input ref='username' type='text' placeholder='Username' />
                   <button submit='username'>Search</button>
               </form>
               <div className="Search-body">{user}</div>
             </div>
           );
    }
}


ReactDOM.render(<GitSearch />, document.getElementById('root'));
