import React, { Component } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';

export default class LoadingSpinner extends Component{
  timer = null;

  state = {
    completed: 0,
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  render(){
    return (
      <div>
          <CircularProgress
            variant="determinate"
            color="inherit"
            value={this.state.completed}
          />
      </div>
    );
  }
}
