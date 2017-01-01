//
// Created by Gustavo Viegas on 2016/12
//

import React, { Component } from 'react';
import './css/GMap.css';

const style = 
[
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
];

const position = {lat : 64.9312715, lng : -19.0144547};

const info = {
  u1 : {position : {lat : 63.9312120, lng : -19.2244528}, content : 'unit u1'},
  u2 : {position : {lat : 64.9013208, lng : -19.1444537}, content : 'unit u2'},
  u3 : {position : {lat : 64.431290, lng : -20.0094541}, content : 'unit u3'}
};

class _Instance {
  constructor() { 
    this.map = null;
    this.infoWindow = null;
    this.initMap = this.initMap.bind(this);
  }

  initMap() {
    this.createMap({lat : 64.9312715, lng : -19.0144547});
    this.createInfoWindow();
    for(let entry in info) {
      this.createMarker(info[entry]['position'], info[entry]['content']);
    }
  }

  createMap(position) {
    if(this.map) { return; }
    // eslint-disable-next-line
    this.map = new google.maps.Map(document.getElementById('MapInstance'),
    {
      center : position,
      zoom : 6,
      styles : style,
      disableDefaultUI : true
    });
  }

  createMarker(position, content) {
    if(!this.map) { return; }
    // eslint-disable-next-line
    var marker = new google.maps.Marker({
      position : position,
      map : this.map
    });
    marker.addListener('click', () => {
      this.infoWindow.setContent(content);
      this.infoWindow.open(this.map, marker);
    });
  }

  createInfoWindow() {
    if(this.infoWindow) { return; }
    // eslint-disable-next-line
    this.infoWindow = new google.maps.InfoWindow({});
  }
}


////////////////////
////////////////////


class InfoWindow extends Component {
  constructor(props) {
    super(props);
    this.open = this.open.bind(this);
    // eslint-disable-next-line
    this.infoWindow = new google.maps.InfoWindow({});
    //this.open(); // test
  }

  open() {
    this.infoWindow.setContent(this.props.content);
    this.infoWindow.open(this.props.map, this.props.marker);
  }

  render() {
    if(this.props.open) { this.open(); }
    return null;
  }
}

class Marker extends Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line
    this.marker = new google.maps.Marker({
      position : this.props.position,
      map : this.props.map
    });
    this.marker.addListener('click', () => { this.setState({click : true}); });
    this.state = {click : false};
  }
  render() {
    return (
      <InfoWindow open={this.state.click} content={'qwerty'} marker={this.marker} map={this.props.map} />
    );
  }
}

class GMap extends Component {
  constructor(props) {
    super(props);
    // TODO: shouldn't create the map div here 
    let elem = document.createElement('div');
    elem.id = 'map';
    document.getElementsByTagName('body')[0].appendChild(elem);
    // eslint-disable-next-line
    this.map = new google.maps.Map(document.getElementById('map'), {
      center : position,
      zoom : 6,
      styles : style,
      disableDefaultUI : true      
    });
  }
  render() {
    return (
      <Marker position={position} map={this.map} />
    );
  }
}

export default GMap;