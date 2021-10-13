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
      body: JSON.stringify({ city: cityInput, date: dateInput }), // sending values to server.js
    })
      .then(res => res.json())
      .then(function (res) {
        document.getElementById(
          'cityResult'
        ).innerHTML = `Your trip to ${cityInput} starts on ${dateInput}`;
        document.getElementById(
          'coords'
        ).innerHTML = `The coordinates for ${cityInput} are: ${res.city.lat},${res.city.lng}`;
        document.getElementById(
          'country'
        ).innerHTML = `The city of ${cityInput} belongs to: ${res.city.country}`;
        document.getElementById(
          'temp'
        ).innerHTML = `The forecast is: ${res.weather.temp}°C - ${res.weather.weatherDescription}`;
        document.getElementById(
          'cityImage'
        ).innerHTML = `<img src="${res.cityImage.webformatURL}"class='result_img'/>`;
        document.getElementById('print--btn').innerHTML = `<input
        class="print--btn"
        type="button"
        name="print"
        value="Print Result"
        onClick="window.print()"
    />`;
      });
  }
}
export { getCountryData };
