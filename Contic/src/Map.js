//
// Created by Gustavo Viegas on 2016/12
//

import React, { Component } from 'react';
import './css/Map.css';

/* eslint-disable */
function _initMap() {
  var place = {lat : -25.363, lng : 131.044}
  var map = new google.maps.Map(document.getElementById('MapInstance'), {
    zoom : 4,
    center : place
  });
}
export const initMap = _initMap;

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

export default Map;