//
// Created by Gustavo Viegas on 2017/01
//

import React, { Component } from 'react';
import './css/ContextMenu.css';

const items = ['Map', 'Consumption'];

class ContextMenuItem extends Component {
  render() {
    return (
      <li className={"MenuItem" + this.props.value}>
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
    let listItems = items.map((item) =>
    <ContextMenuItem key={item.toString()} value={item} onClick={this.handleOption} />
    ); 
    return (
      <div className="MapMenu">
        <ul>
          {listItems}
        </ul>
      </div>
    );
  }
}

class ConsumptionMenu extends Component {
  constructor(props) {
    super(props);
    this.handleOption = this.handleOption.bind(this);
  }

  handleOption(event) {
    this.props.onOption(event.target.value);
  }

  render() {
    let listItems = items.map((item) => 
    <ContextMenuItem key={item.toString()} value={item} onClick={this.handleOption} />
    );
    return (
      <div className="ConsumptionMenu">
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
        menu = <MapMenu onOption={this.props.onOption} />;
        break;
      case 'Consumption':
        menu = <ConsumptionMenu onOption={this.props.onOption}/>;
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