// import csv w D3
let temp_name, country_list = []; 
function init(){
  d3.csv("./joined_disaster_data.csv", function(data) {
  // Set a variable for the column names
  let disaster_type = data.columns;
  let dropdownMenu = d3.select("#selDataset");

  // Add options to the dropdown menu for each column name
  disaster_type.slice(5,13).map((header) => {
    dropdownMenu.append("option")
      .text(header)
      .property("value", header);
  });

    // Add event listener to the dropdown menu
    dropdownMenu.on("change", function() {
      let selectedValue = this.value;
      updateMap(selectedValue); // Call a function to update the map based on the selected value
    });
    let country_data = data.slice(0,5727);

    for (let i = 0; i < country_data.length; i++) {
      let country = country_data[i]
      processCountryData(country);
      country_list.push(country)
    }
    // Log the data
    console.log(data);
  

});}

// loop through all the countries 
function processCountryData(country_data) {
  // console.log(`Country: ${country_data.country}`);
  // console.log(`Coordinates: Latitude ${country_data.latitude}, Longitude ${country_data.longitude}`);
  // console.log(`Code: ${country_data.code}`);
  // console.log(`Year: ${country_data.year}`);
  // console.log(`Drought Deaths: ${country_data.drought_deaths}`);
  // console.log(`Flood Deaths: ${country_data.flood_deaths}`);
  // console.log(`Earthquake Deaths: ${country_data.earthquake_deaths}`);
  // console.log(`Extreme Weather Deaths: ${country_data.extreme_weather_deaths}`);
  // console.log(`Extreme Temperature Deaths: ${country_data.extreme_temp_deaths}`);
  // console.log(`Other Deaths: ${country_data.other_deaths}`);
  // console.log(`Total Deaths: ${country_data.total_deaths}`);
  L.circle([country_data.latitude, country_data.longitude],styleInfo(country_data)
  ).bindPopup(`<h1>Stats\</h1> <hr> <h3>Country: ${country_data.country}</h3> <h3>Lat/Long: ${country_data.latitude}, 
  ${country_data.longitude} </h3> <h3>Deaths: ${country_data.extreme_temp_deaths}`).addTo(map);

    // getColor(country_data)
}
function dropdownfilter(country_data) {
console.log(country_data.country)
console.log(temp_name)

}

// function getColor(country_data) {
//   console.log(typeof country_data);
//   let depth = country_data.extreme_temp_deaths
//   if (depth > 10000) return "#FFA500";
//   else if (depth > 1000) return "#FF7F7F";
//   else if (depth > 100) return "#FF0000";
//   else if (depth > 10) return "#FFFF00";
// }

function styleInfo(country_data, selectedValue) {
  let fillColor, radius;

  // Set fill color based on disaster type
  function getColor(country_data) {
    if (selectedValue = country_data.drought_deaths) return "#DAB783";
    if (selectedValue = country_data.flood_deaths) return "#055590";
    if (selectedValue = country_data.earthquake_deaths) return "#E36A29";
    if (selectedValue = country_data.extreme_temp_deaths) return "#DA0400";
    if (selectedValue = country_data.extreme_weather_deaths) return "#02A902";
    if (selectedValue = country_data.other_deaths) return "#BF80FA";
    if (selectedValue = country_data.total_deaths) return "#F70016";
      fillColor = "#CDCCCA"; // Default color
}

  // Set radius based on the number of deaths
  radius = country_data[selectedValue] ? country_data[selectedValue] * 0.1 : 0;

  return {
    weight: 1,
    opacity: 0.8,
    fillOpacity: 0.35,
    fillColor: getColor(country_data),
    color: getColor(country_data),
    radius: radius
  };
}
// Function to select appropriate disaster data based on dropdown selection
function disasterSelect(country_data, value) {
  return country_data[value];
}

// Function to update map based on dropdown selection
function updateMap(selectedValue) {
  // Your code to update the map visualization based on the selected value
}

function radius(country_data) {
  console.log(typeof country_data);
  let rad = country_data.extreme_temp_deaths * 1000
  return rad;
}

function disasterSelect(menuSel) {

  if (menuSel = "drought_deaths") {
    disasterSel = country_data.drought_deaths;
  }
  if (menuSel = "flood_deaths") {
    disasterSel = country_data.flood_deaths;
  }
  if (menuSel = "earthquake_deaths") {
    disasterSel = country_data.earthquake_deaths;
  }
  if (menuSel = "extreme_weather_deaths") {
    disasterSel = country_data.extreme_weather_deaths;
  }
  if (menuSel = "extreme_temp_deaths") {
    disasterSel = country_data.extreme_temp_deaths;
  }
  if (menuSel = "other_deaths") {
    disasterSel = country_data.other_deaths;
  }
  if (menuSel = "total_deaths") {
    disasterSel = country_data.drought_deaths;
  }

  return disasterSel;
}

//   Initialize the map
 let map = L.map('map').setView([0, 0], 2);

  // Add the base OpenStreetMap layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map);

function optionChanged(value) { 
  temp_value = value
  let filtered_country = country_list.map(country => {
    return {
      death_type: parseInt(country[value]),
      year: country.year,
      countryName: country.country,
      latitude: country.latitude,
      longitude: country.longitude
    }
  })
  (filtered_country)
};

// Call the initialize function
init();