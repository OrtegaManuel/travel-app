// Setup empty JS array to act as endpoint for all routes
let projectData = {};

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
app.use(express.static('website'));

// Define port

const port = 8000;
/* Spin up the server*/
const server = app.listen(port, () => {
  console.log('Server is running!');
  console.log(`Running on port: ${port}`);
});

// GET route
app.get('/allData', function (req, res) {
  res.send(projectData);
});

// POST route
app.post('/addData', function (req, res) {
  let newEntry = {
    temperature: req.body.temperature,
    date: req.body.date,
    userFeeling: req.body.userFeeling,
  };
  // adding data to the array 'projectData'
  projectData = newEntry;
});
