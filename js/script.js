var preloader = document.getElementById('loading');
let ourRequest= new XMLHttpRequest();
apiKey = "7d34abcf9dfc4504f1340ab14a89efc6";
function myFunction() {
    preloader.style.display = 'none';
    
}
//set up weather   
let weather = {
  apiKey: apiKey,
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, feels_like, humidity } = data.main;
    const {lat, lon} = data.coord;
    document.getElementById("city").innerText = "Weather in " + name;
    document.getElementById("icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.getElementById("description").innerText = description;
    document.getElementById("temperature").innerText = temp + "°C";
    document.getElementById("humidity").innerText = "Humidity: "+ humidity + "%";
    document.getElementById("feels_like").innerText =
      "Feels like: " + feels_like + "°C";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?city " + name + "')";
    document.body.style.backgroundRepeat = "none";
    document.body.style.backgroundSize = "100";
    document.body.style.width = "100%";
    document.body.style.height = "100%";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    
    //set up google map
    var options = {
      center: {lat: lat , lng:lon },
      zoom: 12,
  }
  map = new google.maps.Map(document.getElementById("map"),options);
  
  //set up marker
  const marker = new google.maps.Marker({
    position: {lat: lat , lng:lon },
    map: map,
  });
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();

  
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    
  } else { 
    document.getElementById("lon").innerText = "Geolocation is not supported by this browser.";
  }
}

//set up current location
function showPosition(position) {
  let url = "http://api.openweathermap.org/data/2.5/weather?lat=" +
  position.coords.latitude +
  "&lon=" +
  position.coords.longitude +
  "&appid=" +
  apiKey;
let location;
ourRequest.onreadystatechange = function () {
    if (ourRequest.readyState==4 && ourRequest.status==200) {
      location = JSON.parse(ourRequest.responseText);
        console.log(location);
        weather.fetchWeather(location.name);
        
        var options = {
          center: {lat: location.coord.lat , lng:location.coord.lon },
          zoom: 12,
      }
      map = new google.maps.Map(document.getElementById("map"),options);

      }
  }
ourRequest.open('GET', url);
ourRequest.send();
}




