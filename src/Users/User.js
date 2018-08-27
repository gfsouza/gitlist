import React from 'react';
import Repos from './../Repos/Repos';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

export const User = props => {
  const {user} = props;
  return (
    <div className="userInfo">
      <Card className={user.card} style={{padding: 5}}>
          <CardMedia
            style={{height: 0, paddingTop: '50.25%', backgroundSize: 'contain', }}
            image={user.avatar_url}
            title="User Avatar"
          />
        <CardContent>
          <Typography
            gutterBottom variant="title" align="center">
            Username: {user.name}
          </Typography>
          <div style={{display:"flex", justifyContent:"space-evenly"}}>
            <Typography gutterBottom variant="subheading" >
              Followers: { user.followers }
            </Typography>
            <Typography gutterBottom variant="subheading" >
              Following: { user.following }
            </Typography>
            <Typography gutterBottom variant="subheading" >
              Public Repos: { user.public_repos }
            </Typography>
          </div>
        </CardContent>
        <Repos user={user}/>
      </Card>
    </div>
  )
}

export default User;
