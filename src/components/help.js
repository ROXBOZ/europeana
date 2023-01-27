var w = 600;
var h = 600;

var projection = d3.geo
  .mercator()
  .center([13.4, 52.5])
  .translate([w / 2, h / 2])
  .scale([w / 0.013]);

var path = d3.geo.path().projection(projection);

var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

d3.json("Berlin_gemeinden_simplify0.geojson", function (json) {
  svg
    .selectAll("path")
    .data(json.features)
    .enter()
    .append("path")
    .attr("d", path);
});
