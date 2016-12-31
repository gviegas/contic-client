//
// Created by Gustavo Viegas on 2016/12
//

import React, { Component } from 'react';
import GMap, { Instance } from './GMap';
import './css/Map.css';

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
      </div>
    );
  }
}

export const initMap = Instance.initMap;
export default Map;