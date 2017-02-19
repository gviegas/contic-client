//
// Created by Gustavo Viegas on 2017/02
//

import React, { Component } from 'react';
import { MAP_STYLE } from './Defs';
import client from './Client';
import './css/GMap.css';

const position = {lat : 40.634185, lng : -73.962016};

const formatData = function(d) {
  let r = [];
  let c = 1; // test
  for(let entry of d) {
    // eslint-disable-next-line
    let loc = new google.maps.LatLng(entry.location[0], entry.location[1]);
    // let data = entry.data[9].value;
    let data = c++; // test
    r.push({location: loc, weight: data});
  }
  console.log(r); // debug
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
      zoom: 13,
      styles: MAP_STYLE,
      disableDefaultUI: true      
    });
    // eslint-disable-next-line
    this.heatmap = new google.maps.visualization.HeatmapLayer();

    // this.state = {data: null};

    client.onEvent('latest', (d) => {
      // eslint-disable-next-line
      // this.heatmap = new google.maps.Visualization.HeatmapLayer({
      //   data: formatData(d)
      // });
      this.heatmap.setData(formatData(d));
      this.heatmap.setMap(this.map);
    });
  }

  render() {
    client.send({type: 'query', data: 'latest'});
    return (
      <div className="GHeatMap"></div>
    );
  }

  componentWillUnmount() {
    let elem = document.getElementById('map');
    while (elem.firstChild) {
      elem.removeChild(elem.firstChild);
    }
    elem.parentNode.removeChild(elem);

    client.removeEvent('latest');
  }
}

export default GHeatMap;