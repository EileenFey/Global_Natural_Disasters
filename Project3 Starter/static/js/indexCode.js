// import csv w D3
let temp_name, country_list = []; 
function init(){
  d3.csv("./joined_disaster_data.csv", function(data) {
  // Set a variable for the column names
  let disaster_type = data.columns;
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

  // function to 1. get radius based on type of death selected, and 2. return a radius based on the number of deaths
  function getRadius(country_data) {
    if (selectedValue = country_data.drought_deaths) return country_data.drought_deaths * .01;
    if (selectedValue = country_data.flood_deaths) return country_data.flood_deaths * .01;
    if (selectedValue = country_data.earthquake_deaths) return country_data.earthquake_deaths * .01;
    if (selectedValue = country_data.extreme_temp_deaths) return country_data.extreme_temp_deaths * 0.01;
    if (selectedValue = country_data.extreme_weather_deaths) return country_data.extreme_weather_deaths * 0.01;
    if (selectedValue = country_data.other_deaths) return country_data.other_deaths * .01;
    if (selectedValue = country_data.total_deaths) return country_data.total_deaths * .01;
  }
  // Set radius based on the number of deaths
  // radius = country_data.total_deaths * 0.001;

  return {
    weight: 1,
    opacity: 0.6,
    fillOpacity: 0.25,
    fillColor: getColor(),
    color: getColor(),
    radius: getRadius()
  };
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