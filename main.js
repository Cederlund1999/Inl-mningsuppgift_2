const weatherApi = {
  key: "d302c80ce01e6c66f271e7216cd41e93",
  base: "https://api.openweathermap.org/data/2.5/",
};
const fourApi = {
  CLIENT_ID: "DMEKZYPRJUD4OFWZSTKLA0HNKGQG5BXBLW12DGVGAEAXJAIA",
  CLIENT_SECRET: "5UDKNBU3YQJ0LA5SZMFVFRF5S3ZJO4QXDVBVUWRGEIW4U1BV",
  base: "https://api.foursquare.com/v2/venues/search",
};


/*function getCityWeatherUrl(city) {
  let url = new URL("https://api.openweathermap.org/data/2.5/weather");
  url.searchParams.append("q", city);
  console.log(url+" här är url");
  console.log(city +"citynamnhehe");
  url.searchParams.append("appid", "d302c80ce01e6c66f271e7216cd41e93");
  url.searchParams.append("units", "metric");
  return url;
  
}
let city = "London";
let url = getCityWeatherUrl(city);
window.url = url;
console.log(url);*/



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
    let currentWeather = document.querySelector('.current .weather');
    currentWeather.innerHTML = (response.weather[0].main);
}

function getPlacesResults(q){
    fetch(`${fourApi.base}?client_id=${fourApi.CLIENT_ID}&client_secret=${fourApi.CLIENT_SECRET}&near=${q}&categoryId=4bf58dd8d48988d12d941735&limit=4&v=20210204`).then(venues => {
        return venues.json()}).then(displayPlacesResults);
        
}
function displayPlacesResults(venues){
console.log(venues);
let firstMonument = document.querySelector('.top3 .place1');
firstMonument.innerHTML = (venues.response.venues[0].name + " <br> Adress:  " + venues.response.venues[0].location.address); 
let secondMonument = document.querySelector('.top3 .place2');
secondMonument.innerHTML = (venues.response.venues[1].name + " <br> Adress:  " + venues.response.venues[1].location.address);
let thirdMonument = document.querySelector('.top3 .place3');
thirdMonument.innerHTML = (venues.response.venues[2].name + " <br> Adress:  " + venues.response.venues[2].location.address);


}

