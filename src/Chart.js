//
// Created by Gustavo Viegas on 2017/01
//

import React, { Component } from 'react';
import client from './Client';
import ChartInfo from './ChartInfo';
import DChart from './DChart';
import './css/Chart.css';

// class DateDialog extends Component {
//   constructor(props) {
//     super(props);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleYearChange = this.handleYearChange.bind(this);
//     this.handleMonthChange = this.handleMonthChange.bind(this);
//     this.handleDayChange = this.handleDayChange.bind(this);
//   }
//
//   handleSubmit(event) {
//     this.props.onSubmit();
//     event.preventDefault();
//   }
//
//   handleYearChange(event) {
//     this.props.onYearChange(event.target.value);
//   }
//
//   handleMonthChange(event) {
//     this.props.onMonthChange(event.target.value);
//   }
//
//   handleDayChange(event) {
//     this.props.onDayChange(event.target.value);
//   }
//
//   render() {
//     return (
//       <div className="DateDialog">
//         <form className="DateDialogForm" onSubmit={this.handleSubmit}>
//           <label>
//             Year
//             <input type="text" placeholder="YYYY"
//               value={this.props.year} onChange={this.handleYearChange} />
//           </label>
//           <label>
//             Month
//             <input type="text" placeholder="MM"
//               value={this.props.month} onChange={this.handleMonthChange} />
//           </label>
//           <label>
//             Day
//             <input type="text" placeholder="DD"
//               value={this.props.day} onChange={this.handleDayChange} />
//           </label>
//           <input type="submit" id="DateDialogForm" value="OK" />
//         </form>
//       </div>
//     );
//   }
// }

class Chart extends Component {
  constructor(props) {
    super(props);
    this.handleDateSubmit = this.handleDateSubmit.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.state = {date: null, year: '', month: '', day: '', data: null};
    client.onEvent('consumption', (d) => this.setState({data: d}));
  }

  handleDateSubmit() {
    this.setState({
      date: {
        year: this.state.year,
        month: this.state.month,
        day: this.state.day
      }
    });
  }

  handleYearChange(value) {
    this.setState({year: value});
  }

  handleMonthChange(value) {
    this.setState({month: value});
  }

  handleDayChange(value) {
    this.setState({day: value});
  }

  render() {
    return (
      // !this.state.date
      // ?
      // <DateDialog onSubmit={this.handleDateSubmit}
      //   year={this.state.year}
      //   month={this.state.month}
      //   day={this.state.day}
      //   onYearChange={this.handleYearChange}
      //   onMonthChange={this.handleMonthChange}
      //   onDayChange={this.handleDayChange} />
      // :
      <div className="Chart">
        <ChartInfo data={this.state.data} selection={this.props.selection} />
        <DChart data={this.state.data} />
      </div>
    );
  }

  componentDidMount() {
    client.send(
      {type: 'query', data: 'consumption', target: this.props.selection});
  }

  componentWillUnmount() {
    client.removeEvent('consumption');
  }
}

export default Chart;
