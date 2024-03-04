// import csv w D3
//

// initialize world map title layer
//   Initialize the map
let map = L.map("map").setView([0, 0], 2);

// Add the base OpenStreetMap layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
}).addTo(map);

var circleLayers = L.layerGroup();

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

  // Order the array in ascending order
  const sortedYears = uniqueYears.sort((a, b) => a - b);

  // Populate the dropdown menu with sorted years
  sortedYears.forEach((year) => {
    dropdownMenuYear.append("option").text(year).property("value", year);
  });

  // Initialize noUiSlider for the year slider
  function filterPips(value) {
    if (value % 10 === 0) {
      return 1;
    }
    return -1;
  }
  var slider = document.getElementById("year-slider");
  noUiSlider.create(slider, {
    start: parseInt(sortedYears[0]), // initial range of years
    connect: true,
    range: {
      min: parseInt(sortedYears[0]),
      max: parseInt(sortedYears[sortedYears.length - 1]),
    },
    step: 1,
    pips: { mode: "steps", filter: filterPips },
  });
  // When the slider is moved, update the map based on the selected year range
  slider.noUiSlider.on("update", function (values, handle) {
    onYearChange(parseInt(values[0]));
  });
  // Function to handle changes in the dropdown menu
});

function optionChanged(disasterType) {
  circleLayers.clearLayers();
  d3.csv("./joined_disaster_data.csv", (data) => {
    data
      .filter((disaster) => parseInt(disaster[disasterType]) > 0)
      .forEach((selectedYearDisaster) =>
        processCountryData(selectedYearDisaster)
      );
  });
}

function onYearChange(selectedYear) {
  circleLayers.clearLayers();
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

// loop through all the countries
function processCountryData(country_data) {
  L.circle(
    [country_data.latitude, country_data.longitude],
    (radius = getRadius(country_data)),
    styleInfo(country_data)
  )
    .bindPopup(
      `<h1>Stats\</h1> <hr> <h3>Country: ${country_data.country}</h3> <h3>Lat/Long: ${country_data.latitude}, 
  ${country_data.longitude} </h3> <h3>Deaths per 100,000: ${country_data.total_deaths}`
    )
    .addTo(circleLayers);

  map.addLayer(circleLayers);
  // getColor(country_data)
}

function getRadius(country_data) {
  return country_data.total_deaths * 1000;
}
function styleInfo(country_data, selectedValue) {
  let fillColor, radius;

  // Set fill color based on disaster type
  // function getColor(country_data) {
  //   if (parseInt(country_data.drought_deaths) > 0) return "#DAB783";
  //   if (parseInt(country_data.flood_deaths) > 0) return "#055590";
  //   if (parseInt(country_data.earthquake_deaths) > 0) return "#E36A29";
  //   if (parseInt(country_data.extreme_temp_deaths) > 0) return "#DA0400";
  //   if (parseInt(country_data.extreme_weather_deaths) > 0) return "#02A902";
  //   if (parseInt(country_data.other_deaths) > 0) return "#BF80FA";
  //   if (parseInt(country_data.total_deaths) > 0) return "#F70016";
  //   fillColor = "#CDCCCA"; // Default color
  // }

  // function to 1. get radius based on type of death selected, and 2. return a radius based on the number of deaths

  // Set radius based on the number of deaths
  // radius = country_data.total_deaths * 0.001;

  return {
    weight: 1,
    opacity: 0.6,
    fillOpacity: 0.25,
    fillColor: "#F70016",
    color: "#F70016",
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
