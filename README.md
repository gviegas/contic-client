<!DOCTYPE html>
<meta charset="utf-8">
<head>
  <title>Line with scales</title>
</head>

<style>
path {
	fill: none;
	stroke: #999;
}
</style>

<body>
  <svg width="700" height="160">
  	<g transform="translate(20, 0)"></g>
  </svg>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/4.2.2/d3.min.js"></script>
  <script>
var xScale = d3.scaleLinear().domain([0, 6]).range([0, 600]);
var yScale = d3.scaleLinear().domain([0, 80]).range([150, 0]);

var lineGenerator = d3.line()
	.x(function(d, i) {
		return xScale(i);
	})
	.y(function(d) {
		return yScale(d.value);
	});

var data = [
	{value: 10}, 
	{value: 50}, 
	{value: 30}, 
	{value: 40}, 
	{value: 20}, 
	{value: 70},
	{value: 50}
];

var line = lineGenerator(data);

// Create a path element and set its d attribute
d3.select('g')
	.append('path')
	.attr('d', line);
  </script>
</body>
</html># contic-cli