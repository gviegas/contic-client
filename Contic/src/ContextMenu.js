//
// Created by Gustavo Viegas on 2017/01
//

import React, { Component } from 'react';

class MapMenu extends Component {
  constructor(props) {
    super(props);
    this.handleOption = this.handleOption.bind(this);
  }

  handleOption(event) {
    this.props.onOption(event.target.value);
  }

  render() {
    return (
      <div className="MapMenu">
        {
          this.props.count > 0 &&
          <div>
            <input type="button" value="Real Time" onClick={this.handleOption} />
            <input type="button" value="History" onClick={this.handleOption} /> 
          </div>
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
    return (
      <div className="RealTimeMenu">
        <input type="button" value="Map" onClick={this.handleOption} />
        <input type="button" value="History" onClick={this.handleOption} />
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
    return (
      <div className="HistoryMenu">
        <input type="button" value="Map" onClick={this.handleOption} />
        <input type="button" value="Real Time" onClick={this.handleOption} />
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