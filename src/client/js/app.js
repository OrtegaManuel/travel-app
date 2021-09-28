function getCountryData(event) {
  event.preventDefault();

  let cityInput = document.getElementById('city').value;
  let dateInput = document.getElementById('date').value;

  if (!cityInput) {
    alert('Please enter a city');
  } else {
    console.log('::: Form Submitted :::');

    fetch('http://localhost:8081/api', {
      method: 'POST',
      credentials: 'same-origin',
      cache: 'no-cache',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ city: cityInput, date: dateInput }), // sending to server.js
    })
      .then((res) => res.json())
      .then(function (res) {
        document.getElementById(
          'cityResult'
        ).innerHTML = `Your destination is ${cityInput}`;
        document.getElementById(
          'coords'
        ).innerHTML = `The coordinates for ${cityInput} are: ${res.city.lat},${res.city.lng}`;
        document.getElementById(
          'country'
        ).innerHTML = `The city of ${cityInput} belongs to: ${res.city.country}`;
        document.getElementById(
          'temp'
        ).innerHTML = `The temperature is: ${res.weather.temp}`;
        document.getElementById(
          'cityImage'
        ).innerHTML = `<img src="${res.cityImage.webformatURL}"/>`;
      });
  }
}
export { getCountryData };
