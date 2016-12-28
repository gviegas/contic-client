//
// Created by Gustavo Viegas on 2016/12
//

import React, { Component } from 'react';
import menuLabel from './img/menu-label.svg';
import searchLabel from './img/search-label.svg';
import './Home.css';

class MenuIcon extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);  
  }

  handleClick(event) {
    this.props.onClick();
  }

  handleMouseOver(event) {

  }

  render() {
    return (
      <div className="MenuIcon" onClick={this.handleClick} onMouseOver={this.handleMouseOver}>
        <input type="image" src={menuLabel} alt="menu" width="50" />
      </div>
    );
  }
}

class MenuItem extends Component {
  render() {
    return (
      <li>{this.props.value}</li>
    );
  }
}

class MenuList extends Component {   
  render() {
    const items = this.props.items;
    const listItems = items.map((item) => 
    <MenuItem key={item.toString()} value={item} />
    );
    return (
      <ul className="MenuList">
        {listItems}
      </ul>
    );
  }
}

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {hidden : false};
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  handleUserInput() {
    this.setState({hidden : !this.state.hidden});
  }

  render() {
    return (
      <div className="Menu">
        <MenuIcon onClick={this.handleUserInput} />
        {
          this.state.hidden && 
          <MenuList items={['units','zones','history']} />
        }
      </div>
    );
  }
}

class Search extends Component {
  render() {

  }
}

class Home extends Component {
  render() {
    return (
      <div className="Home">
      <Menu />
      </div>
    );
  }
}

export default Home;