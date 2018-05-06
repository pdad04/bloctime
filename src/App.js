import React, { Component } from 'react';
import './App.css';
import Timer from './components/Timer.js';
import {Navbar,Modal, Button} from 'react-materialize'

const buttonStyle = {
  backgroundColor: '#5381cc',
  boxShadow: 'none'
};

class App extends Component {
  render() {
    return (
      <div className="App">
      <Navbar brand='Bloctime' right>
        <Modal
          header='About Bloctime'
          bottomSheet
          trigger={<Button waves='light' style={buttonStyle}>About</Button>}>
          Bloctime is a Pomodoro type clock which I built as a way to learn ReactJS.
          I built this while enrolled at <a href='http://bloc.io' target= '_blank'>Bloc. </a>
          As implemented now, the app requires a physical piece of paper to track the tasks,
          but overtime I would like to implement a task list within the app.
        </Modal>
      </Navbar>
        <Timer />
      </div>
    );
  }
}

export default App;
