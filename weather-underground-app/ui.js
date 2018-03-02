class UI {
  constructor() {
    this.location = document.getElementById('w-location');
    this.desc = document.getElementById('w-desc');
    this.string = document.getElementById('w-string');
    this.icon = document.getElementById('w-icon');

    this.details = document.getElementById('w-details');

    this.humidity = document.getElementById('w-humidity');
    this.dewpoint = document.getElementById('w-dewpoint');
    this.feelsLike = document.getElementById('w-feels-like');
    this.wind = document.getElementById('w-wind');
  }

  paint(w) {
    this.location.textContent = w.display_location.full;
    this.desc.textContent = w.weather;
    this.string.textContent = w.temperature_string;
    this.icon.setAttribute('src', w.icon_url);

    this.humidity.textContent = `Relative humidity: ${w.relative_humidity}`;
    this.dewpoint.textContent = `Dew Point: ${w.dewpoint_string}`;
    this.feelsLike.textContent = `Feels Like: ${w.feelslike_string}`;
    this.wind.textContent = `Wind: ${w.relative_humidity}`;
  }
}