//
// Created by Gustavo Viegas on 2017/01
//

import React, { Component } from 'react';
import * as d3 from 'd3';
import client from './Client';
import './css/DChart.css';

const SETTINGS = {
  root : '.DChart',
  width : 800,
  height : 500,
  margin : { top : 20, right : 20, bottom : 110, left : 40 },
  margin2 : { top : 430, right : 20, bottom : 30, left : 40 },
  //parse : '%d %b %Y'
};

function createChart(settings) {
  let width = settings.width - settings.margin.left - settings.margin.right;
  let height = settings.height - settings.margin.top - settings.margin.bottom;
  let height2 = settings.height - settings.margin2.top - settings.margin2.bottom;
  
  let x = d3.scaleTime().range([0, width]);
  let y = d3.scaleLinear().range([height, 0]);
  let x2 = d3.scaleTime().range([0, width]);
  let y2 = d3.scaleLinear().range([height2, 0]);
  
  let xAxis = d3.axisBottom(x);
  let yAxis = d3.axisLeft(y);
  let xAxis2 = d3.axisBottom(x2);
  
  let brush = d3.brushX()
    .extent([[0, 0], [width, height2]])
    .on('brush end', brushed);
  
  let zoom = d3.zoom()
    .scaleExtent([1, Infinity])
    .translateExtent([[0, 0], [width, height]])
    .extent([[0, 0], [width, height]])
    .on('zoom', zoomed);
  
  let area = d3.area()
    .curve(d3.curveMonotoneX)
    .x((d) => x(d.date))
    .y0(height)
    .y1((d) => y(d.consumption));
  let area2 = d3.area()
    .curve(d3.curveMonotoneX)
    .x((d) => x2(d.date))
    .y0(height2)
    .y1((d) => y2(d.consumption));

  let svg = d3.select(settings.root)
        .append('svg')
          .attr('width', settings.width)
          .attr('height', settings.height);

  svg.append('defs')
    .append('clipPath')
      .attr('id', 'clip')
      .append('rect')
        .attr('width', width)
        .attr('height', height);

  let focus = svg.append('g')
    .attr('class', 'focus')
    .attr('transform', `translate(${settings.margin.left},${settings.margin.top})`);

  let context = svg.append('g')
    .attr('class', 'context')
    .attr('transform', `translate(${settings.margin2.left},${settings.margin2.top})`);

  function create(data) {
      x.domain(d3.extent(data, (d) => d.date));
      y.domain([0, d3.max(data, (d) => d.consumption)]);
      x2.domain(x.domain());
      y2.domain(y.domain());

      focus.append('path')
        .datum(data)
        .attr('class', 'area')
        .attr('d', area);

      focus.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', `translate(0,${height})`)
        .call(xAxis);

      focus.append('g')
        .attr('class', 'axis axis--y')
        .call(yAxis);

      context.append('path')
        .datum(data)
        .attr('class', 'area')
        .attr('d', area2);

      context.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', `translate(0,${height2})`)
        .call(xAxis2);

      context.append('g')
        .attr('class', 'brush')
        .call(brush)
        .call(brush.move, x.range());
      
      svg.append('rect')
        .attr('class', 'zoom')
        .attr('width', width)
        .attr('height', height)
        .attr('transform', `translate(${settings.margin.left},${settings.margin.top})`)
        .call(zoom);
  }

  function brushed() {
    if(d3.event.sourceEvent && d3.event.sourceEvent.type === 'zoom') { return; }
    let s = d3.event.selection || x2.range();
    x.domain(s.map(x2.invert, x2));
    focus.select('.area').attr('d', area);
    focus.select('.axis--x').call(xAxis);
    svg.select('.zoom').call(zoom.transform, d3.zoomIdentity
      .scale(width / (s[1] - s[0]))
      .translate(-s[0], 0));
  }

  function zoomed() {
    if(d3.event.sourceEvent && d3.event.sourceEvent.type === 'brush') { return; }
    let t = d3.event.transform;
    x.domain(t.rescaleX(x2).domain());
    focus.select('.area').attr('d', area);
    focus.select('.axis--x').call(xAxis);
    context.select('.brush').call(brush.move, x.range().map(t.invertX, t));
  }

  // function parse(d) {
  //   let parseDate = d3.timeParse(settings.parse);
  //   d.date = parseDate(d.date);
  //   d.consumption = +d.consumption;
  //   return d;
  // }

  return create;
}

const parse = function(d) {
  let parseDate = d3.timeParse("%Y-%m-%d");

  d.date = parseDate(d.time);
  d.consumption = +d.value;
  
  delete d.time;
  delete d.value;

  return d;
}

const formatData = function(d) {
  let data = []
  for(let entry of d) {
    for(let datum of entry.data)
      data.push(parse(datum));
  }
  
  console.log('format:'); // debug
  console.log(data); // debug
  
  return data.sort((a, b) => {
    if(a.date < b.date) return -1;
    if(a.date > b.date) return 1;
    return 0;
  });
};

class DChart extends Component {
  constructor(props) {
    super(props);
    client.onEvent('consumption', (d) => createChart(SETTINGS)(formatData(d)));
  }

  render() {
    return (
      <div className="DChart"></div>
    );
  }

  componentDidMount() {
    // todo: date range
    client.send({type: 'query', data: 'consumption', target: this.props.selection});
  }

  componentWillUnmount() {
    client.removeEvent('consumption');
  }
}

export default DChart;