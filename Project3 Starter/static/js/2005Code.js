// import csv w D3
let temp_name, country_list = []; 
function init(){
  d3.csv("./joined_disaster_data.csv", function(data) {
    // Set a variable for the column names
    let disaster_type = data.columns;
  // Set a variable for the column names
    // Add event listener to the dropdown menu
    let country_data = data.filter(country => country.year === "2005");
    country_data.forEach(country => {
      processCountryData(country);
      country_list.push(country);
    });
    // Log the data
    console.log(data);
  

});}

// loop through all the countries 
function processCountryData(country_data) {
  L.circle([country_data.latitude, country_data.longitude],styleInfo(country_data)
  ).bindPopup(`<h1>Stats\</h1> <hr> <h3>Country: ${country_data.country}</h3> <h3>Lat/Long: ${country_data.latitude}, 
  ${country_data.longitude} </h3> <h3>Deaths: ${country_data.extreme_temp_deaths}`).addTo(map);
}

function styleInfo(country_data) {
  let fillColor, radius;

  // Set radius based on the number of deaths
  radius = country_data.total_deaths * 1;

  return {
    weight: 1,
    opacity: 0.6,
    fillOpacity: 0.25,
    fillColor: "#F70016",
    color: "#F70016",
    radius: radius
  };
}
//   Initialize the map
 let map = L.map('map').setView([0, 0], 2);

  // Add the base OpenStreetMap layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map);

// Call the initialize function
init();