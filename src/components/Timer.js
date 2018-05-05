import React, { Component } from 'react';

class Timer extends Component {
  constructor(props){
    super(props);
    const audioSrc = '/assets/sounds/250629__kwahmah-02__alarm1.mp3';

    this.state = {
      started: false,
      onBreak: false,
      label: 'Start',
      durationType: 'Work',
      duration: 1500
    }

    this.audioElement = document.createElement('audio');
    this.audioElement.src = audioSrc;
  }

  tick() {
    this.setState(prevState => ({
      duration: prevState.duration - 1
    }));

    if(this.state.duration <= 0){
      this.audioElement.play();
      clearInterval(this.interval);

      if(this.state.onBreak){
        this.setState({
          onBreak: false,
          duration: 1500,
          label: 'Start',
          durationType: 'Work',
          started: false
        });
      }else{
        this.setState({
          onBreak: true,
          duration: 300,
          label: 'Start',
          durationType: 'Break',
          started: false
        });
      }
    }
  }

  timeTrigger() {
    if(this.state.started && !this.state.onBreak){
      this.setState({
        label: 'Start',
        started: false,
        duration: 1500,
      });

      clearInterval(this.interval);
      return;
    }else if (this.state.started && this.state.onBreak) {
      this.setState({
        label: 'Start',
        started: false,
        duration: 300
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
        <h1>{this.state.durationType}</h1>
        <h2>{ this.formatTime(this.state.duration) } </h2>
        <button onClick={ () => this.timeTrigger() }>{this.state.label}</button>
      </div>
    );
  }
}

export default Timer;
