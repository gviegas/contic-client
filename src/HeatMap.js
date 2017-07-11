//
// Created by Gustavo Viegas on 2017/02
//

import React, { Component } from 'react';
import client from './Client';
import GHeatMap from './GHeatMap';

class HeatMap extends Component {
  constructor(props) {
    super(props);
    this.state = {data: null};
    client.onEvent('latest', (d) => this.setState({data: d}));
  }

  render() {
    return (
      <div className="HeatMap">
        <GHeatMap data={this.state.data} />
      </div>
    );
  }

  componentDidMount() {
    client.send({type: 'query', data: 'latest'});
  }

  componentWillUnmount() {
    client.removeEvent('latest');
  }
}

export default HeatMap;
