//
// Created by Gustavo Viegas on 2017/02
//

import React, { Component } from 'react';
import { MAP_STYLE } from './Defs';
import './css/GMap.css';

const position = {lat: 51.65086, lng: -0.18601};

const formatData = function(d) {
  let r = [];
  for(let entry of d) {
    // eslint-disable-next-line
    let loc = new google.maps.LatLng(entry.location['coordinates'][1],
      entry.location['coordinates'][0]);
    let data = entry.data[0].value;
    r.push({location: loc, weight: data*1000});
  }
  return r;
}

class GHeatMap extends Component {
  constructor(props) {
    super(props);

    // TODO: shouldn't create the map div here
    let elem = document.createElement('div');
    elem.id = 'map';
    document.getElementsByTagName('body')[0].appendChild(elem);
    // eslint-disable-next-line
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: position,
      zoom: 15,
      styles: MAP_STYLE,
      disableDefaultUI: true
    });
    // eslint-disable-next-line
    this.heatmap = new google.maps.visualization.HeatmapLayer();
  }

  render() {
    if(this.props.data) {
      this.heatmap.setData(formatData(this.props.data));
      this.heatmap.setMap(this.map);
    }
    return (
      <div className="GHeatMap"></div>
    );
  }

  componentWillUnmount() {
    let elem = document.getElementById('map');
    while (elem.firstChild)
      elem.removeChild(elem.firstChild);
    elem.parentNode.removeChild(elem);
  }
}

export default GHeatMap;
