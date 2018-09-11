import React, { PureComponent } from 'react';
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

class Repos extends PureComponent {

  state = {
    open: true,
    repos: null
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  }

  componentDidMount = () => {
    this.props.receiveRepos(this.props.user.login);
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.user.login !== prevProps.user.login)
      this.props.receiveRepos(this.props.user.login);
  };

  renderReposList = (repos, i) => {
    return (
      <div key={i} className="repo-listItems">
        <ListItem component="a" target="_blank" href={repos.html_url} button>
          <ListItemText className="repo-listText" inset primary={repos.name} />
          <ListItemIcon>
            <OpenInNew />
          </ListItemIcon>
        </ListItem>
      </div>
    );
  }

  render() {
    return (
      <div className="list-root">
        <List component="nav">
          <ListItem button onClick={this.handleClick}>
            <ListItemIcon>
              <Folder />
            </ListItemIcon>
            <ListItemText className="repo-listItems" inset primary={`Public Repos (${this.props.user.public_repos})`} />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className="list-nested">
                {this.props.repos.map(this.renderReposList)}
              </ListItem>
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

Repos.propTypes = {
  receiveRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
};

Repos.defaultProps = {
  repos: []
};

const mapDispatchToProps = (dispatch) => {
  return {
    receiveRepos: (user) => dispatch(apiRepo(user))
  };
};

const mapStateToProps = (state) => {
  return {
    repos: state.repoReducer.repos,
    user: state.userReducer.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Repos);
