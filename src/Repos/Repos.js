import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Folder from '@material-ui/icons/Folder';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import { withStyles } from '@material-ui/core/styles';
import OpenInNew from '@material-ui/icons/OpenInNew';

const styles = theme => ({
  root: {
    maxWidth: 310,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    margin: '0 auto',
  },
  nested: {
    maxWidth: '100%',
    paddingLeft: theme.spacing.unit * 4,
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 275,
    overflow: 'auto',
  },
});

class Repos extends Component {
  state = {
    repos: [],
    open: true,
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  }

  getUserRepos() {
    const auth = `?access_token=ac2d45eaef2c034a75a4b6745fc977753633d980`;
    const apiUrl = `https://api.github.com/users/${this.props.user.login}/repos${auth}`;
    axios.get(apiUrl)
      .then(response => {
        this.setState({
          repos: response.data
        });
      })
      .catch(function(error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  }

  componentDidMount = () => {
    this.getUserRepos();
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.user.login !== prevProps.user.login)
      this.getUserRepos();
  };

  renderReposList(repository, i) {
    return <div key={repository.id} className="repo-listItems">
      <List>
        <ListItem component="a" target="_blank" href={repository.html_url} button>
          {repository.name }
          <ListItemIcon>
            <OpenInNew />
          </ListItemIcon>
        </ListItem>
      </List>
    </div>
  }

  render() {
    const { classes } = this.props;

    return(
      <div className={classes.root}>
        <List component="nav" style={{width:'100%'}}>
          <ListItem button onClick={this.handleClick}>
            <ListItemIcon>
              <Folder />
            </ListItemIcon>
            <ListItemText inset primary={`Repositories (${this.props.user.public_repos})`} />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              {this.state.repos.map(this.renderReposList)}
            </ListItem>
          </List>
        </Collapse>
      </List>
      </div>
    );
  }
}

Repos.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Repos);
