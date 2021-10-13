const path = require('path');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Dependencies
// Not using body-parser as it is deprecated

/* Middleware*/
// body-parser is already part of express in the newer express versions
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('dist'));

// Define port

const port = 8081;
/* Spin up the server*/
const server = app.listen(port, () => {
  console.log('Server is running!');
  console.log(`Running on port: ${port}`);
});

// GET routes
app.get('/', function (req, res) {
  res.sendFile('dist/index.html');
});

// POST routes
app.post('/api', async function (req, res) {
  const city = req.body.city;
  console.log('city', city);

  const cityData = await getCityData(city);
  console.log('cityData', cityData);

  const weatherData = await getCurrentWeatherData(cityData.lat, cityData.lng);
  console.log('weatherData', weatherData);

  const cityImage = await getCityImage(city, weatherData.weatherDescription);

  res.json({
    city: cityData,
    weather: weatherData,
    cityImage: cityImage,
  });
});

// Get data from GeoNames
const geoNamesKey = process.env.GEONAMES_API_KEY;

async function getCityData(city) {
  const apiURL = `http://api.geonames.org/search?q=${city}&maxRows=1&type=json&username=${geoNamesKey}`;
  try {
    const res = await fetch(apiURL);
    const data = await res.json();
    console.log(data.geonames[0].countryName);

    return {
      lng: data.geonames[0].lng,
      lat: data.geonames[0].lat,
      country: data.geonames[0].countryName,
    };
  } catch (err) {
    console.log('Error: ', err);
  }
}

// Get data from Weatherbit

const weatherbitKey = process.env.WEATHER_API_KEY;

async function getCurrentWeatherData(lat, lon) {
  const apiURL = `https://api.weatherbit.io/v2.0/current/?lat=${lat}&lon=${lon}&key=${weatherbitKey}`;
  try {
    const res = await fetch(apiURL);
    const data = await res.json();
    // console.log(data);
    console.log(apiURL);

    return {
      temp: data.data[0].temp,
      weatherDescription: data.data[0].weather.description,
    };
  } catch (err) {
    console.log('Error: ', err);
  }
}

// Get data from Pixabay

const pixabayKey = process.env.PIXABAY_API_KEY;

async function getCityImage(city, weather) {
  const apiURL = `https://pixabay.com/api/?key=${pixabayKey}&q=${city}+${weather
    .split(' ')
    .pop()}&image_type=photo&pretty=true`;
  try {
    const res = await fetch(apiURL);
    const data = await res.json();
    // console.log(data);
    console.log(apiURL);

    return {
      webformatURL: data.hits[0].webformatURL,
    };
  } catch (err) {
    console.log('Error: ', err);
  }
}
