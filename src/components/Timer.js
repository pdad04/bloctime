import React, { Component } from 'react';
import {Button,Col, Row} from 'react-materialize';
import './css/Timer.css';

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
      <div id="content">
        <div id="timer">
          <Row>
            <Col l={12} s={12}>
              <h1 id="durationType">{this.state.durationType}</h1>
              <h2 id="duration">{ this.formatTime(this.state.duration) } </h2>
            </Col>
          </Row>
        </div>
        <div id="buttons">
            <Button waves="light" className="green" id="start" onClick={ () => this.timeTrigger() }>{this.state.label}</Button>
        </div>
        <div id="about">
          <h2><em>The Pomodoro Technique</em></h2>
          <p>
            The Pomodoro Tecnique is a time management method. In a nutshell the technique works by breaking down work into twenty-five minute intervals,
            seperated by short breaks. For a detailed explanation take a look the
            <a href="https://caps.ucsd.edu/Downloads/tx_forms/koch/pomodoro_handouts/ThePomodoroTechnique_v1-3.pdf" target="_blank"> <b>official document</b></a>
          </p>
          <h5>The basic principles are as follows</h5>
          <ul id="basic-principles">
            <li>Decide on the task to be done</li>
            <li>Start the twenty-five minute timer</li>
            <li>Work on the task</li>
            <li>When the timer rings, stop working! Put a checkmark on a piece of paper</li>
            <li>If you have less than four(4) checkmarks, you will take a five minute break.</li>
            <li>If you have four checkmarks you will take a thirty minute break</li>
            <li>After the thirty minute break, reset your checkmarks to zero, then go back to the first step</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Timer;
