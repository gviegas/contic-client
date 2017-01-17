//
// Created by Gustavo Viegas on 2016/12
//

import React, { Component } from 'react';
import SignIn from './SignIn';
import Home from './Home';
import './css/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleViewChange = this.handleViewChange.bind(this);
    this.state = {view : 'SignIn'};
    this.views = ['SignIn', 'Home'];
    this.index = 0;
  }

  handleViewChange(view) {
    if(view) {
      this.setState({view : view});
    } else if(this.index < this.views.length - 1) {
      this.setState({view : this.views[++this.index]});
    } else {
      console.log('WARNING: last view');
    }
  }

  render() {
    let nextView = null;
    switch(this.state.view) {
      case 'SignIn':
        nextView = <SignIn onViewChange={this.handleViewChange} />;
        break;
      case 'Home':
        nextView = <Home onViewChange={this.handleViewChange} />;
        break;
    }
    return (
      <div className="App">
        {nextView}
      </div>
    );
  }
}

export default App;