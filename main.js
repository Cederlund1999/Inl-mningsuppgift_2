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
/* Här använder jag fetch i en funktion för att göra en request till den url'en jag vill och får tillbaks ett respons objekt. 
Sedan om responsen är ok görs den om till json för att jag ska kunna läsa av och använda responsen jag fick från servern.
Sedan körs min funktion displayWeatherResults där jag använder responsen jag fått för att uppdatera i DOM och visa vilken temperatur det är etc.
Varje gång en användare skriver något i sökrutan och trycker på "enter" så körs denna funktionen och gör en request. */
function getWeatherResults(q) {
  fetch(`${weatherApi.base}weather?q=${q}&units=metric&appid=${weatherApi.key}`)
    .then((response) => {
      if (response.ok) {
        console.log(response);
        return response.json();
      } else {
        alert("City not found, try again!");
      }
    })

    .then(displayWeatherResults);

  console.log(searchInput.value);
}

function displayWeatherResults(response) {
  console.log(response);
  var weatherCheckBox = document.getElementById("weatherBox");
  iconURL = "http://openweathermap.org/img/w/";
  if (weatherCheckBox.checked == true) {
    document.getElementById("currentWeather").style.display = "block";
    document.getElementById("currentLocation").style.display = "block";

    iconURL = iconURL + response.weather[0].icon + ".png";
    console.log(iconURL);
    document.getElementById("weatherPicture").src = iconURL;

    let temperature = document.querySelector(".current .temperature");
    temperature.innerHTML = Math.round(response.main.temp) + "°C";
    let city = document.querySelector(".location .city");
    city.innerHTML = response.name + ", " + response.sys.country;
    let currentWeather = document.querySelector(".current .weather");
    currentWeather.innerHTML = response.weather[0].main;
  } else {
    document.getElementById("currentWeather").style.display = "none";
    document.getElementById("currentLocation").style.display = "none";
  }
}
/*
Här händer det exakt samma sak som föregående fast med foursquare api'n istället. 
I url'en skickar jag med vad jag vill få för respons. Jag skickar med att jag vill ha resultat i närheten av sökinputen, och skickad med kategori id vilket i detta fall är monument.
Jag vill ha ett svar med max 4 monument.
Jag anger att jag är redo för API ändringar fram tills datumet jag angett i "v"
*/
function getPlacesResults(q) {
  fetch(
    `${fourApi.base}?client_id=${fourApi.CLIENT_ID}&client_secret=${fourApi.CLIENT_SECRET}&near=${q}&categoryId=4bf58dd8d48988d12d941735&limit=4&v=20210215`
  )
    .then((venues) => {
      if (venues.ok) {
        return venues.json();
      } else {
        console.log("no monuments available for this city");
      }
    })
    .then(displayPlacesResults);
}
function displayPlacesResults(venues) {
  console.log(venues);
  var venuesCheckBox = document.getElementById("venueBox");

  if (venuesCheckBox.checked == true) {
    document.getElementById("top3Venues").style.display = "flex";

    let firstMonument = document.querySelector(".top3 .place1");
    firstMonument.innerHTML =
      venues.response.venues[0].name +
      " <br> Adress:  " +
      venues.response.venues[0].location.address;
    let secondMonument = document.querySelector(".top3 .place2");
    secondMonument.innerHTML =
      venues.response.venues[1].name +
      " <br> Adress:  " +
      venues.response.venues[1].location.address;
    let thirdMonument = document.querySelector(".top3 .place3");
    thirdMonument.innerHTML =
      venues.response.venues[2].name +
      " <br> Adress:  " +
      venues.response.venues[2].location.address;
  } else {
    document.getElementById("top3Venues").style.display = "none";
  }
}
{
  let newDate = new Date();
  let year = newDate.getFullYear();
  let month = newDate.getMonth() + 1;
  let date = newDate.getDate();
  document.getElementById("date").innerHTML = month + "/" + date + "/" + year;
}
