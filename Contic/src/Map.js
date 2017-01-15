//
// Created by Gustavo Viegas on 2016/12
//

import React, { Component } from 'react';
import GMap from './GMap';

class MapMenu extends Component {
  render() {
    return (
      <div className="MapMenu">
        {
          this.props.count > 0 &&
          <input type="button" value="History" />
        }
      </div>
    );
  }
}

class Map extends Component {
  constructor(props) {
    super(props);
    this.selection = {};
    this.handleSelection = this.handleSelection.bind(this);
    this.state = {count : 0};
  }

  handleSelection(marker, insert) {
    let key = String(marker.position);
    if(insert) {
      this.selection[key] = marker;
      this.setState({count : ++this.state.count});
    } else {
      delete this.selection[key];
      this.setState({count : --this.state.count});
    }
    this.setState({selection : this.selection});
    console.log(this.selection);
  }

  render() {
    return (
      <div className="Map">
        <MapMenu count={this.state.count} />
        <GMap onMarkerClick={this.handleSelection}/>
      </div>
    );
  }
}

export default Map;