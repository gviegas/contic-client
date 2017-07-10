//
// Created by Gustavo Viegas on 2016/12
//

import React, { Component } from 'react';
import client from './Client';
import GMap from './GMap';

class Map extends Component {
  constructor(props) {
    super(props);
    this.onSelection = this.onSelection.bind(this);
    this.state = {data: null};
    client.onEvent('units', (d) => this.setState({data: d}));
  }

  onSelection(marker, insert) {
    this.props.onSelection(marker, insert);
  }

  render() {
    return (
      <div className="Map">
        <GMap onMarkerClick={this.onSelection} data={this.state.data} />
      </div>
    );
  }

  componentDidMount() {
    client.send({type: 'query', data: 'units'});
  }

  componentWillUnmount() {
    client.removeEvent('units');
  }
}

export default Map;
