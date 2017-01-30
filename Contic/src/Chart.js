//
// Created by Gustavo Viegas on 2017/01
//

import React, { Component } from 'react';
import DChart from './DChart';
import ChartInfo from './ChartInfo';

class Chart extends Component {
  render() {
    return (
      <div className="Chart">
        <DChart />
        <ChartInfo />
      </div>
    );
  }
}

export default Chart;