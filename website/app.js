/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=9352eaac7aad43f6ccaf6e38518020b7';
// Create a new date instance dynamically with JS
let d = new Date();
// Change date format
let newDate = d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', getWeatherData);

/* Function called by event listener */
function getWeatherData(e) {
  const zip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;

  getWeatherURL(baseURL, zip, apiKey).then(function (data) {
    console.log(data);
    postData('/addData', {
      date: newDate,
      city: data.name,
      temperature: data.main.temp,
      userFeeling: feelings,
    });
    updateUI('/allData');
  });
}
/* Function to GET Web API Data*/
const getWeatherURL = async (baseURL, zip, apiKey) => {
  // set units of measurement to 'metric'
  const res = await fetch(baseURL + zip + '&units=metric' + apiKey);
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

/* Function to POST data */
const postData = async (url = '', data = {}) => {
  // console.log(data);
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log('error', error);
  }
};

/* Function to GET Project Data */

const updateUI = async (url = '') => {
  const request = await fetch(url);
  try {
    const allData = await request.json();
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = allData.temperature + '°C';
    document.getElementById('content').innerHTML = allData.userFeeling;
  } catch (error) {
    console.log('error', error);
  }
};
