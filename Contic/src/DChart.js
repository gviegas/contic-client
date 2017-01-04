//
// Created by Gustavo Viegas on 2017/01
//

import { Component } from 'react';
import * as d3 from 'd3';
import './css/DChart.css';

var info = [
  {date : '01 Jan 2017', consumption : 10},
  {date : '02 Jan 2017', consumption : 12},
  {date : '03 Jan 2017', consumption : 9},
  {date : '04 Jan 2017', consumption : 19},
  {date : '05 Jan 2017', consumption : 21},
  {date : '06 Jan 2017', consumption : 24},
  {date : '07 Jan 2017', consumption : 22},
  {date : '08 Jan 2017', consumption : 20},
  {date : '09 Jan 2017', consumption : 18},
  {date : '10 Jan 2017', consumption : 16},
  {date : '11 Jan 2017', consumption : 13},
  {date : '12 Jan 2017', consumption : 14},
  {date : '13 Jan 2017', consumption : 15},
  {date : '14 Jan 2017', consumption : 17},
  {date : '15 Jan 2017', consumption : 21},
  {date : '16 Jan 2017', consumption : 22},
  {date : '17 Jan 2017', consumption : 20},
  {date : '18 Jan 2017', consumption : 19},
  {date : '19 Jan 2017', consumption : 17},
  {date : '20 Jan 2017', consumption : 14},
  {date : '21 Jan 2017', consumption : 12},
  {date : '22 Jan 2017', consumption : 11},
  {date : '23 Jan 2017', consumption : 12},
  {date : '24 Jan 2017', consumption : 12},
  {date : '25 Jan 2017', consumption : 15},
  {date : '26 Jan 2017', consumption : 9},
  {date : '27 Jan 2017', consumption : 11},
  {date : '28 Jan 2017', consumption : 22},
  {date : '29 Jan 2017', consumption : 30},
  {date : '30 Jan 2017', consumption : 13},
  {date : '31 Jan 2017', consumption : 20}
];

var options = {
  root : 'body',
  width : 800,
  height : 500,
  margin : { top : 20, right : 20, bottom : 110, left : 40 },
  margin2 : { top : 430, right : 20, bottom : 30, left : 40 },
  parse : '%d %b %Y'
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

  let data = info.map((entry) => parse(entry));

  function create() {
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

  function parse(d) {
    let parseDate = d3.timeParse(settings.parse);
    d.date = parseDate(d.date);
    d.consumption = +d.consumption;
    return d;
  }

  return create;
}

class DChart extends Component {
  constructor(props) {
    super(props);
    createChart(options)();
  }
  render() {
    return null;
  }
}

//export const DChart = createChart(options);
export default DChart;
