const weatherApi = {
  key: "d302c80ce01e6c66f271e7216cd41e93",
  base: "https://api.openweathermap.org/data/2.5/",
};
const fourApi = {
  CLIENT_ID: "DMEKZYPRJUD4OFWZSTKLA0HNKGQG5BXBLW12DGVGAEAXJAIA",
  CLIENT_SECRET: "5UDKNBU3YQJ0LA5SZMFVFRF5S3ZJO4QXDVBVUWRGEIW4U1BV",
  base: "https://api.foursquare.com/v2/venues/search",
};






const searchInput = document.querySelector(".searchbox");
searchInput.addEventListener("keypress", executeSearch);

function executeSearch(s) {
  if (s.keyCode == 13) {
    getWeatherResults(searchInput.value);
    getPlacesResults(searchInput.value);
  }
}

function getWeatherResults(q){
fetch(`${weatherApi.base}weather?q=${q}&appid=${weatherApi.key}`)
  .then(response => {
   return response.json()}).then(displayWeatherResults);
  console.log(searchInput.value);

}

function displayWeatherResults(response){
    console.log(response);
    let temperature = document.querySelector('.current .temperature');
    temperature.innerHTML = (response.main.temp);
    let city = document.querySelector('.location .city');
    city.innerHTML = (response.name);
}

function getPlacesResults(q){
    fetch(`${fourApi.base}?client_id=${fourApi.CLIENT_ID}&client_secret=${fourApi.CLIENT_SECRET}&near=${q}&query=sushi&v=20210204`).then(venues => {
        return venues.json()}).then(displayPlacesResults);
        
}
function displayPlacesResults(venues){
console.log(venues);

}

