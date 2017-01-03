//
// Created by Gustavo Viegas on 2017/01
//

import React, { Component } from 'react';
import * as d3 from 'd3';
import './css/Chart.css';

  // var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  // svg.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', 'http://www.w3.org/1999/xlink');
  // svg.setAttribute('height', '140');
  // svg.setAttribute('width', '600');
  // var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  // g.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', 'http://www.w3.org/1999/xlink');
  // g.setAttribute('transform', 'translate(25, 25)');
  
  // svg.appendChild(g);
  // document.body.appendChild(svg);
  
const info = [
  {consumption : 80, month : 'jan'},
  {consumption : 91, month : 'feb'},
  {consumption : 79, month : 'mar'},
  {consumption : 76, month: 'apr'},
  {consumption : 70, month : 'may'},
  {consumption : 64, month : 'jun'},
  {consumption : 58, month : 'jul'},
  {consumption : 59, month: 'aug'},
  {consumption : 59, month : 'sep'},
  {consumption : 63, month : 'oct'},
  {consumption : 69, month : 'nov'},
  {consumption : 73, month: 'dec'}
];
var options = {
  selection : d3.select('body'),
  width :  600,
  height : 400,
  margin : {left : 40, right : 40, top : 30, bottom : 30}
};

function createChart(settings) {
  var selection = settings.selection;
  var width = settings.width - settings.margin.left - settings.margin.right;
  var height = settings.height - settings.margin.top - settings.margin.bottom;
  var x = d3.scaleBand()
    .domain(['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'])
    .range([0, width]);
  var y = d3.scaleLinear()
    .range([height, 0]);

  var data = info;

  function create() {
    y.domain([0, d3.max(data, (d) => d['consumption'])]);

    var chart = selection.append('svg')
      .attr('id', 'chart')
      .attr('width', settings.width)
      .attr('height', settings.height)
      .append('g')
        .attr('transform', `translate(${settings.margin.left},${settings.margin.top})`);

    var bars = chart.selectAll('g')
      .data(data)
      .enter()
      .append('g')
        .attr('transform', (d, i) => `translate(${i * width / data.length},0)`)
        .append('rect')
          .attr('y', (d) => y(d['consumption']))
          .attr('width', width / data.length - 1)
          .attr('height', (d) => height - y(d['consumption']))
          .on('mouseenter', function() { d3.select(this).transition().style('fill', 'beige'); })
          .on('mouseleave', function() { d3.select(this).transition().style('fill', 'coral'); });

    var xAxis = chart.append('g')
      .attr('class', 'axis-x')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    var yAxis = chart.append('g')
      .attr('class', 'axis-y')
      .call(d3.axisLeft(y))
      .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -settings.margin.left + 3)
        .attr('dy', '0.8em')
        .attr('text-anchor', 'end')
        .text('Consumption (kWh)');
  }

  return create;
}
var newChart = createChart(options)();

class Chart extends Component {
  render() {
    return (
      <div className="Chart" style={{height: 30+'px', backgroundColor: 'lightblue'}}>
        Chart
      </div>
    );
  }
}

export default Chart;