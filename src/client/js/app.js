function getCountryData(event) {
  event.preventDefault();

  // check what url was put into the form field
  let cityInput = document.getElementById('city').value;

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
      body: JSON.stringify({ city: cityInput }),
    })
      .then((res) => res.json())
      .then(function (res) {
        document.getElementById(
          'cityResult'
        ).innerHTML = `Your destination is ${cityInput}`;
        document.getElementById(
          'coords'
        ).innerHTML = `The coordinates for ${cityInput} are: ${res.lat},${res.lng}`;
        document.getElementById(
          'country'
        ).innerHTML = `The city of ${cityInput} belongs to: ${res.country}`;
      });
  }
}
export { getCountryData };
