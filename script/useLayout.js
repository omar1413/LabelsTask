// //	Generate	a	dataset	with	random	dates.
var data = [10,20,50,55,21,32,12,10,20,50,55,21,32,12,10,20,50,55,21,32];

// //	Get	the	layout	function.
 var layout = radialLayout();

var output = layout(data);


var width = 1000,
    height = 600,
    innerRadius = 30,
    outerRadius = 200;
//
var rScale = d3.scaleLinear()
    .domain([0, d3.max(output , function (d) {
        return d.count;
    })])
    .range([0, outerRadius - innerRadius]);
//
var colorScale = d3.scaleLinear()
    .domain([0, d3.max(output, function (d) {
        return d.count;
    })])
    .range(["#ffeda0", "#f03b20"]);
//
var arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(function (d) {
        return innerRadius + rScale(d.count);
    });
//
var labelArc = d3.arc()
    .innerRadius(function (d) {
        return innerRadius + rScale(d.count) + 10;
    })
    .outerRadius(function (d) {
        return innerRadius + rScale(d.count) + 20;
    });

var svg = d3.select("#radial-chart").append("svg")
    .attr("width", width)
    .attr("height", height);

var g = svg.append("g")
    .attr("transform", "translate(" + [width / 2, height / 2] + ")");
var groups = g.selectAll(".arc-group")
    .data(output)
    .enter()
    .append("g")
    .attr("class", "arc-group");
var arcs = groups.append("path")
    .attr("d", function (d) {
        return arc(d);
    })
    .attr("fill", function (d) {
        return colorScale(d.count);
    })
    .attr("stroke", "white")
    .attr("stroke-width", 1);


////////////////////////////////////////////////////////////////////////////////////
var labels = groups.append("text")
    .attr("transform", function (d) {
        return "translate(" + labelArc.centroid(d) + ")rotate(" + angle(d) + ")";
    })
    .attr("text-anchor", "middle")
    .attr("font-size", "1.3em")
    .attr("fill", "white")
    .text(function (d) {
        return d.count;
    });


function angle(d) {
    var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
    return a > 90 ? a - 180 : a;
}