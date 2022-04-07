let dateNTime = new Date();

let day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

let city = "Delhi";
let apiKey = "5524e0e680f83cc2d9461aafa8209a99";
let apiURL;
let forecastAPIUrl;
let unit = "C";

document.querySelector(".searchBtn").addEventListener("click", changeCityDisplay);

document.querySelector('#searchByCityName').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    changeCityDisplay();
  }
});

document.querySelector(".cityNameDisplay").innerHTML = city;
document.querySelector("#searchByCityName").value = "";
apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiURL).then(changeDesc);

function changeCityDisplay(){
  city = document.querySelector("#searchByCityName").value;
  document.querySelector(".cityNameDisplay").innerHTML = city;
  document.querySelector("#searchByCityName").value = "";
  apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(changeDesc);
  document.querySelector(".convertCelsius").classList.remove("colorBlack");
  document.querySelector(".convertCelsius").classList.add("colorBlue");
  document.querySelector(".convertFahrenheit").classList.remove("colorBlue");
  document.querySelector(".convertFahrenheit").classList.add("colorBlack");
}

let forecastMaxTemp = [];
let forecastMinTemp = [];
let forecastIcon = [];

function getForecast(response){
  for(let i = 0 ; i < 6 ; i++){
    forecastMaxTemp.push(response.data.daily[i].temp.max.toFixed(0));
    forecastMinTemp.push(response.data.daily[i].temp.min.toFixed(0));
    forecastIcon.push(response.data.daily[i].weather[0].icon);
  }
  forecastDisplay();
}

let hour = dateNTime.getHours();
let min = dateNTime.getMinutes();
let todayDay = dateNTime.getDay();
if(hour > 9 && min > 9){
  document.querySelector(".dayTimeDisplay").innerHTML = `${day[todayDay]} ${hour}:${min}`;
}
else if(hour > 9){
  document.querySelector(".dayTimeDisplay").innerHTML = `${day[todayDay]} ${hour}:0${min}`;
}
else if(min > 9){
  document.querySelector(".dayTimeDisplay").innerHTML = `${day[todayDay]} 0${hour}:${min}`;
}
else{
  document.querySelector(".dayTimeDisplay").innerHTML = `${day[todayDay]} 0${hour}:0${min}`;
}

function changeDesc(response){
  document.querySelector(".windSpeedDisplay").innerHTML = `Wind: ${response.data.wind.speed}km/hr`;
  document.querySelector(".humidityDisplay").innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector(".weatherDescDisplay").innerHTML = response.data.weather[0].description;
  document.querySelector(".temperatureDisplay").innerHTML = response.data.main.temp.toFixed(0);
  let weatherIcon = response.data.weather[0].icon;
  let iconURL = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
  document.querySelector(".tempEmojiDisplay").innerHTML = `<img src=${iconURL}>`;
  forecastAPIUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&exclude=current,minutely,hourly&appid=${apiKey}&units=metric`;
  forecastMaxTemp = [];
  forecastMinTemp = [];
  axios.get(forecastAPIUrl).then(getForecast);
}

document.querySelector(".convertFahrenheit").addEventListener("click", convertToFahrenheit);
document.querySelector(".convertCelsius").addEventListener("click", convertToCelsius);

function convertToCelsius(){
  if(document.querySelector(".convertCelsius").classList.contains("colorBlack")){
    document.querySelector(".convertCelsius").classList.remove("colorBlack");
    document.querySelector(".convertCelsius").classList.add("colorBlue");
    document.querySelector(".convertFahrenheit").classList.remove("colorBlue");
    document.querySelector(".convertFahrenheit").classList.add("colorBlack");
    let temp = parseInt(document.querySelector(".temperatureDisplay").innerHTML).toFixed(0);
    temp = (temp - 32)*5/9;
    document.querySelector(".temperatureDisplay").innerHTML = temp.toFixed(0);
    for(let i = 0 ; i < 6 ; i++){
      forecastMaxTemp[i] = parseInt((forecastMaxTemp[i]-32)*5/9).toFixed(0);
      forecastMinTemp[i] = parseInt((forecastMinTemp[i]-32)*5/9).toFixed(0)
    }
    unit = "C";
    forecastDisplay();
  }
}

function convertToFahrenheit(){
  if(document.querySelector(".convertFahrenheit").classList.contains("colorBlack")){
    document.querySelector(".convertFahrenheit").classList.remove("colorBlack");
    document.querySelector(".convertFahrenheit").classList.add("colorBlue");
    document.querySelector(".convertCelsius").classList.remove("colorBlue");
    document.querySelector(".convertCelsius").classList.add("colorBlack");
    let temp = parseInt(document.querySelector(".temperatureDisplay").innerHTML).toFixed(0);
    temp = temp*9/5+32;
    document.querySelector(".temperatureDisplay").innerHTML = temp.toFixed(0);
    for(let i = 0 ; i < 6 ; i++){
      forecastMaxTemp[i] = parseInt(forecastMaxTemp[i]*9/5+32).toFixed(0);
      forecastMinTemp[i] = parseInt(forecastMinTemp[i]*9/5+32).toFixed(0)
    }
    unit = "F";
    forecastDisplay();
  }
}

function forecastDisplay(){
  let insertHTML = "";

  let countDays = 0;

  for(let i = todayDay+1 ; i < 7 ; i++){
    let iconURL = `http://openweathermap.org/img/wn/${forecastIcon[countDays]}@2x.png`;

    let forecastBlock = `<div class="col-2 p-4">
    <h4 class="center">${day[i]}</h4>
    <div class="center"><img src="${iconURL}"></div>
    <span class="maxDay+1">${forecastMaxTemp[countDays]}<sup>&deg;${unit}</sup></span>
    <span class="minDay+1 float-end">${forecastMinTemp[countDays]}<sup>&deg;${unit}</sup></span>
    </div>`;
    countDays++;
    insertHTML += forecastBlock;
  }

  if(countDays != 6){
    for(let i = 0 ; countDays != 6 ; i++){
      let iconURL = `http://openweathermap.org/img/wn/${forecastIcon[countDays]}@2x.png`;

      let forecastBlock = `<div class="col-2 p-4">
      <h4 class="center">${day[i]}</h4>
      <div class="center"><img src="${iconURL}"></div>
      <span class="maxDay+1">${forecastMaxTemp[countDays]}<sup>&deg;${unit}</sup></span>
      <span class="minDay+1 float-end">${forecastMinTemp[countDays]}<sup>&deg;${unit}</sup></span>
      </div>`;
      countDays++;
      insertHTML += forecastBlock;
    }
  }

  document.querySelector(".forecastDaily").innerHTML = insertHTML;
}