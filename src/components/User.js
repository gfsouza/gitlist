import React from 'react';
import Repos from './Repos';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

export const User = props => {
  const { user } = props;
  return (
    <div className="userInfo">
      <Card className="userCard">
        <CardMedia className="userAvatar" image={user.avatar_url} title="User Avatar" />
        <CardContent>
          <Typography gutterBottom variant="title" align="center">
            {user.name}
          </Typography>
          <div className="userSubheading">
            <Typography gutterBottom variant="subheading" >
              Followers: {user.followers}
            </Typography>
            <Typography gutterBottom variant="subheading" >
              Following: {user.following}
            </Typography>
          </div>
        </CardContent>
        <Repos user={user} />
      </Card>
    </div>
  )
}

export default User;
