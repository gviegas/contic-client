//
// Created by Gustavo Viegas on 2016/12
//

import React, { Component } from 'react';
import MainNav from './MainNav';
import Map from './Map'
import './css/Home.css';

// Home
// - MainNav
// -- Menu
// --- MenuIcon
// --- MenuList
// ---- MenuItem
// -- Logo
// -- Search
// - Map

class Home extends Component {
  constructor(props) {
    super(props);
    this.handleMenuOption = this.handleMenuOption.bind(this);
    this.state = { option : null };
  }

  handleMenuOption(option) {} // todo

  render() {
    return (
      <div className="Home">
        <MainNav />
        <Map />
      </div>
    );
  }
}

export default Home; 