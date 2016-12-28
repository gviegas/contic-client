//
// Created by Gustavo Viegas on 2016/12
//

import React, { Component } from 'react';
import './App.css';
import SignIn from './SignIn';
import Home from './Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Home />
      </div>
    );
  }
}

export default App;