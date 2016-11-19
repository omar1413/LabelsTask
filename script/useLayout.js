//	Generate	a	dataset	with	random	dates.
var data = addData([], 300, 20 * 60);
//	Get	the	layout	function.
var layout = radialLayout();
//	Compute	the	ouput	data.
var hours = [];
var hourscount = [];
data.forEach(function (d, i) {
    hours[i] = d.date.getHours();
});


var countmap = d3.range(0, 24);
countmap.forEach(function (d) {
    var count = 0;
    for (var i = 0; i < hours.length; i++) {
        if (hours[i] == d) {
            count++
        }
    }
    hourscount[d] = count;
});


var output = layout(hourscount);

var width = 1000,
    height = 600,
    innerRadius = 30,
    outerRadius = 250;

var rScale = d3.scaleSqrt()
    .domain([0, d3.max(output, function (d) {
        return d.count;
    })])
    .range([0, outerRadius - innerRadius]);

var colorScale = d3.scaleLinear()
    .domain([0, d3.max(output, function (d) {
        return d.count;
    })])
    .range(["#ffeda0", "#f03b20"]);

var arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(function (d) {
        return innerRadius + rScale(d.count);
    });

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

function randomInterval(avgSeconds) {
    return Math.floor(-Math.log(Math.random()) * 1000 * avgSeconds);
};

function addData(data, numItems, avgSeconds) {
//	Compute	the	most	recent	time	in	the	data	array.
    var n = data.length,
        t = (n > 0) ? data[n - 1].date : new Date();
//	Append	items	with	increasing	times	in	the	data	array.
    for (var k = 0; k < numItems - 1; k += 1) {
        t = new Date(t.getTime() + randomInterval(avgSeconds));
        data.push({date: t});
    }
    return data;
};

function angle(d) {
    var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
    return a > 90 ? a - 180 : a;
}