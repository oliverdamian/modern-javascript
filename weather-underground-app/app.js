const storage = new Storage();
const weatherLocation = storage.getLocationData();

const w = new Weather(weatherLocation.city, weatherLocation.state);
const ui = new UI();

document.addEventListener('DOMContentLoaded', getWeather);

document.getElementById('w-change-btn').addEventListener('click', () => {
  const city = document.getElementById('city').value;
  const state = document.getElementById('state').value;

  w.changeLocation(city, state);
  storage.setLocationData(city, state);
  getWeather();

  $('#loc-modal').modal('hide');
});

function getWeather() {
  w.getWeather()
  .then(results => {
    ui.paint(results);
  })
  .catch(err => console.log(err));
}
