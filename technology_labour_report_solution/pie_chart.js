
// Create an svg with dimensions
var width = window.innerWidth / 2;
var height = 450;

var svg = d3.select("#pieChart").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Create a variable with your dataset

var dataset = [
  { label: "communication services", number_of_jobs: 23 },
  { label: "technology manufacturing", number_of_jobs: 9 },
  { label: "technology wholesaling", number_of_jobs: 10 },
  { label: "software and computer services", number_of_jobs: 58 },
]

// Create a function to generate each arc of the pie charge

var radius = Math.min(width, height) / 2;

var arc = d3.arc()
    .outerRadius(radius)
    .innerRadius(0);

// Create a function to compute the inner and outer angles of each arc

var pie = d3.pie()
    .value(function(d) { return d.number_of_jobs; });

// Append an element to your svg for each technology offering in your dataset

var g = svg.selectAll(".arc")
    .data(pie(dataset))
  .enter().append("g")
    .attr("class", "arc");

// Draw the arcs of your pie chart. Use an ordinal scale function to add a different colour to each slice of data.

var color = d3.scaleOrdinal()
    .range(["#00204a", "#005792", "#448ef6", "#fdb44b"]);

g.append("path")
    .attr("d", arc)
    .style("fill", function(d,i) { return color(i); })

// Stretch Goal: Add events and labels
    .on("mouseover", function(d) {
      var xPosition = arc.centroid(d)[0] + (width / 2);
      var yPosition = arc.centroid(d)[1] + (height / 2);
      d3.select("#tooltip")
        .style("left", xPosition + "px")
        .style("top", yPosition + "px")
        .select("#label")
        .text(d.data.label)
      d3.select("#tooltip")
        .select("#value")
        .text(d.data.number_of_jobs);
      //Show the tooltip
      d3.select("#tooltip").classed("hidden", false);

    })
    .on("mouseout", function() {
     //Hide the tooltip
     d3.select("#tooltip").classed("hidden", true);
   });
