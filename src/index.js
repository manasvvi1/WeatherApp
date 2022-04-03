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

document.querySelector(".searchBtn").addEventListener("click", changeCityDisplay);

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
}

function changeDayTime(){
  let hour = dateNTime.getHours();
  let min = dateNTime.getMinutes();
  let todayDay = day[dateNTime.getDay()];
  if(hour > 9 && min > 9){
    document.querySelector(".dayTimeDisplay").innerHTML = `${todayDay} ${hour}:${min}`;
  }
  else if(hour > 9){
    document.querySelector(".dayTimeDisplay").innerHTML = `${todayDay} ${hour}:0${min}`;
  }
  else if(min > 9){
    document.querySelector(".dayTimeDisplay").innerHTML = `${todayDay} 0${hour}:${min}`;
  }
  else{
    document.querySelector(".dayTimeDisplay").innerHTML = `${todayDay} 0${hour}:0${min}`;
  }
}

changeDayTime();

function changeDesc(response){
  document.querySelector(".windSpeedDisplay").innerHTML = `Wind: ${response.data.wind.speed}km/hr`;
  document.querySelector(".humidityDisplay").innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector(".weatherDescDisplay").innerHTML = response.data.weather[0].description;
  document.querySelector(".temperatureDisplay").innerHTML = response.data.main.temp.toFixed(0);
  let weatherIcon = response.data.weather[0].icon;
  let iconURL = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
  document.querySelector(".tempEmojiDisplay").innerHTML = `<img src=${iconURL}>`;
  console.log(response);
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
    document.querySelector(".temperatureDisplay").innerHTML = temp;
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
    document.querySelector(".temperatureDisplay").innerHTML = temp;
  }
}