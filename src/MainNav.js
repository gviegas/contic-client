//
// Created by Gustavo Viegas on 2016/12
//

import React, { Component } from 'react';
import menuLabel from './img/menu-label.svg';
import logoLabel from './img/logo.svg';
import searchLabel from './img/search-label.svg';
import './css/MainNav.css';

const NavOpt = Object.freeze({
  MENU : 'Menu',
  SEARCH : 'Search'
});

class MenuIcon extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
  }

  handleClick(event) {
    this.props.onClick();
  }

  handleMouseOver(event) {}

  render() {
    return (
      <div className="MenuIcon" onClick={this.handleClick}
        onMouseOver={this.handleMouseOver}>
        <img src={menuLabel} alt="menu" width="36" />
      </div>
    );
  }
}

class MenuItem extends Component {
  render() {
    return (
      <li className="MenuItem">
        {this.props.value}
      </li>
    );
  }
}

class MenuList extends Component {
  render() {
    const items = this.props.items;
    const listItems = items.map((item) =>
      <MenuItem key={item.toString()} value={item} />);
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
    this.handleMenuIconClick = this.handleMenuIconClick.bind(this);
  }

  handleMenuIconClick() {
    this.props.toShow(NavOpt.MENU, !this.props.showing[NavOpt.MENU]);
  }

  render() {
    return (
      <div className="Menu">
        <MenuIcon onClick={this.handleMenuIconClick} />
        {
          this.props.showing[NavOpt.MENU] &&
          <MenuList items={['Units','Zones','Sign Out']} />
        }
      </div>
    );
  }
}

class Logo extends Component {
  render() {
    return (
      <div className="Logo">
        <img src={logoLabel} alt="Contic" width="36" />
      </div>
    )
  }
}

class SearchIcon extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.onClick();
  }

  render() {
    return (
      <div className="SearchIcon" onClick={this.handleClick}>
        <img src={searchLabel} alt="Search" width="36" />
      </div>
    )
  }
}

class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.props.onChange(event.target.value);
  }

  handleSubmit(event) {
    this.props.onSubmit(event.target.value);
    event.preventDefault();
  }

  render() {
    return (
      <div className="SearchInput">
        <form onSubmit={this.handleSubmit}>
          <input type="search" placeholder="Search..."
          value={this.props.value}
          onChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {inputValue : ''};
    this.handleSearchIconClick = this.handleSearchIconClick.bind(this);
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.handleSearchInputSubmit = this.handleSearchInputSubmit.bind(this);
  }

  handleSearchIconClick() {
    this.props.toShow(NavOpt.SEARCH, !this.props.showing[NavOpt.SEARCH]);
  }

  handleSearchInputChange(value) {
    this.setState({inputValue : value});
  }

  handleSearchInputSubmit(value) {} // TODO

  render() {
    return (
      <div className="Search">
        <SearchIcon onClick={this.handleSearchIconClick} />
        {
          this.props.showing[NavOpt.SEARCH] &&
          <SearchInput value={this.state.inputValue}
          onChange={this.handleSearchInputChange}
          onSubmit={this.handleSearchInputSubmit}
          />
        }
      </div>
    );
  }
}

class MainNav extends Component {
  constructor(props) {
    super(props);
    this.handleNavSelection = this.handleNavSelection.bind(this);
    this.state = {showing: {}};
  }

  handleNavSelection(option, show) {
    let aux = this.state.showing;
    for(let key in aux) {
      if(aux.hasOwnProperty(key))
        aux[key] = false;
    }
    aux[option] = show;
    this.setState({showing: aux});
  }

  render() {
    return (
      <nav className="MainNav">
        <Menu showing={this.state.showing} toShow={this.handleNavSelection} />
        <Logo />
        <Search showing={this.state.showing} toShow={this.handleNavSelection} />
      </nav>
    );
  }
}

export default MainNav;
