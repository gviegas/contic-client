//
// Created by Gustavo Viegas on 2016/12
//

import React, { Component } from 'react';
import client from './Client';
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

const position = {lat : 40.635364, lng : -73.961016};
// const position = {lat : 64.9312715, lng : -19.0144547};

// const info = {
//   u1 : {position : {lat : 63.9312120, lng : -19.2244528}, content : 'unit u1'},
//   u2 : {position : {lat : 64.9013208, lng : -19.1444537}, content : 'unit u2'},
//   u3 : {position : {lat : 64.431290, lng : -20.0094541}, content : 'unit u3'}
// };


class InfoWindow extends Component {
  constructor(props) {
    super(props);
    this.open = this.open.bind(this);
    // eslint-disable-next-line
    this.infoWindow = new google.maps.InfoWindow({});
    this.infoWindow.addListener('closeclick', () => this.props.onClose());
  }

  open() {
    this.infoWindow.setContent(this.props.data['content']);
    this.infoWindow.open(this.props.map, this.props.data['marker']);
  }

  render() {
    if(this.props.data && this.props.data['marker']) { this.open(); }
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
    this.selected = false;
    this.marker.addListener('mouseover', () => {
      this.props.onMouseOver({marker : this.marker, content : this.props.content});
    });
    this.marker.addListener('mouseout', () => {
      this.props.onMouseOut();
    });
    this.marker.addListener('click', () => { 
      if(!this.selected) {
        this.selected = true;
        this.props.onClick(this.props.id, true);
        //this.props.onClick(this.marker, true);
        // eslint-disable-next-line
        this.marker.setAnimation(google.maps.Animation.BOUNCE);
      } else {
        this.selected = false;
        this.props.onClick(this.props.id, false);
        //this.props.onClick(this.marker, false);
        this.marker.setAnimation(null);
      }
    });
  }

  render() {
    return null;
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
      center: position,
      zoom: 14,
      styles: style,
      disableDefaultUI: true      
    });

    this.handleMarkerMouseOver = this.handleMarkerMouseOver.bind(this);
    this.handleMarkerMouseOut = this.handleMarkerMouseOut.bind(this);
    this.handleInfoWindowClose = this.handleInfoWindowClose.bind(this);
    this.state = { 
      currentMarker: { marker : null, content : '' },
      data:  null
    };
    
    client.onEvent('units', (d) => this.setState({data: d}));
  }
  
  handleMarkerMouseOver(data) {
    this.setState({currentMarker : data});
  }

  handleMarkerMouseOut() {} //this.setState({currentMarker : null});

  handleInfoWindowClose() {} //todo

  render() {
    if(this.state.data) {
      let entries = this.state.data;
      let markers = [];
      for(let entry of entries) {
        markers.push(
          <Marker key={entry['_id']}
          //data={this.state.markerClick} 
          position={{lat: entry['location'][0], lng: entry['location'][1]}}
          id={entry['id']}
          content={entry['id']}
          mode={this.props.mode}  
          map={this.map} 
          onMouseOver={this.handleMarkerMouseOver}
          onMouseOut={this.handleMarkerMouseOut}
          onClick={this.props.onMarkerClick} />
        );
      }
      return (
        <div className="GMap">
          {markers}
          <InfoWindow data={this.state.currentMarker} map={this.map} 
          onClose={this.handleInfoWindowClose} />
        </div>
      );
    }
    client.send({type: 'query', data: 'units'});
    return null;
  }

  componentDidUpdate() {}

  componentDidMount() {}

  componentWillUnmount() {
    let elem = document.getElementById('map');
    while (elem.firstChild) {
      elem.removeChild(elem.firstChild);
    }
    elem.parentNode.removeChild(elem);

    client.removeEvent('units');
  }
}

export default GMap;