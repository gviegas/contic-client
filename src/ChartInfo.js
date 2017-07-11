//
// Created by Gustavo Viegas on 2017/01
//

import React, { Component } from 'react';
import './css/ChartInfo.css';

class Info extends Component {
  render() {
    return (
      <div className="Info">
        <div>
          <span>Selection:</span>
          <span>
            <ul>
              {this.props.selection.map((v) => <li key={v}>{v}</li>)}
            </ul>
          </span>
        </div>
        <div>
          <span>Average per Day:</span>
          <span>{this.props.avgDay}</span>
        </div>
        <div>
          <span>Average per Hour:</span>
          <span>{this.props.avgHour}</span>
        </div>
      </div>
    );
  }
}

class ChartInfo extends Component {
  constructor(props) {
    super(props);
    this.avg = {day: 0, hour: 0};
  }

  calculate() {
    let days = {total:0, n: 0};
    for(let entry of this.props.data) {
      for(let data of entry.data) {
        let s = data.time.split('-');
        let date = new Date(s[0], s[1], s[2]);
        if(!days[date]) {
          days[date] = {v: 0};
          ++days.n;
        }
        days[date].v += data.value;
        days.total += data.value;
      }
    }
    if(days.n) {
      let d = days.total / days.n;
      let h = d / 24;
      this.avg = {day: d, hour: h};
    }
  }

  render() {
    if(!this.props.data) return null;
    this.calculate();
    return (
      <div className="ChartInfo">
        <Info selection={this.props.selection}
          avgDay={this.avg.day.toPrecision(5)}
          avgHour={this.avg.hour.toPrecision(5)} />
      </div>
    );
  }
}

export default ChartInfo;
