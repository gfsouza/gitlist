import React from 'react';
import Repos from './../Repos/Repos';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

export const User = props => {
  const {user} = props;
  return (
    <div>
      <Card className={user.card}>
          <CardMedia
            style={{height: 0, paddingTop: '50.25%', backgroundSize: 'contain', }}
            image={user.avatar_url}
            title="User Avatar"
          />
        <CardContent>
          <Typography
            gutterBottom variant="headline" align="center">
            Username: {user.name}
          </Typography>
          <div style={{display:"flex", justifyContent:"space-evenly"}}>
            <Typography
              gutterBottom variant="headline" flexalign="center">
              Followers: { user.followers }   Following: { user.following }
            </Typography>
          </div>
        </CardContent>
      </Card>
      <Repos user={user}/>
    </div>
  )
}

export default User;
