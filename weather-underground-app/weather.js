class Weather {
  constructor(city, state) {
    this.apiKey = '0458e8589894e720';
    this.city = city;
    this.state = state;
  }

  async getWeather() {
    const response = await fetch(`http://api.wunderground.com/api/${this.apiKey}/conditions/q/${this.state}/${this.city}.json`);
    const responseDate = await response.json();

    return responseDate.current_observation;
  }

  changeLocation(city, state) {
    this.city = city;
    this.state = state;
  }
}