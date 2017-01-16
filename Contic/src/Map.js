//
// Created by Gustavo Viegas on 2016/12
//

import React, { Component } from 'react';
import GMap from './GMap';

class Map extends Component {
  constructor(props) {
    super(props);
    this.onSelection = this.onSelection.bind(this);
  }

  onSelection(marker, insert) {
    this.props.onSelection(marker, insert);
  }

  render() {
    return (
      <div className="Map">
        <GMap onMarkerClick={this.onSelection} />
      </div>
    );
  }
}

export default Map;
