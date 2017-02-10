//
// Created by Gustavo Viegas on 2016/12
//

import React, { Component } from 'react';
import MainNav from './MainNav';
import ContextMenu from './ContextMenu';
import Map from './Map';
import Chart from './Chart';
import './css/Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.handleNavOption = this.handleNavOption.bind(this);
    this.handleMenuOption = this.handleMenuOption.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.state = { 
      navOption : null,
      menuOption : 'Map'
    };
    this.selection = {};
  }

  handleNavOption(option) { console.log(`Home - nav option: ${option}`); } // todo
  
  handleMenuOption(option) {
    if(option != this.state.menuOption) { 
      this.setState({menuOption : option});
    }  
  }

  handleSelection(marker, insert) {
    let key = String(marker.position);
    if(insert) {
      this.selection[key] = marker;
    } else {
      delete this.selection[key];
    }
    console.log(this.selection);
  }

  render() {
    let context = null;
    let current = null;
    switch(this.state.menuOption) {
      case 'Map':
        context = <Map onSelection={this.handleSelection} />;
        current = 'Map';
        break;
      case 'Consumption':
        context = <Chart />;
        current = 'Consumption';
        break;
      case 'Heat Map':
        context = null; // todo
        current = 'Heat Map';
        break;
    }
    return (
      <div className="Home">
        <MainNav onNavOption={this.handleNavOption} />
        <ContextMenu context={current} onOption={this.handleMenuOption} />
        <div className="Context">
          {context}
        </div>
      </div>
    );
  }
}

export default Home;