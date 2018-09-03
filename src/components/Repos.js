import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Folder from '@material-ui/icons/Folder';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import OpenInNew from '@material-ui/icons/OpenInNew';
import { apiRepo } from '../actions/repo-actions';
import { connect } from 'react-redux';

class Repos extends Component {
  state = {
    open: true
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  }

  componentDidMount = () => {
    debugger;
    this.props.fetchRepo(this.props.user.login);
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.user.login !== prevProps.user.login)
      this.props.fetchRepo(this.props.user.login);
  };

  renderReposList = (repos, i) => {
    debugger;
    return (
    <div key={i} className="repo-listItems">
      <ListItem component="a" target="_blank" href={repos.html_url} button>
        <ListItemText style={{textAlign:'center', padding:'none'}} inset primary={repos.name} />
        <ListItemIcon>
          <OpenInNew />
        </ListItemIcon>
      </ListItem>
    </div>
    );
  }

  render() {
    debugger;
    return(
      <div className="list-root">
        <List component="nav" style={{width:'100%'}}>
          <ListItem button onClick={this.handleClick}>
            <ListItemIcon>
              <Folder />
            </ListItemIcon>
            <ListItemText style={{textAlign:'center'}} inset primary={`Public Repos (${this.props.user.public_repos})`} />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className="list-nested">
              {this.renderReposList()}
              </ListItem>
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

Repos.propTypes = {
  fetchRepo: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = (state, props) => {
  debugger
  return {
    repos: state.repos,
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  debugger
  return {
    fetchRepo: (user) => dispatch(apiRepo(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Repos);