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
import { withStyles } from '@material-ui/core/styles';
import { apiRepo } from '../actions/repo-actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const styles = theme => ({
  root: {
    maxWidth: '93vw',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    margin: '0 auto',
  },
  nested: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 275,
    overflow: 'auto',
    margin: '0 auto',
  },
});

class Repos extends Component {
  state = {
    open: true
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  }

  componentDidMount = () => {
    this.onFetchRepo();
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.user.login !== prevProps.user.login)
      this.onFetchRepo();
  };

  render() {
    const { classes } = this.props;
    
    return(
      <div className={classes.root}>
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
              <ListItem button className={classes.nested}>
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
  classes: PropTypes.object.isRequired,
};

const mapActionsToProps = (dispatch, props) => {
  return bindActionCreators({
  onFetchRepo: apiRepo,
  }, dispatch)
};

const mapStateToProps = (state, props) => {
  return {
    repo: state.repo,
  }
};

export const RepoConnect = connect(mapStateToProps, mapActionsToProps)(Repos);

export default withStyles(styles)(Repos);