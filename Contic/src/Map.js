//
// Created by Gustavo Viegas on 2016/12
//

import React, { Component } from 'react';
import GMap from './GMap';

class MapInstance extends Component {
  render() {
    return (<div id="MapInstance"></div>);
  }
}

class Map extends Component {
  render() {
    return (
      <div className="Map">
        <MapInstance />
        <GMap />
      </div>
    );
  }
}

export default Map;