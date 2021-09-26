// Setup empty JS array to act as endpoint for all routes
let projectData = {};

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

// app.get('/allData', function (req, res) {
//   res.send(projectData);
// });

// // POST route
// app.post('/addData', function (req, res) {
//   let newEntry = {
//     temperature: req.body.temperature,
//     date: req.body.date,
//     userFeeling: req.body.userFeeling,
//   };
//   // adding data to the array 'projectData'
//   projectData = newEntry;
// });

app.post('/api', async function (req, res) {
  const city = req.body.city;

  const data = await getApiURL(city);
  res.json(data);
});

// GET data from GeoNames
const geoNamesKey = process.env.GEONAMES_API_KEY;
async function getApiURL(city) {
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
