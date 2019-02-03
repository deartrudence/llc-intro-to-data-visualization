// **** THE DATA ****

		var dataset = [
			{year: "2011", professionals_employed:	534600},
			{year: "2012", professionals_employed:	542000},
			{year: "2013", professionals_employed:	551800},
			{year: "2014", professionals_employed:	561200},
			{year: "2015", professionals_employed:	584900},
			{year: "2016", professionals_employed:	594900},
		]

		//------------------------------------------------------------------------------

    //------------------------------------------------------------------------------

		// **** THE SETUP ****

		//  --> SPACING AND SIZES

		// Find minium and maximum values for hours in the dataset array
		const minDuration = d3.min(dataset, (d) => d.professionals_employed)
    const maxDuration= d3.max(dataset, (d) => d.professionals_employed)

    console.log("min", minDuration, "max", maxDuration)

		// Set up the spacing and sizing for the graph
		// Use the margin convention practice
		const margin = {top: 70, right: 70, bottom: 70, left: 70}
		const width = window.innerWidth / 2
		const height = 450


		// --> SCALES


		// 5. X scale will use the number of elements
		// Scale band creates equally spaced points
		// in this case there are 12 years and 12 datapoints (ie dataset.length)
		// So, scaleBand spreads each datapoint out equally along the X axis (we use this function later when defniing the X axis)
		const xScale = d3.scaleBand()
          .domain(d3.range(dataset.length))
          .range([0, width])

          console.log(xScale(3))
          console.log(d3.range(dataset.length))

		// 6. Y scale will use the professionals_employed datapoint
		// Scale linear takes in the values from the dataset as the domain and scales it down (or up) to fit within the graph
		// We're using this for the Y axis, so we want it to fit within the height.
		// Also, we're using minDuration - 5000 and maxDuration + 5000, so that our datapoints don't touch the very top or bottom of the page (this is just visually pleasing)
		const yScale = d3.scaleLinear()
		    .domain([minDuration - 5000, maxDuration + 5000]) // input
		    .range([height, 0]); // output

		    console.log(yScale(5000))

		// --> GENERATE LINE

		// 7. d3's line generator
		// this generator essentially loops through each data object in the array
		// This sets the x values and the y values for the points that will make up the line
		// For x we use the xScale, and since it's concerned with just the number of elements we pass it in the index value
		// For y we use the yScale and it is concerned with the duration, so we pass in the professionals_employed fromt the data object
		//++++
		// You may notice that we're not actually referencing the data in any way here.
		// That is because we're creating a variable 'line', which will be a function, based on the info we give it.
		// Later when create the actual SVG, we will will call this function to create the line
		const line = d3.line()
		    .x((d, i) => {console.log('line', d); return xScale(i); })
		    .y((d) => yScale(d.professionals_employed) )
		    .curve(d3.curveMonotoneX) // apply smoothing to the line


		//------------------------------------------------------------------------------

		// **** PUT IT ON THE PAGE ****

		//  --> CREATE SVG

		// 1. Add the SVG to the page
		// Here we're telling d3 to grab the element with the id of chart and append an svg to it.
		// Then we give it height and width attributes.  We use the height and width we set above and also add the margins we set above.
		// The reason we need the margins is that we need room for the axes labels.  And it's also nice to have a bit of padding around the chart itself
		// in theis example the chart size plus margin is the white space
		// You'll notice that we also apend a 'g', g in svgs are for grouping and we'll be adding all the details of the chart into this group
		const svg = d3.select("#chart").append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
		  .append("g")
		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		//  --> X-AXIS

		// 3. Call the x axis in a group tag
		// We create a group and translate it to the bottom of the chart using the height attribute
		// since everything in an SVG starts at the top left corner,  translating it the height will put it at the bottom of the chart.
		// Then we set the axisBottom using the xScale we created above
		//Finally we add ticks to the axis with the value of the year
		svg.append("g")
		    .attr("class", "x axis")
		    .attr("transform", "translate(0," + height + ")")
		    .call(d3.axisBottom(xScale).tickFormat((d) => dataset[d].year)); // Create an axis component with d3.axisBottom

		//  --> Y-AXIS

		// 4. Call the y axis in a group tag
		svg.append("g")
		    .attr("class", "y axis")
		    .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

		// --> ADD LINE

		// 9. Append the path, bind the data, and call the line generator
		svg.append("path")
		    .datum(dataset) // 10. Binds data to the line
		    .attr("class", "line") // Assign a class for styling
		    .attr("d", line) // 11. Calls the line generator
		    .attr("transform", "translate(30, 0)")


		// --> ADD DOTS

		// 12. Appends a circle for each datapoint
		svg.selectAll(".dot")
		    .data(dataset)
		  .enter().append("circle") // Uses the enter().append() method
		    .attr("class", "dot") // Assign a class for styling
		    .attr("cx", (d, i) => xScale(i) )
		    .attr("cy", (d) => yScale(d.professionals_employed) )
		    .attr("r", 8)
		    .attr("transform", "translate(30, 0)")
