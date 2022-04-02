let weather = {
  paris: {
    temp: 19.7,
    humidity: 80
  },
  tokyo: {
    temp: 17.3,
    humidity: 50
  },
  lisbon: {
    temp: 30.2,
    humidity: 20
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100
  },
  moscow: {
    temp: -5,
    humidity: 20
  }
};

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

let hour = dateNTime.getHours();
let min = dateNTime.getMinutes();

if (min > 9 && hour > 9) {
  document.getElementById("dateDisplay").innerHTML = `${
    day[dateNTime.getDay()]
  }, ${
    month[dateNTime.getMonth()]
  } ${dateNTime.getDate()}, ${hour}:${min}, ${dateNTime.getFullYear()}`;
} else if (min > 9) {
  document.getElementById("dateDisplay").innerHTML = `${
    day[dateNTime.getDay()]
  }, ${
    month[dateNTime.getMonth()]
  } ${dateNTime.getDate()}, 0${hour}:${min}, ${dateNTime.getFullYear()}`;
} else if (hour > 9) {
  document.getElementById("dateDisplay").innerHTML = `${
    day[dateNTime.getDay()]
  }, ${
    month[dateNTime.getMonth()]
  } ${dateNTime.getDate()}, ${hour}:0${min}, ${dateNTime.getFullYear()}`;
} else {
  document.getElementById("dateDisplay").innerHTML = `${
    day[dateNTime.getDay()]
  }, ${
    month[dateNTime.getMonth()]
  } ${dateNTime.getDate()}, 0${hour}:0${min}, ${dateNTime.getFullYear()}`;
}

let city = "Paris";
let apiUrl, apiKey;
apiKey = "5524e0e680f83cc2d9461aafa8209a99";

function getCityName() {
  city = document.getElementById("cityName").value;
  document.getElementById("cityNameDisplay").innerHTML = city;
  document.getElementById("cityName").value = "";
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeTempDisplay);
}

function convertFahren() {
  let temp = parseInt(document.getElementById("temperature").innerHTML);
  if (
    document.getElementById("convertToCelsius").classList.contains("underline")
  ) {
    document.getElementById("convertToCelsius").classList.remove("underline");
    document.getElementById("convertToFahrenheit").classList.add("underline");
    temp = (9 * temp) / 5 + 32;
    document.getElementById("temperature").innerHTML = temp.toFixed(2);
  }
}

function convertCelsius() {
  let temp = parseInt(document.getElementById("temperature").innerHTML);
  if (
    document
      .getElementById("convertToFahrenheit")
      .classList.contains("underline")
  ) {
    document
      .getElementById("convertToFahrenheit")
      .classList.remove("underline");
    document.getElementById("convertToCelsius").classList.add("underline");
    temp = ((temp - 32) * 5) / 9;
    document.getElementById("temperature").innerHTML = temp.toFixed(2);
  }
}

document.getElementById("changeButton").addEventListener("click", getCityName);

document
  .getElementById("convertToFahrenheit")
  .addEventListener("click", convertFahren);

document
  .getElementById("convertToCelsius")
  .addEventListener("click", convertCelsius);

function changeTempDisplay(response) {
  document.getElementById("temperature").innerHTML = response.data.main.temp;
  console.log(response.data.main.temp);
}

document
  .getElementById("currentLocation")
  .addEventListener("click", searchByCurrentLocation);

function searchByCurrentLocation() {
  navigator.geolocation.getCurrentPosition(getCoordinates);
}

function getCoordinates(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(1);
  let apiUrlCurr = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlCurr).then(changeTempDisplay);
}
