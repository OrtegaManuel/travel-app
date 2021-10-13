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
      .then((res) => res.json())
      .then(function (res) {
        document.getElementById(
          'travel--date'
        ).innerHTML = `Travel begin: ${dateInput
          .split('-')
          .reverse()
          .join('.')}`;
        document.getElementById(
          'city--result'
        ).innerHTML = `Destination: ${cityInput} in ${res.city.country}`;
        document.getElementById(
          'forecast'
        ).innerHTML = `Weather: ${res.weather.weatherDescription} - ${res.weather.temp}°C`;
        document.getElementById(
          'city--image'
        ).innerHTML = `<img src="${res.cityImage.webformatURL}"class='result--img'/>`;
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
