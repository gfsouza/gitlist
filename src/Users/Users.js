import React from 'react';
import Repos from './../Repos/Repos';

export const Users = props => {
  const { user } = props;
    return (
      <div className="results">
        <img src={user.avatar_url} alt="user avatar"/>
        <div className="userInfo"></div>
        <p>Username: {user.name}</p>
        <p>Followers: {user.followers}</p>
        <p>Following: {user.following}</p>
        <div className="repos">
          <p>Repositorios</p>
          <Repos user={user} />
        </div>
      </div>
    );
};

export default Users;
