// import csv w D3
d3.csv("./joined_disaster_data.csv", (data) => {
  console.log(data);
  // Set a variable for the column names
  let disaster_type = data.columns;
  let dropdownMenu = d3.select("#selDataset");

  // let country_data = data.slice(0, 5727);
  // console.log(country_data);
  // for (let i = 0; i < country_data.length; i++) {
  //   let country = country_data[i];
  //   processCountryData(country);
  // }
  // Add options to the dropdown menu for each column name
  disaster_type.slice(5, 11).map((header) => {
    dropdownMenu.append("option").text(header).property("value", header);
  });

  let dropdownMenuYear = d3.select("#selYear");

  //drop duplicate years
  const uniqueYears = [...new Set(data.map((disaster) => disaster.year))];
  console.log(uniqueYears);

  // Order the array in ascending order
  const sortedYears = uniqueYears.sort((a, b) => a - b);

  // Populate the dropdown menu with sorted years
  sortedYears.forEach((year) => {
    dropdownMenuYear.append("option").text(year).property("value", year);
  });

  // Initialize noUiSlider for the year slider
  var slider = document.getElementById("year-slider");
  noUiSlider.create(slider, {
    start: parseInt(sortedYears[0]), // initial range of years
    connect: true,
    range: {
      min: parseInt(sortedYears[0]),
      max: parseInt(sortedYears[sortedYears.length - 1]),
    },
    step: 1,
    pips: { mode: "steps" },
  });
  // When the slider is moved, update the map based on the selected year range
  slider.noUiSlider.on("update", function (values, handle) {
    // values contains the selected range [start, end]
    //   var selectedYears = values.map((value) => parseInt(value));
    //   updateMap(selectedYears);
    console.log(parseInt(values[0]));
    onYearChange(parseInt(values[0]));
  });
  // Function to handle changes in the dropdown menu
});
function optionChanged(disasterType) {
  d3.csv("./joined_disaster_data.csv", (data) => {
    data
      .filter((disaster) => parseInt(disaster[disasterType]) > 0)
      .forEach((selectedYearDisaster) =>
        processCountryData(selectedYearDisaster)
      );
  });
  // Update the map based on the selected year
  // updateMap([selectedYear, selectedYear]);
  console.log(disasterType);
}
function onYearChange(selectedYear) {
  d3.csv("./joined_disaster_data.csv", (data) => {
    data
      .filter((disaster) => disaster.year == selectedYear)
      .forEach((selectedYearDisaster) =>
        processCountryData(selectedYearDisaster)
      );
  });
}
// function optionYearChanged(value)
// console.log(value);

// loop through all the countries
function processCountryData(country_data) {
  console.log({ country: country_data.country, year: country_data.year });
  // console.log(`Country: ${country_data.country}`);
  // console.log(
  //   `Coordinates: Latitude ${country_data.latitude}, Longitude ${country_data.longitude}`
  // );
  // console.log(`Code: ${country_data.code}`);
  // console.log(`Year: ${country_data.year}`);
  // console.log(`Drought Deaths: ${country_data.drought_deaths}`);
  // console.log(`Flood Deaths: ${country_data.flood_deaths}`);
  // console.log(`Earthquake Deaths: ${country_data.earthquake_deaths}`);
  // console.log(`Extreme Weather Deaths: ${country_data.extreme_weather_deaths}`);
  // console.log(
  //   `Extreme Temperature Deaths: ${country_data.extreme_temp_deaths}`
  // );
  // console.log(`Other Deaths: ${country_data.other_deaths}`);
  L.circle(
    [country_data.latitude, country_data.longitude],
    styleInfo(country_data)
  )
    .addTo(map)
    .bindPopup();
}

function getColor(country_data) {
  let depth = country_data.extreme_temp_deaths;
  if (depth > 90) return "#FB1401";
  return "#038006";
}

function styleInfo(country_data) {
  return {
    // USE STYLE ATTRIBUTES (e.g., opacity, fillOpacity, stroke, weight)
    weight: 1,
    opacity: 0.8,
    fillOpacity: 0.35,
    fillColor: getColor,
    color: getColor,
    // radius: getRadius(feature.properties.mag) // Pass magnitude to getRadius
  };
}

// Loop through each country in the array and process its data
// countriesData.forEach(processCountryData);

// // Set the first sample from the list
// let sample_one = names[0];

// // Log the value of sample_one
// console.log(sample_one);

// // Build the initial plots
// buildMetadata(sample_one);
// buildBarChart(sample_one);
// buildBubbleChart(sample_one);
// buildGaugeChart(sample_one);

//

// to parse the csv use below
// let raw_data = "foo,bar,baz\n42,33,42\n12,76,54\n13,42,17";

// let final_data = d3.csvParse(raw_data);

// console.log(data);

// initialize world map title layer
//   Initialize the map
let map = L.map("map").setView([0, 0], 2);

// Add the base OpenStreetMap layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
}).addTo(map);

// Add a marker
// L.marker([0, 0]).addTo(map)
//   .bindPopup('A sample popup.');

// create drop down menu

// Initialize the dashboard at start up
// function init() {

//     // Use D3 to select the dropdown menu
//     let dropdownMenu = d3.select("#selDataset");

//     // Use D3 to get sample names and populate the drop-down selector
//     d3.json(url).then((data) => {

//         // Set a variable for the sample names
//         let disaster = data.;

//         // Add  samples to dropdown menu
//         names.forEach((id) => {

//             // Log the value of id for each iteration of the loop
//             console.log(id);

//             dropdownMenu.append("option")
//             .text(id)
//             .property("value",id);
//         });

//         // Set the first sample from the list
//         let sample_one = names[0];

//         // Log the value of sample_one
//         console.log(sample_one);

//         // Build the initial plots
//         buildMetadata(sample_one);
//         buildBarChart(sample_one);
//         buildBubbleChart(sample_one);
//         buildGaugeChart(sample_one);

//     });

// // Function that populates metadata info
// function buildMetadata(sample) {

//     // Use D3 to retrieve all of the data
//     d3.json(url).then((data) => {

//         // Retrieve all metadata
//         let metadata = data.metadata;

//         // Filter based on the value of the sample
//         let value = metadata.filter(result => result.id == sample);

//         // Log the array of metadata objects after the have been filtered
//         console.log(value)

//         // Get the first index from the array
//         let valueData = value[0];

//         // Clear out metadata
//         d3.select("#sample-metadata").html("");

//         // Use Object.entries to add each key/value pair to the panel
//         Object.entries(valueData).forEach(([key,value]) => {

//             // Log the individual key/value pairs as they are being appended to the metadata panel
//             console.log(key,value);

//             d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
//         });
//     });

// };

// // Function that builds the bar chart
// function buildBarChart(sample) {

//     // Use D3 to retrieve all of the data
//     d3.json(url).then((data) => {

//         // Retrieve all sample data
//         let sampleInfo = data.samples;

//         // Filter based on the value of the sample
//         let value = sampleInfo.filter(result => result.id == sample);

//         // Get the first index from the array
//         let valueData = value[0];

//         // Get the otu_ids, lables, and sample values
//         let otu_ids = valueData.otu_ids;
//         let otu_labels = valueData.otu_labels;
//         let sample_values = valueData.sample_values;

//         // Log the data to the console
//         console.log(otu_ids,otu_labels,sample_values);

//         // Set top ten items to display in descending order
//         let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
//         let xticks = sample_values.slice(0,10).reverse();
//         let labels = otu_labels.slice(0,10).reverse();

//         // Set up the trace for the bar chart
//         let trace = {
//             x: xticks,
//             y: yticks,
//             text: labels,
//             type: "bar",
//             orientation: "h"
//         };

//         // Setup the layout
//         let layout = {
//             title: "Top 10 OTUs Present"
//         };

//         // Call Plotly to plot the bar chart
//         Plotly.newPlot("bar", [trace], layout)
//     });
// };

// // Function that builds the bubble chart
// function buildBubbleChart(sample) {

//     // Use D3 to retrieve all of the data
//     d3.json(url).then((data) => {

//         // Retrieve all sample data
//         let sampleInfo = data.samples;

//         // Filter based on the value of the sample
//         let value = sampleInfo.filter(result => result.id == sample);

//         // Get the first index from the array
//         let valueData = value[0];

//         // Get the otu_ids, lables, and sample values
//         let otu_ids = valueData.otu_ids;
//         let otu_labels = valueData.otu_labels;
//         let sample_values = valueData.sample_values;

//         // Log the data to the console
//         console.log(otu_ids,otu_labels,sample_values);

//         // Set up the trace for bubble chart
//         let trace1 = {
//             x: otu_ids,
//             y: sample_values,
//             text: otu_labels,
//             mode: "markers",
//             marker: {
//                 size: sample_values,
//                 color: otu_ids,
//                 colorscale: "Earth"
//             }
//         };

//         // Set up the layout
//         let layout = {
//             title: "Bacteria Per Sample",
//             hovermode: "closest",
//             xaxis: {title: "OTU ID"},
//         };

//         // Call Plotly to plot the bubble chart
//         Plotly.newPlot("bubble", [trace1], layout)
//     });
// };

// // Function that updates dashboard when sample is changed
// function optionChanged(value) {

//     // Log the new value
//     console.log(value);

//     // Call all functions
//     buildMetadata(value);
//     buildBarChart(value);
//     buildBubbleChart(value);
//     buildGaugeChart(value);
// };

// // Call the initialize function
// init();
