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
            <input type="button" value="Map" onClick={this.handleOption} />
            <input type="button" value="Real Time" onClick={this.handleOption} />
            <input type="button" value="History" onClick={this.handleOption} /> 
          </div>
        }
      </div>
    );
  }
}

class ContextMenu extends Component {  
  render() {
    return (
      <div className="ContextMenu">
        <MapMenu count={this.props.count} onOption={this.props.onOption} />
      </div>
    );
  }
}

export default ContextMenu;