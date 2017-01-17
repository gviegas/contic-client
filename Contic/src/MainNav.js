//
// Created by Gustavo Viegas on 2016/12
//

import React, { Component } from 'react';
import menuLabel from './img/menu-label.svg';
import logoLabel from './img/logo.svg';
import searchLabel from './img/search-label.svg';

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
      <div className="MenuIcon" onClick={this.handleClick} onMouseOver={this.handleMouseOver}>
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
    this.state = {show : false};
    this.handleMenuIconClick = this.handleMenuIconClick.bind(this);
  }

  handleMenuIconClick() {
    this.setState({show : !this.state.show});
  }

  render() {
    return (
      <div className="Menu">
        <MenuIcon onClick={this.handleMenuIconClick} />
        {
          this.state.show && 
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
        <img src={searchLabel} alt="search" width="36" />
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
          <input type="search" placeholder="search..."
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
    this.state = {show : false, inputValue : ''};
    this.handleSearchIconClick = this.handleSearchIconClick.bind(this);
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.handleSearchInputSubmit = this.handleSearchInputSubmit.bind(this);
  }

  handleSearchIconClick() {
    this.setState({show : !this.state.show});
  }

  handleSearchInputChange(value) {
    this.setState({inputValue : value});
  }

  handleSearchInputSubmit(value) {}

  render() {
    return (
      <div className="Search">
        <SearchIcon onClick={this.handleSearchIconClick} />
        {
          this.state.show && 
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
  render() {
    return (
      <nav className="MainNav">
        <Menu />
        <Logo />
        <Search />
      </nav>
    );
  }
}

export default MainNav;