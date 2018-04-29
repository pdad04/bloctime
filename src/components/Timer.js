import React, { Component } from 'react';

class Timer extends Component {
  constructor(props){
    super(props);

    this.state = {
      started: false,
      label: 'Start',
      work: 1500,
      rest: 300,
      longRest: 1800
    }
  }

  tick() {
    this.setState(prevState => ({
      work: prevState.work - 1
    }));

    if(this.state.work <= 0){
      clearInterval(this.interval);
    }
  }

  timeTrigger() {
    if(this.state.started){
      this.setState({
        label: 'Start',
        started: false,
        work: 1500,
      });
      clearInterval(this.interval);
      return;
    }

    this.setState({
      label: 'Reset',
      started: true
    });
    this.interval = setInterval( () => this.tick(), 1000 );
  }

  formatTime(time) {
    if(isNaN(time)) {return "0:00"}

    const date = new Date(time * 1000);
    let m = date.getUTCMinutes();
    const ss = date.getSeconds();

    if(m < 10){
      m = "0" + m;
    }

    if(ss < 10) {
      return m + ":0" + ss;
    }else {
      return m + ":" + ss;
    }
  }

  render() {
    return (
      <div>
        <h1>{ this.formatTime(this.state.work) } </h1>
        <button onClick={ () => this.timeTrigger() }>{this.state.label}</button>
      </div>
    );
  }
}

export default Timer;
