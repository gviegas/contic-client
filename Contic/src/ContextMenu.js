//
// Created by Gustavo Viegas on 2017/01
//

import React, { Component } from 'react';
import './css/ContextMenu.css';

class ContextMenuItem extends Component {
  render() {
    return (
      <li className="ContextMenuItem">
        <input type="button" value={this.props.value} onClick={this.props.onClick} />
      </li>
    );
  }
}

class MapMenu extends Component {
  constructor(props) {
    super(props);
    this.handleOption = this.handleOption.bind(this);
  }

  handleOption(event) {
    this.props.onOption(event.target.value);
  }

  render() {
    let items = ['Real Time', 'History'];
    let listItems = items.map((item) =>
    <ContextMenuItem key={item.toString()} value={item} onClick={this.handleOption} />
    ); 
    return (
      <div className="MapMenu">
        {
          this.props.count > 0 &&
          <ul>
            {listItems}
          </ul>
        }
      </div>
    );
  }
}

class RealTimeMenu extends Component {
  constructor(props) {
    super(props);
    this.handleOption = this.handleOption.bind(this);
  }

  handleOption(event) {
    this.props.onOption(event.target.value);
  }

  render() {
    let items = ['Map', 'History'];
    let listItems = items.map((item) =>
    <ContextMenuItem key={item.toString()} value={item} onClick={this.handleOption} />
    );
    return (
      <div className="RealTimeMenu">
        <ul>
          {listItems}
        </ul>
      </div>
    );
  }
}

class HistoryMenu extends Component {
  constructor(props) {
    super(props);
    this.handleOption = this.handleOption.bind(this);
  }

  handleOption(event) {
    this.props.onOption(event.target.value);
  }

  render() {
    let items = ['Map', 'Real Time'];
    let listItems = items.map((item) =>
    <ContextMenuItem key={item.toString()} value={item} onClick={this.handleOption} />
    );
    return (
      <div className="HistoryMenu">
        <ul>
          {listItems}
        </ul>
      </div>
    );
  }
}

class ContextMenu extends Component {
  render() {
    let menu = null;
    switch(this.props.context) {
      case 'Map':
        menu = <MapMenu count={this.props.count} onOption={this.props.onOption} />;
        break;
      case 'Real Time':
        menu = <RealTimeMenu onOption={this.props.onOption} />;
        break;
      case 'History':
        menu = <HistoryMenu onOption={this.props.onOption}/>;
        break;
    }
    return (
      <div className="ContextMenu">
        {menu}
      </div>
    );
  }
}

export default ContextMenu;