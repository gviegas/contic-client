//
// Created by Gustavo Viegas on 2016/12
//

import React, { Component } from 'react';
import { MAP_STYLE } from './Defs';
import './css/GMap.css';

const pushpin = 'http://localhost:3000/pin/pushpin-s.png';
const position = {lat: 51.65106, lng: -0.18541};

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
    if(this.props.data && this.props.data['marker']) this.open();
    else this.infoWindow.close();
    return null;
  }
}

class Marker extends Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line
    this.marker = new google.maps.Marker({
      position : this.props.position,
      map : this.props.map,
      icon: pushpin
    });
    this.selected = false;
    this.marker.addListener('mouseover', () => {
      this.props.onMouseOver({marker: this.marker, content: this.props.content});
    });
    this.marker.addListener('mouseout', () => {
      this.props.onMouseOut();
    });
    this.marker.addListener('click', () => {
      if(!this.selected) {
        this.selected = true;
        this.props.onClick(this.props.id, true);
        // eslint-disable-next-line
        this.marker.setAnimation(google.maps.Animation.BOUNCE);
      } else {
        this.selected = false;
        this.props.onClick(this.props.id, false);
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
      zoom: 18,
      styles: MAP_STYLE,
      disableDefaultUI: true
    });

    this.handleMarkerMouseOver = this.handleMarkerMouseOver.bind(this);
    this.handleMarkerMouseOut = this.handleMarkerMouseOut.bind(this);
    this.handleInfoWindowClose = this.handleInfoWindowClose.bind(this);
    this.state = {currentMarker: { marker : null, content : '' }};
  }

  handleMarkerMouseOver(data) {
    this.setState({currentMarker : data});
  }

  handleMarkerMouseOut() {
    this.setState({currentMarker : null});
  }

  handleInfoWindowClose() {} // TODO

  render() {
    if(this.props.data) {
      let entries = this.props.data;
      let markers = [];
      for(let entry of entries) {
        markers.push(
          <Marker key={entry['id']}
           // GeoJson coords are in [lng, lat] order but Gmaps uses [lat, lng]
          position={{
            lat: entry['location']['coordinates'][1],
            lng: entry['location']['coordinates'][0]
          }}
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
    return null;
  }

  componentWillUnmount() {
    let elem = document.getElementById('map');
    while (elem.firstChild)
      elem.removeChild(elem.firstChild);
    elem.parentNode.removeChild(elem);
  }
}

export default GMap;
