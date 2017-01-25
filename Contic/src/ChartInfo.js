//
// Created by Gustavo Viegas on 2017/01
//

import React, { Component } from 'react';
import './css/ChartInfo.css';

class YearInfo extends Component {
  render() {
    return (
      <div className="YearInfo">
        <div>
          <span>Peak Month:</span>
          <span>{this.props.peakMonth}</span>
        </div>
        <div>
          <span>Average per Month:</span>
          <span>{this.props.averageMonth}</span>
        </div>
      </div>
    );
  }
}

class MonthInfo extends Component {
  render() {
    return (
      <div className="MonthInfo">
        <WeekInfo />
      </div>
    );  
  }
}

class WeekInfo extends Component {
  render() {
    return (
      <div className="WeekInfo">
        <div>
          <span>Peak Day:</span>
          <span>{this.props.peakDay}</span>
        </div>
        <div>
          <span>Average per Day:</span>
          <span>{this.props.averageDay}</span>
        </div>
      </div>
    );
  }
}

class DayInfo extends Component {
  render() {
    return (
      <div className="DayInfo">
        <div>
          <span>Peak Hour:</span>
          <span>{this.props.peakHour}</span>
        </div>
        <div>
          <span>Average per Hour:</span>
          <span>{this.props.averageHour}</span>
        </div>
      </div>
    );
  }
}

class ChartInfo extends Component {
  render() {
    return (
      <div className="ChartInfo">
        <DayInfo peakHour="10" averageHour="3" />
      </div>
    );
  }
}

export default ChartInfo;