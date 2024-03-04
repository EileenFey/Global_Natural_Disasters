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

  data
    .filter((disaster) => parseInt(disaster.drought_deaths) > 0)
    .forEach((selectedYearDisaster) =>
      processCountryData(selectedYearDisaster, "drought_deaths")
    );
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

  // Function to handle changes in the dropdown menu
});

function optionChanged(disasterType) {
  circleLayers.clearLayers();
  d3.csv("./joined_disaster_data.csv", (data) => {
    data
      .filter((disaster) => parseInt(disaster[disasterType]) > 0)
      .forEach((selectedYearDisaster) =>
        processCountryData(selectedYearDisaster, disasterType)
      );
  });
}

// function optionYearChanged(value)
// console.log(value);

// loop through all the countries

// loop through all the countries
function processCountryData(country_data, disasterType) {
  L.circle(
    [country_data.latitude, country_data.longitude],
    (radius = getRadius(country_data, disasterType)),
    styleInfo(country_data, disasterType)
  )
    .bindPopup(
      `<h1>Stats\</h1> <hr> <h3>Country: ${country_data.country}</h3> <h3>Lat/Long: ${country_data.latitude}, 
  ${country_data.longitude} </h3> <h3>Deaths per 100,000: ${country_data[disasterType]}`
    )
    .addTo(circleLayers);

  map.addLayer(circleLayers);
  // getColor(country_data)
}

function getRadius(country_data, disasterType) {
  return parseInt(country_data[disasterType]) * 100;
}
function styleInfo(country_data, disasterType) {
  let fillColor;

  // Set fill color based on disaster type
  function getColor(disasterType) {
    if (disasterType == "drought_deaths") return "#DAB783";
    if (disasterType == "flood_deaths") return "#055590";
    if (disasterType == "earthquake_deaths") return "#E36A29";
    if (disasterType == "extreme_temp_deaths") return "#DA0400";
    if (disasterType == "extreme_weather_deaths") return "#02A902";
    if (disasterType == "other_deaths") return "#BF80FA";
    if (disasterType == "total_deaths") return "#F70016";
    fillColor = "#CDCCCA"; // Default color
  }

  // function to 1. get radius based on type of death selected, and 2. return a radius based on the number of deaths

  // Set radius based on the number of deaths
  // radius = country_data.total_deaths * 0.001;

  return {
    weight: 1,
    opacity: 0.6,
    fillOpacity: 0.25,
    fillColor: getColor(disasterType),
    color: getColor(disasterType),
  };
}
