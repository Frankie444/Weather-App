const appId = 'f9dbd938c20c8698b3f540b19267ca71';

//create function to render card with inner html retrieved from API
const createCardHtml = (name, currentTemp, description, humidity, minTemp, maxTemp) => `
  <div class="card">
  <div class="card text-center">
  <div class="card-header">${name}
  </div>
  <div class="card-body">
    <h3 class="card-title">is currently ${currentTemp} &#x2103 with ${description}</h3>
    <p class="card-text">min temp ${minTemp} &#x2103</p>
    <p class="card-text">max temp ${maxTemp} &#x2103</p>
    <p class="card-text">humidity ${humidity}%</p>
  </div>
  <div class="card-footer text-muted">
  "Bad weather always looks worse through a window"
  - Tom Lehrer
  </div>
</div>
`;

//select the required form inputs 
const findOutButton = document.querySelector('#find-out');
const locationInput = document.querySelector('#input-location');
const weatherCard = document.querySelector('#weather-description');

//event listener set to click on "find out" button
findOutButton.addEventListener('click', async () => {
  //use the location value submitted in input field
  const location = locationInput.value;
  //async/await fetch data from API and convert to json
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${appId}&units=metric`)
  const data = await response.json();

  //select which API data to return to card/html
  const name = data.name;
  const currentTemp = (Math.round(data.main.temp));
  const description = data.weather[0].description;
  const humidity = data.main.humidity;
  const minTemp = (Math.round(data.main.temp_min));
  const maxTemp = (Math.round(data.main.temp_max));

  //set variable to call function for rendering card using retrieved API data
  const displayedData = createCardHtml(name, currentTemp, description, humidity, minTemp, maxTemp);

  //set card inner html to reflect API data
  weatherCard.innerHTML = displayedData;

});
